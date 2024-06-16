import './App.css';
import Navbar from './components/Navbar';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navigation from './components/Navigation';
import Signin from './components/Signin';
import About from './components/About';
import Contact from './components/Contact';
import Home from './components/Home';
import Signup from './components/Signup'
import Profile from './components/Profile';
import Post from './components/Post';
import ReadFullBlog from './components/ReadFullBlog';
import Category from './components/Category';
import Pagenotfound from './components/Pagenotfound';
import Savedposts from './components/Savedposts';
import Footer from './components/Footer';
import Otherposts from './components/Otherposts';
import Demo from './components/Demo';
function App() {
  const location = useLocation()
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path='/' element={<Navigation />}></Route>
        <Route path='/home' element={<Home />}></Route>
        <Route path='/Signin' element={<Signin />}></Route>
        <Route path='/About' element={<About />}></Route>
        <Route path='/Contact' element={<Contact />}></Route>
        <Route path='/Signup' element={<Signup />}></Route>
        <Route path='/profile/myblogs' element={<Profile />}></Route>
        <Route path='/createpost' element={<Post />}></Route>
        <Route path='/readblog' element={<ReadFullBlog />}></Route>
        <Route path='/category' element={<Category />}></Route>
        <Route path='/savedposts' element={<Savedposts />}></Route>
        <Route path='/otherposts' element={<Otherposts/>}></Route>
        <Route path='/demo' element={<Demo/>}></Route>
        <Route path='/*' element={<Pagenotfound />}></Route>
      </Routes>

      {
        location.pathname !== '/Contact' ? (
          <Footer />
        ) : (
          <div>
            
          </div>
        )
      }
    </div>
  );
}

export default App;
