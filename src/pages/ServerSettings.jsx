import { useStoreState } from 'easy-peasy';
import React from 'react';
import { useParams } from 'react-router-dom';
import LoadingAnimation from '../components/LoadingAnimation';
import Settings from '../components/Settings';

const ServerSettings = () => {
    const userGuildsCache = useStoreState((state) => state.userGuildsCache);
    const { id } = useParams();
    const cachedGuild = userGuildsCache?.find((guild) => guild.id === id);

    const loadingAnimation = (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: 'calc(70vh)'
        }}
        >
            <LoadingAnimation size="20px" />
        </div>
    );

    /*
    useEffect(() => {
        setTimeout(() => {
            if (!cachedGuild) unknownGuild = true;
        }, 1000);
    }, []);
    */

    return (
        !cachedGuild ? loadingAnimation : (
            <Settings serverName={cachedGuild.name} />
        )
    );
};

export default ServerSettings;
