import React, { useEffect, useState } from 'react';
import { fetchShardsStatus } from '../api';
import ShardStatus from '../components/ShardStatus';
import './Status.scss';

const Status = () => {
    const [statuses, setStatuses] = useState([]);

    useEffect(() => {
        fetchShardsStatus().then((data) => {
            setStatuses(data.data);
        });
    }, []);

    return (
        <div style={{
            maxWidth: '70rem',
            margin: '3rem auto',
            paddingLeft: '1rem',
            paddingRight: '1rem'
        }}
        >
            <h2>ManageInvite Status</h2>
            <div className="status-grid">
                {statuses.map((status) => (
                    <ShardStatus status={status} />
                ))}
            </div>
        </div>
    );
};

export default Status;
