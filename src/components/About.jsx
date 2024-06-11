import React, { useContext } from 'react'
import { AppContext } from '../context/Appcontext'
import { Link } from 'react-router-dom'
import './About.css'
export default function About() {
	const { isloggedin } = useContext(AppContext)
	return (
		<div className=' bg-zinc-100' >
			<div className=" px-2 pt-5 flex flex-col gap-8 text-start about-container min-h-screen">
				{/* <h1>About Website</h1> */}
				<div className=''>
					<p className='text-[1.5rem] font-bold'>Welcome to The Knowledge Nest!</p>
					<p className=''>
						This platform is designed to bring together bloggers from all around the world. Whether you're
						passionate about technology, travel, food, or any other topic, This blog website is the perfect
						place to share your thoughts and ideas.
					</p>
					<p>
						mission is to provide a user-friendly platform where writers can publish their content,
						engage with readers, and connect with a community of like-minded individuals. I believe in the
						power of words and the impact they can have on people’s lives.
					</p>
				</div>
				<div>
					<h2 className='text-[1.5rem] font-bold'>Mission</h2>
					<p>Mission is to empower individuals to share their voices and connect through meaningful content. We strive to foster a supportive environment where diversity and creativity thrive.</p>
				</div>
				<div className=''>
					<div className='text-[1.5rem] font-bold'>
						Features of The Knowledge Nest:
					</div>
					<ul>
						<li>1. User authentication for a secure blogging experience</li>
						<li>2. Image upload to enhance your stories</li>
						<li>3. Commenting system to engage with your readers</li>
						<li>4. Responsive design for an optimal viewing experience on any device</li>
						<li>5. Admin panel for easy content management</li>
					</ul>
				</div>
				<div className='flex flex-col gap-4'>
					<div className=''>
						<div className='text-[1.2rem] font-semibold'>
							Join This community today and start sharing your stories with the world!
						</div>
						Whether you're a seasoned thinker or just beginning your journey of exploration, we invite you to join us on MindStream. Together, let's embark on a journey of discovery, learning, and inspiration. Join our community today and become part of the MindStream movement!
					</div>
					<div className='flex gap-6 btn'>
						<div>
							<Link to='/Home'>
								<button className=' border px-4 w-[10rem] py-1 hover:bg-black hover:text-white border-black	 font-semibold '>Explore</button>
							</Link>
						</div>
						{
							!isloggedin &&
							<button className='border px-4 w-[10rem] py-1 bg-black text-white font-semibold'>
								Register
							</button>
						}
					</div>
				</div>
			</div>

		</div>
	)
}
