import React, { Component, PropTypes } from 'react';

export default class LeaderTableHeader extends Component {
    render() {
        return (
            <li className="table-header">
                <div className="arrow-placeholder"></div>
                <div className="table-column-small">Pos.</div>
                <div className="table-column-large text-xs-left">Name</div>
                <div className="table-column-small hidden-xs-down" data-toggle="tooltip" data-placement="bottom" title="Correct scores">CSs</div>
                <div className="table-column-small hidden-xs-down" data-toggle="tooltip" data-placement="bottom" title="Correct results">CRs</div>
                <div className="table-column-small" data-toggle="tooltip" data-placement="bottom" title="Points">Pts</div>
            </li>
        )
    }
}