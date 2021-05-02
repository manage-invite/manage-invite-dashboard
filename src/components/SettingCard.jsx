import React from 'react';
import PropTypes from 'prop-types';
import './SettingCard.css';

const SettingCard = ({ children }) => (
    <div className="settings-form">{children}</div>
);

SettingCard.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]).isRequired
};

export default SettingCard;
