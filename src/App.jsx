import React from 'react';
import './App.css';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import { StoreProvider } from 'easy-peasy';
import { ToastContainer } from 'react-toastify';
import Home from './pages/Home';
import NavigationBar from './components/layout/NavigationBar';
import store from './store';
import Servers from './pages/Servers';
import ServerHome from './pages/ServerHome';
import Footer from './components/layout/Footer';
import NotFound from './pages/NotFound';
import ProtectedRoute from './components/utils/ProtectedRoute';
import ServerSettings from './pages/ServerSettings';
import LoggingMessages from './pages/LoggingMessages';
import Premium from './pages/Premium';
import Status from './pages/Status';
import ApiToken from './pages/ApiToken';
import Leaderboard from './pages/Leaderboard';
import Alerts from './pages/Alerts';

const App = () => (
    <StoreProvider store={store}>
        <Router>
            <div className="page-content">
                <NavigationBar />
                <Switch>
                    <ProtectedRoute path="/servers/:id/leaderboard" exact component={Leaderboard} fetchServers serverPermissionsProtection />
                    <ProtectedRoute path="/servers/:id/api" exact component={ApiToken} fetchServers serverPermissionsProtection />
                    <ProtectedRoute path="/servers/:id/premium" exact component={Premium} fetchServers serverPermissionsProtection />
                    <ProtectedRoute path="/servers/:id/messages" exact component={LoggingMessages} fetchServers serverPermissionsProtection />
                    <ProtectedRoute path="/servers/:id/alerts" exact component={Alerts} fetchServers serverPermissionsProtection />
                    <ProtectedRoute path="/servers/:id/settings" exact component={ServerSettings} fetchServers serverPermissionsProtection />
                    <ProtectedRoute path="/servers/:id" exact component={ServerHome} fetchServers serverPermissionsProtection />
                    <ProtectedRoute path="/servers" exact component={Servers} />
                    <Route path="/status" exact component={Status} />
                    <Route path="/" exact component={Home} />
                    <Route path="*" component={NotFound} />
                </Switch>
                <ToastContainer position="bottom-right" />
            </div>
            <Footer />
        </Router>
    </StoreProvider>
);

export default App;
