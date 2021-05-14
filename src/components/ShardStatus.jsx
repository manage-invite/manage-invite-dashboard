import React from 'react';
import PropTypes from 'prop-types';

const ShardStatus = ({ status }) => (
    <div style={{
        padding: '1rem',
        backgroundColor: '#2e3338',
        borderRadius: '1rem',
        display: 'flex',
        flexDirection: 'column',
        border: `${status.status === 'Ready' ? 'green' : 'red'} 2px solid`
    }}
    >
        <div style={{
            display: 'flex',
            alignItems: 'center'
        }}
        >
            <h4 style={{
                margin: 0
            }}
            >
                Shard
                {' '}
                #
                {status.id}
            </h4>
        </div>
        <div style={{
            display: 'flex',
            alignItems: 'center'
        }}
        >
            <h4 style={{
                margin: 0
            }}
            >
                Status:
                {' '}
                {status.status}
            </h4>
            <svg
                style={{
                    width: '1.5rem',
                    marginLeft: '1rem',
                    color: status.status === 'Ready' ? 'green' : 'red'
                }}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={status.status === 'Ready' ? 'M5 13l4 4L19 7' : 'M6 18L18 6M6 6l12 12'} />
            </svg>
        </div>
    </div>
);

ShardStatus.propTypes = {
    status: PropTypes.shape({
        id: PropTypes.number,
        status: PropTypes.string,
        ram: PropTypes.number,
        ping: PropTypes.number,
        serverCount: PropTypes.number
    }).isRequired
};

export default ShardStatus;
