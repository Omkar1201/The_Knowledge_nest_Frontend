import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AppContext } from '../context/Appcontext'
import './Navigation.css'
export default function Navigation() {
    const { isloggedin } = useContext(AppContext)
    return (
        <div className='navi h-screen gap-10 flex flex-col justify-center'>
            <div className='text-[3rem] font-semibold text-center'>Join the Conversation in Engineering</div>
            <div className='flex justify-evenly '>
                <div>
                    <Link to='/Home'>
                        <button className=' text-[1.2rem] font-semibold border rounded-xl hover:bg-black border-black w-[12rem] hover:text-white py-2'>Start Reading</button>
                    </Link>
                </div>
                {
                    !isloggedin &&
                    <div>
                        <Link to='/Signin'>
                            <button className='text-[1.2rem] hover:shadow-xl active:bg-slate-950 active:text-white font-semibold border rounded-xl hover:bg-transparent hover:text-black bg-black text-white w-[12rem] border-black py-2'>Sing in</button>
                        </Link>
                    </div>
                }
            </div>
        </div>
    )
}
