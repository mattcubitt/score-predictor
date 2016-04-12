import React, { Component, PropTypes } from 'react';

export default class RoundSelector extends Component {

    selectorFragment(rounds) {
        if(rounds.current){
            return <div className="round-selector">
                <div className="round-toggle"><div className="left-arrow"></div></div>
                <div className="round-name">{rounds.current.name}</div>
                <div className="round-toggle"><div className="right-arrow"></div></div>
            </div>
        }
    }

    render() {
        const { rounds } = this.props;

        return (
            <div>
                {this.selectorFragment(rounds)}
                <div className="round-divider"></div>
            </div>
        )
    }
}

RoundSelector.propTypes = {
    //token: PropTypes.string.isRequired,
    rounds: PropTypes.object.isRequired
};