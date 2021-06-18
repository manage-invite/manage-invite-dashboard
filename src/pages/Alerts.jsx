import { useStoreState } from 'easy-peasy';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
    createGuildAlert,
    deleteGuildAlert, fetchGuildAlerts, fetchGuildChannels, updateGuildAlert
} from '../api';
import SettingContainer from '../components/SettingContainer';
import SettingCard from '../components/SettingCard';
import Button from '../components/lib/Button';
import Select from '../components/lib/Select';
import TextArea from '../components/lib/TextArea';
import Input from '../components/lib/Input';
import './Alerts.scss';
import LoadingAnimation from '../components/utils/LoadingAnimation';

const Alerts = () => {
    const variables = [
        {
            name: 'user',
            description: 'The user that just obtained or lost the number of invites'
        },
        {
            name: 'inviteCount',
            description: 'The number of invites the user obtained or lost'
        }
    ];

    const userJwt = useStoreState((state) => state.userSession.jwt);
    const { id } = useParams();

    const [channelsOptions, setChannelsOptions] = useState([]);

    const [alerts, setAlerts] = useState([]);
    const [updatedAlerts, setUpdatedAlerts] = useState([]);
    const [updatingAlerts, setUpdatingAlerts] = useState([]);

    const setAlertType = (alertID, type) => {
        const alert = updatedAlerts.find((a) => a.id === alertID);
        const newAlert = { ...alert, type };
        const newAlerts = updatedAlerts.filter((a) => a.id !== alertID);
        newAlerts.push(newAlert);
        setUpdatedAlerts(newAlerts);
    };

    const setAlertChannel = (alertID, channelID) => {
        const alert = updatedAlerts.find((a) => a.id === alertID);
        const newAlert = { ...alert, channelID };
        const newAlerts = updatedAlerts.filter((a) => a.id !== alertID);
        newAlerts.push(newAlert);
        setUpdatedAlerts(newAlerts);
    };

    const setAlertMessage = (alertID, message) => {
        const alert = updatedAlerts.find((a) => a.id === alertID);
        const newAlert = { ...alert, message };
        const newAlerts = updatedAlerts.filter((a) => a.id !== alertID);
        newAlerts.push(newAlert);
        setUpdatedAlerts(newAlerts);
    };

    const setAlertInviteCount = (alertID, inviteCount) => {
        const alert = updatedAlerts.find((a) => a.id === alertID);
        const newAlert = { ...alert, inviteCount };
        const newAlerts = updatedAlerts.filter((a) => a.id !== alertID);
        newAlerts.push(newAlert);
        setUpdatedAlerts(newAlerts);
    };

    const handleClick = (isModified, alertID) => {
        const alert = updatedAlerts.find((a) => a.id === alertID);
        setUpdatingAlerts([...updatingAlerts, alertID]);
        if (!alertID) {
            createGuildAlert(userJwt, id, alert).then((data) => {
                setUpdatingAlerts([...updatingAlerts.filter((a) => a.id !== alertID)]);
                setUpdatedAlerts(data.data);
                setAlerts(data.data);
            }).catch((err) => {
                setUpdatingAlerts([...updatingAlerts.filter((a) => a.id !== alertID)]);
                toast.error(err.message);
            });
        } else if (isModified) {
            updateGuildAlert(userJwt, id, alert.id, alert).then((data) => {
                setUpdatingAlerts([...updatingAlerts.filter((a) => a?.id !== alertID)]);
                setAlerts(data.data);
            }).catch((err) => {
                setUpdatingAlerts([...updatingAlerts.filter((a) => a.id !== alertID)]);
                toast.error(err.message);
            });
        } else {
            deleteGuildAlert(userJwt, id, alert.id).then((data) => {
                setUpdatingAlerts([...updatingAlerts.filter((a) => a.id !== alertID)]);
                setUpdatedAlerts(data.data);
                setAlerts(data.data);
            }).catch((err) => {
                setUpdatingAlerts([...updatingAlerts.filter((a) => a.id !== alertID)]);
                toast.error(err.message);
            });
        }
    };

    const createEmptyAlert = () => {
        const newAlerts = [...updatedAlerts];
        newAlerts.push({
            inviteCount: 1,
            channelID: '',
            message: 'Congrats {user}, you just reached level {inviteCount}!',
            type: 'up'
        });
        setUpdatedAlerts(newAlerts);
    };

    useEffect(() => {
        fetchGuildAlerts(userJwt, id).then((data) => {
            setAlerts(data.data);
            setUpdatedAlerts([...data.data]);
        });
        fetchGuildChannels(userJwt, id).then((data) => {
            setChannelsOptions(data.data.map((c) => ({
                label: c.name,
                value: c.id
            })));
        });
    }, []);

    return (
        <SettingContainer>
            <SettingCard>
                <p>
                    { /* eslint-disable-next-line max-len */ }
                    Invite alerts are useful to get notified when a member reaches a certain number of invites!
                </p>
                <div className="alerts-container">
                    <table className="alerts">
                        <thead>
                            <tr>
                                <th>Invites</th>
                                <th>Trigger</th>
                                <th>Channel</th>
                                <th>Message</th>
                            </tr>
                        </thead>
                        <tbody>
                            { /* eslint-disable-next-line max-len */ }
                            {updatedAlerts.sort((a, b) => {
                                const realA = alerts.find((realAlert) => realAlert.id === a.id);
                                const realB = alerts.find((realAlert) => realAlert.id === b.id);
                                if (!realA && realB) return 1;
                                if (realA && !realB) return -1;
                                // eslint-disable-next-line max-len
                                if (realA.inviteCount === realB.inviteCount) return realB.type === 'up' ? 1 : -1;
                                return realB.inviteCount - realA.inviteCount;
                            }).map((e, idx) => {
                                const unmodifiedAlert = alerts.find((a) => a.id === e.id);
                                const isModifiedAlert = unmodifiedAlert
                                    ? (unmodifiedAlert.message !== e.message
                                || unmodifiedAlert.inviteCount !== e.inviteCount
                                || unmodifiedAlert.channelID !== e.channelID
                                || unmodifiedAlert.type !== e.type) : true;
                                const isUpdating = updatingAlerts.includes(e.id);
                                return (
                                    // eslint-disable-next-line react/no-array-index-key
                                    <tr key={idx}>
                                        { /* eslint-disable-next-line max-len */}
                                        { /* eslint-disable-next-line jsx-a11y/control-has-associated-label */ }
                                        <th>
                                            <Input
                                                value={e.inviteCount}
                                                type="number"
                                                // eslint-disable-next-line max-len
                                                onChange={(ev) => setAlertInviteCount(e.id, parseInt(ev.target.value, 10))}
                                                style={{
                                                    width: '3rem'
                                                }}
                                            />

                                        </th>
                                        <th>
                                            <Select
                                                value={e.type}
                                                defaultValue={e.type}
                                                options={[
                                                    {
                                                        label: 'Level Up',
                                                        value: 'up'
                                                    },
                                                    {
                                                        label: 'Level Down',
                                                        value: 'down'
                                                    }
                                                ]}
                                                onChange={(type) => setAlertType(e.id, type.value)}
                                            />
                                        </th>
                                        <th>
                                            <Select
                                                value={e.channelID}
                                                defaultValue={e.channelID}
                                                options={channelsOptions}
                                                // eslint-disable-next-line max-len
                                                onChange={(channel) => setAlertChannel(e.id, channel.value)}
                                            />
                                        </th>
                                        <th>
                                            <TextArea
                                                style={{
                                                    width: '90%'
                                                }}
                                                value={e.message}
                                                // eslint-disable-next-line max-len
                                                onChange={(ev) => setAlertMessage(e.id, ev.target.value)}
                                            />
                                        </th>
                                        <th>
                                            <Button
                                                style={{
                                                    color: 'white',
                                                    backgroundColor: isModifiedAlert ? '#008000' : 'red',
                                                    padding: '0.7rem'
                                                }}
                                                onClick={() => handleClick(isModifiedAlert, e.id)}
                                            >
                                                { /* eslint-disable-next-line no-nested-ternary */ }
                                                {!isUpdating ? (isModifiedAlert ? 'Update' : 'Delete') : <LoadingAnimation />}
                                            </Button>
                                        </th>
                                    </tr>
                                );
                            })}
                            {!updatedAlerts.some((alert) => !alert.id) && (
                                <tr>
                                    <th>
                                        <Button
                                            style={{
                                                color: 'white',
                                                backgroundColor: '#008000',
                                                padding: '0.5rem 1.2rem'
                                            }}
                                            onClick={() => createEmptyAlert()}
                                        >
                                            +
                                        </Button>
                                    </th>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </SettingCard>
            <SettingCard style={{
                marginTop: '1rem'
            }}
            >
                <h3>Variables</h3>
                { /* eslint-disable-next-line max-len */ }
                <p>You can use these variables in your message, they will automatically be replaced with the right value.</p>
                <table className="variable-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        {variables.map((variable) => (
                            <tr>
                                <th>{`{${variable.name}}`}</th>
                                <th>{variable.description}</th>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </SettingCard>
        </SettingContainer>
    );
};

export default Alerts;
