import { useStoreState } from 'easy-peasy';
import React from 'react';
import { useParams } from 'react-router-dom';
import LoadingAnimation from '../components/LoadingAnimation';
import Settings from '../components/Settings';
import NotFound from './NotFound';

const ServerSettings = () => {
    const userGuildsLoading = useStoreState((state) => state.guildsCache.loading);
    const userGuildsCache = useStoreState((state) => state.guildsCache.cache);
    const { id } = useParams();
    const cachedGuild = userGuildsCache?.find((guild) => guild.id === id);

    if (userGuildsLoading) return <LoadingAnimation />;
    if (cachedGuild) return <Settings serverName={cachedGuild.name} />;
    return <NotFound />;
};

export default ServerSettings;
