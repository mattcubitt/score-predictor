import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import request from 'axios';
import { browserHistory } from 'react-router';

// request.interceptors.response.use((response) => {
//     debugger;
//
// });

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
            return response.data;
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

class SignUpForm extends Component {
    render() {
        const {fields: {name, email}, handleSubmit, submitting} = this.props;
        return (
            <form onSubmit={handleSubmit(onSubmit)}>
                <h4>Registration</h4>
                <div className={'form-group' + (name.touched && name.error ? ' has-danger' : '')}>
                    <input type="text" className="form-control" placeholder="Name" {...name}/>
                    {name.touched && name.error && <span className="text-help">{name.error}</span>}
                </div>
                <div className={'form-group' + (email.touched && email.error ? ' has-danger' : '')}>
                    <input type="email" className="form-control" placeholder="Email" {...email}/>
                    {email.touched && email.error && <span className="text-help">{email.error}</span>}
                </div>
                <button type="submit" className="btn btn-primary" disabled={submitting}>Register</button>
            </form>
        )
    }
}

export default reduxForm({
    form: 'signUpForm',
    fields: ['name', 'email'],
    asyncValidate,
    asyncBlurFields: ['email'],
    validate
})(SignUpForm);