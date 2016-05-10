import React, { Component, PropTypes } from 'react'
import moment from 'moment'
import Prediction from './prediction'
import Wildcard from './wildcard'

export default class Fixture extends Component {
    render() {
        const { prediction, onPredictionChange, onShowWildcardSelector } = this.props;

        return (
            <li className="fixture">
                <div className="teams-col">
                    <div className="team">
                        <div className="flag">
                            <img className="flag-icon"
                                 src={"/assets/images/flags/" + prediction.fixture.homeTeam + ".png"}>
                            </img>
                        </div>
                        <div className="name">{prediction.fixture.homeTeam}</div>
                    </div>
                    <div className="versus">vs</div>
                    <div className="team">
                        <div className="flag">
                            <img className="flag-icon"
                                 src={"/assets/images/flags/" + prediction.fixture.awayTeam + ".png"}>
                            </img>
                        </div>
                        <div className="name">{prediction.fixture.awayTeam}</div>
                    </div>
                </div>
                <Prediction {...this.props}/>
                <Wildcard {...this.props}/>
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
    onPredictionChange: PropTypes.func.isRequired,
    onShowWildcardSelector: PropTypes.func.isRequired
};