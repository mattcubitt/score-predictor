import React, { Component, PropTypes } from 'react';
import moment from 'moment';

export default class Calender extends Component {
    render() {
        const { prediction } = this.props;

        return (
            <div className="calender-col">
                {
                    prediction.editable
                        ?
                        <div className="calender">
                            <div className="time">{moment(prediction.fixture.startsOn).format('HH:mm')}</div>
                            <div className="date">{moment(prediction.fixture.startsOn).format('DD MMM')}</div>
                        </div>
                        :
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
                }
            </div>
        )
    }
}

Calender.propTypes = {
    prediction: PropTypes.object.isRequired
};