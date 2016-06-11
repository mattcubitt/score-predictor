import React, { Component, PropTypes } from 'react';
import moment from 'moment';
import CollapseFooter from './collapseFooter';
import TableRow from './tableRow';
import LeaderTableHeader from './leaderTableHeader';

export default class CollapsibleLeaderTable extends Component {
    render() {
        const { leaderTable, roundName, user, collapsible } = this.props;
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

        return (
            <div className="leader-table-wrapper">
                <h6>{roundName} standings</h6>
                <div className="text-muted">Updated on: {updatedOn}</div>
                <ul className="leader-table">
                    <LeaderTableHeader key="header"/>
                    {
                        leaderTable.userPoints
                            .map(userPoint => {
                                var collapsed = collapsible ? leaderTable.collapsed : false;

                                return (
                                    <TableRow key={userPoint.userId}
                                              userPoint={userPoint}
                                              user={user}
                                              collapsed={collapsed}/>
                                )
                            })
                    }
                    {
                        collapsible ? <CollapseFooter key="footer" {...this.props} /> : <div key="footer"></div>
                    }
                </ul>
                <p className="text-muted">* Non-MarketInvoice employee</p>
            </div>
        )
    }
}

CollapsibleLeaderTable.propTypes = {
    user: PropTypes.object.isRequired,
    roundName: PropTypes.string.isRequired,
    collapsible: PropTypes.bool.isRequired
};