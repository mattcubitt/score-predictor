import React, { Component, PropTypes } from 'react';
import moment from 'moment';

export default class Calender extends Component {
    render() {
        const { prediction } = this.props;

        if(prediction.editable) {
            return (
                <div className="calender-col">
                    <div className="calender">
                        <div className="time">{moment(prediction.fixture.startsOn).format('HH:mm')}</div>
                        <div className="date">{moment(prediction.fixture.startsOn).format('DD MMM')}</div>
                    </div>
                </div>
            )
        }

        if(prediction.fixture.homeScore === undefined && prediction.fixture.awayScore === undefined) {
            return (
                <div className="calender-col">
                    <div className="game-in-progress"><span className="hidden-xs-down">Waiting for result </span><img src="./assets/images/ripple.gif" alt="game in process"/></div>
                </div>
            )
        }

        return (
            <div className="calender-col">
                <div>
                    <div className="prediction-input result">
                        <div className="readonly">{prediction.fixture.homeScore}</div>
                    </div>
                    <div className="dash">
                        <span>–</span>
                    </div>
                    <div className="prediction-input result">
                        <div className="readonly">{prediction.fixture.awayScore}</div>
                    </div>
                </div>
            </div>
        )
    }
}

Calender.propTypes = {
    prediction: PropTypes.object.isRequired
};