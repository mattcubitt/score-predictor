import React, { Component, PropTypes } from 'react';
import request from 'axios';
import { connect } from 'react-redux';
import Fixture from './fixture';

function fetch(token) {
    return dispatch => {
        return request('/fixture', {
                headers: { authorization: token }
            })
            .then(response => {
                return dispatch({
                    type: 'LOAD_FIXTURES',
                    fixtures: response.data
                });
            });
    }
}

class Fixtures extends Component {
    constructor(props) {
        super(props);

    }

    componentDidMount() {
        const { dispatch, token } = this.props;
        return dispatch(fetch(token));
    }

    //componentWillReceiveProps(nextProps) {
    //    debugger;
    //    const { dispatch, token } = this.props;
    //    return dispatch(fetch(token));
    //}

    render() {
        const { fixtures } = this.props;

        return (
            <div>
                {fixtures.map(fixture =>
                        <Fixture fixture={fixture}/>)}
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
        token: state.auth.token,
        fixtures: state.fixtures
    }
}

export default connect(mapStateToProps)(Fixtures)