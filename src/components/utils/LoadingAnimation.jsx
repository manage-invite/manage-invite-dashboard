import React from 'react';
import PropTypes from 'prop-types';
import './LoadingAnimation.css';

const LoadingAnimation = ({ size }) => (
    <div className="loading-animation-centered">
        <div className="ball-pulse smallBall">
            <div style={{ width: size, height: size }} />
            <div style={{ width: size, height: size }} />
            <div style={{ width: size, height: size }} />
        </div>
    </div>
);

LoadingAnimation.defaultProps = {
    size: '15px'
};

LoadingAnimation.propTypes = {
    size: PropTypes.string
};

export default LoadingAnimation;
