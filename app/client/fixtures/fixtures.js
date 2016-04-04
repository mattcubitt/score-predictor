import React, { Component, PropTypes } from 'react';
import request from 'axios';
import { connect } from 'react-redux';

function fetch(token) {
    debugger;
    return dispatch => {
        debugger;
        return request('/fixture', {
                headers: { authorization: token }
            })
            .then(response => {
                debugger;

                return dispatch({
                    type: 'LOAD_FIXTURES',
                    fixtures: response.data
                });

            })
            .catch(error => {
                debugger;

            })
    }
}

class Fixtures extends Component {
    constructor(props) {
        super(props);

    }

    componentDidMount() {
        debugger;
        const { dispatch, token } = this.props;
        return dispatch(fetch(token));
    }

    componentWillReceiveProps(nextProps) {
        debugger;
    }

    render() {
        const { fixtures } = this.props;

        return (
            <div>
                { 
                    fixtures.map(fixture =>
                        <div>
                            fixture.homeTeam
                        </div>)
                }
            </div>
        )
    }
}

Fixtures.propTypes = {
    token: PropTypes.string.isRequired,
    fixtures: PropTypes.array.isRequired
};

function mapStateToProps(state) {
    return {
        token: state.auth.token
    }
}

export default connect(mapStateToProps)(Fixtures)