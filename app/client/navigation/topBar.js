import React, { Component, PropTypes } from 'react';
import UserStates from '../user/userStates';

export default class TopBar extends Component {
    render() {
        const { onLogout, user, points } = this.props;
        const accountStyle = user.state !== UserStates.AUTHENTICATED ? {display: 'none'} : {};

        return (
            <div className="fluid-container">
                <div className="top-bar">
                    <div className="container">
                        <div className="top-bar-logo"></div>
                        <div className="top-bar-title hidden-xs-down">Euro 2016 Predictor</div>
                        <div className="top-bar-account hidden-sm-down" style={accountStyle}>
                            <div className="pull-xs-right top-bar-logout" onClick={onLogout}>Logout</div>
                            <div className="top-bar-account-item"><span className="top-bar-points-box">{points}pts</span></div>
                            <div className="pull-xs-right">{user.name}</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

TopBar.defaultProps = {
    points: 0,
    user: {}
};