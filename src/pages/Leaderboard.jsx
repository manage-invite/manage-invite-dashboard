import { useStoreState } from 'easy-peasy';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
    fetchGuildLeaderboard, fetchGuildSettings, fetchGuildStorages, createGuildStorage,
    updateGuildSettings
} from '../api';
import Button from '../components/lib/Button';
import SettingCard from '../components/SettingCard';
import SettingContainer from '../components/SettingContainer';
import LoadingAnimation from '../components/utils/LoadingAnimation';
import './Leaderboard.css';

const Leaderboard = () => {
    const { id } = useParams();
    const userJwt = useStoreState((state) => state.userSession.jwt);

    const [leaderboard, setLeaderboard] = useState(null);
    const [storages, setStorages] = useState(null);
    const [settings, setSettings] = useState(null);

    const syncLeaderboard = () => {
        fetchGuildLeaderboard(userJwt, id).then((data) => {
            setLeaderboard(data.data);
        });
    };

    const makeDefaultStorage = (storageID) => {
        updateGuildSettings(userJwt, id, {
            storageID
        }).then((data) => {
            setSettings(data.data);
            syncLeaderboard();
        });
    };

    const createNewStorage = () => {
        createGuildStorage(userJwt, id).then((data) => {
            setStorages(data.data.storages);
            setSettings(data.data.settings);
            syncLeaderboard();
        });
    };

    useEffect(() => {
        syncLeaderboard();
        fetchGuildStorages(userJwt, id).then((data) => {
            setStorages(data.data);
        });
        fetchGuildSettings(userJwt, id).then((data) => {
            setSettings(data.data);
        });
    }, []);

    return (
        <div>
            <SettingContainer>
                <h2>Guild Leaderboard</h2>
                { /* eslint-disable-next-line max-len */ }
                <h4>This is the current leaderboard of your Discord server. You can restore previous versions below.</h4>
                <SettingCard>
                    <div>
                        { /* eslint-disable-next-line no-nested-ternary */ }
                        {leaderboard ? (leaderboard.length ? leaderboard.map((user, position) => (
                            <div className="leaderboard-item">
                                <div className="top-whois">
                                    { /* eslint-disable-next-line no-nested-ternary */ }
                                    <div className={`top-bubble ${position === 0 ? 'first' : position === 1 ? 'second' : position === 2 ? 'third' : ''}`}>{ position + 1 }</div>
                                    <img className="top-avatar" src={user.avatarURL} alt="Avatar" />
                                    <h4 className="top-username">
                                        {user.username}
                                        {' '}
                                        <small className="text-muted">
                                            #
                                            {user.discriminator}
                                        </small>
                                    </h4>
                                </div>
                                <div className="top-stats">
                                    <h4>
                                        {user.invites}
                                        {' '}
                                        invites
                                    </h4>
                                </div>
                            </div>
                        )) : (
                            <p>No invites to show here! Start inviting people to appear here! 🥳</p>
                        )) : <LoadingAnimation centered />}
                    </div>
                </SettingCard>
                <h2>Guild Storages</h2>
                { /* eslint-disable-next-line max-len */ }
                <h4>This is the storages available for your guild. You can create an empty storage to reset the current leaderboard, and restore a previous storage at any time!</h4>
                <SettingCard>
                    <div className="storages-grid">
                        {(storages && settings) && (storages
                            .sort((a) => (a.storageID === settings.storageID ? -1 : 1))
                            .map((storage) => (
                                <div style={{
                                    padding: '1rem',
                                    boxShadow: 'rgb(0 0 0 / 25%) 0px 4px 8px',
                                    borderRadius: '10px',
                                    backgroundColor: 'rgb(48, 50, 54)'
                                }}
                                >
                                    <h3>{storage.storageID}</h3>
                                    <p>
                                        Created:
                                        {' '}
                                        {new Date(storage.createdAt).toDateString()}
                                    </p>
                                    { /* eslint-disable-next-line max-len */ }
                                    {settings.storageID !== storage.storageID ? (
                                        <div>
                                            <Button
                                                style={{
                                                    backgroundColor: '#519872',
                                                    color: 'white',
                                                    borderRadius: '4px',
                                                    padding: '0.5rem'
                                                }}
                                                // eslint-disable-next-line max-len
                                                onClick={() => makeDefaultStorage(storage.storageID)}
                                            >
                                                Make default
                                            </Button>
                                        </div>
                                    ) : (
                                        <div>
                                            <Button
                                                style={{
                                                    backgroundColor: '#008070',
                                                    color: 'white',
                                                    borderRadius: '4px',
                                                    padding: '0.5rem'
                                                }}
                                                // eslint-disable-next-line max-len
                                            >
                                                Current storage
                                            </Button>
                                        </div>
                                    )}
                                </div>
                            )))}
                        <div style={{
                            padding: '1rem',
                            boxShadow: 'rgb(0 0 0 / 25%) 0px 4px 8px',
                            borderRadius: '10px',
                            backgroundColor: 'rgb(48, 50, 54)',
                            display: 'grid',
                            placeItems: 'center'
                        }}
                        >
                            <svg
                                onClick={() => createNewStorage()}
                                style={{
                                    height: '50px',
                                    cursor: 'pointer'
                                }}
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />

                            </svg>
                        </div>
                    </div>
                </SettingCard>
            </SettingContainer>
        </div>
    );
};

export default Leaderboard;
