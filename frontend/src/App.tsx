import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Signup } from './pages/Signup'
import { Signin } from './pages/Signin'
import { Blog } from './pages/Blog'
import { Blogs } from './pages/Blogs'
import { Publish } from './pages/Publish'
import { Home } from './pages/Home'
import { About } from './pages/About'


import './App.css'
import { Welcome } from './pages/Welcome'
import { Contactme } from './pages/Contactme'

function App() {
  

  return (
    <>

    <BrowserRouter>
    <Routes>
      <Route path='/'         element={<Welcome/>}/>
      <Route path='/home'     element={<Home/>}/>
      <Route path='/signup'   element={<Signup/>}/>
      <Route path='/signin'   element={<Signin/>}/>
      <Route path='/blog/:id' element={<Blog/>}/>
      <Route path='/blogs'    element={<Blogs/>}/>
      <Route path='/publish'  element={<Publish/>}/>
      <Route path='/about'    element={<About/>}/>
      <Route path='/contactme' element={<Contactme/>}/>
      

    </Routes>
    </BrowserRouter>
      
    </>
  )
}

export default App
