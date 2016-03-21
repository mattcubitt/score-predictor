import React from 'react';
import { createStore } from 'redux'

const initialState = {
    email: '',
    password: ''
};

const loginUser = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN_USER' :
            initialState.email = action.email;
            initialState.password = action.password;

            return initialState;

        default:
            return initialState;
    }
};

const store = createStore(loginUser);

const { Component } = React;

class Login extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="row">
                <div className="col-lg-offset-3 col-lg-6">
                    <form>
                        <h2>Login to your account</h2>
                        <br/>
                        <div className="form-group row">
                            <label className="col-sm-2 form-control-label">Email</label>
                            <div className="col-sm-10">
                                <input type="email" className="form-control" placeholder="Email" ref={ node => {
                                    this.emailInput = node
                                }}/>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-sm-2 form-control-label">Password</label>
                            <div className="col-sm-10">
                                <input type="password" className="form-control" placeholder="Password" ref={ node => {
                                    this.passwordInput = node
                                }}/>
                            </div>
                        </div>
                        <div className="form-group row">
                            <div className="col-sm-offset-2 col-sm-10">
                                <button type="submit" className="btn btn-primary" onClick={() => {
                                    store.dispatch({
                                        type: 'LOGIN_USER',
                                        email: this.emailInput.value,
                                        password: this.passwordInput.value
                                    })
                                }}>Sign in</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default Login;