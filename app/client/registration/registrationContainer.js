import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import request from 'axios';
import { browserHistory } from 'react-router';

var onSubmit = (values, dispatch) => {
    return request
        .post('/auth/register', { email: values.email, password: values.password })
        .then((response) => {
            dispatch({
                type: 'ADD_TOKEN',
                token: response.data.token
            });

            browserHistory.push('/fixtures');
        })
        .catch((response) => {
            return { _error: response.data };
        });
};

var validate = values => {
    var errors = {};
    if (!values.name) {
        errors.name = 'Required';
    }

    if (!values.email) {
        errors.email = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
    }

    if (!values.password) {
        errors.password = 'Required';
    }

    return errors;
};

const asyncValidate = (values, dispatch) => {
    return request
        .get(`/auth/validate/email/${values.email}`)
        .then(() => {})
        .catch((response) => {
            return response.data;
        });
};

class RegistrationContainer extends Component {
    render() {
        const {fields: {name, email, password}, handleSubmit, submitting} = this.props;
        return (
            <div className="row">
                <div className="col-xs-offset-0 col-xs-12 col-sm-offset-1 col-sm-10 col-md-offset-2 col-md-8 col-lg-offset-3 col-lg-6">
                    <div className="login-form">
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
                        <div className="pull-right text-muted">Already registered? <a href="/#/login">Login into your account</a>.</div>
                    </div>
                </div>
            </div>
        )
    }
}

export default reduxForm({
    form: 'signUpForm',
    fields: ['name', 'email', 'password'],
    asyncValidate,
    asyncBlurFields: ['email'],
    validate
})(RegistrationContainer);