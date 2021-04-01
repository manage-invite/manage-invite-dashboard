import React from 'react';
import FakeServer from '../components/FakeServer';
import Server from '../components/Server';

const Servers = () => (
    <div>
        <h1 style={{
            fontFamily: 'Poppins',
            textTransform: 'uppercase',
            textAlign: 'center'
        }}
        >
            Select a server
        </h1>
        <div style={{
            width: '700px',
            margin: '0 auto'
        }}
        >
            <Server />
            <FakeServer />
        </div>
    </div>
);

export default Servers;
