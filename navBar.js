import React from 'react'
import { Link } from 'react-router'

class NavBar extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <nav className="top-bar" data-topbar role="navigation">
                <ul className="title-area">
                    <li className="name">
                        <h1><a href="#">Score predictor</a></h1>
                    </li>
                </ul>

                <section className="top-bar-section">
                    <ul className="left">
                        <li><Link to='login'>Login</Link></li>
                        <li><a href="#">Fixture List</a></li>
                    </ul>
                </section>
            </nav>
        );
    }
}

export default NavBar;