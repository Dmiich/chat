import React from 'react';
import { Link } from "react-router-dom";

export const NavBar = ({ logout }) => {

    return (
        <div>
            <nav className="topnav">
                <Link to="/chat">CHAT</Link>
                <Link to="/users">USERS</Link>
                <Link className="logOut" onClick={logout}>LOG OUT</Link>
            </nav>
        </div>
    )
}