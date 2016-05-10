import React, { Component, PropTypes } from 'react';

export default class Prediction extends Component {
    render() {
        const { prediction, onShowWildcardSelector } = this.props;

        if(!prediction.editable && prediction.wildcard) {
            return (
                <div className="wildcard-col">
                    <div className="wildcard-holder wildcard-not-editable">
                        <img className="wildcard-icon" src={`./assets/images/wildcards/${prediction.wildcard.type}-small.png`} alt={prediction.wildcard.type}/>
                    </div>
                </div>
            )
        } else if(prediction.editable && prediction.wildcard) {
            return (
                <div className="wildcard-col">
                    <div className="wildcard-selector" onClick={onShowWildcardSelector}>
                        <img className="wildcard-icon" src={`./assets/images/wildcards/${prediction.wildcard.type}-small.png`} alt={prediction.wildcard.type}/>
                    </div>
                </div>
            )
        } else if(!prediction.editable && !prediction.wildcard) {
            return (
                <div className="wildcard-col"></div>
            )
        } else {
            return (
                <div className="wildcard-col">
                    <div className="wildcard-selector" onClick={onShowWildcardSelector}>
                        <span className="octicon octicon-plus"></span>
                    </div>
                </div>
            )
        }
    }
}

Prediction.propTypes = {
    prediction: PropTypes.object.isRequired,
    onShowWildcardSelector: PropTypes.func.isRequired
};