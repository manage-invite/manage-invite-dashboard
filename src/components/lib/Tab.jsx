import React from 'react';
import PropTypes from 'prop-types';

const Tab = ({ activeTab, label, onClick }) => {
    const handleClick = () => {
        onClick(label);
    };

    let className = 'tab-list-item';

    if (activeTab === label) {
        className += ' tab-list-active';
    }

    return (
        // eslint-disable-next-line max-len
        // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions
        <li className={className} onClick={handleClick}>
            {label}
        </li>
    );
};

Tab.propTypes = {
    activeTab: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired
};

export default Tab;
