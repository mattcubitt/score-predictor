import React, { Component, PropTypes } from 'react';

export default class LeaderTableRow extends Component {
    render() {
        const { position, name, points } = this.props;

        return (
            <li className="table-row">
                <div className="table-column-pos">{position}</div>
                <div className="table-column-name">{name}</div>
                <div className="table-column-points">{points}</div>
            </li>
        )
    }
}

LeaderTableRow.propTypes = {
    position: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    points: PropTypes.number.isRequired
};