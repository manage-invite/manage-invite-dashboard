import { useStoreState, useStoreActions, useStoreRehydrated } from 'easy-peasy';
import React, { useEffect, useState } from 'react';
import { matchPath, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import { fetchUserGuilds } from '../../api';
import LoadingAnimation from './LoadingAnimation';
import NotFound from '../../pages/NotFound';
import Error from './Error';

const ProtectedRoute = ({
    component: Component, fetchServers, serverPermissionsProtection, ...rest
}) => {
    const storeRehydrated = useStoreRehydrated();
    const userJwt = useStoreState((state) => state.userSession.jwt);

    const guildsCache = useStoreState((state) => state.guildsCache.cache);
    const guildsCacheFetched = useStoreState((state) => state.guildsCache.fetched);
    const updateUserGuildsCache = useStoreActions((actions) => actions.guildsCache.update);
    const loginLoading = useStoreState((state) => state.userSession.loginLoading);

    const [errored, setErrored] = useState(false);

    const matchedPath = matchPath(window.location.pathname, {
        path: '/servers/:id',
        exact: false,
        strict: false
    });
    console.log(`Protected Route : Server ID: ${matchedPath?.params?.id}. Server Permissions Protection: ${serverPermissionsProtection}.`);

    const refetchUserGuilds = () => {
        setErrored(false);
        fetchUserGuilds(userJwt).then((guilds) => {
            updateUserGuildsCache(guilds);
        }).catch(() => {
            setErrored(true);
        });
    };

    useEffect(() => {
        if (userJwt && storeRehydrated && fetchServers && !guildsCacheFetched) refetchUserGuilds();
    }, [userJwt, storeRehydrated]);

    return (
        <Route
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...rest}
            render={() => {
                if (!userJwt && loginLoading && window.location.pathname === '/servers') {
                    return <Component />;
                }
                if (userJwt) {
                    if (fetchServers && !guildsCacheFetched) {
                        return errored
                            ? <Error retry={refetchUserGuilds} />
                            : <LoadingAnimation centered />;
                    }
                    if (
                        serverPermissionsProtection
                        && guildsCacheFetched
                        && !guildsCache
                            .find((guild) => guild.id === matchedPath?.params?.id)?.isAdmin
                    ) return <NotFound />;
                    return <Component />;
                }
                return (
                    !storeRehydrated ? <LoadingAnimation /> : <NotFound />
                );
            }}
        />
    );
};

ProtectedRoute.propTypes = {
    component: PropTypes.elementType.isRequired,
    fetchServers: PropTypes.bool,
    serverPermissionsProtection: PropTypes.bool
};

ProtectedRoute.defaultProps = {
    fetchServers: false,
    serverPermissionsProtection: false
};

export default ProtectedRoute;
