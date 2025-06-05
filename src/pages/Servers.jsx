/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import { useStoreActions, useStoreState } from 'easy-peasy';
import FakeServer from '../components/FakeServer';
import Server from '../components/Server';
import { fetchUserGuilds } from '../api';
import Error from '../components/utils/Error';

const Servers = () => {
    const userJWT = useStoreState((state) => state.userSession.jwt);
    const logout = useStoreActions((actions) => actions.userSession.logout);
    const userGuildsCache = useStoreState((state) => state.guildsCache.cache);
    const updateUserGuildsCache = useStoreActions((actions) => actions.guildsCache.update);

    const [errored, setErrored] = useState(false);

    const refetchUserGuilds = () => {
        setErrored(false);
        fetchUserGuilds(userJWT).then((guilds) => {
            updateUserGuildsCache(guilds);
        }).catch((e) => {
            if (e.message === 'Access token is expired') logout();
            else setErrored(true);
        });
    };

    useEffect(() => {
        if (userJWT) refetchUserGuilds();
    }, [userJWT]);

    if (errored) return <Error retry={refetchUserGuilds} />;

    return (
        <div>
            <h1 style={{
                fontFamily: 'Poppins',
                textTransform: 'uppercase',
                textAlign: 'center'
            }}
            >
                Select a server
            </h1>
            <div style={{
                maxWidth: '50rem',
                margin: '0 auto'
            }}
            >
                {userGuildsCache ? (
                    userGuildsCache
                        .sort((a, b) => {
                            if (a.isAdmin && !b.isAdmin) return -1;
                            if (!a.isAdmin && b.isAdmin) return 1;

                            const aPriority = (a.isPremium ? 2 : 0) + (a.isWaitingVerification ? 1 : 0);
                            const bPriority = (b.isPremium ? 2 : 0) + (b.isWaitingVerification ? 1 : 0);
                            if (aPriority > bPriority) return -1;
                            if (aPriority < bPriority) return 1;

                            return a.name.localeCompare(b.name);
                        })
                        .map((guild) => (
                            <Server key={guild.id} serverID={guild.id} serverName={guild.name} serverIconURL={guild.iconURL || `${process.env.PUBLIC_URL}/default-server-icon.png`} isPremium={guild.isPremium} isTrial={guild.isTrial} isWaitingVerification={guild.isWaitingVerification} isAdded={guild.isAdded} isAdmin={guild.isAdmin} />
                        ))
                ) : (
                    <>
                        <FakeServer />
                        <FakeServer />
                        <FakeServer />
                        <FakeServer />
                    </>
                )}
            </div>
        </div>
    );
};

export default Servers;
