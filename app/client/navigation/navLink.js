import React from 'react'
import { Link } from 'react-router'

export default React.createClass({
    render() {
        return <Link className="nav-link" {...this.props} activeClassName="active"/>
    }
})