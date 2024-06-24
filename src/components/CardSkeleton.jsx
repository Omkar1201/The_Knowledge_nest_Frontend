import React from 'react';
export default function CardSkeleton() {
    return (
        <div className={`w-[24rem] border rounded-xl border-gray-200`}>
            <div className={` flex flex-wrap items-center bg-gray-200 h-[14rem] rounded-t-xl`}></div>
            <div className='px-2'>
                <div className='my-2 flex justify-between items-start'>
                    <div className='flex flex-col gap-2'>
                        <div className='bg-gray-200 w-[10rem] h-[1.4rem]'></div>
                        <div className='bg-gray-200 w-[15rem] h-[1.4rem]'></div>
                    </div>
                    <button className={`p-4 rounded-full bg-gray-200 `}></button>
                </div>
                <div className='bg-gray-200 w-full h-[1.4rem] my-2'></div>
                <div className='flex flex-col gap-1'>
                    <div className='bg-gray-200 h-[0.8rem]'></div>
                    <div className='bg-gray-200 h-[0.8rem]'></div>
                    <div className='bg-gray-200 h-[0.8rem]'></div>
                    <div className='bg-gray-200 h-[0.8rem]'></div>
                    <div className='bg-gray-200 h-[0.8rem]'></div>
                    <div className='bg-gray-200 h-[0.8rem]'></div>
                </div>

                <div className='flex flex-wrap pt-4 justify-between'>
                    <button className={`flex flex-wrap w-[2rem] items-center bg-gray-200 h-[1.4rem] justify-center gap-2`} ></button>
                    <button className={` bg-gray-200 w-[12rem] h-[1.4rem]`}></button>
                </div>
                {
                    < div className='flex justify-between flex-wrap py-2'>
                        <button className={` h-[2rem] bg-gray-200 w-[8rem]`}></button>
                    </div>
                }
                <div>

                    <div className={`bg-gray-200 w-[5rem] h-[1.4rem]`}></div>

                    <form className='bg-gry-200'>
                        <div className='py-2'>
                            <input className={` `} />
                        </div>
                        <div className={`justify-end flex bg-gray-200 h-[2rem] mb-2 flex-wrap gap-4 `}>

                        </div>
                    </form>
                </div>
            </div>
        </div >

    );
}
