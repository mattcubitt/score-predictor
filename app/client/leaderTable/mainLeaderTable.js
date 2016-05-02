import React, { Component, PropTypes } from 'react';

export default class MainLeaderTable extends Component {
    render() {
        const { leaderTable, roundName } = this.props;

        return (
            <div className="leader-table-wrapper">
                <h6>{roundName} standings</h6>
                <ul className="leader-table">
                    <li className="table-header">
                        <div className="table-column-small">Pos.</div>
                        <div className="table-column-large text-xs-left">Name</div>
                        <div className="table-column-small">Points</div>
                    </li>
                    {
                        leaderTable ?
                            leaderTable.userPoints
                                .map(t => {
                                    return (
                                        <li className="table-row">
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

MainLeaderTable.propTypes = {
    roundName: PropTypes.string.isRequired,
    leaderTable: PropTypes.object.isRequired
};