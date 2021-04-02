/* eslint-disable react/require-default-props */

import React from 'react';
import PropTypes from 'prop-types';
import './Server.css';

const Server = ({
    serverName, serverIconURL, isAdded, isPremium, isWaitingVerification, isTrial
}) => {
    let manageButtonText = 'Get premium';
    let manageButtonColor = '#367fa9';
    if (isWaitingVerification) {
        manageButtonText = 'Waiting for verification...';
        manageButtonColor = '#80FFA500';
    } else if ((isPremium || isTrial) && !isAdded) {
        manageButtonText = 'Add to Discord';
        manageButtonColor = '#3eb386';
    } else if (isPremium && isAdded) {
        manageButtonText = 'Manage';
        manageButtonColor = '#3eb386';
    } else if (isTrial && isAdded) {
        manageButtonText = 'Manage (trial)';
        manageButtonColor = '#3eb386';
    }

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
    isTrial: PropTypes.bool
};

export default Server;
