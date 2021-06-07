import { useStoreState } from 'easy-peasy';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchGuildAPIToken, regenGuildAPIToken } from '../api';
import Button from '../components/lib/Button';
import Input from '../components/lib/Input';
import SettingCard from '../components/SettingCard';
import SettingContainer from '../components/SettingContainer';

const ApiToken = () => {
    const userJwt = useStoreState((state) => state.userSession.jwt);
    const { id } = useParams();

    const [token, setToken] = useState('');
    const [copied, setCopied] = useState(false);

    const updateToken = () => {
        regenGuildAPIToken(userJwt, id).then((data) => {
            setToken(data.data.token);
        });
    };

    useEffect(() => {
        setTimeout(() => setCopied(false), 3000);
    }, [copied]);

    useEffect(() => {
        fetchGuildAPIToken(userJwt, id).then((data) => {
            setToken(data.data.token);
        });
    }, []);

    return (
        <div>
            <SettingContainer>
                <h2>API Credentials</h2>
                { /* eslint-disable-next-line max-len */ }
                <h4>Here is your guild API token! Use it in the authorization header when making requests to the ManageInvite API!</h4>
                <p>
                    Documentation is available
                    {' '}
                    <a href="https://developer.manage-invite.xyz/">here</a>
                    . If you have any question, we are available on Discord.
                </p>
                <div>
                    <SettingCard>

                        <div style={{
                            marginTop: '1rem'
                        }}
                        >
                            <Input
                                onChange={() => {}}
                                value={!token ? 'Click Generate to get your token!' : token}
                                id="token"
                                style={{
                                    width: '90%'
                                }}
                            />
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                marginTop: '1rem'
                            }}
                            >
                                <Button
                                    style={{
                                        backgroundColor: !token ? '#008000' : '#B20000',
                                        color: 'white',
                                        padding: '0.8rem',
                                        marginRight: '0.2rem'
                                    }}
                                    onClick={() => updateToken()}
                                >
                                    {!token ? 'Generate' : 'Regenerate'}
                                </Button>
                                <Button
                                    disabled={!token}
                                    style={{
                                        backgroundColor: !copied ? '#7289da' : '#008000',
                                        color: 'white',
                                        padding: '0.8rem'
                                    }}
                                    onClick={() => {
                                        document.querySelector('#token').select();
                                        document.execCommand('copy');
                                        setCopied(true);
                                    }}
                                >
                                    {copied ? 'Copied' : 'Copy'}
                                </Button>
                            </div>
                        </div>
                    </SettingCard>
                </div>
            </SettingContainer>
        </div>
    );
};

export default ApiToken;
