import React, { Component, PropTypes } from 'react';

export default class ChangeIndicator extends Component {
    render() {
        const { change } = this.props;

        if(change === 0 || change === undefined) {
            return (
                <div className="arrow-placeholder">
                    <div className="leader-table-no-change-indicator"></div>
                </div>
            )
        }

        if(change > 0) {
            return (
                <div className="arrow-placeholder">
                    <div className="leader-table-up-arrow"
                         data-toggle="tooltip"
                         data-placement="bottom"
                         title={`Up ${change} position(s).`}>
                    </div>
                </div>
            )
        }

        return (
            <div className="arrow-placeholder">
                <div className="leader-table-down-arrow"
                     data-toggle="tooltip"
                     data-placement="bottom"
                     title={`Down ${Math.abs(change)} position(s).`}>
                </div>
            </div>
        )
    }
}