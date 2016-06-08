import React, { Component, PropTypes } from 'react';

export default class Team extends Component {
    getTeamImageSrc(teamName) {
        if(teamName.length === 3) {
            return `/assets/images/flags/${teamName}.png`
        }

        return '/assets/images/flags/default.png'
    }

    getTeamName(team) {
        switch(team) {
            case 'FRA':
                return 'France';
            case 'ROU':
                return 'Romania';
            case 'ALB':
                return 'Albania';
            case 'SUI':
                return 'Switzerland';
            case 'WAL':
                return 'Wales';
            case 'SVK':
                return 'Slovakia';
            case 'ENG':
                return 'England';
            case 'RUS':
                return 'Russia';
            case 'TUR':
                return 'Turkey';
            case 'CRO':
                return 'Croatia';
            case 'POL':
                return 'Poland';
            case 'GER':
                return 'Germany';
            case 'ESP':
                return 'Spain';
            case 'CZE':
                return 'Czech Republic';
            case 'IRL':
                return 'Republic of Ireland';
            case 'BEL':
                return 'Belgium';
            case 'ITA':
                return 'Italy';
            case 'AUT':
                return 'Austria';
            case 'HUN':
                return 'Hungary';
            case 'POR':
                return 'Portugal';
            case 'ISL':
                return 'Iceland';
            case 'UKR':
                return 'Ukraine';
            case 'NIR':
                return 'Northern Ireland';
            default:
                return team;
        }
    }

    render() {
        const { prediction } = this.props;

        return (
            <div className="teams-col">
                <div className="team">
                    <div className="flag" data-toggle="tooltip" data-placement="bottom" title={this.getTeamName(prediction.fixture.homeTeam)}>
                        <img className="flag-icon"
                             src={this.getTeamImageSrc(prediction.fixture.homeTeam)}>
                        </img>
                    </div>
                    <div className="name">{prediction.fixture.homeTeam}</div>
                </div>
                <div className="versus">vs</div>
                <div className="team">
                    <div className="flag" data-toggle="tooltip" data-placement="bottom" title={this.getTeamName(prediction.fixture.awayTeam)}>
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