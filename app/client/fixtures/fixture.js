import React, { Component, PropTypes } from 'react'
import moment from 'moment'
import Prediction from './prediction'
import Wildcard from './wildcard'

export default class Fixture extends Component {
    getTeamImageSrc(teamName) {
        if(teamName.length === 3) {
            return `/assets/images/flags/${teamName}.png`
        }

        return '/assets/images/flags/default.png'
    }

    getPredictionPoints(prediction) {
        if(prediction.editable) {
            return '–';
        } else {
            return prediction.points == null ? 0 : prediction.points;
        }
    }

    render() {
        const { prediction } = this.props;

        return (
            <li className="fixture">
                <div className="teams-col">
                    <div className="team">
                        <div className="flag">
                            <img className="flag-icon"
                                 src={this.getTeamImageSrc(prediction.fixture.homeTeam)}>
                            </img>
                        </div>
                        <div className="name">{prediction.fixture.homeTeam}</div>
                    </div>
                    <div className="versus">vs</div>
                    <div className="team">
                        <div className="flag">
                            <img className="flag-icon"
                                 src={this.getTeamImageSrc(prediction.fixture.awayTeam)}>
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
                        { this.getPredictionPoints(prediction) }
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