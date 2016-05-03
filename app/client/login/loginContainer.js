import React, { Component } from 'react';
import { connect } from 'react-redux';
import Alert from './alert';
import LoginForm from './loginForm';

class LoginContainer extends Component {
    componentDidMount() {
        const { dispatch } = this.props;
        return dispatch({
            type: 'SET_ACTIVE_ROUTE',
            route: 'LOGIN'
        });
    }
    
    render() {
        const { user } = this.props;
        return (
            <div className="row">
                <div className="col-xs-offset-0 col-xs-12 col-sm-offset-1 col-sm-10 col-md-offset-2 col-md-8 col-lg-offset-2 col-lg-8 col-xl-offset-3 col-xl-6">
                    <div className="login-form">
                        <Alert error={user.error} />
                        <LoginForm/>
                        <div className="pull-right text-muted">Not registered? <a href="/#/registration">Create an account</a>.</div>
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

export default connect(mapStateToProps)(LoginContainer);