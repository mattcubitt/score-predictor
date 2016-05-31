import React, { Component, PropTypes } from 'react';
import Prediction from './prediction';
import Wildcard from './wildcard';
import Calender from './calender';
import Team from './team';
import Points from './points';

export default class FixtureRow extends Component {
    render() {
        return (
            <li className="fixture">
                <Team {...this.props}/>
                <Prediction {...this.props}/>
                <Wildcard {...this.props}/>
                <Calender {...this.props}/>
                <Points {...this.props}/>
            </li>
        )
    }
}