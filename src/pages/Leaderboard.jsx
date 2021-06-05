import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchGuildLeaderboard } from '../api';
import SettingCard from '../components/SettingCard';
import SettingContainer from '../components/SettingContainer';
import './Leaderboard.scss';

const Leaderboard = () => {
    const { id } = useParams();

    const [leaderboard, setLeaderboard] = useState(null);

    useEffect(() => {
        fetchGuildLeaderboard(id).then((data) => {
            setLeaderboard(data.data);
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
                        {leaderboard && leaderboard.map((user, position) => (
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
                        ))}
                    </div>
                </SettingCard>
            </SettingContainer>
        </div>
    );
};

export default Leaderboard;
