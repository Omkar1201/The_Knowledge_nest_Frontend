import React from 'react'
import TopSkeleton from './TopSkeleton';
import CardSkeleton from './CardSkeleton';

export default function LoadingSkeleton() {
    const arr = [1, 2, 3];
    const arr2 = [1, 2, 3, 4, 5, 6];
    return (
        <div>
            <div>
                <div className='text-start text-[1.5rem] font-serif font-bold'>
                    Top picks
                </div>
                <div>
                    {
                        arr.map((data, index) => (
                            <TopSkeleton key={index} />
                        ))
                    }
                </div>
            </div>
            <div className='border mx-2 mb-5'></div>

            <div className='text-start text-[1.5rem] font-bold font-serif'>
                All Articles
            </div>
            <div className='flex flex-wrap gap-12 justify-center'>
                {
                    arr2.map((data, index) => (
                        <CardSkeleton key={index} />
                    ))
                }
            </div>
        </div>
    )
}
