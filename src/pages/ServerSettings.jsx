import { useStoreState } from 'easy-peasy';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { fetchGuildSettings } from '../api';
import LoadingAnimation from '../components/utils/LoadingAnimation';
import './ServerSettings.css';

const ServerSettings = () => {
    const userJwt = useStoreState((state) => state.userSession.jwt);
    const [guildSettings, setGuildSettings] = useState(null);

    const { id } = useParams();

    useEffect(() => {
        fetchGuildSettings(userJwt, id).then((data) => {
            setGuildSettings(data.data);
        });
    }, []);

    if (!guildSettings) return <LoadingAnimation centered />;

    return (
        <div className="settings">
            <div className="settings-content">
                <div style={{
                    display: 'flex',
                    alignItems: 'center'
                }}
                >
                    <h2><Link href="../">ManageInvite</Link></h2>
                    {' '}
                    /
                    {' '}
                    <h2>Server Settings</h2>
                </div>
            </div>
        </div>
    );
};

export default ServerSettings;
