import React, { Component, PropTypes } from 'react';
import ChangeIndicator from './changeIndicator';
import classNames from 'classnames';
import nameFormatter from './nameFormatter';
import isCollapsed from './isCollapsed';

export default class TableRow extends Component {
    render() {
        const { userPoint, user, collapsed } = this.props;
        const currentUserId = user._id;

        if(isCollapsed(collapsed, userPoint.position, currentUserId, userPoint.userId)) {
            return <li key={userPoint.userId} style={{'display': 'none'}}></li>
        }

        const currentUserRow = currentUserId === userPoint.userId;
        const nameFormatted = nameFormatter(userPoint.external, userPoint.name);

        return (
            <li key={userPoint.userId} className={classNames('table-row', { 'table-row-highlighted': currentUserRow})}>
                <ChangeIndicator change={userPoint.change} />
                <div className="table-column-small">{userPoint.position}</div>
                <div className="table-column-large text-xs-left">{nameFormatted}</div>
                <div className="table-column-small hidden-xs-down" data-toggle="tooltip" data-placement="bottom" title="Correct scores">{userPoint.correctScores}</div>
                <div className="table-column-small hidden-xs-down" data-toggle="tooltip" data-placement="bottom" title="Correct results">{userPoint.correctResults}</div>
                <div className="table-column-small table-row-points pull-xs-right" data-toggle="tooltip" data-placement="bottom" title="Points">{userPoint.points}</div>
            </li>
        )
    }
}

TableRow.propTypes = {
    userPoint: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired
};