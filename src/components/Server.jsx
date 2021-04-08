/* eslint-disable react/require-default-props */

import React from 'react';
import PropTypes from 'prop-types';
import './Server.css';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { useHistory } from 'react-router-dom';
import { socket, ensureSocketConnected } from '../socket';

const Server = ({
    serverID, serverName, serverIconURL, isAdded, isPremium, isWaitingVerification, isTrial
}) => {
    const userGuildsCache = useStoreState((state) => state.userGuildsCache);
    const updateGuildCache = useStoreActions((actions) => actions.updateGuildCache);

    const history = useHistory();

    const addButton = ((isPremium || isTrial) && !isAdded);
    const manageButton = isPremium && isAdded;
    const manageTrialButton = isTrial && isAdded;

    let manageButtonText = 'Get premium';
    let manageButtonColor = '#367fa9';
    if (isWaitingVerification) {
        manageButtonText = 'Waiting for verification...';
        manageButtonColor = '#80FFA500';
    } else if (addButton) {
        manageButtonText = 'Add to Discord';
        manageButtonColor = '#3eb386';
    } else if (manageButton) {
        manageButtonText = 'Manage';
        manageButtonColor = '#3eb386';
    } else if (manageTrialButton) {
        manageButtonText = 'Manage (trial)';
        manageButtonColor = '#3eb386';
    }

    const handleManageClick = () => {
        if (addButton) {
            const clientID = process.env.REACT_APP_CLIENT_ID;
            const redirectURI = process.env.REACT_APP_REDIRECT_URI_INVITE;
            ensureSocketConnected().then(() => {
                console.log('[WS] Connected.');
                const requestID = btoa(+new Date()).substr(-7, 5);
                const addURL = `https://discord.com/api/oauth2/authorize?client_id=${clientID}&permissions=8&redirect_uri=${encodeURIComponent(redirectURI)}&scope=bot&response_type=code&state=${socket.id}|${requestID}&guild_id=${serverID}`;
                const addWindow = window.open(addURL, '_blank', '');
                socket.on('botAdded', (eventRequestID, added, guildID) => {
                    if (requestID !== eventRequestID) return;
                    if (added) {
                        const guildAdded = userGuildsCache.find((guild) => guild.id === guildID);
                        guildAdded.isAdded = true;
                        updateGuildCache(guildAdded);
                    }
                    addWindow.close();
                });
            });
        } else if (manageButton) {
            history.push(`/servers/${serverID}`);
        }
    };

    return (
        <div className="server">
            <div className="server-info">
                <img className="server-icon" src={serverIconURL} alt="Server" />
                <span className="server-name">{serverName}</span>
            </div>
            <button
                type="button"
                className="manage-button"
                style={{
                    backgroundColor: manageButtonColor
                }}
                onClick={handleManageClick}
                disabled={isWaitingVerification}
            >
                {manageButtonText}
            </button>
        </div>
    );
};

Server.propTypes = {
    serverName: PropTypes.string,
    serverIconURL: PropTypes.string,
    isAdded: PropTypes.bool,
    isPremium: PropTypes.bool,
    isWaitingVerification: PropTypes.bool,
    isTrial: PropTypes.bool,
    serverID: PropTypes.string
};

export default Server;
