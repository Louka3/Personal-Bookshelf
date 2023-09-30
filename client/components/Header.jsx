import React, {useState} from "react";
import Navbar from "./Navbar.jsx";

const Header = (props) => {
    return (
        <header className="app-header">
            <Navbar username={props.username} setUsername={props.setUsername}/> 
        </header>
    )
}

export default Header;