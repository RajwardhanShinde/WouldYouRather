import React, { Component, Fragment } from "react";
import { handleUsers, handleQuestions } from "../actions/shared";
import { connect } from "react-redux";
import LoadingBar from "react-redux-loading";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "../index.css";
import NewQuestion from "./NewQuestion";
import Home from "./Home";
import QueView from "./QueView";
import Result from "./Result";
import Nav from "./Nav";
import LeaderBoard from "./LeaderBoard";
import Login from "./Login";
import PageNotFound from "./PageNotFound";

class App extends Component {
  componentDidMount() {
    const AUTHED_ID = null;
    this.props.dispatch(handleUsers(AUTHED_ID));
    this.props.dispatch(handleQuestions());
  }

  render() {
    return (
      <Router>
        <Fragment>
          <LoadingBar />
          <div className="container">
            <Switch>
              {this.props.authedUser === null ? (
                <Route path="/" exact component={Login} />
              ) : (
                <Fragment>
                  <Nav />

                  <Route exact path="/" component={Home} />
                  <Route exact path="/question/:id" component={QueView} />
                  <Route path="/new" component={NewQuestion} />
                  <Route
                    exact
                    path="/question/:id/results"
                    component={Result}
                  />
                  <Route path="/leaderboard" component={LeaderBoard} />
                </Fragment>
              )}
              <Route component={PageNotFound} />
            </Switch>
          </div>
        </Fragment>
      </Router>
    );
  }
}

function mapStateToProps({ authedUser }) {
  return {
    authedUser,
  };
}

export default connect(mapStateToProps)(App);
