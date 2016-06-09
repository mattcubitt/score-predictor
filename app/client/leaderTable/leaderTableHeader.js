import React, { Component, PropTypes } from 'react';

export default class LeaderTableHeader extends Component {
    render() {
        return (
            <li className="table-header">
                <div className="arrow-placeholder"></div>
                <div className="table-column-small">Pos.</div>
                <div className="table-column-large text-xs-left">Name</div>
                <div className="table-column-small">Points</div>
            </li>
        )
    }
}