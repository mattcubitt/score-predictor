import React from 'react'
import ReactDOM from 'react-dom'
import $ from 'jQuery'
import { Router, Route, hashHistory } from 'react-router'
import FixtureList from './fixtureList'
import Login from './login'
import NavBar from './navBar'

import { } from 'bootstrap'
import { } from 'bootstrap.css'

ReactDOM.render((
    <div>
        <NavBar></NavBar>
        <Router history={hashHistory}>
            <Route path="/" component={FixtureList}/>
            <Route path="/login" component={Login}/>
        </Router>
    </div>
), document.getElementById('app'));


//var Fixture = React.createClass({
//    render() {
//        var fixture = this.props.fixture;
//        var homeName = fixture.homeTeam.shortName;
//        var awayName = fixture.awayTeam.shortName;
//
//        return (
//            <div className="commentList">
//                {homeName} vs {awayName}
//            </div>
//        );
//    }
//});
//
//var FixtureList = React.createClass({
//    getInitialState: function() {
//        return {
//            fixtures: [{
//                homeTeam: {
//                    fullName: 'Germany',
//                    shortName: 'GER'
//                },
//                awayTeam: {
//                    fullName: 'England',
//                    shortName: 'ENG'
//                }
//            }, {
//                homeTeam: {
//                    fullName: 'Italy',
//                    shortName: 'ITA'
//                },
//                awayTeam: {
//                    fullName: 'Spain',
//                    shortName: 'SPA'
//                }
//            }, {
//                homeTeam: {
//                    fullName: 'Germany',
//                    shortName: 'GER'
//                },
//                awayTeam: {
//                    fullName: 'Spain',
//                    shortName: 'SPA'
//                }
//            }]
//        }
//    },
//    componentDidMount: function() {
//        //$.ajax({
//        //    url: '/api/fixtures',
//        //    dataType: 'json',
//        //    contentType: 'application/json; charset=UTF-8',
//        //    cache: false,
//        //    success: function(fixtures) {
//        //        this.setState({fixtures: fixtures});
//        //    }.bind(this),
//        //    error: function(xhr, status, err) {
//        //        console.error(this.props.url, status, err.toString());
//        //    }.bind(this)
//        //});
//    },
//    render() {
//        var fixtureNodes = this.state.fixtures.map((fixture) => {
//            return (
//                <Fixture fixture={fixture}/>
//            );
//        });
//        return (
//            <div className="fixtureList">
//                {fixtureNodes}
//            </div>
//        );
//    }
//});
//
//ReactDOM.render(
//    <FixtureList />,
//    document.getElementById('app')
//);