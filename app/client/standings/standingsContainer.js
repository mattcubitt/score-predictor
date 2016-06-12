import React, { Component, PropTypes } from 'react';
import request from 'axios';
import { connect } from 'react-redux';
import CollapsibleLeaderTable from '../leaderTable/collapsibleLeaderTable';
import PrizeBanner from './prizeBanner';
import DummyPrizeLeaderTable from '../leaderTable/dummyPrizeLeaderTable'

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
        const { leaderTables, rounds, user } = this.props;

        const overallLeaderTable = leaderTables.filter(t => t.isOverall)[0];
        const overallRoundName = 'Overall';
        const roundTableOptions = { collapsed: true, altLabels: true };

        return (
            <div>
                <div className="row">
                    <div className="col-md-offset-1 col-xs-12 col-md-10">
                        <PrizeBanner/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-offset-1 col-md-10 col-lg-5">
                        <CollapsibleLeaderTable
                            leaderTable={overallLeaderTable}
                            roundName={overallRoundName}
                            user={user}
                            collapsible={false}
                        />
                    </div>
                    <div className="col-md-offset-1 col-md-10 col-lg-offset-0 col-lg-5" style={{marginTop: '20px'}}>
                        {
                            rounds.list.map(round => {
                                const leaderTable = leaderTables.filter(t => t.roundId === round._id)[0];

                                return(
                                    <div className="row" key={round._id}>
                                        <div className="col-xs-12">
                                            <DummyPrizeLeaderTable
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
        leaderTables: state.leaderTables,
        user: state.user
    }
}

export default connect(mapStateToProps)(OverallStandingsContainer);