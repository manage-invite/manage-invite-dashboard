import { useStoreState } from 'easy-peasy';
import React from 'react';
import FakeServer from '../components/FakeServer';
import Server from '../components/Server';

const Servers = () => {
    const userGuildsCache = useStoreState((state) => state.userGuildsCache);

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
                maxWidth: '700px',
                margin: '0 auto'
            }}
            >
                {userGuildsCache ? (
                    userGuildsCache
                        .sort((a, b) => (
                        // eslint-disable-next-line no-nested-ternary
                            (a.isPremium === b.isPremium)
                            // eslint-disable-next-line no-nested-ternary
                                ? (a.isAdded === b.isAdded ? 0 : a.isAdded ? -1 : 1)
                                : a.isPremium ? -1 : 1))
                        .filter((guild) => guild.isAdmin)
                        .map((guild) => (
                            <Server key={guild.id} serverID={guild.id} serverName={guild.name} serverIconURL={guild.iconURL || `${process.env.PUBLIC_URL}/default-server-icon.png`} isPremium={guild.isPremium} isTrial={guild.isTrial} isWaitingVerification={guild.isWaitingVerification} isAdded={guild.isAdded} />
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
