import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/Appcontext';
import PleaseLogin from './PleaseLogin';
import Modal from 'react-modal';
import { IoWarningOutline } from "react-icons/io5";
import Myposts from './Myposts';
import Loading from './Loading';
import { Link } from 'react-router-dom';

export default function Profile() {
    const { isloggedin, logout, Allposts, isloading } = useContext(AppContext);
    const [signoutModalIsOpen, setSignoutModalIsOpen] = useState(false);
    const [myposts, setmyposts] = useState([])

    useEffect(() => {
        const filterdata = Allposts.filter((post) => post.creater_id === localStorage.getItem('user_id'));
        setmyposts(filterdata)
    }, [Allposts])
    return (
        <div className=''>

            {isloggedin ? (
                <div>
                    {/* <div>Welcome {localStorage.getItem('username')}</div> */}
                    <div className='text-start text-[1.5rem] font-serif font-bold my-4'>
                        MyBlogs
                    </div>
                    {
                        isloading ? (<Loading />) :
                            <>

                                <div className=' min-h-screen flex flex-wrap justify-center gap-4'>
                                    {
                                        myposts.length ? (
                                            myposts.map((data, index) => (
                                                <Myposts data={data} key={index} />
                                            ))
                                        ) :
                                            (
                                                <div className='bg-gray-10 h-fit hadow-xl px-10 py-2'>
                                                    <div className='text-[1.5rem] mb-4 font-semibold font-serif'>You don't have any Blogs</div>
                                                    <Link to='/createpost'>
                                                        <button className='border bg-black text-white font-semibold w-[10rem] py-1 hover:bg-gray-800'>Click to write Blog</button>
                                                    </Link>
                                                </div>

                                            )
                                    }
                                </div>
                            </>
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
                    <button onClick={() => setSignoutModalIsOpen(true)} className=' border px-4 py-1 bg-blue-500 text-white hover:bg-blue-600 font-semibold rounded-md'>
                        Sign Out
                    </button>
                </div>
            ) : (
                <PleaseLogin />
            )}
        </div>
    );
}
