import React, { Component, PropTypes } from 'react';

export default class TopBar extends Component {
    render() {
        const { } = this.props;

        return (
            <div className="fluid-container">
                <div className="top-bar">
                    <div className="container">
                        <div className="top-bar-logo"></div>
                        <div className="top-bar-title">Euro 2016 Predictor</div>
                    </div>
                </div>
            </div>
        )
    }
}

TopBar.propTypes = { };