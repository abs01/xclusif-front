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

function App() {
  const [account, setAccount] = useState({}); // Estado para guardar los datos de la cuenta

  return (
   <Router>
      <Routes>
        <Route path="/" element={<Home account={account}/>} />
        <Route path="/account" element={<Account />} />
        <Route path="/login" element={<Login setAccount={setAccount} />} />
        <Route path="/register" element={<Register setAccount={setAccount} />} />
        <Route path="/FAQ" element={<FAQ />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/post/:id" element={<SinglePost />} />

        <Route path="*" element={<Home account={account} />} />
      </Routes>
    </Router>
  )
}

export default App
