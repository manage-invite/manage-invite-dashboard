import React from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { useStoreState } from 'easy-peasy';
import './ServerHome.css';
import Button from '../components/lib/Button';

const ServerHome = () => {
    const { id } = useParams();
    const guildsCache = useStoreState((state) => state.guildsCache.cache);
    const { name, iconURL } = guildsCache.find((guild) => guild.id === id);
    const history = useHistory();

    return (
        <div className="settings">
            <div className="home-plugins">
                <Link to="/servers">
                    <Button
                        style={{
                            border: '2px solid #7289da',
                            padding: '0.5rem',
                            borderRadius: '3px',
                            margin: '1rem',
                            color: 'white',
                            display: 'flex',
                            alignItems: 'center'
                        }}
                    >
                        <svg
                            style={{
                                width: '1.4rem',
                                marginRight: '0.5rem'
                            }}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 15l-3-3m0 0l3-3m-3 3h8M3 12a9 9 0 1118 0 9 9 0 01-18 0z" />

                        </svg>
                        Servers
                    </Button>
                </Link>
                <div className="home-server-info">
                    <img
                        src={iconURL || `${process.env.PUBLIC_URL}/default-server-icon.png`}
                        alt="Server Icon"
                        style={{
                            borderRadius: '50%',
                            height: '3rem',
                            marginRight: '0.5rem'
                        }}
                    />
                    <h3 className="home-title">{name}</h3>
                </div>
                <div className="home-plugins-container">
                    <div className="home-plugins-item" onClick={() => history.push(`/servers/${id}/settings`)} aria-hidden="true">
                        <div className="home-plugins-icon">
                            <img src="https://img.icons8.com/fluent/48/000000/settings.png" alt="gear" />
                        </div>
                        <div>
                            <span className="home-plugins-item-title">Settings</span>
                            <p className="home-plugins-item-content">
                                { /* eslint-disable-next-line max-len */ }
                                Set up the guild prefix, the guild language, the channel where the users will run the commands...
                            </p>
                        </div>
                    </div>
                    <div className="home-plugins-item" onClick={() => history.push(`/servers/${id}/messages`)} aria-hidden="true">
                        <div className="home-plugins-icon">
                            <img src="https://img.icons8.com/fluent/48/000000/edit-message.png" alt="notify" />
                        </div>
                        <div>
                            <span className="home-plugins-item-title">Logging messages</span>
                            <p className="home-plugins-item-content">
                                { /* eslint-disable-next-line max-len */ }
                                Set up channels where messages will be sent when someone joins or leaves the server.
                            </p>
                        </div>
                    </div>
                    <div className="home-plugins-item" onClick={() => history.push(`/servers/${id}/leaderboard`)} aria-hidden="true">
                        <div className="home-plugins-icon">
                            <img src="https://img.icons8.com/fluent/48/000000/prize.png" alt="leaderboard" />
                        </div>
                        <div>
                            <span className="home-plugins-item-title">Leaderboard</span>
                            <p className="home-plugins-item-content">
                                { /* eslint-disable-next-line max-len */ }
                                View, clear and modify guild leaderboards!
                            </p>
                        </div>
                    </div>
                    <div className="home-plugins-item" onClick={() => history.push(`/servers/${id}/invites`)} aria-hidden="true">
                        <div className="home-plugins-icon">
                            <img src="https://img.icons8.com/fluent/48/000000/invite.png" alt="invite" />
                        </div>
                        <div>
                            <span className="home-plugins-item-title">Invites</span>
                            <p className="home-plugins-item-content">
                                { /* eslint-disable-next-line max-len */ }
                                Control the invites behavior, such as the number of days before an account is considered as fake.
                            </p>
                        </div>
                    </div>
                    <div className="home-plugins-item" onClick={() => history.push(`/servers/${id}/premium`)} aria-hidden="true">
                        <div className="home-plugins-icon">
                            <img src="https://img.icons8.com/fluent/48/000000/crown.png" alt="premium" />
                        </div>
                        <div>
                            <span className="home-plugins-item-title">Premium</span>
                            <p className="home-plugins-item-content">
                                { /* eslint-disable-next-line max-len */ }
                                Manage your Premium subscription to access the bot, and generate your invoices!
                            </p>
                        </div>
                    </div>
                    <div className="home-plugins-item" onClick={() => history.push(`/servers/${id}/api`)} aria-hidden="true">
                        <div className="home-plugins-icon">
                            <img src="https://img.icons8.com/fluent/48/000000/add-key.png" alt="leaderboard" />
                        </div>
                        <div>
                            <span className="home-plugins-item-title">API credentials</span>
                            <p className="home-plugins-item-content">
                                { /* eslint-disable-next-line max-len */ }
                                Manage the API credentials (used to access the ManageInvite database programmatically).
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ServerHome;
