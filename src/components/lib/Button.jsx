import React from 'react';
import PropTypes from 'prop-types';
import './Button.scss';

const Button = ({
    onClick, children, type, ...rest
}) => (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <button className={`button ${type}`} onClick={onClick} type="button" {...rest}>
        {children}
    </button>
);

Button.propTypes = {
    onClick: PropTypes.func,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]).isRequired,
    type: PropTypes.string
};

Button.defaultProps = {
    onClick: () => {},
    type: ''
};

export default Button;
