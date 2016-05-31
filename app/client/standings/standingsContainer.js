import React, { Component, PropTypes } from 'react';
import request from 'axios';
import { connect } from 'react-redux';
import MainLeaderTable from '../leaderTable/mainLeaderTable';
import RoundPrizeLeaderTable from '../leaderTable/roundPrizeLeaderTable';
import PrizeBanner from './prizeBanner';

class OverallStandingsContainer extends Component {
    componentDidMount() {
        const { dispatch } = this.props;
        return dispatch(this.fetchState());
    }

    fetchState() {
        return dispatch => {
            this.loadState(dispatch, '/leaderTables', 'LOAD_LEADER_TABLES');
            this.loadState(dispatch, '/rounds', 'LOAD_ROUNDS');
            this.setActiveRoute(dispatch);
        };
    }

    loadState(dispatch, resource, type) {
        return request(resource)
            .then(response => dispatch({
                type: type,
                data: response.data
            }));
    }

    setActiveRoute(dispatch) {
        dispatch({
            type: 'SET_ACTIVE_ROUTE',
            route: 'STANDINGS'
        });
    }

    render() {
        const { leaderTables, rounds } = this.props;

        const overallLeaderTable = leaderTables.filter(t => t.isOverall)[0];
        const overallRoundName = 'Overall';
        const roundTableOptions = { collapsed: true, altLabels: true };

        return (
            <div>
                <div className="row">
                    <div className="col-xs-offset-1 col-xs-10">
                        <PrizeBanner/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-xs-offset-1 col-xs-5">
                        <MainLeaderTable
                            leaderTable={overallLeaderTable}
                            roundName={overallRoundName} />
                    </div>
                    <div className="col-xs-5">
                        {
                            rounds.list.map(round => {
                                const leaderTable = leaderTables.filter(t => t.roundId === round._id)[0];

                                return(
                                    <div className="row">
                                        <div className="col-xs-12">
                                            <RoundPrizeLeaderTable
                                                key={round._id}
                                                leaderTable={leaderTable}
                                                roundName={round.name}
                                                options={roundTableOptions}/>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        )
    }
}

OverallStandingsContainer.propTypes = {
    rounds: PropTypes.object.isRequired,
    leaderTables: PropTypes.array.isRequired
};

function mapStateToProps(state) {
    return {
        rounds: state.rounds,
        leaderTables: state.leaderTables
    }
}

export default connect(mapStateToProps)(OverallStandingsContainer);