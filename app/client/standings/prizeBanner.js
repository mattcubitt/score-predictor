import React, { Component, PropTypes } from 'react';

export default class PrizeBanner extends Component {

    render() {
        return (
            <div>
                <div className="prize-banner">
                    <div className="prize-message">Why you should take your predictions seriously!!!</div>
                    <div className="prize-container">
                        <div className="row">
                            <div className="col-xs-12 col-md-3 prize-item">
                                <div className="prize-icon"><img src="assets/images/ipad.png" alt="1st Place"/></div>
                                <div className="prize-title">1st Place</div>
                                <div className="prize-description">The MI Euro 2016 champion wins an iPad mini*</div>
                            </div>
                            <div className="col-xs-12 col-md-3 prize-item">
                                <div className="prize-icon"><img src="assets/images/headphones.png" alt="2nd Place"/></div>
                                <div className="prize-title">2nd Place</div>
                                <div className="prize-description">The runner up wins a pair of Beats headphones*</div>
                            </div>
                            <div className="col-xs-12 col-md-3 prize-item">
                                <div className="prize-icon"><img src="assets/images/plane.png" alt="3rd Place"/></div>
                                <div className="prize-title">3rd Place</div>
                                <div className="prize-description">The best of the rest gets a extra day holiday</div>
                            </div>
                            <div className="col-xs-12 col-md-3 prize-item">
                                <div className="prize-icon"><img src="assets/images/package.png" alt="Last place prize"/></div>
                                <div className="prize-title">Last Place</div>
                                <div className="prize-description">The worst predictor has to gift wrap the winners' prizes</div>
                            </div>
                        </div>
                    </div>
                </div>
                <p className="note-prize">*Or equivalent in Amazon or John Lewis vouchers. Prizes are for MarketInvoice employees only sorry.</p>
            </div>
        )
    }
}