import React from 'react';
import PropTypes from 'prop-types';
import './SettingCard.css';

const SettingCard = ({ children, ...props }) => (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <div className="settings-form" {...props}>{children}</div>
);

SettingCard.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]).isRequired
};

export default SettingCard;
