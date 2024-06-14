import React, { useContext, useState } from 'react';
import { AppContext } from '../context/Appcontext';
import PleaseLogin from './PleaseLogin';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';
import Loading2 from './Loading2';

export default function Post() {
    const navigate = useNavigate();
    const { isloggedin, logout, setAllposts, setTempAllposts } = useContext(AppContext);
    const [formdata, setformdata] = useState({ title: "", body: "", category: "" });
    const [image, setImage] = useState(null);
    const [btnloading, setbtnloading] = useState(false);
    

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    async function handlesubmit(event) {
        event.preventDefault();
        setbtnloading(true);
        try {
            const token = localStorage.getItem('token');
            if (!token || token === 'null') {
                toast.warn('Please Login');
                return;
            }
            const currdate= new Date().toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
            const response = await fetch(`http://localhost:3000/api/v1/createpost`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ formdata, creater_id: localStorage.getItem('user_id'), created_at: currdate, image })
            });
            const responsedata = await response.json();
            if (responsedata.success) {
                setAllposts((prevposts) => [
                    ...prevposts, responsedata.response
                ]);
                setTempAllposts((prevposts) => [
                    ...prevposts, responsedata.response
                ]);
                toast.success(responsedata.message);
                navigate('/Home');
            } else {
                if (responsedata.message === 'Token Invalid') {
                    logout();
                }
                toast.warn(`${responsedata._message}`);
            }
            console.log(responsedata);
        } catch (error) {
            if (error instanceof TypeError && error.message === 'Failed to fetch') {
                toast.error("Check your internet connection.");
            } else {
                toast.error("An error occurred while sending the message.");
            }
            console.log(error);
        }
        setbtnloading(false);
    }

    function handleformdata(event) {
        setformdata({
            ...formdata,
            [event.target.name]: event.target.value
        });
    }

    return (
        <div>
            {
                isloggedin ? (
                    <div className='flex flex-col justify-center mx-auto px-1 border-black w-full max-w-2xl my-1'>
                        <form onSubmit={handlesubmit}>
                            <div className='flex justify-center'>
                                {image && <img src={image} alt="Preview" className='w-full max-w-md h-auto' />}
                            </div>
                            <div className='flex my-4'>
                                <input type="file" required disabled={btnloading} onChange={handleImageChange} className='cursor-pointer' accept="image/*" />
                            </div>
                            <div className='text-start my-4'>
                                <label className='w-full'>
                                    <div className='font-semibold text-[1.2rem]'>
                                        Write a Title:
                                    </div>
                                    <input type='text' disabled={btnloading} autoComplete='off' placeholder='Write title...' required className='w-full border-black outline-none border-b' onChange={handleformdata} name='title' />
                                </label>
                            </div>
                            <div className='text-start my-2'>
                                <label className='w-full'>
                                    <div className='font-semibold text-[1.2rem]'>
                                        Write a post:
                                    </div>
                                    <textarea
                                        className="w-full px-1 border outline-none border-black"
                                        onChange={handleformdata}
                                        name="body"
                                        value={formdata.body}
                                        rows="10"
                                        style={{ overflow: 'auto' }}
                                        placeholder='Write Blog here...'
                                        disabled={btnloading}
                                        required
                                    />
                                </label>
                            </div>
                            <div className='my-2'>
                                <label className='w-full'>
                                    <div className='font-semibold text-start text-[1.2rem]'>
                                        Category:
                                    </div>
                                    <input disabled={btnloading} required type='text' placeholder='Write Category...' className='px-1 w-full outline-none border-b border-black' onChange={handleformdata} name='category' />
                                </label>
                            </div>
                            <div className='relative w-fit h-fit my-4 mx-auto'>
                                <button className={`border ${btnloading ? 'opacity-30' : ''} px-6 w-[15rem] max-w-xs text-[1.2rem] font-semibold text-white hover:bg-gray-800 bg-black py-1`} disabled={btnloading}>
                                    Post
                                </button>
                                {
                                    btnloading &&
                                    <div className='absolute top-[0.73rem] left-[47.5%]'>
                                        <Loading2 />
                                    </div>
                                }
                            </div>
                        </form>
                    </div>
                ) :
                    (
                        <PleaseLogin />
                    )
            }
        </div>
    );
}


// import React, { useContext, useState } from 'react'
// import { AppContext } from '../context/Appcontext'
// import PleaseLogin from './PleaseLogin'
// import { toast } from 'react-toastify'
// import { useNavigate } from 'react-router'
// import Loading2 from './Loading2'
// import Footer from './Footer'
// export default function Post() {
//     const navigate = useNavigate()
//     const { isloggedin, logout, setAllposts, setTempAllposts } = useContext(AppContext)
//     const [formdata, setformdata] = useState({ title: "", body: "", category: "" })
//     const [image, setImage] = useState(null);
//     const [btnloading, setbtnloading] = useState(false)
//     const [currdate, setcurrdate] = useState(new Date().toLocaleDateString('en-US', {
//         weekday: 'long',
//         year: 'numeric',
//         month: 'long',
//         day: 'numeric'
//     }))
//     // setCurrentDate(formattedDate);)
//     const handleImageChange = (event) => {
//         const file = event.target.files[0];
//         if (file) {
//             const reader = new FileReader();
//             reader.onload = () => {
//                 setImage(reader.result);
//             }
//             reader.readAsDataURL(file);
//         }
//     };
//     // console.log(image);
//     async function handlesubmit(event) {

