import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/Appcontext';
import Card from './Card';
import Loading from './Loading';
import { Link } from 'react-router-dom';
import { IoWarningOutline } from "react-icons/io5";
export default function SavedPosts() {
    const { Allposts, isloading } = useContext(AppContext);
    const [savedPosts, setSavedPosts] = useState([]);
    const [expandedPosts, setExpandedPosts] = useState({});

    useEffect(() => {
        const userId = localStorage.getItem('user_id')
        setSavedPosts(Allposts.filter((data) => data.savedby.includes(userId)));
    }, [Allposts]);

    const toggleExpand = (index) => {
        setExpandedPosts(prevState => ({
            ...prevState,
            [index]: !prevState[index]
        }));
    };

    return (
        <div className='mt-4 min-h-screen px-1'>
            <div className='text-[1.5rem] my-2  font-serif font-bold text-start'>
                Saved posts
            </div>
            {
                isloading ? (<Loading />) : (
                    savedPosts.length > 0 ? (
                        savedPosts.map((data, index) => (
                            <div className='text-start flex flex-col gap-6' key={index}>
                                <div onClick={() => toggleExpand(index)} className={` hover:underline font-bold text-[1.1rem] cursor-pointer `} title='Click to expand'>
                                    {index + 1}.{data.title}
                                </div>
                                <div className={`transition-max-height duration-300 ease-in-out ${expandedPosts[index] ? 'max-h-[1000px]' : 'max-h-0'} overflow-hidden`}>
                                    <Card data={data} flag={'full'} />
                                </div>
                            </div>
                        ))

                    ) : (
                        <div className=' flex flex-col py-2 items-center justify-center'>
                            <div>
                            </div>
                            <Link to='/Home'>
                                <div className=''>
                                </div>
                            </Link>
                            <div className='justify-evenly w-[20rem] h-[10rem] flex items-center flex-col'>
                                <div className='text-[2.5rem] text-yellow-500'>
                                    <IoWarningOutline />
                                </div>
                                <div className='font-bold text-[1.2rem]'>
                                    You don't have any post saved.
                                </div>
                                <Link to='/Signin'>
                                    <div className='hover:underline'>
                                        Click to explore blogs
                                    </div>
                                </Link>
                            </div>
                        </div>
                    )
                )
            }
        </div>
    );
}
