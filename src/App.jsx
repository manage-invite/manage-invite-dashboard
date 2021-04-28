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

const App = () => (
    <StoreProvider store={store}>
        <Router>
            <div className="page-content">
                <NavigationBar />
                <Switch>
                    <ProtectedRoute path="/servers/:id/messages" exact component={LoggingMessages} fetchServers serverPermissionsProtection />
                    <ProtectedRoute path="/servers/:id/settings" exact component={ServerSettings} fetchServers serverPermissionsProtection />
                    <ProtectedRoute path="/servers/:id" exact component={ServerHome} fetchServers serverPermissionsProtection />
                    <ProtectedRoute path="/servers" exact component={Servers} />
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
