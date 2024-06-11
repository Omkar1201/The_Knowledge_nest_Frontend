import React from 'react';
// import errorimg from "../images/404-error-page.png"
import errorimg2 from "../images/404_page-removebg-preview.png"
// import errorimg3 from "../images/404 page.jpg"
import { Link } from 'react-router-dom';
function Pagenotfound() {
  return (
    <div className='flex flex-col min-h-screen my-5 justify-center items-center'>
      <div className=' text-[2rem] font-bold text-red-500'>Sorry, Page not found!</div>

      <div className=' flex flex-col items-center mt-4 '>
        <Link to='/Home'>
          <div className=' shadow-xl cursor-pointer top-8 left-[38%] font-semibold w-[10rem] py-1 rounded-lg bg-red-500 hover:bg-red-600 text-white'>
            Go to Homepage
          </div>
        </Link>
        <img src={errorimg2} alt='Page not found' className='' />
      </div>

    </div>
  );
}

export default Pagenotfound;
