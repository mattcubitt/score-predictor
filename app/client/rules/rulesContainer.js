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
            <div className="rules" style={{marginTop: '50px'}}>
                <h4 className="text-xs-center">MI Euro Score Predictor Rules</h4>
                <br/>

                <h5>Predictions</h5>
                <ul>
                    <li>Each player must submit their score predictions for each game before kick-off for that game.</li>
                    <li>A correct score line is worth THREE points.</li>
                    <li>A correct result is worth ONE point.</li>
                    <li>Result includes score after 90 minutes and extra time if applicable.</li>
                </ul>
                <br/>

                <h5>Wild Cards</h5>
                <p>Each player will also receive game cards to play on games of their choosing. These can add additional points.</p>
                <ul>
                    <li><strong>Clean sheets = Points:</strong> every clean sheet adds THREE points on game played</li>
                    <li><strong>Goals = Points:</strong> every goal adds ONE point on game played</li>
                    <li><strong>Game Multiplier:</strong> TRIPLES your prediction points on that game played</li>
                    <li><strong>Scored Penalties = Points:</strong> every goal scored from a penalty (including penalty shootouts) adds ONE point but for every penalty missed/saved minuses One point.</li>
                </ul>
                <br/>

                <h5>Leader Boards</h5>
                <p>There will be an overall league table for the whole Euro 2016 competition of which there will be prizes for the top 3 and the last placed positions. There will also be leaderboards for 5 rounds of games for which there will be smaller prizes for the top 3 and last placed positions. The 5 rounds of games break down as follows:</p>
                <ul>
                    <li><strong>Round 1:</strong> consists of the first group stage games (12 games)</li>
                    <li><strong>Round 2:</strong> consists of the second group stage games (12 games)</li>
                    <li><strong>Round 3:</strong> consists of the third group stage games (12 games)</li>
                    <li><strong>Round 4:</strong> consists of the round of 16 knockout games (8 games)</li>
                    <li><strong>Round 5:</strong> consists of the quarter-final, semi-final and the final (7 games)</li>
                </ul>
                <p>In the event of a tie on points. Position will determined first by number of correct scores then by number of correct results. Finally if the position is still tied, a game of table football will be used to decide the position.</p>
                <br/>

                <h5>Prizes</h5>
                <p>Overall league table prizes:</p>
                <ul>
                    <li><strong>1st place:</strong> iPad Mini (or equivalent in amazon or john lewis vouchers)</li>
                    <li><strong>2nd place:</strong> Beats headphones (or equivalent in amazon or john lewis vouchers)</li>
                    <li><strong>3rd place:</strong> Additional day holiday</li>
                    <li><strong>Last place:</strong> French baguette</li>
                </ul>

                <p>Round leaderboard prizes (for all 5 rounds):</p>
                <ul>
                    <li><strong>1st place:</strong> £50 voucher (Amazon or John Lewis)</li>
                    <li><strong>2nd place:</strong> £30 voucher (Amazon or John Lewis)</li>
                    <li><strong>3rd place:</strong> £15 voucher (Amazon or John Lewis)</li>
                    <li><strong>Last place:</strong> French baguette</li>
                </ul>
                <p>All prizes will be handed out after the round has finished on the next team meeting.</p>
            </div>
        )
    }
}

export default connect()(RulesContainer);