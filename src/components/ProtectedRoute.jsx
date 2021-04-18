import { useStoreState, useStoreActions, useStoreRehydrated } from 'easy-peasy';
import React, { useEffect } from 'react';
import { matchPath, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import { fetchUserGuilds } from '../api';
import LoadingAnimation from './LoadingAnimation';
import NotFound from '../pages/NotFound';

const ProtectedRoute = ({
    component: Component, fetchServers, serverPermissionsProtection, ...rest
}) => {
    const storeRehydrated = useStoreRehydrated();
    const userJwt = useStoreState((state) => state.userSession.jwt);

    const guildsCache = useStoreState((state) => state.guildsCache.cache);
    const guildsCacheFetched = useStoreState((state) => state.guildsCache.fetched);
    // eslint-disable-next-line max-len
    const updateUserGuildsCache = useStoreActions((actions) => actions.guildsCache.update);

    const matchedPath = matchPath(window.location.pathname, {
        path: '/servers/:id',
        exact: false,
        strict: false
    });
    console.log(`Protected Route : Server ID: ${matchedPath?.params?.id}. Server Permissions Protection: ${serverPermissionsProtection}.`);

    useEffect(() => {
        if (userJwt && storeRehydrated && !guildsCacheFetched) {
            fetchUserGuilds(userJwt).then((guilds) => {
                updateUserGuildsCache(guilds);
            }).catch(() => {
                // TODO: catch error?
            });
        }
    }, [userJwt, storeRehydrated]);

    return (
        <Route
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...rest}
            render={() => {
                if (userJwt) {
                    if (fetchServers && !guildsCacheFetched) return <LoadingAnimation />;
                    if (
                        serverPermissionsProtection
                        && guildsCacheFetched
                        && !guildsCache
                            .find((guild) => guild.id === matchedPath?.params?.id)?.isAdmin
                    ) return <NotFound />;
                    return <Component />;
                }
                return (
                    storeRehydrated ? <LoadingAnimation /> : <NotFound />
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
