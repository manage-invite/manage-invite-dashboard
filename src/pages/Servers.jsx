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
                    userGuildsCache.map((guild) => (
                        <Server serverName={guild.name} serverIconURL={guild.iconURL} serverStatus="premium" />
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
