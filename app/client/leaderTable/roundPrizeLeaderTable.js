import React, { Component, PropTypes } from 'react';

export default class RoundPrizeLeaderTable extends Component {
    getPositionName(position, isLast) {
        if(position === 1) {
            return '1st';
        } else if(position === 2) {
            return '2nd';
        } else if(position === 3) {
            return '3rd';
        } else if(isLast) {
            return 'Last';
        }

        return position;
    }

    getRowStyle(position, isLast) {
        var rowStyle = {};

        if((position !== 1 && position !== 2 && position !== 3))
            rowStyle = {display: 'none'};

        return rowStyle;
    }

    getPrize(position, isLast) {
        if(position === 1) {
            return '£50 Amazon voucher';
        } else if(position === 2) {
            return '£30 Amazon voucher';
        } else if(position === 3) {
            return '£15 Amazon voucher';
        } else if(isLast) {
            return 'French baguette';
        }

        return '';
    }

    render() {
        const { leaderTable, roundName } = this.props;

        return (
            <div className="leader-table-wrapper">
                <h6>{roundName} standings (MarketInvoice only)</h6>
                <ul className="leader-table">
                    <li className="table-header">
                        <div className="table-column-small">Pos.</div>
                        <div className="table-column-large text-xs-left">Prize</div>
                        <div className="table-column-large text-xs-left">Name</div>
                        <div className="table-column-small">Points</div>
                    </li>
                    {
                        leaderTable ? leaderTable.userPoints
                            .map((t, i) => {
                                var isLast = leaderTable.userPoints.length - 1 === i;

                                return (
                                    <li className="table-row" style={this.getRowStyle(t.position, isLast)}>
                                        <div className="table-column-small">{this.getPositionName(t.position, isLast)}</div>
                                        <div className="table-column-large text-xs-left">{this.getPrize(t.position, isLast)}</div>
                                        <div className="table-column-large text-xs-left">{t.name}</div>
                                        <div className="table-column-small table-row-points">{t.points}</div>
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

RoundPrizeLeaderTable.propTypes = {
    roundName: PropTypes.string.isRequired,
    leaderTable: PropTypes.object.isRequired
};