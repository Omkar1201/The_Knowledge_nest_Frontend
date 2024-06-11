import React from 'react'
import { Link } from 'react-router-dom'
import { RiErrorWarningLine } from "react-icons/ri";
export default function PleaseLogin() {
	return (
		<div className='flex justify-center items-center bg-gray-100 min-h-[80vh]' title='Cilck to login'>
			<div className='border-2 justify-evenly w-[20rem] h-[10rem] flex items-center flex-col shadow-xl'>
				<div className='text-[2.5rem] text-red-500'>
					<RiErrorWarningLine />
				</div>
				<div className='font-bold text-[1.2rem]'>
					Access Failed
				</div>
				<Link to='/Signin'>
					<div className='hover:underline '>
						Please Login to see this page
					</div>
					{/* <button className='bg-blue-500 px-2 py-1'>OK</button> */}
				</Link>
			</div>
		</div>
	)
}
