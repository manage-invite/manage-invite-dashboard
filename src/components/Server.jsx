/* eslint-disable react/require-default-props */

import React from 'react';
import PropTypes from 'prop-types';
import './Server.css';

const Server = ({ serverName, serverIconURL, serverStatus }) => (
    <div className="server">
        <div className="server-info">
            <img className="server-icon" src={serverIconURL} alt="Server" />
            <span className="server-name">{serverName}</span>
        </div>
        <button type="button" className="manage-button">{serverStatus === 'premium' ? 'Manage' : 'Get Premium'}</button>
    </div>
);

Server.propTypes = {
    serverName: PropTypes.string,
    serverIconURL: PropTypes.string,
    serverStatus: PropTypes.string
};

export default Server;
