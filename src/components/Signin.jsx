import React, { useContext, useState } from 'react'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { MdOutlineMail } from "react-icons/md";
import { AppContext } from '../context/Appcontext';
import Loading2 from './Loading2';
export default function Signin() {
	const [eye, seteye] = useState(true)
	const [user, setuser] = useState({ username: "", password: "" })
	const {  setisloggedin, getposts } = useContext(AppContext)
	const [btnloading, setbtnloading] = useState(false)
	const navigate = useNavigate();
	async function handlesubmit(event) {
		event.preventDefault();
		setbtnloading(true)
		try {
			const response = await fetch(`https://the-knowledge-nest-server.onrender.com/api/v1/signin`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(user)
			})

			const responsedata = await response.json()

			if (responsedata.success) {
				setisloggedin(true)
				getposts()
				localStorage.setItem('token', responsedata.token)
				localStorage.setItem('user_id', responsedata.user_id)
				localStorage.setItem('username', responsedata.username)
				toast.success(responsedata.message)
				navigate('/Home')
			}
			else {
				toast.warn(responsedata.message)
				console.log(responsedata.message);
			}
		}
		catch (err) {
			toast.warn('Error in login, Try after some time')
			console.log(err.message);
		}
		setbtnloading(false)
	}
	function handleform(event) {
		setuser({
			...user,
			[event.target.name]: event.target.value
		})
	}
	return (
		<div className='flex items-center justify-center' >

			<div className='border-2 flex flex-col items-center duration-[0.5s] transition-all shadow-2xl gap-5 my-[5rem] py-[4.2rem] px-[3rem] rounded-lg'>
				<h2 className='text-xl font-bold'>LOGIN</h2>
				<form onSubmit={handlesubmit} className=' flex flex-col items-center gap-5 rounded-lg'>

					<div className='border flex items-center w-fit px-2 py-1 rounded-lg '>
						<input type='email' disabled={btnloading} required onChange={handleform} name='email' placeholder='Email' className='  outline-none w-[14rem]' />
						<MdOutlineMail />
					</div>
					<div className=' border flex items-center w-fit  px-2 py-1 rounded-lg'>
						<input type={`${eye ? 'password' : 'text'}`} disabled={btnloading} required onChange={handleform} name='password' placeholder='password' className=' outline-none w-[14rem]' />
						<div onClick={() => seteye(!eye)} className=' cursor-pointer'>
							{
								eye ? <AiOutlineEye /> : <AiOutlineEyeInvisible />
							}
						</div>
					</div>
					<div className='text-xs justify-between w-full flex'>
						<div className=''><label className='flex gap-1 appearance-none'><input type='checkbox' className='' />Remember me</label></div>
						<div className='cursor-pointer text-blue-900'>Forgot Password?</div>

					</div>
					<div className='relative'>
						<button className={`border ${btnloading ? 'opacity-30' : ''} w-[16rem] border bg-blue-500 text-white hover:bg-blue-600 font-semibold transition-all duration-[0.4] rounded-2xl px-2 py-1`} disabled={btnloading}>
							LogIn
						</button>
						{
							btnloading &&
							<div className='absolute top-2 left-[47.5%]'>
								<Loading2 />
							</div>
						}
					</div>
					{/* <button className=' w-[16rem] border bg-blue-500 text-white hover:bg-blue-600 font-semibold transition-all duration-[0.4] rounded-2xl px-2 py-1'>
						LogIn
					</button> */}
				</form>
				<div className='text-sm' disabled={btnloading}>
					Don't have an account? <Link to='/Signup'><span className='font-semibold hover:underline hover:text-blue-600 cursor-pointer text-blue-500'>Create Account</span></Link>
				</div>

			</div>
		</div>
	)
}
