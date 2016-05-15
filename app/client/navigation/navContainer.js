import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import TopBar from './topBar';
import NavBar from './navBar';
import UserStates from '../user/userStates';
import { hashHistory } from 'react-router';

class NavContainer extends Component {
    constructor(props) {
        super(props);
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