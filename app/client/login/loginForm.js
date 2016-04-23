import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import loginValidator from './loginValidator';
import request from 'axios';
import { hashHistory } from 'react-router';

//push up to container
var onSubmit = (values, dispatch) => {
    return request
        .post('/auth/login', { email: values.email, password: values.password })
        .then((response) => {
            dispatch({
                type: 'ADD_USER',
                user: response.data
            });

            hashHistory.push('/fixtures');
        })
        .catch((response) => {
            dispatch({
                type: 'ADD_USER_ERROR',
                error: response.data
            });
        });
};

class LoginForm extends Component {
    
    render() {
        const {fields: {email, password}, handleSubmit, submitting} = this.props;
        return (
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="login-form-title">Login into your account</div>
                <div className={'form-group' + (email.touched && email.error ? ' has-danger' : '')}>
                    <input type="text" className="form-control form-control-lg" placeholder="Email" {...email}/>
                    {email.touched && email.error && <span className="text-help">{email.error}</span>}
                </div>
                <div className={'form-group' + (password.touched && password.error ? ' has-danger' : '')}>
                    <input type="password" className="form-control form-control-lg" placeholder="Password" {...password}/>
                    {password.touched && password.error && <span className="text-help">{password.error}</span>}
                </div>
                <button type="submit" className="btn btn-primary btn-block btn-lg" disabled={submitting}>Login</button>
            </form>
        )
    }
}

export default reduxForm({
    form: 'loginForm',
    fields: ['email', 'password'],
    validate: loginValidator
})(LoginForm);