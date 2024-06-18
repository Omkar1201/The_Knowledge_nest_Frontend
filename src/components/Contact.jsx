import React, { useRef, useState } from 'react'
import { FaPhoneAlt, FaRegUser } from "react-icons/fa";
import { MdOutlineMailOutline } from "react-icons/md";
import { FaGithub, FaInstagram } from "react-icons/fa6";
import { AiOutlineLinkedin } from "react-icons/ai";
import { SiLeetcode } from "react-icons/si";
import emailjs from '@emailjs/browser';
import { toast } from 'react-toastify';
import Loading2 from './Loading2';
import { MdContentCopy } from "react-icons/md";
import './Contact.css'
export default function Contact() {
	const [btnloading, setbtnloading] = useState(false)
	const [showmessage, setshowmessage] = useState(false);
	const form = useRef();
	const sendEmail = async (e) => {
		e.preventDefault();
		setbtnloading(true);
		try {
			const response = await emailjs.sendForm('service_gzekkn8', 'template_37n2uud', form.current, 'CVdtUjVEQyXrY-VKW')
			toast.success("Message sent successfully!")
			console.log(response);
			form.current.reset();
		}
		catch (error) {
			if (error instanceof TypeError && error.message === 'Failed to fetch') {
				toast.error("Check your internet connection.");
			} else {
				toast.error("An error occurred while sending the message.");
			}
		}
		setbtnloading(false);

	}
	const phoneNumber = '9975359761'
	const handleIconClick = () => {
		navigator.clipboard.writeText(phoneNumber)
			.then(() => {
				setshowmessage(true)
				setTimeout(() => {
					setshowmessage(false)
				}, 2000)
			})
			.catch(err => {
				toast.error('Failed to copy phone number: ');
			});
	};
	return (
		<div className=' bg-black py-4 flex-wrap min-h-screen items-center justify-center'>
			<div className='text-center text-[2rem] font-serif text-white'>Get in touch</div>
			<div className='flex flex-wrap twodivs justify-center'>
				<form className={`bg-gray-100 left-10 w-[32rem] p-4 border-black `} ref={form} onSubmit={sendEmail} id='contactform'>
					<div className='flex flex-wrap '>
						<label className='w-full'>
							<div className='text-start'>
								Name
							</div>
							<input type='text' placeholder='Name' name='name' className='border border-gray-200 flex flex-wrap h-10 px-2 w-full rounded-md outline-none' disabled={btnloading} required />
						</label>
					</div>
					<div className='py-2 flex flex-wrap'>
						<label className='w-full items-start'>
							<div className='text-start'>
								Email
							</div>
							<input type='text' placeholder='abc@gmail.com' name='email' className='border h-10 px-2 rounded-md w-full outline-none' disabled={btnloading} required />
						</label>
					</div>
					<div className='flex flex-wrap'>
						<label className=' w-full'>
							<div className='text-start'>
								Message
							</div>
							<textarea type='text' rows={8} placeholder='Type Message here...' name='message' className='border px-2 w-full outline-none' disabled={btnloading} required />
						</label>
					</div>
					<div className='relative'>
						<button className={`border ${btnloading ? 'opacity-30' : ''} my-4 px-6 text-[1.2rem] font-semibold text-white bg-black py-1`} disabled={btnloading}>
							Send message
						</button>
						{
							btnloading &&
							<div className='absolute top-[40%] left-[47.5%]'>
								<Loading2 />
							</div>
						}
					</div>
				</form>
				<div className='  bg-gray-100 right-10 w-[32rem] p-4 border-black'>
					<div className='text-[1.4rem] font-serif font-semibold'>
						Contact Details
					</div>
					<div className='flex gap-5 items-start my-4'>
						<span className='bg-black p-2 text-white border rounded-full'>
							<FaRegUser />
						</span>
						<span className=' flex flex-col items-start'>
							<div className=' font-semibold'>
								Name
							</div>
							<div className=''>
								Omkar Salunkhe
							</div>
						</span>
					</div>
					<a className='flex gap-5 group items-start my-4' href={`mailto:omkarsalunkhe3597@gmail.com`} title='Click to send email'>
						<span className='bg-black group-hover:bg-gray-700 p-2 text-white border rounded-full'>
							<MdOutlineMailOutline />
						</span>
						<span className=' flex flex-col items-start'>
							<div className=' font-semibold'>
								Email
							</div>
							<div className=''>
								omkarsalunkhe3597@gmail.com
							</div>
						</span>
					</a>
					<div className='flex relative gap-5 group items-start my-4 cursor-pointer' title='Click to copy mobile no.' onClick={handleIconClick}>
						<span className='bg-black p-2 text-white group-hover:bg-gray-700 border rounded-full'>
							<FaPhoneAlt />
						</span>
						<span className=' flex flex-col'>
							<div className=' font-semibold'>
								Mobile no.
							</div>
							<div className=''>
								9975359761
							</div>
						</span>
						<div className={`bg-black shadow-2xl text-white px-2 absolute py-1 top-[0.6rem] rounded-md left-[10rem] items-center gap-1 ${showmessage ? 'flex' : 'hidden'}`}><MdContentCopy/>Copied!</div>
					</div>
					<div>
						<div className='text-[1.2rem] font-bold font-serif'>
							Socials
						</div>
						<div className='flex justify-evenly text-[1.5rem]'>
							<button className=' p-1 hover:bg-gray-200'>
								<a href='https://leetcode.com/omkarsalunkhe3597/' target='_blank' rel='noreferrer' title='Leetcode'>
									<SiLeetcode />
								</a>
							</button>
							<button className=' p-1 hover:bg-gray-200'>
								<a href='https://github.com/Omkar1201' target='_blank' rel='noreferrer' title='Github'>
									<FaGithub />
								</a>
							</button>
							<button className=' p-1 hover:bg-gray-200'>
								<a href='https://www.linkedin.com/in/omkar-salunkhe-28784b214/' target='_blank' rel='noreferrer' title='Linkedin'>
									<AiOutlineLinkedin />
								</a>
							</button>
							<button className=' p-1 hover:bg-gray-200' title='Instagram'>
								<a href='https://www.instagram.com/omkar_salunkhe12/' target='_blank' rel='noreferrer'>
									<FaInstagram />
								</a>
							</button>
						</div>
					</div>
				</div>
			</div>
		</div >
	)
}
