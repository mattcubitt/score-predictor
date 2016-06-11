import React, { Component, PropTypes } from 'react';

export default class Points extends Component {
    getPredictionPoints(prediction) {
        if(prediction.editable) {
            return '–';
        } else if(prediction.fixture.homeScore === undefined && prediction.fixture.awayScore === undefined) {
            return '';
        }
        else {
            return prediction.points
        }
    }

    render() {
        const { prediction } = this.props;

        return (
            <div className="points-col">
                <div className="points">
                    { this.getPredictionPoints(prediction) }
                </div>
            </div>
        )
    }
}

Points.propTypes = {
    prediction: PropTypes.object.isRequired
};