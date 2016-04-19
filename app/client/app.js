import './imports.scss'

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory, hashHistory } from 'react-router';
import Layout from './layout';
import Login from './login/loginForm';
import Registration from './registration/registerForm';
import FixturesContainer from './fixtures/fixturesContainer';
import AdminContainer from './admin/adminContainer'
import configureStore from './configureStore'

const store = configureStore();

render(
    <Provider store={store}>
        <Router history={hashHistory}>
            <Route path="/" component={Layout}>
                <Route path="login" component={Login}/>
                <Route path="registration" component={Registration}/>
                <Route path="fixtures" component={FixturesContainer}/>
                <Route path="admin" component={AdminContainer}/>
            </Route>
        </Router>
    </Provider>,
    document.getElementById('app')
);

if (module.hot) {
    module.hot.accept();
}