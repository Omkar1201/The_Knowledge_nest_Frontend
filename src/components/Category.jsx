import React, { useContext, useEffect, useState } from 'react'
import CategoryBar from './CategoryBar'
import { AppContext } from '../context/Appcontext'
import Card from './Card'

export default function Category() {
    const { catogry, Allposts } = useContext(AppContext)
    const [categoryposts, setcategoryposts] = useState()
    useEffect(() => {
        const filterposts = Allposts.filter((data) => (data.category === catogry))
        setcategoryposts(filterposts)
    }, [catogry])
    // console.log(categoryposts);
    return (
        <div>
            <CategoryBar />
            <div className='flex flex-wrap justify-between gap-20'>
                {
                    categoryposts&&
                    categoryposts.length > 0 ? (
                        categoryposts.map((data, index) => (
                            <Card data={data} flag={'only'} key={index} />
                        ))
                    ) : 
                    (
                        <div className=' m-auto'>No data</div>
                    )
                }
            </div>
        </div>
    )
}
