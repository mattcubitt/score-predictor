import React from 'react'
import { Router, Route, browserHistory, IndexRoute } from 'react-router'
import App from './app'
import FixtureList from './fixtureList'
import Login from './login'

module.exports = (
  <Route path="/" component={App}>
    <IndexRoute component={Login}/>
    <Route path="/fixtureList" component={FixtureList}/>
  </Route>
)
