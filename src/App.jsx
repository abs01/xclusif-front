import { useState } from 'react'
import Register from './components/Register';
import FAQ from './components/FAQ';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Account from './components/Account';
import Contact from './components/Contact';
import Home from './components/Home';
import Login from './components/Login';
import SinglePost  from './components/SinglePost';
import CreatePost from './components/CreatePost';
function App() {

  return (
   <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/account" element={<Account />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/FAQ" element={<FAQ />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/post/:id" element={<SinglePost />} />
        <Route path="/create-post" element={<CreatePost />} />
        <Route path="*" element={<Home  />} />
      </Routes>
    </Router>
  )
}

export default App
