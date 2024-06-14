import React, { useState } from 'react'
import { FaRegUser } from "react-icons/fa";
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import { MdOutlineMail } from "react-icons/md";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
export default function Signin() {
    const [eye, seteye] = useState(true)
    const [user, setuser] = useState({ username: "", email: "", password: "" })

    const navigate = useNavigate();
    async function handlesubmit(event) {
        event.preventDefault();
        try {
            const data = await fetch(`${process.env.REACT_APP_BASE_URL}/api/v1/signup`, {
                method: "POST",
                headers: {
                    'Content-Type': "application/json"
                },
                body: JSON.stringify(user) // stringify the object
            });
            const response = await data.json()
            if (response.success) {
                navigate('/signin')
                toast.success(response.message)
            }
            else{
                toast.warn(response.message)
            }
        }
        catch (err) {
            console.log(`Failed to sign up ${err.message}`);
        }
    }
    function handleform(event) {
        setuser({
            ...user,
            [event.target.name]: event.target.value
        })
    }
    return (
        <div className='flex items-center justify-center' >

            <div className='border  flex flex-col items-center duration-[0.5s] transition-all shadow-2xl gap-5 my-[4rem] py-[4.2rem] px-[3rem] rounded-lg'>
                <h2 className='text-xl font-bold'>SIGNUP</h2>
                <form onSubmit={handlesubmit} className=' flex flex-col items-center gap-5 rounded-lg'>

                    <div className='border flex items-center w-fit px-2 py-1 rounded-xl '>
                        <input type='text' required onChange={handleform} name='username' placeholder='Username' className='  outline-none w-[14rem]' />
                        <FaRegUser />
                    </div>
                    <div className='border flex items-center w-fit px-2 py-1 rounded-xl '>
                        <input type='email' required onChange={handleform} name='email' placeholder='Email' className='  outline-none w-[14rem]' />
                        < MdOutlineMail />
                    </div>
                    <div className=' border flex items-center w-fit  px-2 py-1 rounded-xl'>
                        <input type={`${eye ? 'password' : 'text'}`} required onChange={handleform} name='password' placeholder='password' className=' outline-none w-[14rem]' />
                        <div onClick={() => seteye(!eye)} className=' cursor-pointer'>
                            {
                                eye ? <AiOutlineEye /> : <AiOutlineEyeInvisible />
                            }
                        </div>
                    </div>
                    <div className='text-xs justify-between w-full flex'>
                        <div className=''><label className='flex gap-1 appearance-none'><input type='checkbox' className='' />Remember me</label></div>

                    </div>
                    <button className=' w-[16rem] border bg-blue-500 text-white hover:bg-blue-600 font-semibold transition-all duration-[0.4] rounded-2xl px-2 py-1'>
                        Create Account
                    </button>
                        <div className='text-sm'>
                            have a account? <Link to='/signin'><span className='font-semibold hover:underline hover:text-blue-600 cursor-pointer text-blue-500'>Log in</span></Link>
                        </div>
                </form>
            </div>
        </div>
    )
}
