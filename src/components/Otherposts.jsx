import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/Appcontext'
import Card from './Card'

export default function Otherposts() {
    const { Allposts,writtenby } = useContext(AppContext)
    const [otherpost,setotherpost]=useState(Allposts.filter((data)=>data.creater_id === writtenby.id))
    useEffect(() => {
        setotherpost(Allposts.filter((data)=>data.creater_id === writtenby.id))
    }, [Allposts])
    return (
        <div className=' min-h-screen'>
            <div className='text-[1.2rem] text-start my-4 font-bold'>Other Posts of {writtenby.name}</div>
            <div className=' flex flex-wrap justify-evenly'>
                {
                    otherpost&&
                    otherpost.map((data,index)=>(
                        <Card data={data} key={index} flag={'only'}/>
                    ))
                }
            </div>
        </div>
    )
}
