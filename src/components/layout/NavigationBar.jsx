import { useStoreActions, useStoreState } from 'easy-peasy';
import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import LoadingAnimation from '../utils/LoadingAnimation';
import { socket, ensureSocketConnected } from '../../socket';
import './NavigationBar.scss';

const NavigationBar = () => {
    const currentUser = useStoreState((state) => state.userSession.user);
    const updateUser = useStoreActions((actions) => actions.userSession.updateUser);
    const updateJwt = useStoreActions((actions) => actions.userSession.updateJwt);
    const loginLoading = useStoreState((state) => state.userSession.loginLoading);
    const updateLoginLoading = useStoreActions((actions) => actions.userSession.updateLoginLoading);

    const updateUserGuildsCache = useStoreActions((actions) => actions.guildsCache.update);

    const history = useHistory();

    const login = () => {
        const clientID = process.env.REACT_APP_CLIENT_ID;
        const redirectURI = `${process.env.REACT_APP_API_URL}/auth/callback`;
        ensureSocketConnected().then(() => {
            console.log('[WS] Connected.');
            document.querySelector('#dash-button').blur();
            const loginURL = `https://discord.com/api/oauth2/authorize?client_id=${clientID}&redirect_uri=${encodeURIComponent(redirectURI)}&response_type=code&scope=identify%20guilds&state=${socket.id}`;
            const loginWindow = window.open(loginURL, '_blank', '');
            socket.on('authInit', () => {
                console.log('[WS] Authentication initialized.');
                history.push('/servers');
                updateLoginLoading(true);
                loginWindow.close();
            });
            socket.on('authFailed', () => {
                console.log('[WS] Authentication failed.');
                history.push('/');
                updateLoginLoading(false);
            });
            socket.on('login', (userData) => {
                console.log(`[WS] Login payload received. User ID is ${userData.id}.`);
                updateUser(userData);
            });
            socket.on('jwt', (jwt) => {
                console.log(`[WS] JWT received. Value: ${jwt}.`);
                updateJwt(jwt);
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
                <LoadingAnimation size="0.625rem" centered={false} />
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
                        marginRight: '0.625rem'
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
                <li><a href="https://docs.manage-invite.xyz" target="_blank" rel="noreferrer">Documentation</a></li>
                <li><a href="https://developer.manage-invite.xyz" target="_blank" rel="noreferrer">Developers</a></li>
                <li><a href={process.env.REACT_APP_DISCORD_URL} target="_blank" rel="noreferrer">Discord</a></li>
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
