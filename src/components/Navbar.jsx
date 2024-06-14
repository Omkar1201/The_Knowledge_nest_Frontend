import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AppContext } from '../context/Appcontext'
import { CgProfile } from "react-icons/cg";
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'
import { BsSearch } from "react-icons/bs"
import logo from "../images/logo.png"
import flagimg from '../images/flag.jpg'
import './Navbar.css'
import Sidebar from './Sidebar';
function Navbar() {
    const cur = new Date().toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
    const { logout, setTempAllposts, isloggedin, category, setcategory, Allposts } = useContext(AppContext)
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
            Allposts.filter((post) => (post.category.includes(category) || post.title.includes(category) || post.body.includes(category) || post.username.includes(category)))
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
                    <Sidebar createpost={createpost}/>
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
                    <button className={`${location.pathname === '/Home' ? 'bg-black text-white' : 'bg-zinc-300 text-black'} px-3  py-1 w-full`}>
                        Home
                    </button>
                </Link>
                <Link to='/savedposts'>
                    <button className={`${location.pathname === '/savedposts' ? 'bg-black text-white' : 'bg-zinc-300 text-black'} px-3  py-1 w-full`}>
                        Saved posts
                    </button>
                </Link>
                <Link to='/About'>
                    <button className={`${location.pathname === '/About' ? 'bg-black text-white' : 'bg-zinc-300 text-black'} px-3  py-1 w-full`}>
                        About
                    </button>
                </Link>
                <Link to='/Contact'>
                    <button className={`${location.pathname === '/Contact' ? 'bg-black text-white' : 'bg-zinc-300 text-black'} px-3  py-1 w-full`}>
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
            <form action="" onSubmit={handleclickmobile} className=' serach-bar px-4 hidden py-3 bg-gray-100 '>
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
                    <form action="" onSubmit={handleclick}>
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
                            <Link to='/profile'>
                                <div className={`text-[2rem] hover:bg-gray-200 ${location.pathname === '/profile' ? ' text-blue-500' : ''}`} title='Profile'>
                                    <CgProfile />
                                </div>
                                <div className='text-[0.7rem] font-thin'>
                                    {
                                        localStorage.getItem('username').charAt(0).toUpperCase() + localStorage.getItem('username').slice(1)
                                    }
                                </div>
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
                </div>
            </div>
        </div>
    )
}

export default Navbar