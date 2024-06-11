import React, { useContext } from 'react'
import { FaFacebook, FaTwitter, FaGithub, FaInstagram, FaLinkedin } from 'react-icons/fa';
import logo from '../images/logo.png'
import { SiLeetcode } from "react-icons/si";
import { AppContext } from '../context/Appcontext';

export default function Footer() {
    const { recentpost } = useContext(AppContext)
    return (
        <footer className="bg-black text-white py-10 mt-4">
            <div className="container mx-auto px-4">
                <div className="flex flex-wrap justify-between">

                    <div className="w-full md:w-1/3 mb-8 md:mb-0">
                        <h2 className="text-2xl font-bold mb-4">The Knowledge Nest</h2>
                        <p className="text-gray-400">Platform to share thoughts on web development, programming, technology and Beyond.</p>
                    </div>

                    {/* Recent Posts */}
                    <div className="w-full md:w-1/3 mb-8 md:mb-0">
                        <h2 className="text-xl font-bold mb-4">Recent Posts</h2>
                        <ul className="list-none">
                            {
                                recentpost &&
                                recentpost.map((data, index) => (
                                    <div key={index}>
                                        <li className="mb-2">
                                            <a href="#" className="text-gray-400 hover:text-white">{index+1}. {data.title}</a>
                                        </li>
                                    </div>
                                ))
                            }
                        </ul>
                    </div>

                    {/* Contact Info and Social Media Links */}
                    <div className="w-full md:w-1/3">
                        <h2 className="text-xl font-bold mb-4">Contact</h2>
                        <p className="text-gray-400 flex justify-center flex-wrap mb-2">Email: <a href="mailto:omkarsalunkhe3597@gmail.com" className="text-gray-400 hover:text-white hover:underline">omkarsalunkhe3597@gmail.com</a></p>
                        <p className="text-gray-400 mb-2">Phone: <a href="tel:+919975359761" className="text-gray-400 hover:text-white">+91 9975359761</a></p>
                        <div className="flex space-x-4 flex-wrap gap-2 mt-4 justify-center">
                            <a href='https://leetcode.com/omkarsalunkhe3597/' target='_blank' className="text-gray-400 hover:text-white">
                                <SiLeetcode size={24} />
                            </a>
                            <a href='https://github.com/Omkar1201' target='_blank' className="text-gray-400 hover:text-white">
                                <FaGithub size={24} />
                            </a>
                            <a href='https://www.linkedin.com/in/omkar-salunkhe-28784b214/' target='_blank' className="text-gray-400 hover:text-white">
                                <FaLinkedin size={24} />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-white">
                                <FaTwitter size={24} />
                            </a>
                            <a href='https://www.instagram.com/omkar_salunkhe12/' target='_blank' className="text-gray-400 hover:text-white">
                                <FaInstagram size={24} />
                            </a>
                        </div>
                    </div>

                </div>

                {/* Footer Bottom */}
                <div className="text-center text-gray-400 mt-10">
                    <p>&copy; 2024 The Knowledge Nest. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}
