import React from 'react';
import './MypostsSkeleton.css';
export default function MypostsSkeleton({ data }) {

    return (
        <div className={`p-2 w-full border-b-2 border-black`}>
            <div className={``}>
                <div className={`flex justify-between `}>
                    <div className='w-[30rem] h-[15rem] bg-gray-200 animate-pulse'></div>
                    <button className=' h-fit hidedelteicon bg-gray-200 animate-pulse rounded-full p-4' title='Delete post'></button>
                </div>
            </div>
            <div className={`py-2`}>
                <div className={`flex justify-between my-2 flex-wrap`}>
                        <div className='bg-gray-200 animate-pulse h-[1.5rem] w-[15rem]'></div>
                        <div className='text-[0.8rem] bg-gray-200 animate-pulse h-[1.2rem] w-[10rem]'></div>
                    <button className=' h-fit deleteicon hidden bg-gray-200 animate-pulse rounded-full p-4' title='Delete post'>
                        {/* <MdDeleteOutline /> */}
                    </button>
                </div>
                <div className='flex w-[70%] bg-gray-200 animate-pulse h-[2rem]'></div>
                <div className={` w-full bg-gray-200 animate-pulse h-[15rem] my-2`}></div>
                <div className={`text-start my-4 `}>
                    <div className='text-[1.3rem] font-semibold font-serif bg-gray-200 animate-pulse h-[1.9rem] w-[8rem]'></div>
                    <div className=' flex flex-col gap-2'>
                        <div className='bg-gray-200 animate-pulse h-[1.5rem] w-[12rem] mt-2'></div>

                        <div className='font-semibold bg-gray-200 animate-pulse h-[1.5rem] w-[12rem]'></div>

                        <div className='bg-gray-200 animate-pulse h-[1.5rem] w-[12rem]'></div>
                    </div>
                </div>

            </div>
            <div className=' m-auto bg-gray-200 animate-pulse h-[2.2rem] w-[8rem] rounded-lg'></div>
        </div>
    );
}
