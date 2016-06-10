import React, { Component } from 'react';

export default class Footer extends Component {
    render() {
        return (
            <div style={{height: '100px', padding: '50px'}}>
                <p className="text-xs-center text-muted">Thank you <a href="https://thenounproject.com/david.padrosa/">David Padrosa</a> for the icons.</p>
            </div>
        )
    }
}