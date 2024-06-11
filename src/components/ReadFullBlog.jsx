import React, { useContext, useEffect } from 'react'
import { AppContext } from '../context/Appcontext'
import { useNavigate } from 'react-router-dom';
import Card from './Card';
import Footer from './Footer';
export default function ReadFullBlog() {
  const { selectedarticle } = useContext(AppContext)
  const navigate = useNavigate();
  useEffect(() => {
    if (!selectedarticle) {
      navigate('/Home')
    }
  }, [])
  return (
    <div>
      {
        selectedarticle &&
        <Card data={selectedarticle} flag={'full'} />
      }
    </div>
  )
}
