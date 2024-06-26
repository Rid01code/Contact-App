import React , {useState , useEffect} from 'react';
import { Link, useLocation } from 'react-router-dom';
import Contact from "../assets/contact.jpg"
import "./Header.css";

const Header = () => {
    const [activeTab , setActiveTab] = useState("Home");
    const location = useLocation();
    useEffect(()=>{
        if(location.pathname === "/")
        {setActiveTab("Home")}
        else if(location.pathname === "/add")
        {setActiveTab("AddContact")}
        else if(location.pathname === "/about")
        {setActiveTab('About')}
    },[location])
    return (
        <div className='Header'>
            <div className='logo'>
                <img src={Contact} className='Contact-App' alt=''/>
                <p>Contact App</p>
            </div>
            <div className='Header-right'>
            <Link to="/">
                <p className={`${activeTab === "Home" ? "active" : ""}`} onClick={()=>setActiveTab("Home")}>
                    Home
                </p>
            </Link>    

            <Link to="/add">
                <p className={`${activeTab === "AddContact" ? "active" : ""}`} onClick={()=>setActiveTab("AddContact")}>
                    Add Contact
                </p>
            </Link> 

            <Link to="/about">
                <p className={`${activeTab === "About" ? "active" : ""}`} onClick={()=>setActiveTab("About")}>
                    About
                </p>
            </Link> 
        </div>
    </div>
  )
}

export default Header