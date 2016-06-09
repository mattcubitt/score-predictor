import React, { Component, PropTypes } from 'react';
import ChangeIndicator from './changeIndicator';
import classNames from 'classnames';

export default class TableRow extends Component {
    render() {
        const { user, userId, change, position, name, points, collapsed, lastPosition } = this.props;
        const currentUserId = user._id;

        if(collapsed !== false & (position !== 1 && position !== 2 && position !== 3 && position !== lastPosition)
            && currentUserId !== userId) {
            return <li key={userId} style={{'display': 'none'}}></li>
        }

        const currentUserRow = currentUserId === userId;

        return (
            <li key={userId} className={classNames('table-row', { 'table-row-highlighted': currentUserRow})}>
                <ChangeIndicator change={change} />
                <div className="table-column-small">{position}</div>
                <div className="table-column-large text-xs-left">{user.external === true ? `${name}` : name}</div>
                <div className="table-column-small">{points}</div>
            </li>
        )
    }
}

TableRow.propTypes = {
    user: PropTypes.object.isRequired,
    userId: PropTypes.number.isRequired,
    change: PropTypes.number.isRequired,
    position: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    points: PropTypes.number.isRequired
};