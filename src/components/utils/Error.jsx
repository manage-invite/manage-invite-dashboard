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
                type="bordered"
                style={{
                    margin: '0 auto',
                    marginTop: '10px'
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
