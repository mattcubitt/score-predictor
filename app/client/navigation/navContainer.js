import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import TopBar from './topBar';
import NavBar from './navBar';
import UserStates from '../user/userStates';
import { hashHistory } from 'react-router';
import request from 'axios';

class NavContainer extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const { dispatch, user } = this.props;

        if(user._id !== undefined) {
            request(`/users/${user._id}/points`)
                .then(response => dispatch({
                    type: 'UPDATE_USER_POINTS',
                    points: response.data
                }));
        }
    }

    onLogout() {
        const { dispatch } = this.props;

        dispatch({
            type: 'CLEAR_USER'
        });

        if(typeof(Storage) !== "undefined") {
            localStorage.removeItem("user");
        }

        hashHistory.push('/login');
    }

    renderNavBar(user, activeRoute) {
        if(user.state === UserStates.NOT_AUTHENTICATED) {
            return (<TopBar/>)
        } else {
            return (
                <div>
                    <TopBar user={user} points={user.points} onLogout={this.onLogout.bind(this)}/>
                    <NavBar user={user} activeRoute={activeRoute} />
                </div>
            )
        }
    }

    render() {
        const { user, activeRoute } = this.props;

        return this.renderNavBar(user, activeRoute);
    }
}

NavContainer.propTypes = {
    user: PropTypes.object.isRequired,
    activeRoute: PropTypes.string.isRequired
};

function mapStateToProps(state) {
    return {
        user: state.user,
        activeRoute: state.activeRoute
    }
}

export default connect(mapStateToProps)(NavContainer)