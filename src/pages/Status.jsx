import React, { useEffect, useState } from 'react';
import { fetchShardsStatus } from '../api';
import Input from '../components/lib/Input';
import ShardStatus from '../components/ShardStatus';
import './Status.scss';

const Status = () => {
    const [statuses, setStatuses] = useState(null);
    const [shard, setShard] = useState('');

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
            { /* eslint-disable-next-line max-len */ }
            <p>To improve the ManageInvite stability, we balance the load by launching the bot several times. Each shard represents an instance of the bot. To know on which shard your server is located, fill in the following form: </p>
            <div style={{
                marginTop: '1rem',
                marginBottom: '1rem',
                display: 'flex'
            }}
            >
                <Input
                    placeholder="ID of your server..."
                    // eslint-disable-next-line no-restricted-globals
                    onChange={(e) => (!isNaN(e.target.value)) && setShard(e.target.value)}
                    value={shard}
                />
                <h4 style={{
                    margin: '0.6rem'
                }}
                >
                    Shard:
                    {' '}
                    { /* eslint-disable-next-line no-bitwise, no-restricted-globals */ }
                    {!shard || isNaN(shard) ? 'Unknown' : Number((BigInt(shard) >> 22n) % (BigInt(process.env.REACT_APP_SHARD_COUNT)))}
                </h4>
            </div>
            <div className="status-grid">
                {statuses && statuses.shards.map((status) => (
                    <ShardStatus key={status.id} status={status} />
                ))}
            </div>
        </div>
    );
};

export default Status;
