import React, { Component, PropTypes } from 'react';
import NavLink from './navLink';

export default class NavBar extends Component {
    render() {
        const { user } = this.props;
        const adminLinkStyle = user.role !== 'admin' ? { display: 'none' } : { };

        return (
            <div className="fluid-container">
                <div className="nav-bar">
                    <div className="container">
                        <ul className="nav-bar-links">
                            <li className="nav-bar-link"><NavLink to="/login">Login</NavLink></li>
                            <li className="nav-bar-link"><NavLink to="/registration">Registration</NavLink></li>
                            <li className="nav-bar-link"><NavLink to="/fixtures">My Predictions</NavLink></li>
                            <li className="nav-bar-link" style={adminLinkStyle}><NavLink to="/admin">Admin</NavLink></li>
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}

NavBar.propTypes = {
    user: PropTypes.object.isRequired
};