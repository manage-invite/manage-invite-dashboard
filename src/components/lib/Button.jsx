import React from 'react';
import PropTypes from 'prop-types';
import './Button.css';

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
    children: PropTypes.elementType.isRequired,
    type: PropTypes.string
};

Button.defaultProps = {
    onClick: () => {},
    type: 'bordered'
};

export default Button;
