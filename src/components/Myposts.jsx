import React, { useContext, useState, useEffect, useRef } from 'react';
import { AppContext } from '../context/Appcontext';
import { RiArrowDropDownLine, RiArrowDropUpLine } from "react-icons/ri";
import { toast } from 'react-toastify';
import { FaExclamation } from "react-icons/fa6";
import Modal from 'react-modal';
import { MdDeleteOutline } from "react-icons/md";
import './Myposts.css';
import Loading2 from './Loading2';
export default function Myposts({ data }) {
    const { setAllposts, setTempAllposts, Allposts, logout, replacepost } = useContext(AppContext);
    const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
    const [iseditclicked, setiseditclicked] = useState(false);
    const [formdata, setformdata] = useState({ posttitle: data.title, postbody: data.body, category: data.category, image: data.image });
    const [iscommentclicked, setiscommentclicked] = useState(false);
    const [btnloading, setbtnloading] = useState(false)
    const [isTotalLikesclicked, setisTotalLikesclicked] = useState(false)
    const [isCommentDeleting, setisCommentDeleting] = useState(false)
    const titleRef = useRef(null);
    const bodyRef = useRef(null);
    useEffect(() => {
        recalculateHeights();
        // eslint-disable-next-line       
    }, []);

    useEffect(() => {
        const recalculateHeights0 = () => {
            if (titleRef.current) {
                updateTextareaHeight(titleRef.current);
            }
    
            if (bodyRef.current) {
                updateTextareaHeight(bodyRef.current);
            }
        };
        recalculateHeights0();
    }, [iseditclicked]);

    const handleChangeBody = (event) => {
        const { value } = event.target;
        setformdata({ ...formdata, postbody: value });
        updateTextareaHeight(event.target);
    };

    const handleChangeTitle = (event) => {
        const { value } = event.target;
        setformdata({ ...formdata, posttitle: value });
        updateTextareaHeight(event.target);
    };

    const updateTextareaHeight = (textarea) => {
        textarea.style.height = 'auto';
        textarea.style.height = `${textarea.scrollHeight}px`;
    };

    const recalculateHeights = () => {
        if (titleRef.current) {
            updateTextareaHeight(titleRef.current);
        }

        if (bodyRef.current) {
            updateTextareaHeight(bodyRef.current);
        }
    };

    const handleCancel = () => {
        setformdata({ posttitle: data.title, postbody: data.body, category: data.category, image: data.image });
        setiseditclicked(false);
        setTimeout(recalculateHeights, 0);
    };

    const saveChanges = async () => {
        const token = localStorage.getItem('token');
        if (!token || token === 'null') {
            toast.warn('Please Login');
            return;
        }
        setbtnloading(true)
        const currdate = new Date().toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

        try {
            const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/v1/editpost`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    title: formdata.posttitle,
                    body: formdata.postbody,
                    post_id: data._id,
                    created_at: currdate,
                    category: formdata.category,
                    image: formdata.image
                })
            });

            const responseData = await response.json();
            // console.log(responseData);
            if (responseData.success) {
                replacepost(responseData.updatedPostData)
                toast.success('Post updated successfully');
            }
            else {
                if (responseData.message === 'Token Invalid') {
                    logout();
                }
                toast.warn(responseData.message);
            }
        } catch (error) {
            console.log(error);
            toast.warn(error.message);
        }
        setbtnloading(false)
        setiseditclicked(false);
    };
    async function Deletepost(post_id) {
        const token = localStorage.getItem('token');

        if (!token || token === 'null') {
            toast.warn('Please Login');
            return;
        }
        setbtnloading(true)
        try {
            const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/v1/deletepost`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ post_id })
            });
            const responsedata = await response.json();
            if (responsedata.success) {
                const filterdata = Allposts.filter((post) => post._id !== post_id);
                setTempAllposts(filterdata)
                setAllposts(filterdata)
                toast.success('Post deleted Successfully');
            } else {
                if (responsedata.message === 'Token Invalid') {
                    logout();
                }
                toast.warn(`Please login ${responsedata.message}`);
            }
        } catch (err) {
            console.log(err);
            toast.warn('Failed to delete');
        }
        setbtnloading(false)
    }
    const deleteComment = async (comment_id) => {
        const token = localStorage.getItem('token');
        if (!token || token === 'null') {
            toast.warn('Please Login');
            return;
        }
        setisCommentDeleting(true);
        try {
            const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/v1/deletecomment`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ post_id: data._id, comment_id })
            });
            const responseData = await response.json();
            if (responseData.success) {
                replacepost(responseData.updatedPostData)
                toast.success('Comment deleted')
            } else {
                if (responseData.message === 'Token Invalid' || responseData.message === 'Token not found') {
                    logout()
                }
                toast.warn(` ${responseData.message}`);
            }
        } catch (err) {
            console.log(err);
            toast.warn('Failed to delete');
        }
        setisCommentDeleting(false);
    }
    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setformdata({ ...formdata, image: reader.result });
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className={`p-2 w-full border-b-2 border-black`}>
            <div className={`${btnloading ? 'opacity-30' : ''}`}>
                <div className={`flex justify-between `}>
                    <img className='max-w-[40rem] imgw max-h-[20rem]' src={formdata.image} alt='preview' />
                    <button disabled={btnloading} onClick={() => setDeleteModalIsOpen(true)} className=' h-fit hidedelteicon text-[1.5rem] font-semibold hover:bg-red-200 rounded-full p-1' title='Delete post'>
                        <MdDeleteOutline />
                    </button>
                </div>
                {
                    iseditclicked && (
                        <div className='flex my-4'>
                            <input type="file" disabled={btnloading} accept='image/*' onChange={handleImageChange} />
                        </div>
                    )
                }
            </div>
            <div className={`py-2`}>
                <div className={`flex ${btnloading ? 'opacity-30' : ''} justify-between my-2 flex-wrap`}>
                    <div className='font-semibold text-[0.9rem]'>
                        Category:
                        <input
                            value={formdata.category}
                            onChange={(event) => setformdata({ ...formdata, category: event.target.value })}
                            disabled={!iseditclicked || btnloading}
                            className={`outline-none ${iseditclicked ? 'border-b' : ''} px-2 border-black`}
                        />
                    </div>
                    <div className='text-[0.8rem]'>
                        Created_at: {new Date(data.created_at).toLocaleDateString('en-US', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        }).replace(/,/g, '')}
                    </div>
                    <button disabled={btnloading} onClick={() => setDeleteModalIsOpen(true)} className=' h-fit deleteicon hidden text-[1.5rem] font-semibold hover:bg-red-200 rounded-full p-1' title='Delete post'>
                        <MdDeleteOutline />
                    </button>
                </div>
                <div className={`flex justify-between ${btnloading ? 'opacity-30' : ''}`}>
                    <div className=' text-[1.2rem] font-bold flex w-full'>
                        Title:
                        <textarea
                            id="title-textarea"
                            ref={titleRef}
                            className='w-full px-2 outline-none focus:bg-gray-200 rounded-lg'
                            value={formdata.posttitle}
                            onChange={handleChangeTitle}
                            disabled={!iseditclicked || btnloading}
                            style={{ height: 'auto', resize: 'none', overflow: 'hidden' }}
                        />
                    </div>
                </div>
                <div className={`text-start ${btnloading ? 'opacity-30' : ''} w-full`}>
                    <textarea
                        id="body-textarea"
                        ref={bodyRef}
                        className='w-full p-2 rounded-lg outline-none focus:bg-gray-200'
                        value={formdata.postbody}
                        onChange={handleChangeBody}
                        disabled={!iseditclicked || btnloading}
                        style={{ height: 'auto', resize: 'none', overflow: 'hidden' }}
                    />
                </div>
                <div className={`text-start my-4 ${btnloading ? 'opacity-30' : ''}`}>
                    <div className='text-[1.3rem] font-semibold font-serif'>Summary</div>
                    <div className='font-semibold'>
                        <div className=' cursor-pointer hover:text-blue-600 hover:underline' onClick={() => setisTotalLikesclicked(!isTotalLikesclicked)} title='Click tot see who liked your post'>
                            Total likes: {data.likes.length}
                        </div>
                        <div className={` font-normal transition-max-height duration-300 ease-in-out ${isTotalLikesclicked ? 'max-h-[1000px]' : 'max-h-0'} overflow-hidden`}>
                            {
                                data.likes.map((userdata, index) => (
                                    <div key={index} className={`border-b border-black flex gap-[0.4rem] py-2`}>
                                        {index + 1}.
                                        <div>
                                            <div>Username: {userdata.username}</div>
                                            <div>User Email: {userdata.email}</div>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                    <div className='font-semibold'>
                        Your post is saved by: {data.savedby.length}
                    </div>
                    <div className='font-semibold flex items-center'  >
                        Total Comments: {data.comments.length}
                        <div className='text-[2rem] cursor-pointer' onClick={() => setiscommentclicked(!iscommentclicked)} title='Click to see comments'>
                            {iscommentclicked ? <RiArrowDropUpLine /> : <RiArrowDropDownLine />}
                        </div>
                    </div>
                    <div className={`transition-max-height ${isCommentDeleting ? ' opacity-50' : ''} duration-300 ease-in-out ${iscommentclicked ? 'max-h-[1000px]' : 'max-h-0'} overflow-hidden`}>


                        {
                            data.comments.length > 0 ? (

                                data.comments.map((comment, index) => (
                                    <div className='border-b flex justify-between py-2' key={index}>
                                        <div className=' w-full'>
                                            <div>{comment.comment_body}</div>
                                        </div>
                                        <div className='flex flex-col items-end' title='Click to delete comment'>
                                            <button disabled={isCommentDeleting} className=' p-1 hover:bg-red-200 rounded-full ' onClick={() => deleteComment(comment._id)}>
                                                <MdDeleteOutline />
                                            </button>
                                            <div className=' text-[0.8rem]'>~{comment.created_by}</div>
                                        </div>
                                    </div>
                                )
                                )
                            ) :
                                (
                                    <div className=' font-light'>
                                        No comments
                                    </div>
                                )
                        }
                    </div>
                </div>
                <div className='flex justify-evenly'>
                    {!iseditclicked ? (
                        <button
                            onClick={() => {
                                setiseditclicked(true);
                                setTimeout(() => titleRef.current.focus(), 0);
                            }}
                            className='borde font-semibold w-[8rem] py-1 rounded-lg bg-gray-200 border-black hover:bg-zinc-300' title='Click to edit post'>
                            Edit
                        </button>
                    ) : (
                        <div className='flex justify-evenly w-full'>
                            <div className='relative'>
                                <button onClick={saveChanges} className={`border ${btnloading ? 'opacity-30' : ''} font-semibold px-5 py-1 rounded-md bg-slate-100 border-black hover:bg-gray-200`} disabled={btnloading} title='Click to save changes'>
                                    Save changes
                                </button>
                                {
                                    btnloading &&
                                    <div className='absolute top-[0.4rem] left-[3.5rem]'>
                                        <Loading2 />
                                    </div>
                                }
                            </div>
                            {/* <button onClick={saveChanges} className='border font-semibold px-5 py-1 rounded-md bg-slate-100 border-black hover:bg-gray-200'>
                                Save changes
                            </button> */}
                            <button disabled={btnloading} onClick={handleCancel} className={`border ${btnloading ? 'opacity-30' : ''} font-semibold px-5 py-1 rounded-md bg-slate-100 border-black hover:bg-gray-200`}>
                                Cancel
                            </button>

                        </div>
                    )}
                </div>
            </div>
            <Modal
                isOpen={deleteModalIsOpen}
                onRequestClose={() => setDeleteModalIsOpen(false)}
                contentLabel="Delete Post Confirmation"
                className='custom-modal'>
                <h2 className='flex items-center justify-center text-[1.1rem] font-semibold gap-2'>
                    <span className='text-red-500 border-2 text-[1.5rem] p-1 rounded-full border-red-500'><FaExclamation /></span>
                    Are you sure you want to delete this post?
                </h2>
                <div className='flex gap-4'>
                    <button
                        onClick={() => {
                            Deletepost(data._id);
                            setDeleteModalIsOpen(false);
                        }}
                        className='border px-3 rounded-md border-gray-300 font-semibold py-1 text-white bg-red-500 hover:bg-red-600'>
                        Delete
                    </button>
                    <button onClick={() => setDeleteModalIsOpen(false)} className='border px-3 rounded-md border-gray-300 font-semibold hover:bg-gray-100 py-1'>
                        Cancel
                    </button>
                </div>
            </Modal>
        </div>
    );
}
