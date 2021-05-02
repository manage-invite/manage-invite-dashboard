import { useStoreState } from 'easy-peasy';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchGuildPlugins, fetchGuildChannels } from '../api';
import Tabs from '../components/lib/Tabs';
import SettingCard from '../components/SettingCard';
import SettingContainer from '../components/SettingContainer';
import TextArea from '../components/lib/TextArea';
import './LoggingMessages.css';
import Select from '../components/lib/Select';
import Button from '../components/lib/Button';
import LoadingAnimation from '../components/utils/LoadingAnimation';

const LoggingMessages = () => {
    const userJwt = useStoreState((state) => state.userSession.jwt);
    const { id } = useParams();

    const [channelsOptions, setChannelsOptions] = useState([]);

    const [joinRegularMessage, setJoinRegularMessage] = useState('');
    const [joinChannel, setJoinChannel] = useState(null);

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
            const joinPlugin = data.data.find((plugin) => plugin.pluginName === 'join');
            setJoinRegularMessage(joinPlugin?.regular || 'Welcome {user} in **{server}**! You were invited by **{inviter.tag}** (who now has **{inviter.invites}** invites).');
        });
    }, []);

    const onJoinChannelChange = (cmdChannel) => {
        setJoinChannel(cmdChannel.value);
    };

    const onUpdate = () => {};
    const updating = false;

    return (
        <SettingContainer>
            <h2>Logging Messages</h2>
            <div className="logging-message-container">
                <SettingCard>
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
                        <Tabs>
                            <div label="Main">
                                <TextArea
                                    style={{
                                        width: '90%'
                                    }}
                                    value={joinRegularMessage}
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
                        <Button
                            style={{
                                marginTop: '2rem',
                                backgroundColor: 'red',
                                color: 'white'
                            }}
                            onClick={onUpdate}
                        >
                            <div style={{
                                fontWeight: '500',
                                margin: '1rem'
                            }}
                            >
                                {updating ? <LoadingAnimation size="0.5rem" /> : 'Disable'}
                            </div>
                        </Button>
                    </div>
                </SettingCard>
                <SettingCard>
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
                        <Tabs>
                            <div label="Main">
                                <TextArea
                                    style={{
                                        width: '90%'
                                    }}
                                    value={joinRegularMessage}
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
                </SettingCard>
            </div>
        </SettingContainer>
    );
};

export default LoggingMessages;
