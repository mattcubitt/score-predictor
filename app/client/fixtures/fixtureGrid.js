import React, { Component, PropTypes } from 'react';
import FixtureHeader from './fixtureHeader';
import FixtureRow from './fixtureRow';

export default class FixtureGrid extends Component {
    render() {
        const { currentPredictions, currentRoundId, autoSaving, onPredictionChange, onShowWildcardSelector } = this.props;

        if(currentPredictions.length === 0) {
            return <div></div>
        }

        return (
            <div>
                <div className="saving-status">{ autoSaving ? 'Saving...' : 'All changes saved'}</div>
                <ul className="fixtures">
                    <FixtureHeader/>
                    {
                        currentPredictions
                            .filter(p => p.fixture.roundId === currentRoundId)
                            .sort((p1, p2) => {
                                var date1 = new Date(p1.fixture.startsOn).getTime();

                                var date2 = new Date(p2.fixture.startsOn).getTime();

                                return date1 > date2 ? 1 : -1;
                            })
                            .map(prediction => {
                                return <FixtureRow
                                    key={prediction._id}
                                    prediction={prediction}
                                    onPredictionChange={onPredictionChange}
                                    onShowWildcardSelector={ () => onShowWildcardSelector(prediction)}
                                />;
                            })
                    }
                    <li className="fixture points-total">
                        Total: { currentPredictions.map(p => isNaN(p.points) ? 0 : p.points).reduce((a, b) => a + b, 0) }
                    </li>
                </ul>
                <div className="result-note">Note: Result includes score after 90 minutes and extra time if applicable.</div>
            </div>
        )
    }
}

FixtureGrid.propTypes = {
    currentPredictions: PropTypes.array.isRequired,
    autoSaving: PropTypes.bool.isRequired,
    onPredictionChange: PropTypes.func.isRequired,
    onShowWildcardSelector: PropTypes.func.isRequired
};