import React, { Component, PropTypes } from 'react'

export default class Alert extends Component {
    renderAlert(error) {
        var style = error ? {} : { display: 'none' };

        return (
            <div className="alert alert-danger fade in" role="alert" style={style}>
                {error}
            </div>
        );
    }


    render() {
        const { error } = this.props;

        return (
            this.renderAlert(error)
        )
    }
}