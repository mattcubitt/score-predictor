import React, { Component, PropTypes } from 'react';

export default class LeaderTableHeader extends Component {
    render() {
        return (
            <li className="table-header">
                <div className="table-column-pos">Pos.</div>
                <div className="table-column-name">Name</div>
                <div className="table-column-points">Points</div>
            </li>
        )
    }
}