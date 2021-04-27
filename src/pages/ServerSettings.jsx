import { useStoreState } from 'easy-peasy';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { fetchGuildSettings } from '../api';
import Button from '../components/lib/Button';
import Input from '../components/lib/Input';
import LoadingAnimation from '../components/utils/LoadingAnimation';
import Select from '../components/lib/Select';
import './ServerSettings.css';

const ServerSettings = () => {
    const userJwt = useStoreState((state) => state.userSession.jwt);
    const { id } = useParams();
    const guildsCache = useStoreState((state) => state.guildsCache.cache);
    const { name } = guildsCache.find((guild) => guild.id === id);
    const [guildSettings, setGuildSettings] = useState(null);

    const [guildPrefix, setGuildPrefix] = useState(null);

    const onPrefixChange = (e) => {
        setGuildPrefix(e.target.value);
    };

    useEffect(() => {
        fetchGuildSettings(userJwt, id).then((data) => {
            setGuildSettings(data.data);
            setGuildPrefix(data.data.prefix);
        });
    }, []);

    if (!guildSettings) return <LoadingAnimation centered />;

    return (
        <div className="settings">
            <div className="settings-content">

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
                        Back to
                        {' '}
                        {name}
                    </Button>
                </Link>
                <div style={{
                    margin: '1rem'
                }}
                >
                    <h2>Server Settings</h2>
                    <div className="settings-form">
                        <div className="settings-inputs">
                            <div>
                                <h3>Command Language</h3>
                                <Select
                                    options={[
                                        {
                                            label: '🇫🇷 French',
                                            value: 'fr-FR'
                                        },
                                        {
                                            label: '🇺🇸 English (US)',
                                            value: 'en-US'
                                        }
                                    ]}
                                    defaultValue="fr-FR"
                                />
                            </div>
                            <div>
                                <h3>Command Prefix</h3>
                                <Input
                                    value={guildPrefix}
                                    onChange={onPrefixChange}
                                    style={{
                                        width: '100%'
                                    }}
                                />
                            </div>
                            <div>
                                <h3>Command Channel</h3>
                                <Select
                                    placeholder="No specific channel"
                                    options={[]}
                                />
                            </div>
                        </div>
                        <Button style={{
                            marginTop: '1rem',
                            padding: '1rem',
                            width: '30%',
                            backgroundColor: '#519872',
                            color: 'white'
                        }}
                        >
                            Update
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ServerSettings;
