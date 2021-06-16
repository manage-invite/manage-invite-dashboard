import { useStoreState } from 'easy-peasy';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
    fetchAvailableLanguages, fetchGuildChannels, fetchGuildSettings, updateGuildSettings
} from '../api';
import Button from '../components/lib/Button';
import Input from '../components/lib/Input';
import LoadingAnimation from '../components/utils/LoadingAnimation';
import Select from '../components/lib/Select';
import './ServerSettings.css';
import SettingContainer from '../components/SettingContainer';
import SettingCard from '../components/SettingCard';

const ServerSettings = () => {
    const userJwt = useStoreState((state) => state.userSession.jwt);
    const { id } = useParams();

    const [updating, setUpdating] = useState(false);

    const [guildSettingsFetched, setGuildSettingsFetched] = useState(false);
    const [prefix, setPrefix] = useState(null);
    const [language, setLanguage] = useState(null);
    const [cmdChannel, setCmdChannel] = useState(null);
    const [fakeThreshold, setFakeThreshold] = useState(null);

    const [languagesOptions, setLanguagesOptions] = useState([]);
    const [channelsOptions, setChannelsOptions] = useState([]);

    const onUpdate = () => {
        setUpdating(true);
        updateGuildSettings(userJwt, id, {
            prefix,
            language,
            cmdChannel: cmdChannel || null,
            fakeThreshold: fakeThreshold || null
        }).then((data) => {
            toast.success('Guild settings updated!');
            setPrefix(data.data.prefix);
            setLanguage(data.data.language);
            setCmdChannel(data.data.cmdChannel);
            setUpdating(false);
            setGuildSettingsFetched(true);
        }).catch((err) => {
            toast.error(err.message);
            setUpdating(false);
        });
    };

    const onPrefixChange = (e) => {
        setPrefix(e.target.value);
    };

    const onLanguageChange = (selectedLanguage) => {
        setLanguage(selectedLanguage.value);
    };

    const onCmdChannelChange = (selectedChannel) => {
        setCmdChannel(selectedChannel.value);
    };

    const onFakeThresholdChange = (selectedFakeThreshold) => {
        setFakeThreshold(selectedFakeThreshold.target.value);
    };

    useEffect(() => {
        fetchAvailableLanguages().then((data) => {
            setLanguagesOptions(data.data.map((l) => ({
                label: l.aliases[0] || l.nativeName,
                value: l.name
            })));
        });
        fetchGuildChannels(userJwt, id).then((data) => {
            setChannelsOptions([{
                label: 'No channel',
                value: null
            }, ...data.data.map((c) => ({
                label: c.name,
                value: c.id
            }))]);
        });
        fetchGuildSettings(userJwt, id).then((data) => {
            setPrefix(data.data.prefix);
            setLanguage(data.data.language);
            setCmdChannel(data.data.cmdChannel);
            setFakeThreshold(data.data.fakeThreshold);
            setGuildSettingsFetched(true);
        });
    }, []);

    return (
        <SettingContainer>
            <h2>Server Settings</h2>
            <SettingCard>
                <div className="settings-inputs">
                    {guildSettingsFetched ? (
                        <>
                            <div className="setting-form">
                                <h3>Command Language</h3>
                                <p>Command language of the bot on Discord</p>
                                <Select
                                    value={language}
                                    defaultValue={language}
                                    options={languagesOptions}
                                    onChange={onLanguageChange}
                                />
                            </div>
                            <div className="setting-form">
                                <h3>Command Channel</h3>
                                <p>Commands executed in other channels will not work.</p>
                                <Select
                                    value={cmdChannel}
                                    defaultValue={cmdChannel}
                                    placeholder="No specific channel"
                                    options={channelsOptions}
                                    onChange={onCmdChannelChange}
                                />
                            </div>
                            <div className="setting-form">
                                <h3>Command Prefix</h3>
                                <p>The character to use before the command name.</p>
                                <Input
                                    value={prefix}
                                    onChange={onPrefixChange}
                                />
                            </div>
                            <div className="setting-form">
                                <h3>Fake threshold</h3>
                                { /* eslint-disable-next-line max-len */ }
                                <p>Mark as fake the joins for accounts younger than this setting (in days).</p>
                                <Input
                                    value={fakeThreshold}
                                    placeholder="Setting disabled!"
                                    onChange={onFakeThresholdChange}
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
            </SettingCard>
        </SettingContainer>
    );
};

export default ServerSettings;
