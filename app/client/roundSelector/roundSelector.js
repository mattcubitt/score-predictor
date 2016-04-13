import React, { Component, PropTypes } from 'react';

export default class RoundSelector extends Component {
    render() {
        const { rounds, onPreviousRoundClick, onNextRoundClick } = this.props;
        const name = rounds.current ? rounds.current.name : '';

        return (
            <div>
                <div className="round-selector">
                    <div className="round-toggle" onClick={onPreviousRoundClick.bind(this)}>
                        <div className="left-arrow"></div>
                    </div>
                    <div className="round-name">{name}</div>
                    <div className="round-toggle" onClick={onNextRoundClick.bind(this)}>
                        <div className="right-arrow">
                        </div>
                    </div>
                </div>
                <div className="round-divider"></div>
            </div>
        )
    }
}

RoundSelector.propTypes = {
    //token: PropTypes.string.isRequired,
    rounds: PropTypes.object.isRequired,
    onPreviousRoundClick: PropTypes.func.isRequired,
    onNextRoundClick: PropTypes.func.isRequired
};