import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import './ServerHome.css';
import { useStoreState } from 'easy-peasy';

const ServerHome = () => {
    const { id } = useParams();
    const guildsCache = useStoreState((state) => state.guildsCache.cache);
    const { name } = guildsCache.find((guild) => guild.id === id);
    const history = useHistory();

    return (
        <div className="settings">
            <h1 className="home-title">{name}</h1>
            <div className="home-plugins">
                <h3 className="home-welcome">
                    Welcome on the
                    {' '}
                    {name}
                    {' '}
                    configuration page! Feel free to join our
                    {' '}
                    <a href="https://manage-invite.xyz/discord">Discord server</a>
                    {' '}
                    if you need help!
                </h3>
            </div>
            <div className="home-plugins">
                <h2 className="home-plugins-title">Guild Plugins</h2>
                <div className="home-plugins-container">
                    <div className="home-plugins-item" onClick={() => history.push(`/servers/${id}/home`)} aria-hidden="true">
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
                    <div className="home-plugins-item">
                        <div className="home-plugins-icon">
                            <img src="https://img.icons8.com/fluent/48/000000/appointment-reminders.png" alt="notify" />
                        </div>
                        <div>
                            <span className="home-plugins-item-title">Logging messages</span>
                            <p className="home-plugins-item-content">
                                { /* eslint-disable-next-line max-len */ }
                                Set up channels where messages will be sent when someone joins or leaves the server.
                            </p>
                        </div>
                    </div>
                    <div className="home-plugins-item">
                        <div className="home-plugins-icon">
                            <img src="https://img.icons8.com/fluent/48/000000/trophy.png" alt="leaderboard" />
                        </div>
                        <div>
                            <span className="settings-plugins-item-title">Leaderboard</span>
                            <p className="settings-plugins-item-content">
                                { /* eslint-disable-next-line max-len */ }
                                Get and set up access to the guild invites leaderboard page.
                            </p>
                        </div>
                    </div>
                    <div className="home-plugins-item">
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
                    <div className="home-plugins-item">
                        <div className="home-plugins-icon">
                            <img src="https://img.icons8.com/fluent/48/000000/prize.png" alt="reward" />
                        </div>
                        <div>
                            <span className="home-plugins-item-title">Ranks Rewards</span>
                            <p className="home-plugins-item-content">
                                { /* eslint-disable-next-line max-len */ }
                                Set up roles that will be given once users reach a specific number of invites!
                            </p>
                        </div>
                    </div>
                    <div className="home-plugins-item">
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
                </div>
            </div>
        </div>
    );
};

export default ServerHome;
