import React from 'react'
import NavLink from './navigation/navLink'


export default React.createClass({
    render() {
        return (
            <div className="container">
                <nav className="navbar navbar-fixed-top navbar-dark bg-inverse">
                    <a className="navbar-brand" href="#">Score predictor</a>
                    <ul className="nav navbar-nav">
                        <li className="nav-item"><NavLink to="/login">Login</NavLink></li>
                        <li className="nav-item"><NavLink to="/registration">Registration</NavLink></li>
                        <li className="nav-item"><NavLink to="/fixtures">Fixture List</NavLink></li>
                     </ul>
                </nav>
                <div style={{marginTop: '100px'}}>
                    {this.props.children}
                </div>
            </div>
        )
    }
})