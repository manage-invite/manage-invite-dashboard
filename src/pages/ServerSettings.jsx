import { useStoreState } from 'easy-peasy';
import React from 'react';
import { useParams } from 'react-router-dom';
import Settings from '../components/Settings';
import NotFound from './NotFound';

const ServerSettings = () => {
    const userGuildsCache = useStoreState((state) => state.userGuildsCache);
    const { id } = useParams();
    const cachedGuild = userGuildsCache?.find((guild) => guild.id === id);

    return cachedGuild ? <Settings serverName={cachedGuild.name} /> : <NotFound />;
};

export default ServerSettings;
