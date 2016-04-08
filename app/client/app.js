import {} from './style.scss'

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory, hashHistory } from 'react-router';
import Layout from './layout';
import Login from './login/loginForm';
import Registration from './registration/registerForm';
import Fixtures from './fixtures/fixtures';
import configureStore from './configureStore'


// var reducers = {
//     form: formReducer,
//     auth: function(state = { }, action) {
//         switch(action.type) {
//             case 'ADD_TOKEN':
//                 return Object.assign(state, { token: action.token });
//             default:
//                 return state;
//         }
//     }
// };
//
// var reducer = combineReducers(reducers);
//
// const store = (window.devToolsExtension ?
//     window.devToolsExtension()(createStore) :
//     createStore)(reducer);

const store = configureStore();

render(
    <Provider store={store}>
        <Router history={hashHistory}>
            <Route path="/" component={Layout}>
                <Route path="login" component={Login}/>
                <Route path="registration" component={Registration}/>
                <Route path="fixtures" component={Fixtures}/>
            </Route>
        </Router>
    </Provider>,
    document.getElementById('app')
);

if (module.hot) {
    module.hot.accept();
}