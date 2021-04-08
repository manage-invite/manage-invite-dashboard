import React from 'react';
import './Settings.css';

const Settings = () => (
    <div className="settings">
        <div className="settings-plugins">
            <h2 className="settings-plugins-title">Guild Plugins</h2>
            <div className="settings-plugins-container">
                <div className="settings-plugins-item">
                    <div className="settings-plugins-icon">
                        <img src="https://img.icons8.com/nolan/64/settings-3.png" alt="gear-icon" />
                    </div>
                    <div>
                        <span className="settings-plugins-item-title">Settings</span>
                        <p className="settings-plugins-item-content">
                            { /* eslint-disable-next-line max-len */ }
                            Set up the guild prefix, the guild language, the channel where the users will run the commands...
                        </p>
                    </div>
                </div>
                <div className="settings-plugins-item">
                    <div className="settings-plugins-icon">
                        <img src="https://img.icons8.com/nolan/64/imessage.png" alt="msg-icon" />
                    </div>
                    <div>
                        <span className="settings-plugins-item-title">Logging messages</span>
                        <p className="settings-plugins-item-content">
                            { /* eslint-disable-next-line max-len */ }
                            Set up channels where messages will be sent when someone joins or leaves the server.
                        </p>
                    </div>
                </div>
                <div className="settings-plugins-item">
                    <div className="settings-plugins-icon">
                        <img src="https://img.icons8.com/nolan/64/leaderboard.png" alt="lb-icon" />
                    </div>
                    <div>
                        <span className="settings-plugins-item-title">Leaderboard</span>
                        <p className="settings-plugins-item-content">
                            { /* eslint-disable-next-line max-len */ }
                            Get and set up access to the guild invites leaderboard page.
                        </p>
                    </div>
                </div>
                <div className="settings-plugins-item">
                    <div className="settings-plugins-icon">
                        <img src="https://img.icons8.com/nolan/64/add.png" alt="add-icon" />
                    </div>
                    <div>
                        <span className="settings-plugins-item-title">Invites</span>
                        <p className="settings-plugins-item-content">
                            { /* eslint-disable-next-line max-len */ }
                            Control the invites behavior, such as the number of days before an account is considered as fake.
                        </p>
                    </div>
                </div>
                <div className="settings-plugins-item">
                    <div className="settings-plugins-icon">
                        <img src="https://img.icons8.com/nolan/64/medal2.png" alt="medal-icon" />
                    </div>
                    <div>
                        <span className="settings-plugins-item-title">Ranks Rewards</span>
                        <p className="settings-plugins-item-content">
                            { /* eslint-disable-next-line max-len */ }
                            Set up roles that will be given once users reach a specific number of invites!
                        </p>
                    </div>
                </div>
                <div className="settings-plugins-item">
                    <div className="settings-plugins-icon">
                        <img src="https://img.icons8.com/nolan/64/membership-card.png" alt="sub-icon" />
                    </div>
                    <div>
                        <span className="settings-plugins-item-title">Subscription</span>
                        <p className="settings-plugins-item-content">
                            { /* eslint-disable-next-line max-len */ }
                            Manage your subscription to access the bot, and generate your invoices!
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

export default Settings;
