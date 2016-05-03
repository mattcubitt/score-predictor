import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router'

export default class NavBar extends Component {
    render() {
        const { user, activeRoute } = this.props;
        const adminLinkStyle = user.role !== 'admin' ? { display: 'none' } : { };

        return (
            <div className="fluid-container">
                <div className="nav-bar">
                    <div className="container">
                        <ul className="nav-bar-links">
                            <li className="nav-bar-link"><Link to="/fixtures" className={ activeRoute === 'FIXTURES' ? 'nav-link active' : 'nav-link' }>My Predictions</Link></li>
                            <li className="nav-bar-link"><Link to="/standings" className={ activeRoute === 'STANDINGS' ? 'nav-link active' : 'nav-link' }>MI League Table</Link></li>
                            <li className="nav-bar-link" style={adminLinkStyle}><Link to="/rules" className={ activeRoute === 'RULES' ? 'nav-link active' : 'nav-link' }>Rules</Link></li>
                            <li className="nav-bar-link" style={adminLinkStyle}><Link to="/admin" className={ activeRoute === 'ADMIN' ? 'nav-link active' : 'nav-link' }>Admin</Link></li>
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