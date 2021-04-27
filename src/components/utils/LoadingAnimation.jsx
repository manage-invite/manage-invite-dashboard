import React from 'react';
import PropTypes from 'prop-types';
import './LoadingAnimation.css';

const LoadingAnimation = ({ size, centered }) => (
    <div
        className="loading-animation-centered"
        style={{
            height: !centered ? '' : '70vh'
        }}
    >
        <div className="ball-pulse smallBall">
            <div style={{ width: size, height: size }} />
            <div style={{ width: size, height: size }} />
            <div style={{ width: size, height: size }} />
        </div>
    </div>
);

LoadingAnimation.defaultProps = {
    size: '1rem',
    centered: null
};

LoadingAnimation.propTypes = {
    size: PropTypes.string,
    centered: PropTypes.bool
};

export default LoadingAnimation;
