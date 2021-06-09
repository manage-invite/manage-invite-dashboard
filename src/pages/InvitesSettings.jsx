import { useStoreState } from 'easy-peasy';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
    fetchGuildSettings, updateGuildSettings
} from '../api';
import Button from '../components/lib/Button';
import Input from '../components/lib/Input';
import LoadingAnimation from '../components/utils/LoadingAnimation';
import './ServerSettings.css';
import SettingContainer from '../components/SettingContainer';
import SettingCard from '../components/SettingCard';

const InvitesSettings = () => {
    const userJwt = useStoreState((state) => state.userSession.jwt);
    const { id } = useParams();

    const [updating, setUpdating] = useState(false);

    const [guildSettingsFetched, setGuildSettingsFetched] = useState(false);
    const [fakeThreshold, setFakeThreshold] = useState(null);

    const onUpdate = () => {
        setUpdating(true);
        updateGuildSettings(userJwt, id, {
            fakeThreshold: fakeThreshold || null
        }).then((data) => {
            toast.success('Guild settings updated!');
            setFakeThreshold(data.data.fakeThreshold);
            setUpdating(false);
            setGuildSettingsFetched(true);
        }).catch((err) => {
            toast.error(err.message);
        });
    };

    const onFakeThresholdChange = (e) => {
        setFakeThreshold(e.target.value);
    };

    useEffect(() => {
        fetchGuildSettings(userJwt, id).then((data) => {
            setFakeThreshold(data.data.fakeThreshold);
            setGuildSettingsFetched(true);
        });
    }, []);

    return (
        <SettingContainer>
            <h2>Server Settings</h2>
            <SettingCard>
                <div className="settings-inputs">
                    {guildSettingsFetched ? (
                        <>
                            <div className="setting-form">
                                <h3>Fake threshold</h3>
                                { /* eslint-disable-next-line max-len */ }
                                <p>If the account was created before this number of days, it will be considered as fake. Let empty to disable this security.</p>
                                <Input
                                    value={fakeThreshold}
                                    placeholder="Setting disabled!"
                                    onChange={onFakeThresholdChange}
                                />
                            </div>
                        </>
                    ) : <LoadingAnimation />}
                </div>
                <Button
                    style={{
                        marginTop: '2rem',
                        backgroundColor: '#519872',
                        color: 'white'
                    }}
                    onClick={onUpdate}
                >
                    <div style={{
                        fontWeight: '500',
                        margin: '1rem'
                    }}
                    >
                        {updating ? <LoadingAnimation size="0.5rem" /> : 'Update'}
                    </div>
                </Button>
            </SettingCard>
        </SettingContainer>
    );
};

export default InvitesSettings;
