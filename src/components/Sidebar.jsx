import React, { useState, useEffect, useContext } from 'react';
import { AppContext } from '../context/Appcontext';
import { Link, useLocation } from 'react-router-dom';
import { CgProfile } from "react-icons/cg";
import { IoWarningOutline } from "react-icons/io5";
import Modal from 'react-modal';
import { GoSignOut } from "react-icons/go";
import { IoMdCreate } from "react-icons/io";
import { GoHome } from "react-icons/go";
import { CiLogin } from "react-icons/ci";
import './Sidebar.css'
export default function Sidebar({ createpost }) {
    const { isloggedin, logout } = useContext(AppContext)
    const [isSidebarClicked, setIsSidebarClicked] = useState(false);
    const [expanded, setExpanded] = useState(false);
    const location = useLocation()
    const [signoutModalIsOpen, setSignoutModalIsOpen] = useState(false);
    const handleSidebarClick = () => {
        setIsSidebarClicked(!isSidebarClicked);
        setExpanded(!expanded);
    };

    useEffect(() => {
        if (expanded) {
            document.body.classList.add('no-scroll');
        } else {
            document.body.classList.remove('no-scroll');
        }
    }, [expanded]);

    return (
        <div>
            <div className={`animated-div z-10 ${expanded ? 'expanded' : ''} top-[5rem] left-0 absolute h-screen border bg-white overflow-auto`}>
                <div className="py-4 px-3">
                    {
                        !isloggedin &&
                        <div className=''>
                            <Link to='/Signup' onClick={handleSidebarClick}>
                                <button className='border w-full px-4 py-1 bg-black text-white font-semibold'>
                                    Register
                                </button>
                            </Link>
                        </div>
                    }
                    <div className=' my-8 flex flex-col gap-4 font-semibold text-start'>
                        <Link to='/Home' onClick={handleSidebarClick}>
                            <div className={`flex items-center gap-4 px-4 py-1  ${location.pathname === '/Home' ? 'bg-zinc-100' : ''}`}>
                                <div className='text-[1.2rem]'>
                                    <GoHome />
                                </div>
                                <div className=''>
                                    Home
                                </div>
                            </div>
                        </Link>
                        <Link to='/createpost' onClick={handleSidebarClick}>
                            <div className={`flex items-center gap-4 px-4 py-1  ${location.pathname === '/createpost' ? 'bg-zinc-100' : ''}`} onClick={() => createpost()}>
                                <div className='text-[1.2rem]'>
                                    <IoMdCreate />
                                </div>
                                <div>
                                    Create post
                                </div>
                            </div>
                        </Link>
                        <Link to='/profile/myblogs' onClick={handleSidebarClick}>
                            <div className={`flex items-center gap-4 px-4 py-1  ${location.pathname === '/profile/myblogs' ? 'bg-zinc-100' : ''}`}>
                                <div className='text-[1.2rem]'>
                                    <CgProfile />
                                </div>
                                <div >
                                    {
                                        isloggedin ?
                                            localStorage.getItem('username')
                                            :
                                            <div>
                                                Profile
                                            </div>
                                    }
                                </div>
                            </div>
                        </Link>

                        {
                            isloggedin ? (
                                <button onClick={() => { setSignoutModalIsOpen(true); handleSidebarClick() }} className={` w-full flex items-center gap-4 px-4 py-1 ${location.pathname === '/Signin' ? 'bg-zinc-100' : ''}`}>
                                    <div className='text-[1.2rem]'>
                                        <GoSignOut />
                                    </div>
                                    <div>
                                        Sign Out
                                    </div>
                                </button>
                            ) :
                                (
                                    <Link to='/Signin' onClick={handleSidebarClick}>
                                        <button className={` w-full flex items-center gap-4 px-4 py-1 ${location.pathname === '/Signin' ? 'bg-zinc-100' : ''}`}>
                                            <div className='text-[1.2rem]'>
                                                <CiLogin />
                                            </div>
                                            <div>
                                                Log in
                                            </div>
                                        </button>
                                    </Link>
                                )
                        }
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
                                }} className='border px-3 rounded-md border-gray-300 font-semibold py-1 hover:bg-gray-100'>Sign Out</button>
                                <button onClick={() => setSignoutModalIsOpen(false)} className='border px-3 rounded-md hover:bg-gray-100 border-gray-300 font-semibold py-1'>Cancel</button>
                            </div>
                        </Modal>

                    </div>

                </div>
            </div>
            <div className='flex  flex-col gap-[0.4rem] cursor-pointer' onClick={handleSidebarClick}>
                {isSidebarClicked ? (
                    <div className='w-[1.7rem] border-black'>
                        <svg
                            className='h-8 w-8'
                            fill='none'
                            viewBox='0 0 24 24'
                            stroke='currentColor'
                        >
                            <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth={2}
                                d='M6 18L18 6M6 6l12 12'
                            />
                        </svg>
                    </div>
                ) : (
                    <>
                        <div className='w-[1.5rem] border border-black'></div>
                        <div className='w-[1.5rem] border border-black'></div>
                        <div className='w-[1.5rem] border border-black'></div>
                    </>
                )}
            </div>
        </div>
    );
}
