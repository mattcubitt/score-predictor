import React, { Component, PropTypes } from 'react'

export default class Fixture extends Component {
    render() {
        const { fixture } = this.props;

        return (
            <div className="row">
                <div className="col-xs-12">
                    {fixture.homeTeam} vs {fixture.awayTeam}
                </div>
            </div>
        )
    }
}

Fixture.propTypes = {
    fixture: PropTypes.object.isRequired
};