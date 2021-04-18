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

const App = () => (
    <StoreProvider store={store}>
        <Router>
            <div className="page-content">
                <NavigationBar />
                <Switch>
                    <Route path="/servers/:id" component={ServerSettings} />
                    <Route path="/servers" component={Servers} />
                    <Route path="/" component={Home} />
                </Switch>
            </div>
            <Footer />
        </Router>
    </StoreProvider>
);

export default App;
