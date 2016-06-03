import React, { Component, PropTypes } from 'react';
import Spinner from 'react-spinkit';

export default class Prediction extends Component {
    getWildcardDescription(type) {
        switch(type) {
            case 'clean-sheet-points':
                return '3 points for every clean sheet';
            case 'goals-points':
                return '1 point for every goal scored';
            case 'penalty-points':
                return '1 point for every penalty scored. -1 point for every penalty missed.';
            case 'triple-points':
                return 'Triple points for this game';
        }
    }

    render() {
        const { prediction, onShowWildcardSelector } = this.props;

        if(prediction.wildcardLoading) {
            return (
                <div className="wildcard-col">
                    <div className="wildcard-selector">
                        <Spinner spinnerName='pulse'/>
                    </div>
                </div>
            )
        } else if(!prediction.editable && prediction.wildcard) {
            return (
                <div className="wildcard-col">
                    <div className="wildcard-holder wildcard-not-editable">
                        <img className="wildcard-icon"
                             data-toggle="tooltip"
                             data-placement="bottom"
                             title={this.getWildcardDescription(prediction.wildcard.type)}
                             src={`./assets/images/wildcards/${prediction.wildcard.type}-small.png`}
                             alt={prediction.wildcard.type}/>
                    </div>
                </div>
            )
        } else if(prediction.editable && prediction.wildcard) {
            return (
                <div className="wildcard-col">
                    <div className="wildcard-selector" onClick={onShowWildcardSelector}>
                        <img className="wildcard-icon"
                             data-toggle="tooltip"
                             data-placement="bottom"
                             title={this.getWildcardDescription(prediction.wildcard.type)}
                             src={`./assets/images/wildcards/${prediction.wildcard.type}-small.png`}
                             alt={prediction.wildcard.type}/>
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