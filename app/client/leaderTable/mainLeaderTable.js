import React, { Component, PropTypes } from 'react';
import moment from 'moment';
import LeaderTableHeader from './leaderTableHeader';
import TableRow from './tableRow';

export default class MainLeaderTable extends Component {
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
                                              external={t.external}
                                              collapsed={false}
                                              lastPosition={lastPosition}/>
                                )
                            })
                    }
                </ul>
                <p className="text-muted">* Non-MarketInvoice employee</p>
            </div>
        )
    }
}

MainLeaderTable.propTypes = {
    roundName: PropTypes.string.isRequired,
    leaderTable: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired
};