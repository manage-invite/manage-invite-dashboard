import { useStoreActions, useStoreState } from 'easy-peasy';
import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import './NavigationBar.css';
import LoadingAnimation from './LoadingAnimation';
import { socket, ensureSocketConnected } from '../socket';

const NavigationBar = () => {
    const currentUser = useStoreState((state) => state.currentUser);
    const updateCurrentUser = useStoreActions((actions) => actions.updateCurrentUser);
    const updateUserGuildsCache = useStoreActions((actions) => actions.updateUserGuildsCache);
    const [loginLoading, setLoginLoading] = useState(false);
    const history = useHistory();

    const login = () => {
        const clientID = process.env.REACT_APP_CLIENT_ID;
        const redirectURI = process.env.REACT_APP_REDIRECT_URI_AUTH;
        ensureSocketConnected().then(() => {
            console.log('[WS] Connected.');
            document.querySelector('#dash-button').blur();
            const loginURL = `https://discord.com/api/oauth2/authorize?client_id=${clientID}&redirect_uri=${encodeURIComponent(redirectURI)}&response_type=code&scope=identify%20guilds&state=${socket.id}`;
            const loginWindow = window.open(loginURL, '_blank', '');
            socket.on('authInit', () => {
                console.log('[WS] Authentication initialized.');
                history.push('/servers');
                setLoginLoading(true);
                loginWindow.close();
            });
            socket.on('authFailed', () => {
                console.log('[WS] Authentication failed.');
                history.push('/');
                setLoginLoading(false);
            });
            socket.on('login', (userData) => {
                console.log(`[WS] Login payload received. User ID is ${userData.id}.`);
                updateCurrentUser(userData);
            });
            socket.on('guilds', (guildsData) => {
                console.log(`[WS] Guilds payload received. ${guildsData.length} guilds received.`);
                updateUserGuildsCache(guildsData);
            });
        });
    };

    let dashboardButton;
    if (!loginLoading && !currentUser) {
        dashboardButton = (
            <button
                id="dash-button"
                type="button"
                onClick={login}
                className="dash-button login-button"
            >
                Dashboard
            </button>
        );
    } else if (loginLoading && !currentUser) {
        dashboardButton = (
            <button
                id="dash-button"
                type="button"
                className="logged-button"
            >
                <LoadingAnimation size="10px" />
            </button>
        );
    } else {
        dashboardButton = (
            <button
                id="dash-button"
                type="button"
                className="logged-button"
                onClick={() => history.push('/servers')}
            >
                <img
                    src={currentUser.avatarURL}
                    alt="Avatar"
                    height="25px"
                    style={{
                        borderRadius: '50%',
                        marginRight: '10px'
                    }}
                />
                {currentUser.username}
            </button>
        );
    }

    return (
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
                    {dashboardButton}
                </li>
            </ul>
            <label className="icon-burger" htmlFor="nav-toggle">
                <div className="line" />
                <div className="line" />
                <div className="line" />
            </label>
        </nav>
    );
};

export default NavigationBar;
