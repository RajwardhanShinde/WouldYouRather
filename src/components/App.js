import React, { Component, Fragment } from "react";
import { handleInitialData } from "../actions/shared";
import { connect } from "react-redux";
import LoadingBar from "react-redux-loading";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "../index.css";
import NewQuestion from "./NewQuestion";
import Home from "./Home";
import QueView from "./QueView";
import Result from "./Result";
import Nav from "./Nav";
import LeaderBoard from "./LeaderBoard";

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData());
  }

  render() {
    return (
      <Router>
        <Fragment>
          <LoadingBar />
          <div className="container">
            <Nav />
            {this.props.loading === true ? null : (
              <div>
                <Route exact path="/" component={Home} />
                <Route exact path="/question/:id" component={QueView} />
                <Route path="/new" component={NewQuestion} />
                <Route exact path="/question/:id/results" component={Result} />
                <Route path="/leaderboard" component={LeaderBoard} />
              </div>
            )}
          </div>
        </Fragment>
      </Router>
    );
  }
}

function mapStateToProps({ authedUser }) {
  return {
    loading: authedUser === null,
  };
}

export default connect(mapStateToProps)(App);
