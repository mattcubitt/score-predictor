import './imports.scss'

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory, hashHistory } from 'react-router';
import Layout from './layout';
import LoginContainer from './login/loginContainer';
import RegistrationContainer from './registration/registrationContainer';
import FixturesContainer from './fixtures/fixturesContainer';
import AdminContainer from './admin/adminContainer'
import configureStore from './configureStore'
import UserStates from './user/userStates';
import request from 'axios';
import StandingsContainer from './standings/standingsContainer';
import RulesContainer from './rules/RulesContainer';

const store = configureStore();

request.interceptors.request.use((config) => {
    const state = store.getState();
    var user = state.user;

    if(user && user.token) {
        config.headers['authorization'] = user.token;
    }

    return config;
}, (e) => e);

request.interceptors.response.use((r) => r, (error) => {
    if(error.status !== 403) {
        return Promise.reject(error);
    }

    store.dispatch({
        type: 'CLEAR_USER'
    });

    localStorage.removeItem("user");

    hashHistory.push('/login');

    return Promise.reject(error);
});

var isAuthenticated = function(nextState, replaceState, callback) {
    const state = store.getState();

    if(state.user.state === UserStates.NOT_AUTHENTICATED) {
        replaceState({ nextPathname: nextState.location.pathname }, '/login')
    }

    callback();
};

var isAdmin = function(nextState, replaceState, callback) {
    const state = store.getState();

    if(state.user.role !== 'admin') {
        replaceState({ nextPathname: nextState.location.pathname }, '/login')
    }

    callback();
};

var updateUser = () => {
    const state = store.getState();
    var user = state.user;

    if(user.state === UserStates.AUTHENTICATED)
        return;

    if(typeof(Storage) === "undefined")
        return;

    user = JSON.parse(localStorage.getItem('user'));

    if(user === null || user.state === UserStates.NOT_AUTHENTICATED)
        return;

    store.dispatch({
        type: 'ADD_USER',
        user: user
    });
};

render(
    <Provider store={store}>
        <Router history={hashHistory}>
            <Route path="/" component={Layout} onEnter={updateUser}>
                <IndexRoute component={LoginContainer} />
                <Route name="login" path="login" component={LoginContainer}/>
                <Route path="/registration" component={RegistrationContainer}/>
                <Route path="/fixtures" component={FixturesContainer} onEnter={isAuthenticated}/>
                <Route path="/standings" component={StandingsContainer} onEnter={isAuthenticated}/>
                <Route path="/rules" component={RulesContainer} onEnter={isAuthenticated}/>
                <Route path="/admin" component={AdminContainer} onEnter={isAdmin}/>
            </Route>
        </Router>
    </Provider>,
    document.getElementById('app')
);

if (module.hot) {
    module.hot.accept();
}