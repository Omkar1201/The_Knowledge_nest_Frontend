import React from 'react'
export default function TopSkeleton() {
    return (
        <div className=' '>
            <div className='flex gap-1 applyflexwrap my-4 px-2'>
                <div className=' flex justify-center flex-wrap items-center animate-pulse w-[35rem] h-[14rem] bg-gray-200'></div>
                <div className=' flex flex-col justify-between gap-1 w-full'>
                    <div className='bg-gray-200 animate-pulse h-[1.4rem] w-[60%]'></div>
                    <div className=' bg-gray-200 animate-pulse h-[4.5rem] w-full'></div>
                    <div className='my-2 flex justify-between items-end'>
                        <div className='flex flex-col gap-2'>
                            <div className='bg-gray-200 animate-pulse w-[8rem] h-[1.4rem]'></div>
                            <div className='bg-gray-200 animate-pulse w-[12rem] h-[1.4rem]'></div>
                        </div>
                        <div className=' bg-gray-200 animate-pulse w-[8rem] h-[1.4rem]'></div>
                    </div>

                    < div className='flex'>
                        <button className='h-[2rem] bg-gray-200 animate-pulse w-[8rem]'></button>
                    </div>

                </div>
            </div>
        </div>
    )
}
