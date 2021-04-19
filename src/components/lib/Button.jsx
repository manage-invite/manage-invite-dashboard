import React from 'react';
import PropTypes from 'prop-types';
import './Button.css';

const Button = ({ onClick, children, ...rest }) => (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <button className="button" onClick={onClick} type="button" {...rest}>
        {children}
    </button>
);

Button.propTypes = {
    onClick: PropTypes.func,
    children: PropTypes.elementType.isRequired
};

Button.defaultProps = {
    onClick: () => {}
};

export default Button;
