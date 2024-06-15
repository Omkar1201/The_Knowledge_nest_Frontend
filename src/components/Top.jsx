import React, { useContext} from 'react'
import { AppContext } from '../context/Appcontext'
import { useNavigate } from 'react-router';
import './Top.css'
export default function Top() {
    const { Allposts, setselectedarticle } = useContext(AppContext)
    const navigate = useNavigate()
    const sortedItems = [...Allposts].sort((a, b) => b.likes.length - a.likes.length);
    return (
        <div className=''>
            <div className='text-start text-[1.5rem] font-serif font-bold'>
                Top picks
            </div>
            {
                sortedItems.slice(0, 3).map((data, index) => (

                    <div key={index} className=''>
                        {
                            <div className='flex applyflexwrap my-4 px-2'>
                                <div className=' flex justify-center flex-wrap items-center'><img src={data.image} alt='preview' className='min-w-[24rem] imgw h-[14rem] p-[0.1rem]' /></div>
                                <div className=' flex flex-col justify-between'>
                                    <div className='text-start text-[1.1rem] font-bold'>Title: {data.title}</div>
                                    <div className='text-start'>{data.body.slice(0, 280)} <span className='mx-1 cursor-pointer' onClick={() => { setselectedarticle(data); navigate('/readblog') }}>{(data.body.length > 280) ? '...' : ('')}</span></div>
                                    <div className='my-2 flex justify-between items-end'>
                                        <div className=''>
                                            <div className='text-start text-[0.9rem] font-bold'>Category: {data.category}</div>
                                            <div className='text-start text-[0.8rem]'>Created at: {new Date(data.created_at).toLocaleDateString('en-US', {
                                                weekday: 'long',
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric'
                                            }).replace(/,/g, '')}</div>
                                        </div>
                                        <div className='font-semibold text-end text-[0.9rem]'>Written by: {data.username}</div>
                                    </div>

                                    < div className='flex py-2 '>
                                        <button onClick={() => { setselectedarticle(data); navigate('/readblog') }} className='border active:bg-slate-700 px-4 border-black font-semibold bg-black text-white py-1'>Read More</button>
                                    </div>

                                </div>
                            </div>
                        }
                    </div>
                ))
            }
            <div className='border border-black mx-2 mb-5'></div>
        </div>
    )
}
