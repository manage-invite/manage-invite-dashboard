import React from 'react';
import PropTypes from 'prop-types';
import Button from '../lib/Button';
import './Error.css';

const Error = ({ retry }) => (
    <div className="error">
        <div>
            Something went from when fetching data from the ManageInvite servers... 😕
            <Button
                onClick={retry}
                style={{
                    margin: '0 auto',
                    marginTop: '10px',
                    border: '2px solid var(--orange)',
                    color: 'white'
                }}
            >
                Retry
            </Button>
        </div>
    </div>
);

Error.propTypes = {
    retry: PropTypes.func.isRequired
};

export default Error;
