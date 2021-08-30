import { useStoreState } from 'easy-peasy';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchGuildSubscriptions } from '../api';
import SettingCard from '../components/SettingCard';
import SettingContainer from '../components/SettingContainer';

const Premium = () => {
    const userID = useStoreState((state) => state.userSession.user.id);
    const userJwt = useStoreState((state) => state.userSession.jwt);
    const { id } = useParams();

    const userGuildsCache = useStoreState((state) => state.guildsCache.cache);
    const guild = userGuildsCache.find((g) => g.id === id);

    const [subscriptions, setSubscriptions] = useState([]);
    const [payments, setPayments] = useState([]);
    // eslint-disable-next-line max-len
    const subPayPal = subscriptions.some((sub) => !sub.cancelled && new Date(sub.expiresAt).getTime() > (Date.now() - 3 * 24 * 60 * 60 * 1000) && sub.subLabel === 'Premium Monthly 1 Guild' && payments.filter((p) => p.subID === sub.id && p.type === 'paypal_dash_signup_month').length > payments.filter((p) => p.subID === sub.id && p.type === 'paypal_dash_cancel_month').length);
    // eslint-disable-next-line max-len
    const currentSub = subscriptions.sort((a, b) => new Date(b.expiresAt).getTime() - new Date(a.expiresAt).getTime())[0];
    // eslint-disable-next-line max-len
    const expiresIn = ((new Date(currentSub?.expiresAt).getTime() - (Date.now() - 3 * 24 * 60 * 60 * 1000)) / 1000 / 60 / 60 / 24).toFixed(0);

    const [
        paypalEmail,
        formURL,
        ipnURL,
        returnURL,
        cancelURL
    ] = process.env.REACT_APP_SANDBOX_PAYPAL_ENABLED !== 'true'
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

    useEffect(() => {
        fetchGuildSubscriptions(userJwt, id).then((data) => {
            setSubscriptions(data.data.subscriptions);
            setPayments(data.data.payments);
        });
    }, []);

    return (
        <div>
            <SettingContainer>
                <h2>Premium</h2>
                <form
                    className={`paypal-submit-${id}`}
                    action={formURL}
                    method="post"
                    style={{
                        display: 'none'
                    }}
                >
                    <input type="hidden" name="business" value={paypalEmail} />

                    <input type="hidden" name="lc" value="US" />

                    <input type="hidden" name="cmd" value="_xclick-subscriptions" />
                    <input type="hidden" name="a3" value="2" />
                    <input type="hidden" name="p3" value="1" />
                    <input type="hidden" name="t3" value="M" />

                    <input type="hidden" name="item_name" value="ManageInvite Premium" />

                    <input type="hidden" name="no_shipping" value="1" />

                    <input type="hidden" name="currency_code" value="USD" />
                    <input type="hidden" name="custom" value={`manageinvite_premium,${id},${userID},${guild.name}`} />
                    <input type="hidden" name="src" value="1" />

                    <input type="hidden" name="notify_url" value={ipnURL} />
                    <input type="hidden" name="return" value={returnURL} />
                    <input type="hidden" name="cancel_return" value={cancelURL} />
                </form>
                <SettingCard>
                    <h3>Subscription</h3>
                    <p>
                        Your server is currently managed by
                        {' '}
                        {subPayPal ? 'a PayPal subscription that auto-renews each month' : `a subscription that expires in ${expiresIn} days`}
                        . If needed, you can
                        {' '}
                        { /* eslint-disable-next-line jsx-a11y/anchor-is-valid */ }
                        <a href="#" onClick={() => document.querySelector(`.paypal-submit-${id}`).submit()}>create a new subscription</a>
                        .
                    </p>
                </SettingCard>
            </SettingContainer>
        </div>
    );
};

export default Premium;
