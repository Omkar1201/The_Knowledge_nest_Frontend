import { useState, createContext, useEffect } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

export const AppContext = createContext(false);

export default function AppContextProvider({ children }) {
	const [isloggedin, setisloggedin] = useState(false)
	const [token, settoken] = useState(localStorage.getItem('token'))
	const [Allposts, setAllposts] = useState([])
	const [TempAllposts, setTempAllposts] = useState([])
	const [clicked, setclicked] = useState()
	const [isloading, setisloading] = useState(false)
	const [category, setcategory] = useState('')
	const [selectedarticle, setselectedarticle] = useState()
	const [recentpost, setrecentpost] = useState([])
	const [writtenby, setwrittenby] = useState({ id: null, name: null })
    const [isAccountdeleting, setisAccountdeleting] = useState(false)

	const navigate=useNavigate()

	useEffect(() => {
		const data = Allposts.slice(-3).reverse()
		setrecentpost(data)
		setTempAllposts(Allposts)
	}, [Allposts])

	const authenticate = async () => {
		settoken(localStorage.getItem('token'))
		setisloading(true)
		if (!token || token === 'null') {
			console.log({ success: false, message: 'Token not found' })
			setisloggedin(false)
		}

		else {
			const data = await fetch(`${process.env.REACT_APP_BASE_URL}/api/v1/`, {
				method: "GET",
				headers: {
					'Content-Type': "application/json",
					'Authorization': `Bearer ${token}`
				},
			})
			const responsedata = await data.json()
			if (responsedata.success) {
				setisloggedin(true)
			}
			else {
				logout()
			}
		}
		setisloading(false)
	}
	// console.log(mydata);
	const replacepost = (newPost) => {
		setTempAllposts((prevPosts) =>
			prevPosts.map((post) =>
				post._id === newPost._id ? newPost : post
			))
		setAllposts((prevPosts) =>
			prevPosts.map((post) =>
				post._id === newPost._id ? newPost : post
			)
		);
	};
	const getposts = async () => {
		setisloading(true)
		try {

			const data = await fetch(`${process.env.REACT_APP_BASE_URL}/api/v1/home`, {
				method: "GET",
				headers: {
					'Content-Type': "application/json",
				},
			})
			let response = await data.json();
			// console.log(response.Allpost);

			if (response.success) {
				setTempAllposts(response.Allpost)
				setAllposts(response.Allpost)
			}
			else {
				if (response.message === 'connect ETIMEDOUT 13.127.238.52:27017' || response.message === 'Operation `posts.find()` buffering timed out after 10000ms') {

					toast.warn('Check your internet connection0')
				}
				else {
					toast.warn(response.message)
				}
			}
		}
		catch (error) {
			if (error instanceof TypeError && error.message === 'Failed to fetch') {
				toast.error("Check your internet connection.");
			} else {
				toast.error("An error occurred while sending the message.");
			}
		}
		setisloading(false)
	}

	useEffect(() => {
		const authenticate0 = async () => {
			const token = localStorage.getItem('token')
			setisloading(true)
			if (!token || token === 'null') {
				console.log({ success: false, message: 'Token not found' })
				setisloggedin(false)
			}

			else {
				const data = await fetch(`${process.env.REACT_APP_BASE_URL}/api/v1/`, {
					method: "GET",
					headers: {
						'Content-Type': "application/json",
						'Authorization': `Bearer ${token}`
					},
				})
				const responsedata = await data.json()
				if (responsedata.success) {
					setisloggedin(true)
				}
				else {
					logout0()
				}
			}
			setisloading(false)
		}
		const getposts0 = async () => {
			setisloading(true)
			try {

				const data = await fetch(`${process.env.REACT_APP_BASE_URL}/api/v1/home`, {
					method: "GET",
					headers: {
						'Content-Type': "application/json",
					},
				})
				let response = await data.json();

				if (response.success) {
					setTempAllposts(response.Allpost)
					setAllposts(response.Allpost)
				}
				else {
					if (response.message === 'connect ETIMEDOUT 13.127.238.52:27017' || response.message === 'Operation `posts.find()` buffering timed out after 10000ms') {

						toast.warn('Check your internet connection')
						return
					}
					toast.warn(response.message)
				}
			}
			catch (error) {
				if (error instanceof TypeError && error.message === 'Failed to fetch') {
					toast.error("Check your internet connection.");
				} else {
					toast.error("An error occurred while sending the message.");
				}
			}
			setisloading(false)
		}
		function logout0() {
			localStorage.removeItem('token');
			localStorage.removeItem('email');
			localStorage.removeItem('username');
			localStorage.removeItem('user_id');
			setisloggedin(false);
			getposts();
		}

		authenticate0()
		getposts0()
	}, [])

	function logout() {
		localStorage.removeItem('token');
		localStorage.removeItem('email');
		localStorage.removeItem('username');
		localStorage.removeItem('user_id');
		navigate('/Home')
		setisloggedin(false);
		getposts();
	}

	const contextValue = {
		isloggedin, setisloggedin,
		token, settoken,
		authenticate,
		Allposts, setAllposts,
		getposts,
		logout,
		clicked, setclicked,
		isloading, setisloading,
		category, setcategory,
		selectedarticle, setselectedarticle,
		TempAllposts, setTempAllposts,
		replacepost,
		recentpost,
		writtenby, setwrittenby,
		isAccountdeleting, setisAccountdeleting
	}
	return (
		<AppContext.Provider value={contextValue}>
			{children}
		</AppContext.Provider>
	);

}
