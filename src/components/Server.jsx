/* eslint-disable react/require-default-props */

import React from 'react';
import PropTypes from 'prop-types';
import './Server.css';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { useHistory } from 'react-router-dom';
import swal from '@sweetalert/with-react';
import { socket, ensureSocketConnected } from '../socket';

const Server = ({
    serverID, serverName, serverIconURL, isAdded, isPremium, isWaitingVerification, isTrial
}) => {
    const [
        paypalEmail,
        formURL,
        ipnURL,
        returnURL,
        cancelURL
    ] = !process.env.REACT_APP_SANDBOX_PAYPAL_ENABLED
        ? [
            process.env.REACT_APP_PAYPAL_EMAIL,
            process.env.REACT_APP_PAYPAL_FORM_URL,
            process.env.REACT_APP_PAYPAL_IPN_URL,
            process.env.REACT_APP_PAYPAL_RETURN_URL,
            process.env.REACT_APP_PAYPAL_CANCEL_URL
        ]
        : [
            process.env.REACT_APP_SANDBOX_PAYPAL_EMAIL,
            process.env.REACT_APP_SANDBOX_PAYPAL_FORM_URL,
            process.env.REACT_APP_SANDBOX_PAYPAL_IPN_URL,
            process.env.REACT_APP_SANDBOX_PAYPAL_RETURN_URL,
            process.env.REACT_APP_SANDBOX_PAYPAL_CANCEL_URL
        ];

    const currentUser = useStoreState((state) => state.userSession.user);

    const userGuildsCache = useStoreState((state) => state.guildsCache.cache);
    const updateGuildCache = useStoreActions((actions) => actions.guildsCache.updateGuild);

    const history = useHistory();

    const addButton = ((isPremium || isTrial) && !isAdded);
    const manageButton = isPremium && isAdded;
    const manageTrialButton = isTrial && isAdded;

    let manageButtonText = 'Get premium';
    let manageButtonColor = '#367fa9';
    if (isWaitingVerification) {
        manageButtonText = 'Being verified...';
        manageButtonColor = '#FF7F50';
    } else if (addButton) {
        manageButtonText = 'Add to Discord';
        manageButtonColor = '#3eb386';
    } else if (manageButton) {
        manageButtonText = 'Manage';
        manageButtonColor = '#ff9100';
    } else if (manageTrialButton) {
        manageButtonText = 'Manage (trial)';
        manageButtonColor = '#3eb386';
    }

    const handleManageClick = () => {
        if (addButton) {
            const clientID = process.env.REACT_APP_CLIENT_ID;
            const redirectURI = `${process.env.REACT_APP_API_URL}/invite/callback`;
            ensureSocketConnected().then(() => {
                console.log('[WS] Connected.');
                const requestID = btoa(+new Date()).substr(-7, 5);
                const addURL = `https://discord.com/api/oauth2/authorize?client_id=${clientID}&permissions=8&redirect_uri=${encodeURIComponent(redirectURI)}&scope=bot&response_type=code&state=${socket.id}|${requestID}&guild_id=${serverID}`;
                const addWindow = window.open(addURL, '_blank', '');
                socket.on('botAdded', (eventRequestID, added, guildID) => {
                    if (requestID !== eventRequestID) return;
                    if (added) {
                        const guildAdded = userGuildsCache.find((guild) => guild.id === guildID);
                        guildAdded.isAdded = true;
                        updateGuildCache(guildAdded);
                    }
                    addWindow.close();
                });
            });
        } else if (manageButton) {
            history.push(`/servers/${serverID}`);
        } else if (!isWaitingVerification) {
            swal({
                buttons: {
                    cancel: 'Cancel',
                    confirm: {
                        text: 'Get it now',
                        className: 'swal-button-confirm'
                    }
                },
                content: (
                    <div style={{
                        textAlign: 'start'
                    }}
                    >
                        <h3 style={{
                            textAlign: 'center'
                        }}
                        >
                            ManageInvite Premium

                        </h3>
                        { /* eslint-disable-next-line max-len */ }
                        <p>ManageInvite Premium is required to use the bot. This is the only way we can guarantee the best possible experience for all our users!</p>
                        <div style={{
                            textAlign: 'start',
                            display: 'flex',
                            flexDirection: 'column',
                            alignContent: 'flex-start'
                        }}
                        >
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                marginTop: '0.3rem'
                            }}
                            >
                                <svg
                                    style={{
                                        width: '2rem',
                                        marginRight: '0.3rem'
                                    }}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <h4 style={{
                                    margin: 0,
                                    marginLeft: '0.3rem'
                                }}
                                >
                                    Fast responses
                                </h4>
                            </div>
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                marginTop: '0.3rem'
                            }}
                            >
                                <svg
                                    style={{
                                        width: '2rem',
                                        marginRight: '0.3rem'
                                    }}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                                </svg>
                                <h4 style={{
                                    margin: 0,
                                    marginLeft: '0.3rem'
                                }}
                                >
                                    Intensively customizable
                                </h4>
                            </div>
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                marginTop: '0.3rem'
                            }}
                            >
                                <svg
                                    style={{
                                        width: '2rem',
                                        marginRight: '0.3rem'
                                    }}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />

                                </svg>
                                <h4 style={{
                                    margin: 0,
                                    marginLeft: '0.3rem'
                                }}
                                >
                                    Very reliable for counting invitations
                                </h4>
                            </div>
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                marginTop: '0.3rem'
                            }}
                            >
                                <svg
                                    style={{
                                        width: '2rem',
                                        marginRight: '0.3rem'
                                    }}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />

                                </svg>
                                <h4 style={{
                                    margin: 0,
                                    marginLeft: '0.3rem'
                                }}
                                >
                                    Awesome web dashboard
                                </h4>
                            </div>
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                marginTop: '0.3rem'
                            }}
                            >
                                <svg
                                    style={{
                                        width: '2rem',
                                        marginRight: '0.3rem'
                                    }}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />

                                </svg>
                                <h4 style={{
                                    margin: 0,
                                    marginLeft: '0.3rem'
                                }}
                                >
                                    Advanced features
                                </h4>
                            </div>
                            <p style={{
                                marginBottom: 0
                            }}
                            >
                                { /* eslint-disable-next-line max-len */ }
                                Premium is available for the symbolic price of $2/month. You can also ask for a free
                                {' '}
                                <a href={process.env.REACT_APP_DISCORD_URL} target="_blank" rel="noreferrer">7-day trial</a>
                                .
                            </p>
                        </div>
                    </div>
                )
            });
            setTimeout(() => {
                const onClick = () => {
                    // todo handle paypal payment
                    document.querySelector('.paypal-submit').submit();
                    document.querySelector('.swal-button-confirm').removeEventListener('click', onClick);
                };
                document.querySelector('.swal-button-confirm').addEventListener('click', onClick);
            }, 500);
        }
    };

    return (
        <div className="server">
            <div className="server-info">
                <img className="server-icon" src={serverIconURL} alt="Server" />
                <span className="server-name">{serverName}</span>
            </div>
            <button
                type="button"
                className="manage-button"
                style={{
                    backgroundColor: manageButtonColor
                }}
                onClick={handleManageClick}
            >
                {manageButtonText}
            </button>
            <form className="paypal-submit" action={formURL} method="post">
                <input type="hidden" name="business" value={paypalEmail} />

                <input type="hidden" name="lc" value="US" />

                <input type="hidden" name="cmd" value="_xclick-subscriptions" />
                <input type="hidden" name="a3" value="2" />
                <input type="hidden" name="p3" value="1" />
                <input type="hidden" name="t3" value="M" />

                <input type="hidden" name="item_name" value="ManageInvite Premium" />

                <input type="hidden" name="no_shipping" value="1" />

                <input type="hidden" name="currency_code" value="USD" />
                <input type="hidden" name="custom" value={`manageinvite_premium,${serverID},${currentUser.id},${serverName}`} />
                <input type="hidden" name="src" value="1" />

                <input type="hidden" name="notify_url" value={ipnURL} />
                <input type="hidden" name="return" value={returnURL} />
                <input type="hidden" name="cancel_return" value={cancelURL} />
            </form>
        </div>
    );
};

Server.propTypes = {
    serverName: PropTypes.string,
    serverIconURL: PropTypes.string,
    isAdded: PropTypes.bool,
    isPremium: PropTypes.bool,
    isWaitingVerification: PropTypes.bool,
    isTrial: PropTypes.bool,
    serverID: PropTypes.string
};

export default Server;
