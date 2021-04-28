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
                            color: 'white'
                        }}
                    >
                        <>
                            Back to
                            {' '}
                            {name}
                        </>
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
