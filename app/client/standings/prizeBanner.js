import React, { Component, PropTypes } from 'react';

export default class PrizeBanner extends Component {

    render() {
        return (
            <div className="prize-banner">
                <div className="prize-message">Why you should take your predictions seriously!!!</div>
                <div className="prize-container">
                    <div className="row">
                        <div className="col-xs-3 prize-item">
                            <div className="prize-icon"></div>
                            <div className="prize-title">Some Price</div>
                            <div className="prize-description">Some description about the prize</div>
                        </div>
                        <div className="col-xs-3 prize-item">
                            <div className="prize-icon"></div>
                            <div className="prize-title">Some Price</div>
                            <div className="prize-description">Some description about the prize</div>
                        </div>
                        <div className="col-xs-3 prize-item">
                            <div className="prize-icon"></div>
                            <div className="prize-title">Some Price</div>
                            <div className="prize-description">Some description about the prize</div>
                        </div>
                        <div className="col-xs-3 prize-item">
                            <div className="prize-icon"></div>
                            <div className="prize-title">Some Price</div>
                            <div className="prize-description">Some description about the prize</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}