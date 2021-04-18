import React from 'react';
import './App.css';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import { StoreProvider } from 'easy-peasy';
import Home from './pages/Home';
import NavigationBar from './components/NavigationBar';
import store from './store';
import Servers from './pages/Servers';
import ServerSettings from './pages/ServerSettings';
import Footer from './components/Footer';
import NotFound from './pages/NotFound';
import ProtectedRoute from './components/ProtectedRoute';

const App = () => (
    <StoreProvider store={store}>
        <Router>
            <div className="page-content">
                <NavigationBar />
                <Switch>
                    <ProtectedRoute path="/servers/:id/settings" exact component={ServerSettings} fetchServers serverPermissionsProtection />
                    <ProtectedRoute path="/servers/:id" exact component={ServerSettings} fetchServers serverPermissionsProtection />
                    <ProtectedRoute path="/servers" exact component={Servers} />
                    <Route path="/" exact component={Home} />
                    <Route path="*" component={NotFound} />
                </Switch>
            </div>
            <Footer />
        </Router>
    </StoreProvider>
);

export default App;
