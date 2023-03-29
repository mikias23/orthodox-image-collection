import {BrowserRouter as Router , Routes, Route} from 'react-router-dom'
import React, { Component }  from 'react';
 import Signup from './pages/signup'
import Login from './pages/login'
import Home from './pages/home'
import Upload from './pages/upload'

import Header from './components/header'
function App() {
  return (
    <>
       <Router>
        <div className="container"> 
        <Header />
           <Routes>
            <Route  path='/' element={<Home/>} />
            <Route  path='/login' element={<Login/>} />
            <Route  path='/signup' element={<Signup/>} />
            <Route  path='/upload' element={<Upload/>} />
           </Routes>
        </div>
        </Router>
    </>
  );
}

export default App;
