import { useStoreState } from 'easy-peasy';
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Button from './lib/Button';
import './SettingContainer.css';

const SettingContainer = ({ children }) => {
    const { id } = useParams();
    const guildsCache = useStoreState((state) => state.guildsCache.cache);
    const { name } = guildsCache.find((guild) => guild.id === id);

    return (
        <div className="settings-container">
            <div className="settings-container-content">
                <Link to={`/servers/${id}`}>
                    <Button
                        style={{
                            border: '2px solid #7289da',
                            padding: '0.5rem',
                            borderRadius: '3px',
                            margin: '1rem',
                            color: 'white',
                            display: 'flex',
                            alignItems: 'center'
                        }}
                    >
                        <svg
                            style={{
                                width: '1.4rem',
                                marginRight: '0.5rem'
                            }}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 15l-3-3m0 0l3-3m-3 3h8M3 12a9 9 0 1118 0 9 9 0 01-18 0z" />

                        </svg>
                        {name}
                    </Button>
                </Link>
                <div style={{
                    margin: '1rem'
                }}
                >
                    {children}
                </div>
            </div>
        </div>
    );
};

SettingContainer.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]).isRequired
};

export default SettingContainer;
