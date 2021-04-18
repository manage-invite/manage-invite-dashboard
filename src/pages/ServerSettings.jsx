import { useStoreState } from 'easy-peasy';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchGuildSettings } from '../api';
import LoadingAnimation from '../components/utils/LoadingAnimation';

const ServerSettings = () => {
    const userJwt = useStoreState((state) => state.userSession.jwt);
    const [guildSettings, setGuildSettings] = useState(null);

    const { id } = useParams();

    useEffect(() => {
        fetchGuildSettings(userJwt, id).then((data) => {
            setGuildSettings(data);
        });
    }, []);

    if (!guildSettings) return <LoadingAnimation />;

    return (
        <div className="settings">
            coucou
        </div>
    );
};

export default ServerSettings;
