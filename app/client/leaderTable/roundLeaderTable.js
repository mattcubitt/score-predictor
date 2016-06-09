import React, { Component, PropTypes } from 'react';
import moment from 'moment';
import CollapseFooter from './collapseFooter';
import TableRow from './tableRow';
import _ from 'lodash';
import LeaderTableHeader from './leaderTableHeader';

export default class RoundLeaderTable extends Component {
    render() {
        const { leaderTable, roundName, user } = this.props;
        const updatedOn = leaderTable == null ? 'n/a' : moment(leaderTable.createdOn).format('DD/MM HH:mm.ss');

        if(leaderTable === undefined) {
            return (
                <div className="leader-table-wrapper">
                    <h6>{roundName} standings</h6>
                    <div className="text-muted">Updated on: {updatedOn}</div>
                    <ul className="leader-table">
                        <LeaderTableHeader/>
                        <li className="table-row">No results</li>
                    </ul>
                </div>
            )
        }

        const lastPosition = _.maxBy(leaderTable.userPoints, p => p.position);

        return (
            <div className="leader-table-wrapper">
                <h6>{roundName} standings</h6>
                <div className="text-muted">Updated on: {updatedOn}</div>
                <ul className="leader-table">
                    <LeaderTableHeader/>
                    {
                        leaderTable.userPoints
                            .map(t => {
                                return (
                                    <TableRow user={user}
                                              userId={t.userId}
                                              change={t.change}
                                              position={t.position}
                                              name={t.name}
                                              points={t.points}
                                              collapsed={leaderTable.collapsed}
                                              lastPosition={lastPosition}/>
                                )
                            })
                    }
                    <CollapseFooter {...this.props} />
                </ul>
            </div>
        )
    }
}

RoundLeaderTable.propTypes = {
    roundName: PropTypes.string.isRequired,
    currentUserId: PropTypes.string.isRequired
};