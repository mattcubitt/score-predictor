import React, { Component, PropTypes } from 'react';

export default class DummyPrizeLeaderTable extends Component {
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

        if((position !== 1 && position !== 2 && position !== 3 && !isLast))
            rowStyle = {display: 'none'};

        return rowStyle;
    }

    getPrize(position, isLast) {
        if(position === 1) {
            return '£50 Amazon voucher';
        } else if(position === 2) {
            return '£30 Amazon voucher';
        } else if(position === 3) {
            return '£10 Amazon voucher';
        } else if(isLast) {
            return 'French baguette';
        }

        return '';
    }

    render() {
        const { leaderTable, roundName } = this.props;

        return (
            <div className="leader-table-wrapper">
                <h6>{roundName} standings</h6>
                <ul className="leader-table">
                    <li className="table-header">
                        <div className="table-column-small">Pos.</div>
                        <div className="table-column-medium text-xs-left">Prize</div>
                        <div className="table-column-small text-xs-left">Name</div>
                        <div className="table-column-small">Points</div>
                    </li>
                    <li className="table-row">
                        <div className="table-column-small">{this.getPositionName(1, false)}</div>
                        <div className="table-column-medium text-xs-left">{this.getPrize(1, false)}</div>
                        <div className="table-column-small text-xs-left"></div>
                        <div className="table-column-small"></div>
                    </li>
                    <li className="table-row">
                        <div className="table-column-small">{this.getPositionName(2, false)}</div>
                        <div className="table-column-medium text-xs-left">{this.getPrize(2, false)}</div>
                        <div className="table-column-small text-xs-left"></div>
                        <div className="table-column-small"></div>
                    </li>
                    <li className="table-row">
                        <div className="table-column-small">{this.getPositionName(3, false)}</div>
                        <div className="table-column-medium text-xs-left">{this.getPrize(3, false)}</div>
                        <div className="table-column-small text-xs-left"></div>
                        <div className="table-column-small"></div>
                    </li>
                    <li className="table-row">
                        <div className="table-column-small">{this.getPositionName(4, true)}</div>
                        <div className="table-column-medium text-xs-left">{this.getPrize(4, true)}</div>
                        <div className="table-column-small text-xs-left"></div>
                        <div className="table-column-small"></div>
                    </li>
                </ul>
            </div>
        )
    }
}

DummyPrizeLeaderTable.propTypes = {
    roundName: PropTypes.string.isRequired
};