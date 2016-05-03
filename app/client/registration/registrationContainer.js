import React, { Component } from 'react';
import RegistrationFrom from './registrationForm'
import { connect } from 'react-redux';
import Alert from '../login/alert';

class RegistrationContainer extends Component {
    componentDidMount() {
        const { dispatch } = this.props;
        return dispatch({
            type: 'SET_ACTIVE_ROUTE',
            route: 'REGISTRATION'
        });
    }
    
    render() {
        const { user } = this.props;
        return (
            <div className="row">
                <div className="col-xs-offset-0 col-xs-12 col-sm-offset-1 col-sm-10 col-md-offset-2 col-md-8 col-lg-offset-2 col-lg-8 col-xl-offset-3 col-xl-6">
                    <div className="login-form">
                        <Alert error={user.error} />
                        <RegistrationFrom/>
                        <div className="pull-right text-muted">Already registered? <a href="/#/login">Login into your account</a>.</div>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.user
    };
}

export default connect(mapStateToProps)(RegistrationContainer);