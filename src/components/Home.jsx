import React, { useContext } from 'react'
import { AppContext } from '../context/Appcontext'
import Card from './Card'
import Loading from './Loading'
import Top from './Top'

export default function Home() {
	const { isloading, TempAllposts } = useContext(AppContext)
	// const gettest = async () => {
	// 	try {
	// 		const token = localStorage.getItem('token')
	// 		const data = await fetch('${process.env.REACT_APP_BASE_URL}/api/v1/test', {
	// 			method: "GET",
	// 			headers: {
	// 				'Content-Type': "application/json",
	// 				'Authorization': `Bearer ${token}`
	// 			},
	// 		})
	// 		const response = await data.json();
	// 		console.log(response);
	// 	}
	// 	catch (err) {
	// 		console.log('Error');
	// 	}

	// }

	// const getCategoryPosts = async (category) => {
	// 	const token = localStorage.getItem('token')
	// 	if (!token || token === 'null') {
	// 		toast.warn('Please Log in')
	// 		return;
	// 	}
	// 	setisloading(true)
	// 	const data = await fetch('${process.env.REACT_APP_BASE_URL}/api/v1/category', {
	// 		method: "POST",
	// 		headers: {
	// 			'Content-Type': "application/json",
	// 			'Authorization': `Bearer ${token}`
	// 		},
	// 		body: JSON.stringify({ category })
	// 	})
	// 	const responsedata = await data.json();
	// 	if (responsedata.success) {
	// 		setAllposts(responsedata.response)
	// 	}
	// 	else {
	// 		// logout()
	// 		toast.warn(responsedata.message)
	// 	}
	// 	setisloading(false)
	// 	console.log(responsedata.response);
	// }
	return (
		<div className='mt-2'>

			{
				isloading ? <Loading /> : (
					<>
						{/* <CategoryBar/> */}
						
						<Top />
						<div className='text-start text-[1.5rem] font-bold font-serif'>
							All Articles
						</div>
						<div className='flex flex-wrap gap-12 justify-center'>
							{
								TempAllposts.map((dat, index) => (
									<Card data={dat} flag={'only'} key={index} />
								))
							}
						</div>
					</>
				)
			}
		</div>
	)
}
