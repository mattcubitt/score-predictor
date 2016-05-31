import React, { Component, PropTypes } from 'react';

export default class FixtureHeader extends Component {
    render() {
        return (
            <li className="fixture fixture-header">
                <div className="teams-col">
                    Fixtures
                </div>
                <div className="prediction-col">
                    Predictions
                </div>
                <div className="wildcard-col">
                    Wildcards
                </div>
                <div className="calender-col">
                    Results
                </div>
                <div className="points-col">
                    Points
                </div>
            </li>
        )
    }
}