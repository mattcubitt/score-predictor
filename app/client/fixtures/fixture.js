import React, { Component, PropTypes } from 'react'
import moment from 'moment'

export default class Fixture extends Component {
    render() {
        const { prediction, onPredictionChange } = this.props;

        return (
            <li className="fixture">
                <div className="teams-col">
                    <div className="team">
                        <div className="flag">
                            <div className="flag-icon"></div>
                        </div>
                        <div className="name">{prediction.fixture.homeTeam}</div>
                    </div>
                    <div className="versus">vs</div>
                    <div className="team">
                        <div className="flag">
                            <div className="flag-icon"></div>
                        </div>
                        <div className="name">{prediction.fixture.awayTeam}</div>
                    </div>
                </div>
                <div className="prediction-col">
                    <div className="prediction-input">
                        {
                            !prediction.editable ?
                                <div className="readonly">{prediction.homeScore}</div> :
                                <input type="text"
                                       onChange={(event) => onPredictionChange(prediction, event.target.value, 'homeScore')}
                                       value={prediction ? prediction.homeScore : ''}/>
                        }
                    </div>
                    <div className="dash">
                        <span>–</span>
                    </div>
                    <div className="prediction-input">
                        {
                            !prediction.editable ?
                                <div className="readonly">{prediction.awayScore}</div> :
                                <input type="text"
                                       onChange={(event) => onPredictionChange(prediction, event.target.value, 'awayScore')}
                                       value={prediction ? prediction.awayScore : ''}/>
                        }
                    </div>
                </div>
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
                                <div className="prediction-input">
                                    <div className="readonly">{prediction.fixture.homeScore}</div>
                                </div>
                                <div className="dash">
                                    <span>–</span>
                                </div>
                                <div className="prediction-input">
                                    <div className="readonly">{prediction.fixture.awayScore}</div>
                                </div>
                            </div>
                    }
                </div>
                <div className="points-col">
                    <div className="points">
                        {
                            prediction && prediction.points ? prediction.points : '–'
                        }
                    </div>
                </div>
            </li>
        )
    }
}

Fixture.propTypes = {
    prediction: PropTypes.object.isRequired,
    onPredictionChange: PropTypes.func.isRequired
};