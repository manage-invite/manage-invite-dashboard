import { useStoreState } from 'easy-peasy';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchGuildSubscriptions } from '../api';
import SettingCard from '../components/SettingCard';
import SettingContainer from '../components/SettingContainer';

const Premium = () => {
    const userJwt = useStoreState((state) => state.userSession.jwt);
    const { id } = useParams();

    const [subscriptions, setSubscriptions] = useState([]);
    // eslint-disable-next-line max-len
    const subPayPal = subscriptions.some((sub) => !sub.cancelled && new Date(sub.expiresAt).getTime() > (Date.now() - 3 * 24 * 60 * 60 * 1000) && sub.subLabel === 'Premium Monthly 1 Guild');
    // eslint-disable-next-line max-len
    const currentSub = subscriptions.sort((a, b) => new Date(b.expiresAt).getTime() - new Date(a.expiresAt).getTime())[0];
    // eslint-disable-next-line max-len
    const expiresIn = ((new Date(currentSub?.expiresAt).getTime() - (Date.now() - 3 * 24 * 60 * 60 * 1000)) / 1000 / 60 / 60 / 24).toFixed(0);

    useEffect(() => {
        fetchGuildSubscriptions(userJwt, id).then((data) => {
            setSubscriptions(data.data);
        });
    }, []);

    return (
        <div>
            <SettingContainer>
                <h2>Premium</h2>
                <SettingCard>
                    <h3>Subscription</h3>
                    <p>
                        Your server is currently managed by
                        {' '}
                        {subPayPal ? 'a PayPal subscription that auto-renews each month' : `a subscription that expires in ${expiresIn} days`}
                        .
                    </p>
                </SettingCard>
            </SettingContainer>
        </div>
    );
};

export default Premium;
