import React from 'react';
import Button from '../components/lib/Button';
import './Home.scss';

const Home = () => {
    const items = [
        {
            img: 'https://docs.manage-invite.xyz/img/example-invites.png',
            title: 'Track regular, bonus, fake and leaves invites!',
            description: 'ManageInvite counts the invites and is able to categorize them, in 4 different types : the regular invites, when a member invites someone else in the server, the bonus ones, when an administrator adds invites to an account, the fake invites, when a member tries to invite the same person twice to gain more invites and the leave invites, when someone invited by the member left the server.'
        },
        {
            img: 'https://docs.manage-invite.xyz/img/example-sync.png',
            title: 'Easy migration from another bot!',
            description: 'You want to use ManageInvite but you were using another bot before? No problem, ManageInvite can automatically retrieve the majority of the invitations already existing on your server so the members don\'t lose all their invites.\n\nClick here to learn more about this command 🚀'
        },
        {
            img: 'https://docs.manage-invite.xyz/img/example-ranks-conf.png',
            title: 'Advanced configuration',
            description: 'ManageInvite allows you to go very far in configuring the bot. You can modify many parameters so that the bot can perfectly meet your needs and work as you wish. All the settings are explained in the documentation and our team is available to answer your question on Discord if you can not find what you are looking for.'
        }
    ];

    return (
        <div>
            <div className="banner">
                <div className="banner-elements">
                    <img className="img" src={`${process.env.PUBLIC_URL}/assets/logo.png`} alt="Logo" height="200px" />
                    <h1>ManageInvite</h1>
                    <p>
                        Stable, powerful and modern Discord bot to manage your server invites 🚀
                    </p>
                    <Button className="button banner-btn">
                        <h3>Add to Discord</h3>
                    </Button>
                    <Button className="button banner-btn">
                        <h3>Login</h3>
                    </Button>
                </div>
            </div>

            <div style={{
                margin: '2rem'
            }}
            >
                <div style={{
                    maxWidth: '1280px',
                    margin: '0 auto'
                }}
                >
                    <h2>Some features</h2>
                </div>
                {items.map((item, idx) => (
                    <div className="feature-pres">
                        {idx % 2 === 0 ? (
                            <>
                                <img
                                    style={{
                                        borderRadius: '10px'
                                    }}
                                    src={item.img}
                                    alt="Invites"
                                />

                                <div className="right">
                                    <h3>{item.title}</h3>
                                    <p>
                                        {item.description}
                                    </p>
                                </div>
                            </>
                        ) : (
                            <>
                                <div>
                                    <h3>{item.title}</h3>
                                    <p>
                                        {item.description}
                                    </p>
                                </div>
                                <img
                                    className="right"
                                    style={{
                                        borderRadius: '10px'
                                    }}
                                    src={item.img}
                                    alt="Invites"
                                />
                            </>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;
