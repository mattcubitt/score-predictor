import React, { Component, PropTypes } from 'react';

export default class CollapseFooter extends Component {
    render() {
        const { leaderTable, onToggleTableCollapse } = this.props;

        if(!leaderTable) {
            return <li key="collapse-footer"></li>
        }

        var collapseText = leaderTable.collapsed === false ? 'Collapse' : 'Show All';

        return (
            <li key="collapse-footer" className="table-row table-row-footer">
                <div className="collapse-toggle" onClick={onToggleTableCollapse}>{collapseText}</div>
            </li>
        )
    }
}

CollapseFooter.propTypes = {
    leaderTable: PropTypes.object.isRequired
};