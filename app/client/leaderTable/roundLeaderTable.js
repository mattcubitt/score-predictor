import React, { Component, PropTypes } from 'react';
import moment from 'moment';
import ChangeIndicator from './changeIndicator';

export default class RoundLeaderTable extends Component {
    render() {
        const { leaderTable, roundName } = this.props;
        const updatedOn = leaderTable == null ? 'n/a' : moment(leaderTable.createdOn).format('DD/MM HH:mm.ss');

        return (
            <div className="leader-table-wrapper">
                <h6>{roundName} standings</h6>
                <div className="text-muted">Updated on: {updatedOn}</div>
                <ul className="leader-table">
                    <li className="table-header">
                        <div className="arrow-placeholder"></div>
                        <div className="table-column-small">Pos.</div>
                        <div className="table-column-large text-xs-left">Name</div>
                        <div className="table-column-small">Points</div>
                    </li>
                    {
                        leaderTable ?
                            leaderTable.userPoints
                                .map(t => {
                                    return (
                                        <li key={t.userId} className="table-row">
                                            <ChangeIndicator change={t.change} />
                                            <div className="table-column-small">{t.position}</div>
                                            <div className="table-column-large text-xs-left">{t.name}</div>
                                            <div className="table-column-small">{t.points}</div>
                                        </li>
                                    )
                                }) :
                        <li className="table-row">No results</li>
                    }
                </ul>
            </div>
        )
    }
}

RoundLeaderTable.propTypes = {
    roundName: PropTypes.string.isRequired
};