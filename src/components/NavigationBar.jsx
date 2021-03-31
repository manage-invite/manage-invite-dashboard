import React from 'react';
import { Link } from 'react-router-dom';

const olStyle = {
    listStyleType: 'none'
};

const liStyle = {
    display: 'inline-block',
    marginTop: '10px',
    marginRight: '30px'
};

const linkStyle = {
    textDecoration: 'none',
    color: 'black'
};

const loginButtonStyle = {
    padding: '10px',
    backgroundColor: 'rgba(25,118,210,0.08)',
    color: '#1976d2',
    borderRadius: '4px'
};

const NavigationBar = () => (
    <div style={{
        paddingRight: '40px',
        marginBottom: '20px'
    }}
    >
        <nav style={{
            top: 0,
            position: 'relative',
            zIndex: 1
        }}
        >
            <ol style={{
                ...olStyle,
                ...{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }
            }}
            >
                <div>
                    <li style={liStyle}><Link to="/" style={linkStyle}>ManageInvite</Link></li>
                </div>
                <div>
                    <li style={liStyle}>
                        <li style={liStyle}><Link to="/docs" style={linkStyle}>Documentation</Link></li>
                        <li style={liStyle}><Link to="/status" style={linkStyle}>Status</Link></li>
                        <li style={liStyle}><Link to="/status" style={linkStyle}>Support server</Link></li>
                        <Link to="/login" style={{ ...linkStyle, ...loginButtonStyle }}>Login with Discord</Link>
                    </li>
                </div>
            </ol>
        </nav>
    </div>
);

export default NavigationBar;
