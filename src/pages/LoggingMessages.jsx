import { useStoreState } from 'easy-peasy';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { DiscordMessage, DiscordMessages } from '@danktuary/react-discord-message';
import { fetchGuildPlugins, fetchGuildChannels } from '../api';
import Tabs from '../components/lib/Tabs';
import SettingCard from '../components/SettingCard';
import SettingContainer from '../components/SettingContainer';
import TextArea from '../components/lib/TextArea';
import './LoggingMessages.css';
import Select from '../components/lib/Select';

const LoggingMessages = () => {
    const userJwt = useStoreState((state) => state.userSession.jwt);
    const { id } = useParams();

    const [guildPlugins, setGuildPlugins] = useState(null);
    const [channelsOptions, setChannelsOptions] = useState([]);

    const [joinRegularMessage, setJoinRegularMessage] = useState(null);
    const [joinChannel, setJoinChannel] = useState(null);
    const [joinTab, setJoinTab] = useState('Main');

    useEffect(() => {
        fetchGuildChannels(userJwt, id).then((data) => {
            setChannelsOptions([{
                label: 'No channel',
                value: null
            }, ...data.data.map((c) => ({
                label: c.name,
                value: c.id
            }))]);
        });
        fetchGuildPlugins(userJwt, id).then((data) => {
            setGuildPlugins(data.data);
            console.log(guildPlugins);
        });
    }, []);

    const onJoinTabChange = (tab) => {
        setJoinTab(tab);
    };
    const onJoinChannelChange = (cmdChannel) => {
        setJoinChannel(cmdChannel.value);
    };

    return (
        <SettingContainer>
            <h2>Logging Messages</h2>
            <SettingCard>
                <div>
                    <h2>Join messages</h2>
                    <div>
                        <h4>Channel</h4>
                        <Select
                            value={joinChannel}
                            defaultValue={joinChannel}
                            placeholder="No specific channel"
                            options={channelsOptions}
                            onChange={onJoinChannelChange}
                        />
                    </div>
                    <div>
                        <h4>Message</h4>
                        <Tabs onTabChange={onJoinTabChange}>
                            <div label="Main">
                                <TextArea
                                    style={{
                                        width: '90%'
                                    }}
                                    onChange={(e) => setJoinRegularMessage(e.target.value)}
                                />
                            </div>
                            <div label="Vanity">
                                <TextArea style={{
                                    width: '90%'
                                }}
                                />
                            </div>
                            <div label="Unknown">
                                <TextArea style={{
                                    width: '90%'
                                }}
                                />
                            </div>
                            <div label="Bots">
                                <TextArea style={{
                                    width: '90%'
                                }}
                                />
                            </div>
                        </Tabs>
                    </div>
                    <div>
                        <h4>Preview</h4>
                        <div>
                            <DiscordMessages>
                                <DiscordMessage author="ManageInvite" avatar={`${process.env.PUBLIC_URL}/assets/logo.png`}>
                                    {joinTab === 'Main' ? joinRegularMessage : 'jsp'}
                                </DiscordMessage>
                            </DiscordMessages>
                        </div>
                    </div>
                </div>
            </SettingCard>
        </SettingContainer>
    );
};

export default LoggingMessages;
