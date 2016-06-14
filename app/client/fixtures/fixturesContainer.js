import React, { Component, PropTypes, CSSTransitionGroup } from 'react';
import request from 'axios';
import { connect } from 'react-redux';
import _ from 'lodash';
import RoundSelector from '../roundSelector/roundSelector';
import CollapsibleLeaderTable from '../leaderTable/collapsibleLeaderTable';
import WildcardSelector from './wildcardSelector';
import FixtureGrid from './fixtureGrid';
import { Transition } from 'react-motion-ui-pack';

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
            this.loadState(dispatch, '/predictions', 'LOAD_PREDICTIONS');
            this.loadState(dispatch, '/leaderTables', 'LOAD_LEADER_TABLES');
            this.loadState(dispatch, '/rounds', 'LOAD_ROUNDS');
            this.setActiveRoute(dispatch);
        };
    }

    setActiveRoute(dispatch) {
        dispatch({
            type: 'SET_ACTIVE_ROUTE',
            route: 'FIXTURES'
        });
    }

    loadState(dispatch, resource, type) {
        return request(resource)
            .then(response => dispatch({
                type: type,
                data: response.data
            }));
    }

    onPredictionChange(prediction, score, property) {
        const { dispatch } = this.props;

        var scoreInt = parseInt(score);

        if((score.length > 2 || isNaN(scoreInt) || scoreInt < 0) && score !== '') {
            score = prediction[property];
        }

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

    onShowWildcardSelector(prediction) {
        const { dispatch } = this.props;

        dispatch({
            type: 'UPDATE_PREDICTION_WILDCARDLOADING',
            id: prediction._id,
            loading: true
        });

        return request('/wildcards', {
            method: 'get'
        })
        .then((response) => {
            dispatch({
                type: 'UPDATE_PREDICTION_WILDCARDLOADING',
                id: prediction._id,
                loading: false
            });

            dispatch({
                type: 'OPEN_WILDCARD_SELECTOR',
                prediction,
                wildcards: response.data
            });
        });
    }

    onCloseWildcardSelector() {
        const { dispatch } = this.props;

        dispatch({
            type: 'CLOSE_WILDCARD_SELECTOR'
        });
    }

    onSaveWildcardSelector() {
        const { dispatch, wildcardSelector } = this.props;

        const selectedWildcard = wildcardSelector.wildcards.filter(w => w.selected)[0];
        const predictionId = wildcardSelector.predictionId;

        if(selectedWildcard !== undefined) {
            return this.saveWildcard(dispatch, predictionId, selectedWildcard);
        }

        return this.deleteWildcard(dispatch, predictionId, selectedWildcard);
    }

    saveWildcard(dispatch, predictionId, selectedWildcard) {
        return request(`/predictions/${predictionId}/wildcards`, {
            method: 'post',
            data: selectedWildcard
        })
        .then(() => {
            dispatch({
                type: 'SAVE_PREDICTION_WILDCARD',
                predictionId,
                selectedWildcard
            });

            dispatch({
                type: 'CLOSE_WILDCARD_SELECTOR'
            });
        });
    }

    deleteWildcard(dispatch, predictionId, selectedWildcard) {
        return request(`/predictions/${predictionId}/wildcards`, {
            method: 'delete'
        })
        .then(() => {
            dispatch({
                type: 'SAVE_PREDICTION_WILDCARD',
                predictionId,
                selectedWildcard
            });

            dispatch({
                type: 'CLOSE_WILDCARD_SELECTOR'
            });
        });
    }

    onSelectWildcard(wildcard) {
        const { dispatch } = this.props;

        dispatch({
            type: 'SELECT_WILDCARD',
            wildcard
        })
    }

    onToggleTableCollapse(leaderTableId) {
        const { dispatch } = this.props;

        dispatch({
            type: 'TOGGLE_TABLE_COLLAPSE',
            leaderTableId
        })
    }

    render() {
        const { predictions, autoSaving, rounds, leaderTables, wildcardSelector, user } = this.props;

        const currentRoundId = rounds.current ? rounds.current._id : null;
        const currentRoundName = rounds.current ? rounds.current.name : '';
        const currentPredictions = predictions
            .filter(p => p.fixture.roundId === currentRoundId);
        const foundLeaderTables = leaderTables
            .filter(t => t.roundId === currentRoundId);
        const currentLeaderTable = foundLeaderTables.length === 0 ? undefined : foundLeaderTables[0];

        const gridProps = {
            currentPredictions,
            currentRoundId,
            autoSaving,
            onPredictionChange: this.onPredictionChange.bind(this),
            onShowWildcardSelector: this.onShowWildcardSelector.bind(this)
        };

        return (
            <div>
                <WildcardSelector
                    wildcardSelector={wildcardSelector}
                    onSaveWildcardSelector={this.onSaveWildcardSelector.bind(this)}
                    onCloseWildcardSelector={this.onCloseWildcardSelector.bind(this)}
                    onSelectWildcard={this.onSelectWildcard.bind(this)}
                />
                <div className="row">
                    <div className="col-xs-12 text-xs-center">
                        <RoundSelector rounds={rounds}
                                       onPreviousRoundClick={this.onPreviousRoundClick.bind(this)}
                                       onNextRoundClick={this.onNextRoundClick.bind(this)}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12 col-lg-8">
                        <FixtureGrid {...gridProps} key={currentRoundName} />
                    </div>
                    <div className="col-md-12 col-lg-4">
                        <CollapsibleLeaderTable leaderTable={currentLeaderTable}
                                                user={user}
                                                roundName={currentRoundName}
                                                key={currentRoundName}
                                                collapsible={true}
                                                onToggleTableCollapse={() => this.onToggleTableCollapse(currentLeaderTable._id)}
                        />
                    </div>
                </div>
            </div>
        )
    }
}

FixturesContainer.defaultProps = {
    wildcardSelector: { wildcards: [] }
};

FixturesContainer.propTypes = {
    predictions: PropTypes.array.isRequired,
    autoSaving: PropTypes.bool.isRequired,
    rounds: PropTypes.object.isRequired,
    leaderTables: PropTypes.array.isRequired,
    wildcardSelector: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        predictions: state.predictions,
        autoSaving: state.autoSaving,
        rounds: state.rounds,
        leaderTables: state.leaderTables,
        wildcardSelector: state.wildcardSelector,
        user: state.user
    }
}

export default connect(mapStateToProps)(FixturesContainer)