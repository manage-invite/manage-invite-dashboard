import React from 'react';
import './App.css';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import Home from './pages/Home';
import NavigationBar from './components/NavigationBar';

function App() {
    return (
        <Router>
            <NavigationBar />
            <Switch>
                <Route path="/" component={Home} />
            </Switch>
        </Router>
    );
}

export default App;
