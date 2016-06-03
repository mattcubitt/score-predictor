// import React, { Component, PropTypes } from 'react';
// import { connect } from 'react-redux';
//
// class OverallStandingsContainer extends Component {
//     componentDidMount() {
//         const { dispatch } = this.props;
//
//         dispatch({
//             type: 'SET_ACTIVE_ROUTE',
//             route: 'STANDINGS'
//         });
//     }
//
//     render() {
//         return (
//             <div className="row">
//                 <div className="col-xs-12 text-xs-center" style={{ marginTop: '40px' }}>
//                     <h4 className="text-muted">No results yet. Please come back later!</h4>
//                 </div>
//             </div>
//         )
//     }
// }
//
// OverallStandingsContainer.propTypes = {
//     rounds: PropTypes.object.isRequired,
//     leaderTables: PropTypes.array.isRequired
// };
//
// function mapStateToProps(state) {
//     return {
//         rounds: state.rounds,
//         leaderTables: state.leaderTables
//     }
// }
//
// export default connect(mapStateToProps)(OverallStandingsContainer);