import React, { Component, PropTypes } from 'react';

export default class Team extends Component {
    getTeamImageSrc(teamName) {
        if(teamName.length === 3) {
            return `/assets/images/flags/${teamName}.png`
        }

        return '/assets/images/flags/default.png'
    }

    render() {
        const { prediction } = this.props;

        return (
            <div className="teams-col">
                <div className="team">
                    <div className="flag" data-toggle="tooltip" data-placement="bottom" title={prediction.fixture.homeTeam}>
                        <img className="flag-icon"
                             src={this.getTeamImageSrc(prediction.fixture.homeTeam)}>
                        </img>
                    </div>
                    <div className="name">{prediction.fixture.homeTeam}</div>
                </div>
                <div className="versus">vs</div>
                <div className="team">
                    <div className="flag" data-toggle="tooltip" data-placement="bottom" title={prediction.fixture.awayTeam}>
                        <img className="flag-icon"
                             src={this.getTeamImageSrc(prediction.fixture.awayTeam)}>
                        </img>
                    </div>
                    <div className="name">{prediction.fixture.awayTeam}</div>
                </div>
            </div>
        )
    }
}

Team.propTypes = {
    prediction: PropTypes.object.isRequired
};