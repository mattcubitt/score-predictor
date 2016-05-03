import React, { Component } from 'react';
import { connect } from 'react-redux';

class RulesContainer extends Component {
    componentDidMount() {
        const {dispatch} = this.props;

        dispatch({
            type: 'SET_ACTIVE_ROUTE',
            route: 'RULES'
        });
    }

    render() {
        return (
            <div className="text-xs-center" style={{marginTop: '50px'}}>
               rules go here
            </div>
        )
    }
}

export default connect()(RulesContainer);