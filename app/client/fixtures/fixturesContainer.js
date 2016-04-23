import React, { Component, PropTypes } from 'react';
import request from 'axios';
import { connect } from 'react-redux';
import Fixture from './fixture';
import _ from 'lodash';
import RoundSelector from '../roundSelector/roundSelector';
import LeaderTable from '../leaderTable/leaderTable';

class FixturesContainer extends Component {
    constructor(props) {
        super(props);

        this.autoSaveDebounce = _.debounce(this.onAutoSave, 5000);
    }

    componentDidMount() {
        const { dispatch, token } = this.props;
        return dispatch(this.fetchState(token));
    }

    fetchState(token) {
        return dispatch => {
            this.loadPredictions(token, dispatch);
            this.loadRounds(token, dispatch);
            this.loadLeaderTables(token, dispatch);
        };
    }

    loadPredictions(token, dispatch) {
        return request('/predictions', {
            headers: { authorization: token }
        })
        .then(response => dispatch({
            type: 'LOAD_PREDICTIONS',
            predictions: response.data
        }));
    }

    loadLeaderTables(token, dispatch) {
        return request('/leaderTables', {
            headers: { authorization: token }
        })
        .then(response => dispatch({
            type: 'LOAD_LEADER_TABLES',
            leaderTables: response.data
        }));
    }

    loadRounds(token, dispatch) {
        return request('/rounds', {
            headers: { authorization: token }
        })
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
        const { dispatch, token, predictions } = this.props;
        
        return request('/predictions', {
            method: 'post',
            headers: { authorization: token },
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

    render() {
        const { predictions, autoSaving, rounds, leaderTables } = this.props;

        const currentRoundId = rounds.current ? rounds.current._id : null;
        const currentRoundName = rounds.current ? rounds.current.name : '';
        const currentPredictions = predictions
            .filter(p => p.fixture.roundId === currentRoundId);
        const foundLeaderTables = leaderTables
            .filter(t => t.roundId === currentRoundId);
        const currentLeaderTable = foundLeaderTables.length === 0 ? undefined : foundLeaderTables[0];

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
                    <div className="col-xs-4">
                        <LeaderTable leaderTable={currentLeaderTable} roundName={currentRoundName}/>
                    </div>
                </div>
            </div>
        )
    }
}

FixturesContainer.propTypes = {
    //token: PropTypes.string.isRequired,
    predictions: PropTypes.array.isRequired,
    autoSaving: PropTypes.bool.isRequired,
    rounds: PropTypes.object.isRequired,
    leaderTables: PropTypes.array.isRequired
};

function mapStateToProps(state) {
    return {
        token: state.auth.token,
        predictions: state.predictions,
        autoSaving: state.autoSaving,
        rounds: state.rounds,
        leaderTables: state.leaderTables
    }
}

export default connect(mapStateToProps)(FixturesContainer)