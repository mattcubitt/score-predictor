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

const store = configureStore();

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

render(
    <Provider store={store}>
        <Router history={hashHistory}>
            <Route path="/" component={Layout}>
                <IndexRoute component={LoginContainer} />
                <Route path="login" component={LoginContainer}/>
                <Route path="registration" component={RegistrationContainer}/>
                <Route path="fixtures" component={FixturesContainer} onEnter={isAuthenticated}/>
                <Route path="admin" component={AdminContainer} onEnter={isAdmin}/>
            </Route>
        </Router>
    </Provider>,
    document.getElementById('app')
);

if (module.hot) {
    module.hot.accept();
}