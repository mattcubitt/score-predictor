import React, { Component } from 'react';

export default class Footer extends Component {
    render() {
        return (
            <div style={{height: '100px', padding: '50px'}}>
                <p className="text-xs-center text-muted">Icons by <a href="https://thenounproject.com/david.padrosa/" target="_blank">David Padrosa</a>.</p>
            </div>
        )
    }
}