import React, { Component, PropTypes } from 'react';
import request from 'axios';
import { connect } from 'react-redux';

class AdminContainer extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const { dispatch } = this.props;
        return dispatch(this.fetchState());
    }

    fetchState() {
        return dispatch => {
            this.setActiveRoute(dispatch)
            this.loadFixtures(dispatch);
        };
    }

    setActiveRoute(dispatch) {
        dispatch({
            type: 'SET_ACTIVE_ROUTE',
            route: 'ADMIN'
        });
    }

    loadFixtures(dispatch) {
        return request('/fixtures')
            .then(response => dispatch({
                type: 'ADMIN_LOAD_FIXTURES',
                fixtures: response.data
            }));
    }

    headerFragment() {
        return (
            <li className="admin-fixture admin-fixture-header" key="header">
                <div className="round-col">
                    Round Id
                </div>
                <div className="home-team-col">
                    Home Team
                </div>
                <div className="home-score-col">
                    Home Score
                </div>
                <div className="away-score-col">
                    Away Score
                </div>
                <div className="away-team-col">
                    Away Team
                </div>
                <div className="starts-on-col">
                    Starts on
                </div>
                <div className="action-col"></div>
            </li>
        )
    }

    onDeleteFixture(fixtureId) {
        const { dispatch, admin } = this.props;

        return request('/admin/fixtures/' + fixtureId, {
            method: 'delete'
        })
        .then(response => dispatch({
            type: 'ADMIN_DELETE_FIXTURE',
            id: fixtureId
        }));
    }

    onEditingFixture(fixtureId) {
        const { dispatch } = this.props;

        dispatch({
            type: 'ADMIN_EDITING_FIXTURE',
            id: fixtureId
        });
    }

    editableFixtureFragment(fixture) {
        return (
            <li className="admin-fixture" key={fixture._id}>
                <div className="round-col">
                    {fixture.roundId}
                </div>
                <div className="home-team-col">
                    {fixture.homeTeam}
                </div>
                <div className="home-score-col">
                    {fixture.homeScore}
                </div>
                <div className="away-score-col">
                    {fixture.awayScore}
                </div>
                <div className="away-team-col">
                    {fixture.awayTeam}
                </div>
                <div className="starts-on-col">
                    {fixture.startsOn}
                </div>
                <div className="action-col">
                    <button className="btn btn-danger"
                            onClick={() => this.onEditingFixture(fixture._id)}>
                        Edit
                    </button>
                    <button className="btn btn-danger"
                            onClick={() => this.onDeleteFixture(fixture._id)}>
                        Delete
                    </button>
                </div>
            </li>
        )
    }

    onFixtureChanged(property, newValue) {
        const { dispatch } = this.props;

        dispatch({
            type: 'ADMIN_EDIT_FIXTURE',
            property,
            newValue
        });
    }

    onSaveFixture(fixture) {
        const { dispatch } = this.props;

        return request('/admin/fixtures/', {
            method: 'put',
            data: fixture
        })
        .then(response => dispatch({
            type: 'ADMIN_STOP_EDITING_FIXTURE'
        }));
    }

    editingFixtureFragment(fixture) {
        return (
            <li className="admin-fixture" key={fixture._id}>
                <div className="round-col">
                    <input className="placeholder-input"
                           type="number"
                           min="0"
                           value={fixture.roundId}
                           onChange={(event) => this.onFixtureChanged('roundId', parseInt(event.target.value))}
                    />
                </div>
                <div className="home-team-col">
                    <input className="placeholder-input"
                           type="text"
                           value={fixture.homeTeam}
                           onChange={(event) => this.onFixtureChanged('homeTeam', event.target.value)}
                    />
                </div>
                <div className="home-score-col">
                    <input className="placeholder-input"
                           type="number"
                           min="0"
                           value={fixture.homeScore}
                           onChange={(event) => this.onFixtureChanged('homeScore', parseInt(event.target.value))}
                    />
                </div>
                <div className="away-score-col">
                    <input className="placeholder-input"
                           type="number"
                           min="0"
                           value={fixture.awayScore}
                           onChange={(event) => this.onFixtureChanged('awayScore', parseInt(event.target.value))}
                    />
                </div>
                <div className="away-team-col">
                    <input className="placeholder-input"
                           type="text"
                           value={fixture.awayTeam}
                           onChange={(event) => this.onFixtureChanged('awayTeam', event.target.value)}
                    />
                </div>
                <div className="starts-on-col">
                    <input className="placeholder-input"
                           type="text"
                           value={fixture.startsOn}
                           onChange={(event) => this.onFixtureChanged('startsOn', event.target.value)}
                    />
                </div>
                <div className="action-col">
                    <button className="btn btn-danger"
                            onClick={() => this.onSaveFixture(fixture)}>
                        Save
                    </button>
                    <button className="btn btn-danger"
                            onClick={() => this.onDeleteFixture(fixture._id)}>
                        Delete
                    </button>
                </div>
            </li>
        )
    }

    onPlaceHolderChanged(property, newValue) {
        const { dispatch } = this.props;

        dispatch({
            type: 'ADMIN_PLACEHOLDER_CHANGED',
            property: property,
            newValue: newValue
        });
    }

    onPlaceHolderAdd() {
        const { dispatch, admin } = this.props;

        return request('/admin/fixtures', {
            method: 'post',
            data: admin.fixturePlaceholder
        })
        .then(response => dispatch({
            type: 'ADMIN_PLACEHOLDER_ADD',
            id: response.data
        }));
    }

    fixturePlaceHolderFragment(fixturePlaceHolder) {
        return (
            <li className="admin-fixture" key="placeHolder">
                <div className="round-col">
                    <input className="placeholder-input"
                           type="number"
                           min="0"
                           value={fixturePlaceHolder.roundId}
                           onChange={(event) => this.onPlaceHolderChanged('roundId', parseInt(event.target.value))}
                    />
                </div>
                <div className="home-team-col">
                    <input className="placeholder-input"
                           type="text"
                           value={fixturePlaceHolder.homeTeam}
                           onChange={(event) => this.onPlaceHolderChanged('homeTeam', event.target.value)}
                    />
                </div>
                <div className="home-score-col">
                    <input className="placeholder-input"
                           type="number"
                           min="0"
                           value={fixturePlaceHolder.homeScore}
                           onChange={(event) => this.onPlaceHolderChanged('homeScore', parseInt(event.target.value))}
                    />
                </div>
                <div className="away-score-col">
                    <input className="placeholder-input"
                           type="number"
                           min="0"
                           value={fixturePlaceHolder.awayScore}
                           onChange={(event) => this.onPlaceHolderChanged('awayScore', parseInt(event.target.value))}
                    />
                </div>
                <div className="away-team-col">
                    <input className="placeholder-input"
                           type="text"
                           value={fixturePlaceHolder.awayTeam}
                           onChange={(event) => this.onPlaceHolderChanged('awayTeam', event.target.value)}
                    />
                </div>
                <div className="starts-on-col">
                    <input className="placeholder-input"
                           type="text"
                           value={fixturePlaceHolder.startsOn}
                           onChange={(event) => this.onPlaceHolderChanged('startsOn', event.target.value)}
                    />
                </div>
                <div className="action-col">
                    <button className="btn btn-danger"
                            onClick={this.onPlaceHolderAdd.bind(this)}>
                        Add
                    </button>
                </div>
            </li>
        )
    }

    onCalculatePoints() {
        return request('/admin/leaderTables', {
            method: 'post'
        })
    }

    render() {
        const { admin } = this.props;

        return (
            <div>
                <div className="row">
                    <div className="col-xs-12">
                        <ul className="admin-fixtures">
                            { this.headerFragment() }
                            {
                                admin.fixtures
                                    .sort((f1, f2) => f1.roundId > f2.roundId)
                                    .map(fixture => fixture._id === admin.editingFixtureId ?
                                        this.editingFixtureFragment(fixture) :
                                        this.editableFixtureFragment(fixture))
                            }
                            { this.fixturePlaceHolderFragment(admin.fixturePlaceholder) }
                        </ul>
                    </div>
                </div>
                <div className="row">
                    <div className="col-xs-2">
                        <button className="btn btn-danger"
                                onClick={() => this.onCalculatePoints()}>
                            Calculate Points
                        </button>
                    </div>
                </div>
            </div>

        )
    }
}

AdminContainer.propTypes = {
    admin: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        admin: state.admin
    }
}

export default connect(mapStateToProps)(AdminContainer)