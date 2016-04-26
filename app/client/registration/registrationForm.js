import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { hashHistory } from 'react-router';
import registrationValidator from './registrationValidator';
import request from 'axios';

//push up to container
var onSubmit = (values, dispatch) => {
    return request
        .post('/auth/register', { email: values.email, password: values.password })
        .then((response) => {
            const user = response.data;

            dispatch({
                type: 'ADD_USER',
                user: user
            });

            if(typeof(Storage) !== "undefined") {
                localStorage.setItem('user', JSON.stringify(user));
            }

            hashHistory.push('/fixtures');
        })
        .catch((response) => {
            dispatch({
                type: 'ADD_USER_ERROR',
                error: response.data
            });
        });
};

const onAsyncValidate = (values, dispatch) => {
    return request
        .get(`/auth/validate/email/${values.email}`)
        .then(() => {})
        .catch((response) => {
            return response.data;
        });
};

class RegistrationForm extends Component {
    render() {
        const {fields: {name, email, password}, handleSubmit, submitting} = this.props;
        return (
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="login-form-title">Create a new account</div>
                <div className={'form-group' + (name.touched && name.error ? ' has-danger' : '')}>
                    <input type="text" className="form-control form-control-lg" placeholder="Name" {...name}/>
                    {name.touched && name.error && <span className="text-help">{name.error}</span>}
                </div>
                <div className={'form-group' + (email.touched && email.error ? ' has-danger' : '')}>
                    <input type="email" className="form-control form-control-lg" placeholder="Email" {...email}/>
                    {email.touched && email.error && <span className="text-help">{email.error}</span>}
                </div>
                <div className={'form-group' + (password.touched && password.error ? ' has-danger' : '')}>
                    <input type="password" className="form-control form-control-lg" placeholder="Password" {...password}/>
                    {password.touched && password.error && <span className="text-help">{password.error}</span>}
                </div>
                <button type="submit" className="btn btn-primary btn-block btn-lg" disabled={submitting}>Register</button>
            </form>
        )
    }
}

export default reduxForm({
    form: 'registrationForm',
    fields: ['name', 'email', 'password'],
    asyncValidate: onAsyncValidate,
    asyncBlurFields: ['email'],
    validate: registrationValidator
})(RegistrationForm);