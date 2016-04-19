import React, { Component, PropTypes } from 'react';
import LeaderTableHeader from './leaderTableHeader';
import LeaderTableRow from './leaderTableRow';

export default class LeaderTable extends Component {
    render() {
        const { leaderTable, roundName } = this.props;

        return (
            <div className="leader-table-wrapper">
                <h6>{roundName} standings</h6>
                <ul className="leader-table">
                    <LeaderTableHeader/>
                    {
                        leaderTable ?
                            leaderTable.userPoints.map(t =>
                                <LeaderTableRow
                                    position={t.position}
                                    name={t.name}
                                    points={t.points}
                                />
                            ) :
                            <li className="table-row">No results</li>
                    }
                </ul>
            </div>
        )
    }
}

LeaderTable.propTypes = {
    roundName: PropTypes.string.isRequired,
    leaderTable: PropTypes.object.isRequired
};