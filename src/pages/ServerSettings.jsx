import { useStoreState } from 'easy-peasy';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { fetchAvailableLanguages, fetchGuildSettings, updateGuildSettings } from '../api';
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

    const [updating, setUpdating] = useState(false);

    const [guildSettingsFetched, setGuildSettingsFetched] = useState(false);
    const [prefix, setPrefix] = useState(null);
    const [language, setLanguage] = useState(null);
    const [cmdChannel, setCmdChannel] = useState(null);

    const [languagesOptions, setLanguagesOptions] = useState([]);

    const onUpdate = () => {
        setUpdating(true);
        updateGuildSettings(userJwt, id, {
            prefix,
            language,
            cmdChannel
        }).then((data) => {
            toast.success('Guild settings updated!');
            setPrefix(data.data.prefix);
            setLanguage(data.data.language);
            setCmdChannel(data.data.cmdChannel);
            setUpdating(false);
            setGuildSettingsFetched(true);
        });
    };

    const onPrefixChange = (e) => {
        setPrefix(e.target.value);
    };

    const onLanguageChange = (selectedLanguage) => {
        setLanguage(selectedLanguage.value);
    };

    useEffect(() => {
        fetchAvailableLanguages().then((languages) => {
            setLanguagesOptions(languages.map((l) => ({
                label: l.aliases[0] || l.nativeName,
                value: l.name
            })));
        });
        fetchGuildSettings(userJwt, id).then((data) => {
            setPrefix(data.data.prefix);
            setLanguage(data.data.language);
            setCmdChannel(data.data.cmdChannel);
            setGuildSettingsFetched(true);
        });
    }, []);

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
                        <>
                            Back to
                            {' '}
                            {name}
                        </>
                    </Button>
                </Link>
                <div style={{
                    margin: '1rem'
                }}
                >
                    <h2>Server Settings</h2>
                    <div className="settings-form">
                        <div className="settings-inputs">
                            {guildSettingsFetched ? (
                                <>
                                    <div className="setting-form">
                                        <h3>Command Language</h3>
                                        <Select
                                            value={language}
                                            defaultValue={language}
                                            options={languagesOptions}
                                            onChange={onLanguageChange}
                                        />
                                    </div>
                                    <div className="setting-form">
                                        <h3>Command Channel</h3>
                                        <Select
                                            defaultValue={cmdChannel}
                                            placeholder="No specific channel"
                                            options={[]}
                                        />
                                    </div>
                                    <div className="setting-form">
                                        <h3>Command Prefix</h3>
                                        <Input
                                            value={prefix}
                                            onChange={onPrefixChange}
                                        />
                                    </div>
                                </>
                            ) : <LoadingAnimation />}
                        </div>
                        <Button
                            style={{
                                marginTop: '2rem',
                                backgroundColor: '#519872',
                                color: 'white'
                            }}
                            onClick={onUpdate}
                        >
                            <div style={{
                                fontWeight: '500',
                                margin: '1rem'
                            }}
                            >
                                {updating ? <LoadingAnimation size="0.5rem" /> : 'Update'}
                            </div>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ServerSettings;
