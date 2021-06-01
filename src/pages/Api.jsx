import React from 'react';
import ApiEndpoint from '../components/ApiEndpoint';

const Api = () => (
    <div style={{
        maxWidth: '70rem',
        margin: '3rem auto',
        paddingLeft: '1rem',
        paddingRight: '1rem'
    }}
    >
        <h2>ManageInvite API</h2>
        { /* eslint-disable-next-line max-len */ }
        <p>You can use the ManageInvite to create your own features or your own bot using the ManageInvite database!</p>
        <h4>Guilds Endpoint</h4>
        <ApiEndpoint
            endpoint="/guilds/:guildID/settings"
            description="Fetches the guild settings"
        />
        <ApiEndpoint
            method="POST"
            endpoint="/guilds/:guildID/settings"
            description="Updates the guild settings"
            params={[
                {
                    type: 'string',
                    name: 'prefix',
                    description: 'The guild prefix'
                }
            ]}
        />
        <ApiEndpoint endpoint="/guilds/:guildID/plugins" description="Fetches the guild plugins" />
        <ApiEndpoint method="POST" endpoint="/guilds/:guildID/plugins" description="Updates the guild plugins" />
    </div>
);

export default Api;
