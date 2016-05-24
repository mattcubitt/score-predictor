import React from 'react'
import NavContainer from './navigation/navContainer';
import Footer from './navigation/footer';


export default React.createClass({
    render() {
        return (
            <div>
                <NavContainer/>
                <div className="container">
                    {this.props.children}
                </div>
                <Footer/>
            </div>

        )
    }
})