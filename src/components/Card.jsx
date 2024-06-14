import React, { useContext, useEffect, useState } from 'react';
import { BiLike, BiSolidLike } from "react-icons/bi";
import { AppContext } from '../context/Appcontext';
import { toast } from 'react-toastify';
import { MdDeleteOutline } from "react-icons/md";
import { useNavigate,useLocation } from 'react-router'
import { useRef } from 'react';
import Loading2 from './Loading2';
// import Modal from 'react-modal';
// import { BsThreeDotsVertical } from "react-icons/bs";
import { BsFillBookmarkCheckFill } from "react-icons/bs";
import { BsBookmark } from "react-icons/bs";
export default function Card({ data, flag }) {
    const {logout, replacepost, setselectedarticle, selectedarticle,setwrittenby } = useContext(AppContext);
    const [isLiked, setIsLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(data.likes.length);
    const [mycomment, setmycomment] = useState("")
    const [comment, setcomment] = useState(data.comments)
    const [isfocused, setisfocused] = useState(false)
    const [commentlength, setcommentlength] = useState(data.comments.length)
    const [isCommentLoading, setisCommentLoading] = useState(false)
    const [iscommentdeleting, setiscommentdeleting] = useState(false)
    const [isliking, setisliking] = useState(false)
    const [isSaving,setisSaving]=useState(false)
    // const [ThreedotModalIsOpen, setThreedotModalIsOpen] = useState(false)
    const [isSaved,setisSaved]=useState(false);

    const navigate = useNavigate()
    const location=useLocation()
    const formRef = useRef(null);

    useEffect(() => {
        const userId = localStorage.getItem('user_id');
        const filterdata = data.likes.map((dat) => (dat.user_id))
        filterdata.includes(userId) ? setIsLiked(true) : setIsLiked(false)
        flag === 'only' ? setcomment(data.comments.slice(-1).reverse()) : setcomment(data.comments)
        setisSaved(data.savedby.includes(userId));
        setcommentlength(data.comments.length) 
    }, [data,flag]);
    // console.log(data);
    async function handleLike() {
        const token = localStorage.getItem('token');
        if (!token || token === 'null') {
            toast.warn('Please log in');
            return;
        }
        if (isliking) return;
        // setIsLiked(!isLiked);
        // isLiked ? setLikeCount(data.likes.length-1):setLikeCount(data.likes.length+1)
        setisliking(true)
        try {
            const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/v1/${isLiked ? 'unlike' : 'like'}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ post_id: data._id, user_id: localStorage.getItem('user_id') })
            });

            const responseData = await response.json();
            // console.log(responseData);
            if (responseData.success) {
                setIsLiked(!isLiked);
                replacepost(responseData.updateresponse)
                if (selectedarticle) {
                    setselectedarticle(responseData.updateresponse)
                }
                setLikeCount(responseData.updateresponse.likes.length);
                console.log(responseData.message);
            } else {
                if (responseData.message === 'Token Invalid' || responseData.message === 'Token not found') {
                    logout()
                }
                toast.warn(`${responseData.message} (Please log in)`);
            }
        } catch (error) {
            console.error('Error occurred while liking/unliking post:', error);
            toast.error('An error occurred. Please try again later.');
        }
        setisliking(false)
    }
    async function submitcomment(event) {
        event.preventDefault();
        const token = localStorage.getItem('token');
        if (!token || token === 'null') {
            toast.warn('Please log in');
            return;
        }
        setisCommentLoading(true)
        try {
            const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/v1/createcomment`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ post_id: data._id, creater_id: localStorage.getItem('user_id'), comment_body: mycomment, created_by: localStorage.getItem('username') })
            });
            const responseData = await response.json()
            if (responseData.success) {
                if (selectedarticle) {
                    setselectedarticle(responseData.updatedPostData)
                }
                replacepost(responseData.updatedPostData);
                toast.success('Comment done successfull!')
                setmycomment("")
            }
            else {
                if (responseData.message === 'Token Invalid' || responseData.message === 'Token not found') {
                    logout()
                }
                toast.warn(`${responseData.message}`);
            }
        }
        catch (err) {
            console.log(err.message);
        }
        setisCommentLoading(false)
    }
    const deletecomment = async (comment_id) => {

        const token = localStorage.getItem('token')
        setiscommentdeleting(true)
        try {
            const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/v1/deletecomment`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ post_id: data._id, comment_id })
            });
            const responseData = await response.json()
            if (responseData.success) {
                if (selectedarticle) {
                    setselectedarticle(responseData.updatedPostData)
                }
                replacepost(responseData.updatedPostData)
                setcomment(responseData.updatedPostData.comments)
                toast.success('Comment deleted')
                // console.log(responseData.updatedPostData);
            }
            else {
                if (responseData.message === 'Token Invalid' || responseData.message === 'Token not found') {
                    logout()
                }
                toast.warn(`${responseData.message}`);
            }
        }
        catch (err) {
            toast.warn(err.message)
            console.log(err.message)
        }
        setiscommentdeleting(false)
    }
    const handleSavepost = async () => {
        const token = localStorage.getItem('token');
        if (!token || token === 'null') {
            toast.warn('Please log in');
            return;
        }
        setisSaving(true)
        try {
            const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/v1/savedpost`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ post_id: data._id,user_id:localStorage.getItem('user_id') ,saved: !isSaved })
            });
            const responseData = await response.json()
            // console.log(responseData);
            if (responseData.success) {
                if (selectedarticle) {
                    setselectedarticle(responseData.updatedPostData)
                }
                replacepost(responseData.updatedPostData)
                toast.success(responseData.message)
            }
            else {
                if (responseData.message === 'Token Invalid' || responseData.message === 'Token not found') {
                    logout()
                    return;
                }
                console.log(responseData.message);
                toast.error(responseData.message)
            }

        }
        catch (error) {
            console.log(error.message);
            toast.error(error.message)
        }
        setisSaving(false)
    }
    const handleBlur = (e) => {
        if (formRef.current && formRef.current.contains(e.relatedTarget)) {
            return;
        }
        setisfocused(false);
    };
    // console.log(writtenby);
    // console.log(comment);
    return (
        <div className={`${flag === 'only' ? 'w-[24rem] border-2 rounded-xl border-gray-200' : ''} ${iscommentdeleting || isSaving ? 'opacity-30 cursor-wait' : ''}`}>
            <div className={` flex flex-wrap ${flag==='only'? 'justify-center':''} items-center`}><img src={data.image} alt='preview' className={`w-[24rem] imgw h-[14rem] p-[0.1rem] ${flag==='only' ? 'rounded-t-xl':''}`} /></div>
            <div className='px-2'>
                <div className='my-2 flex justify-between items-start'>
                    <div>
                        <div className='text-start text-[0.9rem] font-bold'>Category: {data.category}</div>
                        <div className='text-start text-[0.8rem]'>Created at: {new Date(data.created_at).toLocaleDateString('en-US', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        }).replace(/,/g, '')}
                        </div>
                    </div>
                    <button disabled={isSaving} onClick={() => { handleSavepost() }} className=' hover:bg-zinc-200 p-2 rounded-full' title={`${isSaved ? 'Click to remove from Bookmark':'Click to Bookmark'}`}>
                        {

                            isSaved ? <BsFillBookmarkCheckFill /> : <BsBookmark />
                        }

                    </button>
                </div>
                <div className='text-start text-[1.1rem] font-bold'>Title: {data.title}</div>
                <div className='text-start'>{flag === 'only' ? data.body.slice(0, 400) : data.body} <span className='mx-1 cursor-pointer' onClick={() => { setselectedarticle(data); navigate('/readblog') }}>{flag === 'only' ? (data.body.length > 400 ? '...' : '') : ('')}</span></div>
                <div className='flex flex-wrap pt-4 justify-between'>
                    <div onClick={handleLike} className='flex flex-wrap items-center justify-center gap-2 cursor-pointer' title={`${isLiked ? 'Click to Unlike':'Click to like'}`}>
                        {isLiked ? <BiSolidLike /> : <BiLike />}
                        <div>{likeCount}</div>
                    </div>
                    <button className='font-semibold text-[0.9rem]' onClick={()=>{setwrittenby({id:data.creater_id,name:data.username});navigate('/otherposts')}} disabled={location.pathname==='/otherposts'}>Written by: {data.username}</button>
                </div>
                {
                    flag === 'only' &&
                    < div className='flex flex-wrap py-2'>
                        <button onClick={() => { setselectedarticle(data); navigate('/readblog') }} className='border active:bg-slate-700 px-4 border-black font-semibold bg-black text-white py-1' title='Click to read entire blog' disabled={isSaving}>Read More</button>
                    </div>
                }
                <div>

                    <div className={`text-start ${flag === 'only' ? 'text-[0.9rem]' : 'text-[1.4rem]'} font-semibold`}>
                        {commentlength} Comments
                    </div>

                    <form ref={formRef} onSubmit={submitcomment} onFocus={() => setisfocused(true)} onBlur={handleBlur}>
                        <div className='py-2'>
                            <input onChange={(event) => setmycomment(event.target.value)} autoComplete='off' value={mycomment || ''} className='border-b w-full focus:border-black outline-none' name='comment' placeholder='Add a Comment...' type='text' disabled={isCommentLoading || iscommentdeleting || isSaving} />
                        </div>
                        <div className={`justify-end flex-wrap gap-4 ${isfocused ? 'flex ' : 'hidden'}`}>
                            <div className='hover:bg-gray-200 px-3 rounded-xl font-semibold py-1 cursor-pointer' onClick={() => { setmycomment(""); }} >cancel</div>
                            {/* <button className={`${mycomment ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-500'}  border px-3 rounded-xl font-semibold py-1`} disabled={!mycomment}>Comment</button> */}
                            <div className='relative'>
                                <button className={`border ${isCommentLoading ? 'opacity-30' : ''} ${mycomment ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-500'} border px-3 rounded-xl font-semibold py-1`} disabled={!mycomment || isCommentLoading}>
                                    Comment
                                </button>
                                {
                                    isCommentLoading &&
                                    <div className='absolute top-[0.40rem] left-[2.3rem]'>
                                        <Loading2 />
                                    </div>
                                }
                            </div>
                        </div>
                    </form>
                    <div >
                        {
                            comment.map((single_data, index) => (
                                <div key={index} className={`${flag === 'only' ? '' : 'border-b'}`}>
                                    <div className='flex flex-wrap justify-between items-center mt-2'>
                                        <div className='text-start'>{single_data.comment_body}</div>
                                        {
                                            single_data.creater_id === localStorage.getItem('user_id') &&
                                            <button disabled={iscommentdeleting} className='w-fit rounded-full p-1 hover:bg-red-200' onClick={() => deletecomment(single_data._id)} title='Click to delete comment'>
                                                {/* <BsThreeDotsVertical /> */}
                                                <MdDeleteOutline />
                                            </button>
                                        }
                                    </div>
                                    <div className='text-end text-[0.8rem]'>~{single_data.created_by}</div>
                                </div>
                            ))
                        }
                    </div>

                </div>
            </div>
        </div >
    );
}
