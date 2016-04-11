import React, { Component, PropTypes } from 'react';
import request from 'axios';
import { connect } from 'react-redux';
import Fixture from './fixture';

function fetch(token) {
    return dispatch => {
        return request('/predictions', {
                headers: { authorization: token }
            })
            .then(response => {
                return dispatch({
                    type: 'LOAD_PREDICTIONS',
                    predictions: response.data
                });
            });
    }
}

class Fixtures extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const { dispatch, token } = this.props;
        return dispatch(fetch(token));
    }

    onPredictionChange(prediction, score, property) {
        const { dispatch } = this.props;

        return dispatch({
            type: 'UPDATE_PREDICTION',
            id: prediction._id,
            score,
            property
        });
    }

    onStartedAutoSave() {
        this.props.dispatch({
            type: 'STARTED_AUTOSAVE'
        });
    }

    onAutoSave(prediction) {
        const { dispatch, token } = this.props;

        return request('/predictions', {
            method: 'put',
            headers: { authorization: token },
            data: prediction
        })
        .then(() => dispatch({
            type: 'FINISHED_AUTOSAVE'
        }))
    }

    render() {
        const { predictions, autoSaving } = this.props;

        return (
            <div>
                <div className="row">
                    <div className="col-xs-12 text-xs-center">
                        header goes here
                    </div>
                </div>
                <div className="row">
                    <div className="col-xs-12 col-md-8">
                        <div className="saving-status">{ autoSaving ? 'Saving...' : 'All changes saved'}</div>
                        <ul className="fixtures">
                            {
                                predictions.map(prediction => {
                                    return <Fixture
                                        key={prediction._id}
                                        prediction={prediction}
                                        onPredictionChange={this.onPredictionChange.bind(this)}
                                        onStartedAutoSave={this.onStartedAutoSave.bind(this)}
                                        onAutoSave={this.onAutoSave.bind(this)}
                                    />;
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
    autoSaving: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
    return {
        token: state.auth.token,
        predictions: state.predictions,
        autoSaving: state.autoSaving
    }
}

export default connect(mapStateToProps)(Fixtures)