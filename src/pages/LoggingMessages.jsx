/* eslint-disable no-unused-vars */
import { useStoreState } from 'easy-peasy';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchGuildPlugins, fetchGuildChannels, updateGuildPlugin } from '../api';
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

    const [joinOauthMessage, setJoinOauthMessage] = useState('');
    const [joinVanityMessage, setJoinVanityMessage] = useState('');
    const [joinUnknownMessage, setJoinUnknownMessage] = useState('');
    const [joinRegularMessage, setJoinRegularMessage] = useState('');
    const [joinEnabled, setJoinEnabled] = useState(false);
    const [joinChannel, setJoinChannel] = useState(null);
    const [joinLoading, setJoinLoading] = useState(null);

    const [leaveOauthMessage, setLeaveOauthMessage] = useState('');
    const [leaveVanityMessage, setLeaveVanityMessage] = useState('');
    const [leaveUnknownMessage, setLeaveUnknownMessage] = useState('');
    const [leaveRegularMessage, setLeaveRegularMessage] = useState('');
    const [leaveEnabled, setLeaveEnabled] = useState(false);
    const [leaveChannel, setLeaveChannel] = useState(null);
    const [leaveLoading, setLeaveLoading] = useState(null);

    const [joinDMVanityMessage, setJoinDMVanityMessage] = useState('');
    const [joinDMUnknownMessage, setJoinDMUnknownMessage] = useState('');
    const [joinDMRegularMessage, setJoinDMRegularMessage] = useState('');
    const [joinDMEnabled, setJoinDMEnabled] = useState(false);
    const [joinDMChannel, setJoinDMChannel] = useState(null);
    const [joinDMLoading, setJoinDMLoading] = useState(null);

    const updateGuildPlugins = (data) => {
        const joinPlugin = data.data.find((plugin) => plugin.pluginName === 'join')?.pluginData;
        const joinDMPlugin = data.data.find((plugin) => plugin.pluginName === 'joinDM')?.pluginData;
        const leavePlugin = data.data.find((plugin) => plugin.pluginName === 'leave')?.pluginData;

        setJoinRegularMessage(joinPlugin?.mainMessage || 'Welcome {user} in **{server}**! You were invited by **{inviter.tag}** (who now has **{inviter.invites}** invites).');
        setJoinVanityMessage(joinPlugin?.vanityMessage || '{user} joined the server using a discord.gg invite defined by the guild owner (or admin).');
        setJoinUnknownMessage(joinPlugin?.unknownMessage || 'I can\'t figure out how {user} joined the server.');
        setJoinOauthMessage(joinPlugin?.oauth2Message || '{user} joined the server using OAuth flow');
        setJoinChannel(joinPlugin?.channel);
        setJoinEnabled(joinPlugin?.enabled);

        setJoinDMRegularMessage(joinDMPlugin?.mainMessage || 'Welcome {user} in **{server}**! You were invited by **{inviter.tag}** (who now has **{inviter.invites}** invites).');
        setJoinDMVanityMessage(joinDMPlugin?.vanityMessage || 'Welcome {user} in **{server}**! You joined the server using a discord.gg invite defined by the guild owner (or admin).');
        setJoinDMUnknownMessage(joinDMPlugin?.unknownMessage || 'Welcome {user} in **{server}**! I can\'t figure out who invited you..');
        setJoinDMChannel(joinDMPlugin?.channel);
        setJoinDMEnabled(joinDMPlugin?.enabled);

        setLeaveRegularMessage(leavePlugin?.mainMessage || 'Welcome {user} in **{server}**! I can\'t figure out who invited you...');
        setLeaveVanityMessage(leavePlugin?.vanityMessage || '{user} left the server, they joined using a discord.gg invite defined by the server owner (or an admin).');
        setLeaveUnknownMessage(leavePlugin?.unknownMessage || '{user} left the server, but I can\'t figure out how they joined it.');
        setLeaveOauthMessage(leavePlugin?.oauth2Message || '{user} left the server, they joined via OAuth.');
        setLeaveChannel(leavePlugin?.channel);
        setLeaveEnabled(leavePlugin?.enabled);
    };

    const getJoinPluginData = (enabled) => ({
        enabled,
        channel: joinChannel,
        mainMessage: joinRegularMessage,
        oauth2Message: joinOauthMessage,
        vanityMessage: joinVanityMessage,
        unknownMessage: joinUnknownMessage
    });

    const getJoinDMPluginData = (enabled) => ({
        enabled,
        channel: joinDMChannel,
        mainMessage: joinDMRegularMessage,
        vanityMessage: joinDMVanityMessage,
        unknownMessage: joinDMUnknownMessage
    });

    const getLeavePluginData = (enabled) => ({
        enabled,
        channel: leaveChannel,
        mainMessage: leaveRegularMessage,
        oauth2Message: leaveOauthMessage,
        vanityMessage: leaveVanityMessage,
        unknownMessage: leaveUnknownMessage
    });

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
            updateGuildPlugins(data);
        });
    }, []);

    const onJoinUpdate = () => {
        setJoinLoading('update');
        updateGuildPlugin(userJwt, id, 'join', getJoinPluginData(true)).then((data) => {
            setJoinEnabled(true);
            setJoinLoading(null);
            updateGuildPlugins(data);
        });
    };

    const onJoinEnable = () => {
        setJoinLoading('enable');
        updateGuildPlugin(userJwt, id, 'join', getJoinPluginData(true)).then((data) => {
            setJoinEnabled(true);
            setJoinLoading(null);
            updateGuildPlugins(data);
        });
    };

    const onJoinDisable = () => {
        setJoinLoading('disable');
        updateGuildPlugin(userJwt, id, 'join', getJoinPluginData(false)).then((data) => {
            setJoinEnabled(false);
            setJoinLoading(null);
            updateGuildPlugins(data);
        });
    };

    const onLeaveUpdate = () => {
        setLeaveLoading('update');
        updateGuildPlugin(userJwt, id, 'leave', getLeavePluginData(true)).then((data) => {
            setLeaveEnabled(true);
            setLeaveLoading(null);
            updateGuildPlugins(data);
        });
    };

    const onLeaveEnable = () => {
        setLeaveLoading('enable');
        updateGuildPlugin(userJwt, id, 'leave', getLeavePluginData(true)).then((data) => {
            setLeaveEnabled(true);
            setLeaveLoading(null);
            updateGuildPlugins(data);
        });
    };

    const onLeaveDisable = () => {
        setLeaveLoading('disable');
        updateGuildPlugin(userJwt, id, 'leave', getLeavePluginData(false)).then((data) => {
            setLeaveEnabled(false);
            setLeaveLoading(null);
            updateGuildPlugins(data);
        });
    };

    const onJoinDMUpdate = () => {
        setJoinDMLoading('update');
        updateGuildPlugin(userJwt, id, 'joinDM', getJoinDMPluginData(true)).then((data) => {
            setJoinDMEnabled(true);
            setJoinDMLoading(null);
            updateGuildPlugins(data);
        });
    };

    const onJoinDMEnable = () => {
        setJoinDMLoading('enable');
        updateGuildPlugin(userJwt, id, 'joinDM', getJoinDMPluginData(true)).then((data) => {
            setJoinDMEnabled(true);
            setJoinDMLoading(null);
            updateGuildPlugins(data);
        });
    };

    const onJoinDMDisable = () => {
        setJoinDMLoading('disable');
        updateGuildPlugin(userJwt, id, 'joinDM', getJoinDMPluginData(false)).then((data) => {
            setJoinDMEnabled(false);
            setJoinDMLoading(null);
            updateGuildPlugins(data);
        });
    };

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
                            onChange={(channel) => setJoinChannel(channel.value)}
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
                                <TextArea
                                    style={{
                                        width: '90%'
                                    }}
                                    value={joinVanityMessage}
                                    onChange={(e) => setJoinVanityMessage(e.target.value)}
                                />
                            </div>
                            <div label="Unknown">
                                <TextArea
                                    style={{
                                        width: '90%'
                                    }}
                                    value={joinUnknownMessage}
                                    onChange={(e) => setJoinUnknownMessage(e.target.value)}
                                />
                            </div>
                            <div label="Bots">
                                <TextArea
                                    style={{
                                        width: '90%'
                                    }}
                                    value={joinOauthMessage}
                                    onChange={(e) => setJoinOauthMessage(e.target.value)}
                                />
                            </div>
                        </Tabs>
                    </div>
                    {joinEnabled ? (
                        <div>
                            <Button
                                style={{
                                    marginTop: '2rem',
                                    backgroundColor: '#1E90FF',
                                    color: 'white'
                                }}
                                onClick={onJoinUpdate}
                            >
                                <div style={{
                                    fontWeight: '500',
                                    margin: '0.7rem'
                                }}
                                >
                                    {joinLoading === 'update' ? <LoadingAnimation size="0.5rem" /> : 'Update'}
                                </div>
                            </Button>
                            <Button
                                style={{
                                    marginLeft: '1rem',
                                    marginTop: '2rem',
                                    backgroundColor: 'red',
                                    color: 'white'
                                }}
                                onClick={onJoinDisable}
                            >
                                <div style={{
                                    fontWeight: '500',
                                    margin: '0.7rem'
                                }}
                                >
                                    {joinLoading === 'disable' ? <LoadingAnimation size="0.5rem" /> : 'Disable'}
                                </div>
                            </Button>
                        </div>
                    ) : (
                        <div>
                            <Button
                                style={{
                                    marginTop: '2rem',
                                    backgroundColor: '#008000',
                                    color: 'white'
                                }}
                                onClick={onJoinEnable}
                            >
                                <div style={{
                                    fontWeight: '500',
                                    margin: '0.7rem'
                                }}
                                >
                                    {joinLoading === 'enable' ? <LoadingAnimation size="0.5rem" /> : 'Enable'}
                                </div>
                            </Button>
                        </div>
                    )}
                </SettingCard>
                <SettingCard>
                    <h2>Leave messages</h2>
                    <div>
                        <h4>Channel</h4>
                        <Select
                            value={leaveChannel}
                            defaultValue={leaveChannel}
                            placeholder="No specific channel"
                            options={channelsOptions}
                            onChange={(channel) => setLeaveChannel(channel.value)}
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
                                    value={leaveRegularMessage}
                                    onChange={(e) => setLeaveRegularMessage(e.target.value)}
                                />
                            </div>
                            <div label="Vanity">
                                <TextArea
                                    style={{
                                        width: '90%'
                                    }}
                                    value={leaveVanityMessage}
                                    onChange={(e) => setLeaveVanityMessage(e.target.value)}
                                />
                            </div>
                            <div label="Unknown">
                                <TextArea
                                    style={{
                                        width: '90%'
                                    }}
                                    value={leaveUnknownMessage}
                                    onChange={(e) => setLeaveUnknownMessage(e.target.value)}
                                />
                            </div>
                            <div label="Bots">
                                <TextArea
                                    style={{
                                        width: '90%'
                                    }}
                                    value={leaveOauthMessage}
                                    onChange={(e) => setLeaveOauthMessage(e.target.value)}
                                />
                            </div>
                        </Tabs>
                    </div>
                    {leaveEnabled ? (
                        <div>
                            <Button
                                style={{
                                    marginTop: '2rem',
                                    backgroundColor: '#1E90FF',
                                    color: 'white'
                                }}
                                onClick={onLeaveUpdate}
                            >
                                <div style={{
                                    fontWeight: '500',
                                    margin: '0.7rem'
                                }}
                                >
                                    {leaveLoading === 'update' ? <LoadingAnimation size="0.5rem" /> : 'Update'}
                                </div>
                            </Button>
                            <Button
                                style={{
                                    marginLeft: '1rem',
                                    marginTop: '2rem',
                                    backgroundColor: 'red',
                                    color: 'white'
                                }}
                                onClick={onLeaveDisable}
                            >
                                <div style={{
                                    fontWeight: '500',
                                    margin: '0.7rem'
                                }}
                                >
                                    {leaveLoading === 'disable' ? <LoadingAnimation size="0.5rem" /> : 'Disable'}
                                </div>
                            </Button>
                        </div>
                    ) : (
                        <div>
                            <Button
                                style={{
                                    marginTop: '2rem',
                                    backgroundColor: '#008000',
                                    color: 'white'
                                }}
                                onClick={onLeaveEnable}
                            >
                                <div style={{
                                    fontWeight: '500',
                                    margin: '0.7rem'
                                }}
                                >
                                    {leaveLoading === 'enable' ? <LoadingAnimation size="0.5rem" /> : 'Enable'}
                                </div>
                            </Button>
                        </div>
                    )}
                </SettingCard>
                <SettingCard>
                    <h2>Join DM messages</h2>
                    <div>
                        <h4>Channel</h4>
                        <Select
                            value={joinDMChannel}
                            defaultValue={joinDMChannel}
                            placeholder="No specific channel"
                            options={channelsOptions}
                            onChange={(channel) => setJoinDMChannel(channel.value)}
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
                                    value={joinDMRegularMessage}
                                    onChange={(e) => setJoinDMRegularMessage(e.target.value)}
                                />
                            </div>
                            <div label="Vanity">
                                <TextArea
                                    style={{
                                        width: '90%'
                                    }}
                                    value={joinDMVanityMessage}
                                    onChange={(e) => setJoinDMVanityMessage(e.target.value)}
                                />
                            </div>
                            <div label="Unknown">
                                <TextArea
                                    style={{
                                        width: '90%'
                                    }}
                                    value={joinDMUnknownMessage}
                                    onChange={(e) => setJoinDMUnknownMessage(e.target.value)}
                                />
                            </div>
                        </Tabs>
                    </div>
                    {joinDMEnabled ? (
                        <div>
                            <Button
                                style={{
                                    marginTop: '2rem',
                                    backgroundColor: '#1E90FF',
                                    color: 'white'
                                }}
                                onClick={onJoinDMUpdate}
                            >
                                <div style={{
                                    fontWeight: '500',
                                    margin: '0.7rem'
                                }}
                                >
                                    {joinDMLoading === 'update' ? <LoadingAnimation size="0.5rem" /> : 'Update'}
                                </div>
                            </Button>
                            <Button
                                style={{
                                    marginLeft: '1rem',
                                    marginTop: '2rem',
                                    backgroundColor: 'red',
                                    color: 'white'
                                }}
                                onClick={onJoinDMDisable}
                            >
                                <div style={{
                                    fontWeight: '500',
                                    margin: '0.7rem'
                                }}
                                >
                                    {joinDMLoading === 'disable' ? <LoadingAnimation size="0.5rem" /> : 'Disable'}
                                </div>
                            </Button>
                        </div>
                    ) : (
                        <div>
                            <Button
                                style={{
                                    marginTop: '2rem',
                                    backgroundColor: '#008000',
                                    color: 'white'
                                }}
                                onClick={onJoinDMEnable}
                            >
                                <div style={{
                                    fontWeight: '500',
                                    margin: '0.7rem'
                                }}
                                >
                                    {joinDMLoading === 'enable' ? <LoadingAnimation size="0.5rem" /> : 'Enable'}
                                </div>
                            </Button>
                        </div>
                    )}
                </SettingCard>
            </div>
        </SettingContainer>
    );
};

export default LoggingMessages;
