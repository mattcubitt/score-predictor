import React, { Component, PropTypes } from 'react';

export default class Prediction extends Component {
    render() {
        const { prediction, onPredictionChange } = this.props;

        return (
            <div className="prediction-col">
                <div className="prediction-input">
                    {
                        !prediction.editable ?
                            <div className="readonly">{prediction.homeScore}</div> :
                            <input type="text"
                                   onChange={(event) => onPredictionChange(prediction, event.target.value, 'homeScore')}
                                   value={prediction ? prediction.homeScore : ''}/>
                    }
                </div>
                <div className="dash">
                    <span>–</span>
                </div>
                <div className="prediction-input">
                    {
                        !prediction.editable ?
                            <div className="readonly">{prediction.awayScore}</div> :
                            <input type="text"
                                   onChange={(event) => onPredictionChange(prediction, event.target.value, 'awayScore')}
                                   value={prediction ? prediction.awayScore : ''}/>
                    }
                </div>
            </div>
        )
    }
}

Prediction.propTypes = {
    prediction: PropTypes.object.isRequired
};