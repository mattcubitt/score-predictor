import React, { Component, PropTypes } from 'react';
import request from 'axios';
import { connect } from 'react-redux';
import Fixture from './fixture';
import _ from 'lodash';
import RoundSelector from '../roundSelector/roundSelector';
import RoundLeaderTable from '../leaderTable/roundLeaderTable';

class FixturesContainer extends Component {
    constructor(props) {
        super(props);

        this.autoSaveDebounce = _.debounce(this.onAutoSave, 1000);
    }

    componentDidMount() {
        const { dispatch } = this.props;
        return dispatch(this.fetchState());
    }

    fetchState() {
        return dispatch => {
            this.loadPredictions(dispatch);
            this.loadRounds(dispatch);
            this.loadLeaderTables(dispatch);
            this.setActiveRoute(dispatch);
        };
    }

    setActiveRoute(dispatch) {
        dispatch({
            type: 'SET_ACTIVE_ROUTE',
            route: 'FIXTURES'
        });
    }

    //TODO: flatten
    loadPredictions(dispatch) {
        return request('/predictions')
            .then(response => dispatch({
                type: 'LOAD_PREDICTIONS',
                predictions: response.data
            }));
    }

    loadLeaderTables(dispatch) {
        return request('/leaderTables')
            .then(response => dispatch({
                type: 'LOAD_LEADER_TABLES',
                leaderTables: response.data
            }));
    }

    loadRounds(dispatch) {
        return request('/rounds')
            .then(response => dispatch({
                type: 'LOAD_ROUNDS',
                rounds: response.data
            }));
    }

    onPredictionChange(prediction, score, property) {
        const { dispatch } = this.props;

        this.autoSave();

        return dispatch({
            type: 'UPDATE_PREDICTION',
            id: prediction._id,
            score,
            property
        });
    }

    autoSave() {
        const { dispatch } = this.props;

        dispatch({
            type: 'STARTED_AUTOSAVE'
        });

        this.autoSaveDebounce();
    }

    onAutoSave() {
        const { dispatch, predictions } = this.props;
        
        return request('/predictions', {
            method: 'post',
            data: predictions
        })
        .then(() => dispatch({
            type: 'FINISHED_AUTOSAVE'
        }));
    }

    onPreviousRoundClick() {
        const { dispatch } = this.props;

        dispatch({
            type: 'PREVIOUS_ROUND'
        })
    }

    onNextRoundClick() {
        const { dispatch } = this.props;

        dispatch({
            type: 'NEXT_ROUND'
        })
    }

    renderBody(currentRoundName, currentPredictions, currentLeaderTable, currentRoundId, autoSaving) {
        if(currentPredictions.length === 0) {
            return(
                <div className="row">
                    <div className="col-xs-12 text-xs-center">
                        <h4 className="text-muted">This round doesn't have any fixtures yet. Come back later!</h4>
                    </div>
                </div>
            )
        }

        return(
            <div className="row">
                <div className="col-xs-12 col-md-8">
                    <div className="saving-status">{ autoSaving ? 'Saving...' : 'All changes saved'}</div>
                    <ul className="fixtures">
                        <li className="fixture fixture-header">
                            <div className="teams-col">
                                Fixtures
                            </div>
                            <div className="prediction-col">
                                Predictions
                            </div>
                            <div className="calender-col">
                                Results
                            </div>
                            <div className="points-col">
                                Points
                            </div>
                        </li>
                        {
                            currentPredictions
                                .filter(p => p.fixture.roundId === currentRoundId)
                                .map(prediction => {
                                    return <Fixture
                                        key={prediction._id}
                                        prediction={prediction}
                                        onPredictionChange={this.onPredictionChange.bind(this)}/>;
                                })
                        }
                        <li className="fixture points-total">
                            Total: { currentPredictions.map(p => p.points).reduce((a, b) => a + b, 0) }
                        </li>
                    </ul>
                </div>
                <div className="col-xs-12 col-md-4">
                    <RoundLeaderTable leaderTable={currentLeaderTable} roundName={currentRoundName}/>
                </div>
            </div>
        )
    }

    render() {
        const { predictions, autoSaving, rounds, leaderTables } = this.props;

        const currentRoundId = rounds.current ? rounds.current._id : null;
        const currentRoundName = rounds.current ? rounds.current.name : '';
        const currentPredictions = predictions
            .filter(p => p.fixture.roundId === currentRoundId);
        const foundLeaderTables = leaderTables
            .filter(t => t.roundId === currentRoundId);
        const currentLeaderTable = foundLeaderTables.length === 0 ? undefined : foundLeaderTables[0];

        if(predictions.length === 0) {
            return(<div></div>)
        }

        return (
            <div>
                <div className="row">
                    <div className="col-xs-12 text-xs-center">
                        <RoundSelector rounds={rounds}
                                       onPreviousRoundClick={this.onPreviousRoundClick.bind(this)}
                                       onNextRoundClick={this.onNextRoundClick.bind(this)}
                        />
                    </div>
                </div>
                { this.renderBody(currentRoundName, currentPredictions, currentLeaderTable, currentRoundId, autoSaving) }
            </div>
        )
    }
}

FixturesContainer.propTypes = {
    predictions: PropTypes.array.isRequired,
    autoSaving: PropTypes.bool.isRequired,
    rounds: PropTypes.object.isRequired,
    leaderTables: PropTypes.array.isRequired
};

function mapStateToProps(state) {
    return {
        predictions: state.predictions,
        autoSaving: state.autoSaving,
        rounds: state.rounds,
        leaderTables: state.leaderTables
    }
}

export default connect(mapStateToProps)(FixturesContainer)