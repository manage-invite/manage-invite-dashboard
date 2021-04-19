import { useStoreState } from 'easy-peasy';
import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { fetchGuildSettings } from '../api';
import Button from '../components/lib/Button';
import LoadingAnimation from '../components/utils/LoadingAnimation';

const ServerSettings = () => {
    const userJwt = useStoreState((state) => state.userSession.jwt);
    const [guildSettings, setGuildSettings] = useState(null);

    const history = useHistory();
    const { id } = useParams();

    useEffect(() => {
        fetchGuildSettings(userJwt, id).then((data) => {
            setGuildSettings(data.data);
        });
    }, []);

    if (!guildSettings) return <LoadingAnimation />;

    return (
        <div className="settings">
            <Button
                onClick={() => history.push(`/servers/${id}`)}
                type="bordered"
                style={{
                    margin: '0 auto',
                    marginTop: '3em'
                }}
            >
                Back
            </Button>
        </div>
    );
};

export default ServerSettings;
