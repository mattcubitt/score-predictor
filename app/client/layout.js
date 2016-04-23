import React from 'react'
import TopBar from './navigation/topBar';
import NavBar from './navigation/navBar';

export default React.createClass({
    render() {
        return (
            <div>
                <TopBar/>
                <NavBar/>
                <div className="container">
                    {this.props.children}
                </div>
            </div>

        )
    }
})