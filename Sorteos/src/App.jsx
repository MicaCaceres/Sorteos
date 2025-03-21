import { useState } from 'react'
import NavBar from './components/navbar/NavBar'
import Home from './components/home/Home'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Footer from './components/Footer';   

function App() {
 return (
     <>
     <Router>
        <NavBar/>
        <Routes>
            <Route path="/" element={<Home/>}/>
        </Routes>
        <Footer/>
     </Router>
     </>
 )
}

export default App
