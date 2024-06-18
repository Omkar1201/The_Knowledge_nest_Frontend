import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { AppContext } from '../context/Appcontext'
import { CgProfile } from "react-icons/cg";
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'
import { BsSearch } from "react-icons/bs"
import logo from "../images/logo.png"
import flagimg from '../images/flag.jpg'
import Modal from 'react-modal';
import { GoSignOut } from "react-icons/go";
import { TiUserDelete } from "react-icons/ti";
import { PiUserThin } from "react-icons/pi";
import { IoWarningOutline } from "react-icons/io5";

import './Navbar.css'
import Sidebar from './Sidebar';
const customStyles = {
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0)',
    },
};
function Navbar() {
    const cur = new Date().toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
    const { logout, setTempAllposts, isloggedin, category, setcategory, Allposts } = useContext(AppContext)
    const [profileModal, setprofileModal] = useState(false)
    const [signoutModalIsOpen, setSignoutModalIsOpen] = useState(false);

    const location = useLocation()
    const navigate = useNavigate()

    const handleclickmobile = (event) => {
        event.preventDefault()
        setTempAllposts(
            Allposts.filter((post) => (post.category.includes(category) || post.title.includes(category) || post.body.includes(category) || post.username.includes(category)))
        )
        navigate('/Home')
        window.scrollTo({
            top: 2100,
            behavior: 'smooth',
        })
    }
    const handleclick = (event) => {
        event.preventDefault()
        setTempAllposts(
            Allposts.filter((post) => (
                post.category.toLowerCase().includes(category.toLowerCase()) || post.title.toLowerCase().includes(category.toLowerCase()) || post.body.toLowerCase().includes(category.toLowerCase()) || post.username.toLowerCase().includes(category.toLowerCase())
            ))
        )
        navigate('/Home')
        window.scrollTo({
            top: 910,
            behavior: 'smooth',
        })
    }
    const createpost = async () => {
        const token = localStorage.getItem('token')
        try {

            const data = await fetch(`${process.env.REACT_APP_BASE_URL}/api/v1/createpost`, {
                method: "GET",
                headers: {
                    'Content-Type': "application/json",
                    'Authorization': `Bearer ${token}`
                },
            })
            const responseData = await data.json();
            if (responseData.success) {
                navigate('/createpost')
            }
            else {
                logout()
                toast.warn("Please login")
                navigate('/Signin')
            }
            console.log(responseData);
        }
        catch (error) {
            console.log(error);
            toast.error(error.message)
        }
    }
    return (
        <div className=''>
            <div className='flex sidebar-container justify-center items-center gap-4 relative'>
                <div className='hidden sidebar'>
                    <Sidebar createpost={createpost} />
                </div>

                <div className='text-[2rem] items-center gap-4 fontsize flex text-center font-bold'>
                    <div className='w-[3rem] hidden mobile-logo cursor-pointer' onClick={() => navigate('/Home')}><img src={logo} alt='logo'></img></div>
                    The Knowledge Nest
                </div>
                <div className=' social_icons absolute top-0 right-0 text-xs flex flex-col'>
                    <div>{cur}</div>
                    <div className='flex items-center gap-1'>
                        <img className='w-4' alt='' src={flagimg}></img>
                        <div>IN</div>
                    </div>
                </div>
            </div>
            {/* <div className='border my-4 hidden bottomline border-black'></div> */}
            <div className=' mobile-navbar flex-wrap hidden justify-around my-4 font-semibold'>

                <Link to='/Home'>
                    <button className={`${location.pathname === '/Home' ? 'bg-black text-white' : 'bg-zinc-100 text-black'} px-3  py-1 w-full`}>
                        Home
                    </button>
                </Link>
                <Link to='/savedposts'>
                    <button className={`${location.pathname === '/savedposts' ? 'bg-black text-white' : 'bg-zinc-100 text-black'} px-3  py-1 w-full`}>
                        Saved posts
                    </button>
                </Link>
                <Link to='/About'>
                    <button className={`${location.pathname === '/About' ? 'bg-black text-white' : 'bg-zinc-100 text-black'} px-3  py-1 w-full`}>
                        About
                    </button>
                </Link>
                <Link to='/Contact'>
                    <button className={`${location.pathname === '/Contact' ? 'bg-black text-white' : 'bg-zinc-100 text-black'} px-3  py-1 w-full`}>
                        Contact
                    </button>
                </Link>
                {
                    !isloggedin &&
                    <Link to='/Signin'>
                        <button className={`${location.pathname === '/Signin' ? ' bg-black text-white' : ''} border px-4 py-1 border-black text-black font-semibold`}>
                            Log in
                        </button>
                    </Link>
                }
            </div>
            <form action="" onSubmit={handleclickmobile} className=' serach-bar px-4 hidden py-3 bg-gray-100 ' id='search_mobile'>
                <div className='border inputbar border-gray-500 bg-white shadow-xl flex h-12'>
                    <input type='text' value={category} onChange={(e) => setcategory(e.target.value)} placeholder='Search...' className=' w-full bg-transparent outline-none px-2' />
                    <button className=' p-4 bg-black text-white flex items-center justify-center '>
                        <BsSearch />
                    </button>
                </div>
            </form>
            <div className=' navbar flex justify-between border flex-wrap px-4 text-[1.1rem] shadow-lg'>
                <div className='flex first-container gap-[4rem] items-center'>
                    <div className='w-[4rem] cursor-pointer' onClick={() => navigate('/Home')}><img src={logo} alt='logo'></img></div>
                    <ul className='flex gap-[3rem] middle-container font-semibold items-center flex-wrap'>
                        <Link to='/Home'>
                            <button className='group relative'>
                                Home
                                <div className={`${location.pathname === '/Home' ? 'border-black' : 'border-transparent group-hover:border-gray-300 '}  border-2 absolute w-full`}></div>
                            </button>
                        </Link>
                        <Link to='/savedposts'>
                            <button className='group relative'>
                                Saved posts
                                <div className={`${location.pathname === '/savedposts' ? 'border-black' : 'border-transparent group-hover:border-gray-300 '}  border-2 absolute w-full`}></div>
                            </button>
                        </Link>
                        <Link to='/About'>
                            <button className='group relative'>
                                About
                                <div className={`${location.pathname === '/About' ? 'border-black' : 'border-transparent group-hover:border-gray-300 '}  border-2 absolute w-full`}></div>
                            </button>
                        </Link>
                        <Link to='/Contact'>
                            <button className='group relative'>
                                Contact
                                <div className={`${location.pathname === '/Contact' ? 'border-black' : 'border-transparent group-hover:border-gray-300 '}  border-2 absolute w-full`}></div>
                            </button>
                        </Link>
                    </ul>
                </div>
                <div className='flex justify-center flex-wrap last-container items-center gap-10'>
                    <form action="" onSubmit={handleclick} id='search'>
                        <div className='border flex-wrap border-grey-600 shadow-xl flex items-center cursor-pointer rounded-lg'>
                            <input type='text' value={category} onChange={(e) => setcategory(e.target.value)} placeholder='Search...' className=' bg-transparent outline-none px-1' />
                            <button className='ml-1 p-2 bg-black active:bg-slate-700 text-white rounded-r-lg '>
                                <BsSearch />
                            </button>
                        </div>
                    </form>
                    <button onClick={() => { createpost() }} className='border px-4 py-1 bg-black hover:bg-slate-800 text-white font-semibold rounded-md' >
                        Create Post
                    </button>

                    {
                        isloggedin ? (
                            <Link to='/profile/myblogs'>
                                <button className=' flex flex-col items-center group'>
                                    <div className={`text-[2rem] w-fit group-hover:bg-gray-200  ${location.pathname === '/profile/myblogs' ? ' text-blue-500' : ''}`} title='Profile'>
                                        <CgProfile/>
                                    </div>
                                    <div className={`text-[0.7rem]  ${location.pathname === '/profile/myblogs' ? 'font-semibold' : 'font-thin'}`}>
                                        {
                                            localStorage.getItem('username').charAt(0).toUpperCase() + localStorage.getItem('username').slice(1)
                                        }
                                    </div>
                                </button>
                            </Link>
                        ) :
                            (

                                <Link to='/Signin'>
                                    <button className=' hover:bg-black hover:text-white border px-4 py-1 bg-zinc-200 text-black font-semibold rounded-md'>
                                        Log in
                                    </button>
                                </Link>
                            )
                    }
                    {/* <div onClick={()=>setprofileModal(!profileModal)}>Click</div> */}
                     {/* Profile Modal */}
                    <Modal
                        isOpen={profileModal}
                        onRequestClose={() => setprofileModal(false)}
                        contentLabel="Profile_Modal"
                        className="custom-profile-modal"
                        style={customStyles}
                    >
                        <div className={`flex flex-col gap-5 items-start`}>
                            <Link to='/profile/myblogs' className='w-full' onClick={()=>setprofileModal(false)}>
                                <button className={`flex items-center gap-4 px-1 w-full py-1 hover:bg-gray-100 ${location.pathname==='/profile/myblogs' ? 'bg-gray-100 hover:bg-gray-200':''} rounded-md`}>
                                    <div>
                                        <PiUserThin />
                                    </div>
                                    <div>
                                        Myblogs
                                    </div>
                                </button>
                            </Link>
                            <button onClick={() => setSignoutModalIsOpen(true)} className={`flex items-center gap-4 px-1 w-full py-1 hover:bg-gray-100 rounded-md`}>
                                <div>
                                    <GoSignOut />
                                </div>
                                <div>
                                    Sign Out
                                </div>
                            </button>
                            <button className={`flex items-center gap-4 px-1 w-full py-1 hover:bg-red-500 rounded-md hover:text-white`}>
                                <div className='text-[1.2rem]'>
                                    <TiUserDelete />
                                </div>
                                <div>
                                    Delete Account
                                </div>
                            </button>
                        </div>
                    </Modal>

                    {/* Sign out Modal */}
                    <Modal
                        isOpen={signoutModalIsOpen}
                        onRequestClose={() => setSignoutModalIsOpen(false)}
                        contentLabel="Sign Out Confirmation"
                        className='custom-modal'
                    >
                        <h2 className=' text-[1.2rem] font-semibold flex items-center gap-4'><span className='text-[1.7rem] text-yellow-600 flex justify-center items-center rounded-full p-1 bg-yellow-100'><IoWarningOutline /></span>Are you sure you want to sign out?</h2>
                        <div className='flex gap-4'>
                            <button onClick={() => {
                                logout();
                                setSignoutModalIsOpen(false);
                                setprofileModal(false)
                            }} className='border px-3 rounded-md border-gray-300 font-semibold py-1 hover:bg-gray-100'>Sign Out</button>
                            <button onClick={() => setSignoutModalIsOpen(false)} className='border px-3 rounded-md hover:bg-gray-100 border-gray-300 font-semibold py-1'>Cancel</button>
                        </div>
                    </Modal>
                </div>
            </div>
        </div>
    )
}

export default Navbar