//         event.preventDefault();
//         // console.log(formdata);
//         setbtnloading(true)
//         try {
//             const token = localStorage.getItem('token')
//             if (!token || token === 'null') {
//                 toast.warn('Please Login')
//                 return;
//             }
//             const response = await fetch('http://localhost:3000/api/v1/createpost', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'Authorization': `Bearer ${token}`
//                 },
//                 body: JSON.stringify({ formdata, creater_id: localStorage.getItem('user_id'), created_at: currdate, image })
//             })
//             const responsedata = await response.json()
//             if (responsedata.success) {
//                 // getposts()
//                 setAllposts((prevposts) => [
//                     ...prevposts, responsedata.response
//                 ])
//                 setTempAllposts((prevposts) => [
//                     ...prevposts, responsedata.response
//                 ])
//                 // console.log(responsedata);
//                 toast.success(responsedata.message)
//                 navigate('/Home')
//             }
//             else {
//                 if (responsedata.message === 'Token Invalid') {
//                     logout()
//                 }
//                 toast.warn(`${responsedata._message}`)
//             }
//             console.log(responsedata);
//         }
//         catch (error) {
//             if (error instanceof TypeError && error.message === 'Failed to fetch') {
//                 toast.error("Check your internet connection.");
//             } else {
//                 toast.error("An error occurred while sending the message.");
//             }
//             // toast.warn('Image is Too large')
//             console.log(error);
//         }
//         setbtnloading(false)
//     }
//     // console.log(currdate);
//     function handleformdata(event) {
//         setformdata({
//             ...formdata,
//             [event.target.name]: event.target.value
//         })
//     }

//     return (
//         <div>
//             {
//                 isloggedin ? (
//                     <div className='flex flex-wrap w-[40rem]  my-1 flex-col justify-center m-auto  px-1 border-black'>
//                         <form onSubmit={handlesubmit}>
//                             <div className=' flex justify-center'>
//                                 {image && <img src={image} alt="Preview" className='min-w-[24rem] h-[14rem]' />}
//                             </div>
//                             <div className='flex flex-wrap my-4'>
//                                 <input type="file" required disabled={btnloading} onChange={handleImageChange} className=' cursor-pointer' accept="image/*" />
//                             </div>
//                             <div className='text-start my-2 flex flex-wrap'>
//                                 <label className=' w-full'>
//                                     <div className='font-semibold text-[1.2rem]'>
//                                         Write a Title:
//                                     </div>
//                                     <input type='text' disabled={btnloading} autoComplete='off' placeholder='Write title...' required className=' w-full border-black flex flex-wrap outline-none border-b ' onChange={handleformdata} name='title' />
//                                 </label>
//                             </div>
//                             <div className='text-start my-2 flex flex-wrap'>
//                                 <label className='w-full'>
//                                     <div className='font-semibold text-[1.2rem]'>
//                                         Write a post:
//                                     </div>
//                                     <textarea
//                                         className="w-full px-1 flex flex-wrap border outline-none border-black"
//                                         onChange={handleformdata}
//                                         name="body"
//                                         value={formdata.body}
//                                         rows="10"
//                                         style={{ overflow: 'auto' }}
//                                         placeholder='Write Blog here...'
//                                         disabled={btnloading}
//                                         required
//                                     />
//                                 </label>
//                             </div>
//                             <div className='flex flex-wrap'>
//                                 <label className='w-full '>
//                                     <div className='font-semibold text-start text-[1.2rem]'>
//                                         Category:
//                                     </div>
//                                     <input disabled={btnloading} required type='text' placeholder='Write Category...' className='px-1 w-full flex flex-wrap outline-none border-b border-black' onChange={handleformdata} name='category' />
//                                 </label>
//                             </div>
//                             <div className='relative w-fit h-fit my-4 mx-auto'>
//                                 <button className={`border ${btnloading ? 'opacity-30' : ''} px-6 w-[16rem] text-[1.2rem] font-semibold text-white hover:bg-gray-800 bg-black py-1`} disabled={btnloading}>
//                                     Post
//                                 </button>
//                                 {
//                                     btnloading &&
//                                     <div className='absolute top-[0.73rem] left-[47.5%]'>
//                                         <Loading2 />
//                                     </div>
//                                 }
//                             </div>
//                         </form>
//                     </div>
//                 ) :
//                     (
//                         <PleaseLogin />
//                     )
//             }
//             <Footer />
//         </div>
//     )
// }

