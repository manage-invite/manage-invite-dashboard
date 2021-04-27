import React from 'react';
import './Input.scss';

const Input = ({ ...rest }) => (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <input className="input" {...rest} />
);

export default Input;
