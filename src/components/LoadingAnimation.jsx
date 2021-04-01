import React from 'react';
import PropTypes from 'prop-types';
import './LoadingAnimation.css';

const LoadingAnimation = ({ size }) => (
    <div className="ball-pulse smallBall text-center">
        <div style={{ width: size, height: size }} />
        <div style={{ width: size, height: size }} />
        <div style={{ width: size, height: size }} />
    </div>
);

LoadingAnimation.defaultProps = {
    size: '15px'
};

LoadingAnimation.propTypes = {
    size: PropTypes.string
};

export default LoadingAnimation;
