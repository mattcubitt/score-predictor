import React, { Component, PropTypes } from 'react';
import request from 'axios';
import { connect } from 'react-redux';
import Fixture from './fixture';
import _ from 'lodash'
import RoundSelector from '../roundSelector/roundSelector'

// function fetch(token) {
//
// }
//
// loadRounds() {
//     const { dispatch, token } = this.props;
//
//     return request('/rounds', {
//         headers: { authorization: token }
//     })
//         .then(response => dispatch({
//             type: 'LOAD_ROUNDS',
//             rounds: response.data
//         }));
// }

class Fixtures extends Component {
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

    loadRounds(token, dispatch) {
        return request('/rounds', {
            headers: { authorization: token }
        })
        .then(response => dispatch({
            type: 'LOAD_ROUNDS',
            rounds: response.data
        }));
    }

    // loadPredictions(token) {
    //     return dispatch => {
    //         return request('/predictions', {
    //             headers: { authorization: token }
    //         })
    //         .then(response => dispatch({
    //             type: 'LOAD_PREDICTIONS',
    //             predictions: response.data
    //         }))
    //         .then(this.loadRounds(token, dispatch));
    //     };
    // }
    //
    // loadRounds(token, dispatch) {
    //     return request('/rounds', {
    //         headers: { authorization: token }
    //     })
    //     .then(response => dispatch({
    //         type: 'LOAD_ROUNDS',
    //         rounds: response.data
    //     }));
    // }

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

    render() {
        const { predictions, autoSaving, rounds } = this.props;

        return (
            <div>
                <div className="row">
                    <div className="col-xs-12 text-xs-center">
                        <RoundSelector rounds={rounds}/>
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
                                predictions.map(prediction => {
                                    return <Fixture
                                        key={prediction._id}
                                        prediction={prediction}
                                        onPredictionChange={this.onPredictionChange.bind(this)}/>;
                                })
                            }
                        </ul>
                    </div>
                    <div className="col-xs-4 text-xs-center">
                        table goes here
                    </div>
                </div>
            </div>
        )
    }
}

Fixtures.propTypes = {
    //token: PropTypes.string.isRequired,
    predictions: PropTypes.array.isRequired,
    autoSaving: PropTypes.bool.isRequired,
    rounds: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        token: state.auth.token,
        predictions: state.predictions,
        autoSaving: state.autoSaving,
        rounds: state.rounds
    }
}

export default connect(mapStateToProps)(Fixtures)