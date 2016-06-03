import React from 'react'
import NavContainer from './navigation/navContainer';
import Footer from './navigation/footer';
import { RouteTransition, presets } from 'react-router-transition';

export default React.createClass({
    render() {
        return (
            <div className="fadein">
                <NavContainer/>
                <div className="container">
                    {this.props.children}
                </div>
                <Footer/>
            </div>

        )
    }
})