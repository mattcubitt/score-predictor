import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import TopBar from './topBar';
import NavBar from './navBar';
import UserStates from '../user/userStates';

class NavContainer extends Component {
    constructor(props) {
        super(props);
    }

    renderNavBar(user) {
        if(user.state === UserStates.NOT_AUTHENTICATED) {
            return (<TopBar/>)
        } else {
            return (
                <div>
                    <TopBar/>
                    <NavBar user={user} />
                </div>
            )
        }
    }

    render() {
        const { user } = this.props;

        return this.renderNavBar(user);
    }
}

NavContainer.propTypes = {
    user: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(NavContainer)