import React, { Component } from 'react';
import { connect } from 'react-redux';

class AboutContainer extends Component {
    componentDidMount() {
        const {dispatch} = this.props;

        dispatch({
            type: 'SET_ACTIVE_ROUTE',
            route: 'ABOUT'
        });
    }

    render() {
        return (

            <div className="about" style={{marginTop: '50px'}}>
                <h2>The Team</h2>
                <div className="row">
                    <div className="col-md-4 text-xs-center">
                        <img className="team-member" src="/assets/images/team/wing.jpg" alt="Wing"/>
                        <h4>Wing</h4>
                        <p>Chairman, CFO and chief button presser</p>
                    </div>
                    <div className="col-md-4 text-xs-center">
                        <img className="team-member" src="/assets/images/team/matt.jpg" alt="Matt"/>
                        <h4>Matt</h4>
                        <p>Chief architect and table foosball champion</p>
                    </div>
                    <div className="col-md-4 text-xs-center">
                        <img className="team-member" src="/assets/images/team/aloke.jpg" alt="Aloke"/>
                        <h4>Aloke</h4>
                        <p>UX artist and feng shui master</p>
                    </div>
                </div>
                <h2>Technologies Used</h2>
                <div className="row">
                    <div className="col-md-3">
                        <div className="card">
                            <a target="_blank" href="https://facebook.github.io/react/">
                                <img className="card-img-top" src="/assets/images/tech/react.jpg" alt="React"/>
                                <div className="card-block">
                                    <h4 className="card-title">React</h4>
                                    <p className="card-text">Facebook's UI framework used to create dynamic web applications</p>
                                </div>
                            </a>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="card">
                            <a target="_blank" href="http://redux.js.org/">
                                <img className="card-img-top" src="/assets/images/tech/redux.jpg" alt="Redux"/>
                                <div className="card-block">
                                    <h4 className="card-title">Redux</h4>
                                    <p className="card-text">Functional state container inspired by Elm.</p>
                                </div>
                            </a>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="card">
                            <a target="_blank" href="https://nodejs.org/en/">
                                <img className="card-img-top image-fix" src="/assets/images/tech/nodejs.jpg" alt="Node"/>
                                <div className="card-block">
                                    <h4 className="card-title">Node</h4>
                                    <p className="card-text">Server side javascript framework run on top of google's V8 engine which powers chrome.</p>
                                </div>
                        </a>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="card">
                            <a target="_blank" href="http://koajs.com/">
                                <img className="card-img-top" src="/assets/images/tech/koa.jpg" alt="koa"/>
                                <div className="card-block">
                                    <h4 className="card-title">Koa</h4>
                                    <p className="card-text">Nodejs web framework utilising generator functions. Made by the express team.</p>
                                </div>
                            </a>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="card">
                            <a target="_blank" href="https://www.mongodb.com/">
                                <img className="card-img-top" src="/assets/images/tech/mongodb.jpg" alt="mongodb"/>
                                <div className="card-block">
                                    <h4 className="card-title">Mongo DB</h4>
                                    <p className="card-text">NoSql json document store.</p>
                                </div>
                            </a>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="card">
                            <a target="_blank" href="https://www.heroku.com/home">
                                <img className="card-img-top" src="/assets/images/tech/heroku.jpg" alt="Heroku"/>
                                <div className="card-block">
                                    <h4 className="card-title">Heroku</h4>
                                    <p className="card-text">Platform-as-a-Service cloud platform running nodejs among others. </p>
                                </div>
                            </a>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="card">
                            <a target="_blank" href="https://webpack.github.io/">
                                <img className="card-img-top image-fix" src="/assets/images/tech/webpack.jpg" alt="Webpack"/>
                                <div className="card-block">
                                    <h4 className="card-title">Webpack</h4>
                                    <p className="card-text">Javascript module loader and bundler.</p>
                                </div>
                            </a>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="card">
                            <a target="_blank" href="https://babeljs.io/">
                                <img className="card-img-top" src="/assets/images/tech/babel.jpg" alt="Babel"/>
                                <div className="card-block">
                                    <h4 className="card-title">Babel</h4>
                                    <p className="card-text">Javascript compiler supporting future versions ecmascript.</p>
                                </div>
                            </a>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="card">
                            <a target="_blank" href="http://v4-alpha.getbootstrap.com/">
                                <img className="card-img-top" src="/assets/images/tech/bootstrap.jpg" alt="Axure"/>
                                <div className="card-block">
                                    <h4 className="card-title">Bootstrap</h4>
                                    <p className="card-text">CSS framework for building adaptive and mobile first user interfaces.</p>
                                </div>
                            </a>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="card">
                            <a target="_blank" href="http://www.axure.com/">
                                <img className="card-img-top" src="/assets/images/tech/axure.jpg" alt="Axure"/>
                                <div className="card-block">
                                    <h4 className="card-title">Axure</h4>
                                    <p className="card-text">Prototyping and wireframing UI tool</p>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}

export default connect()(AboutContainer);