import React from 'react';
import './TextArea.scss';

const TextArea = ({ ...rest }) => (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <textarea className="textarea" {...rest} />
);

export default TextArea;
