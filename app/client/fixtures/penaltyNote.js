import React, { Component, PropTypes } from 'react';

export default class PenaltyNote extends Component {
    render() {
        const { prediction } = this.props;

        if(prediction.wildcard && prediction.wildcard.type === 'penalty-points' &&
            prediction.fixture.homePenalties && prediction.fixture.awayPenalties) {

            var penaltiesPoints = prediction.fixture.homePenalties + prediction.fixture.awayPenalties;

            return <span className="note-text">Note: Includes ${penaltiesPoints} points from penalties scored minus penalties missed in this game.</span>
        }

        return <span></span>
    }
}

PenaltyNote.defaultProps = {
    prediction: { wildcard: { type: null }, fixture: { homePenalties: 0, awayPenalties: 0 } }
};

PenaltyNote.propTypes = {
    prediction: PropTypes.object.isRequired
};