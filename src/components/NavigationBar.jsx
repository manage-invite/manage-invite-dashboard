import React from 'react';
import { Link } from 'react-router-dom';
import './NavigationBar.css';

const NavigationBar = () => (
    <nav>
        <input id="nav-toggle" type="checkbox" />
        <div className="logo">
            <img className="img" src={`${process.env.PUBLIC_URL}/assets/logo.png`} alt="Logo" height="40px" />
            <Link to="/">ManageInvite</Link>
        </div>
        <ul className="links">
            <li><Link to="/status">Status</Link></li>
            <li><Link to="/docs">Documentation</Link></li>
            <li><Link to="/support">Support server</Link></li>
            <li>
                <Link
                    to="/login"
                    className="login-button"
                >
                    Login using Discord
                </Link>

            </li>
        </ul>
        <label className="icon-burger" htmlFor="nav-toggle">
            <div className="line" />
            <div className="line" />
            <div className="line" />
        </label>
    </nav>
);

export default NavigationBar;
