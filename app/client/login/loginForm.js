import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import request from 'axios';
import { browserHistory } from 'react-router';

var onSubmit = (values, dispatch) => {
    return request
        .post('/auth/login', { email: values.email, password: values.password })
        .then((response) => {
            dispatch({
                type: 'ADD_TOKEN',
                token: response.data.token
            });

            browserHistory.push('/fixtures');
        })
        .catch((response) => {
            return response.data;
        });
};

var validate = values => {
    var errors = {};

    if (!values.email) {
        errors.email = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
    }

    //todo add password

    return errors;
};

class LoginForm extends Component {
    render() {
        const {fields: {email, password}, handleSubmit, submitting} = this.props;
        return (
            <form onSubmit={handleSubmit(onSubmit)}>
                <h4>Login</h4>
                <div className={'form-group' + (email.touched && email.error ? ' has-danger' : '')}>
                    <input type="text" className="form-control" placeholder="Email" {...email}/>
                    {email.touched && email.error && <span className="text-help">{email.error}</span>}
                </div>
                <div className={'form-group' + (password.touched && password.error ? ' has-danger' : '')}>
                    <input type="password" className="form-control" placeholder="Password" {...password}/>
                    {password.touched && password.error && <span className="text-help">{password.error}</span>}
                </div>
                <button type="submit" className="btn btn-primary" disabled={submitting}>Login</button>
            </form>
        )
    }
}

export default reduxForm({
    form: 'loginForm',
    fields: ['email', 'password'],
    validate
})(LoginForm);