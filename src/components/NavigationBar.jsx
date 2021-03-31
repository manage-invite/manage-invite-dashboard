import React from 'react';
import './NavigationBar.css';

const NavigationBar = () => (
    <nav>
        <input id="nav-toggle" type="checkbox" />
        <div className="logo">
            <img className="img" src={`${process.env.PUBLIC_URL}/assets/logo.png`} alt="Logo" height="40px" />
            ManageInvite
        </div>
        <ul className="links">
            <li><a href="#home">Home</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#work">Work</a></li>
            <li><a href="#projects">Projects</a></li>
            <li><a href="#contact">Contact</a></li>
        </ul>
        <label className="icon-burger" htmlFor="nav-toggle">
            <div className="line" />
            <div className="line" />
            <div className="line" />
        </label>
    </nav>
);

export default NavigationBar;
