import React from 'react'
import NavContainer from './navigation/navContainer';

export default React.createClass({
    render() {
        return (
            <div>
                <NavContainer/>
                <div className="container">
                    {this.props.children}
                </div>
            </div>

        )
    }
})