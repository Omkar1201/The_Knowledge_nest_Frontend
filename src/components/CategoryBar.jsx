import React, { useContext, useState } from 'react'
import { AppContext } from '../context/Appcontext'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router'
import { IoIosMusicalNotes } from "react-icons/io";
import { MdOutlineTravelExplore } from "react-icons/md";
import { GiFoodTruck } from "react-icons/gi";
import { GiTakeMyMoney } from "react-icons/gi";
import { MdAddAPhoto } from "react-icons/md";
import { FaBook } from "react-icons/fa";
import { MdPlace } from "react-icons/md";
import { useLocation } from 'react-router';
import { GiFarmTractor } from "react-icons/gi";
import './CategoryBar.css'
export default function CategoryBar() {
	const navigate = useNavigate()

	const { logout, Allposts, setAllposts, isloading, setisloading, catogry, setcategory } = useContext(AppContext)
	const location = useLocation()
	return (
		<div>
			<div className=' my-[1.5rem]'>
				<div className='flex px-2 justify-between  w-full'>
					<div onClick={() => { setcategory('music'); if (location.pathname != '/category') { navigate('/category') } }} className={`${catogry === 'music' ? 'opacity-100 ' : 'opacity-75 '}  flex group justify-center duration-[0.1s] items-center flex-col cursor-pointer`} >
						<IoIosMusicalNotes />
						<span className='text-sm'>
							Music
						</span>
						{/* <div className="line" style={{ transform: `scaleX(${isVisible ? 1 : 0})` }}></div> */}
						<div className={`${catogry == 'music' ? ' border-black' : ' border-transparent group-hover:border-gray-200 '} border w-full`}></div>
					</div>
					<div onClick={() => { setcategory('travel'); if (location.pathname != '/category') { navigate('/category') } }} className={`${catogry === 'travel' ? 'opacity-100' : 'opacity-75'} flex justify-center items-center flex-col cursor-pointer`}  >
						<MdOutlineTravelExplore />
						<span className='text-sm'>
							Travel
						</span>
						<div className={`${catogry == 'travel' ? ' border-black' : ' border-transparent'} border w-full`}></div>
					</div>
					<div onClick={() => { setcategory('food'); navigate('/category') }} className={`${catogry === 'food' ? 'opacity-100' : 'opacity-75 '} flex justify-center items-center flex-col cursor-pointer`}  >
						<GiFoodTruck />
						<span className='text-sm'>
							Food
						</span>
						<div className={`${catogry == 'food' ? ' border-black' : ' border-transparent'} border w-full`}></div>
					</div>
					<div onClick={() => { setcategory('finance'); navigate('/category') }} className={`${catogry === 'finance' ? 'opacity-100' : 'opacity-75 '} flex justify-center items-center flex-col cursor-pointer`}  >
						<GiTakeMyMoney />
						<span className='text-sm'>
							Finance
						</span>
						<div className={`${catogry == 'finance' ? ' border-black' : ' border-transparent'} border w-full`}></div>
					</div>
					<div onClick={() => { setcategory('agriculture'); navigate('/category') }} className={`${catogry === 'agriculture' ? 'opacity-100' : 'opacity-75 '} flex justify-center items-center flex-col cursor-pointer`}  >
						<GiFarmTractor />
						<span className='text-sm'>
							Agriculture
						</span>
						<div className={`${catogry == 'agriculture' ? ' border-black' : ' border-transparent'} border w-full`}></div>
					</div>
					<div onClick={() => { setcategory('book'); navigate('/category') }} className={`${catogry === 'book' ? 'opacity-100' : 'opacity-75 '} flex justify-center items-center flex-col cursor-pointer`}  >
						<FaBook />
						<span className='text-sm'>
							Book
						</span>
						<div className={`${catogry == 'book' ? ' border-black' : ' border-transparent'} border w-full`}></div>

					</div>
					<div onClick={() => { setcategory('place'); navigate('/category') }} className={`${catogry === 'place' ? 'opacity-100' : 'opacity-75 '} flex justify-center items-center flex-col cursor-pointer`} >
						<MdPlace />
						<span className='text-sm'>
							Place
						</span>
						<div className={`${catogry == 'place' ? ' border-black' : ' border-transparent'} border w-full`}></div>
					</div>
				</div>
			</div>
		</div>
	)
}
