import React, { Component, Fragment } from "react";
import { handleInitialData } from "../actions/shared";
import { connect } from "react-redux";
import LoadingBar from "react-redux-loading";
import "../index.css";
import NewQuestion from "./NewQuestion";
import Home from "./Home";
import QueView from "./QueView";

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData());
  }

  render() {
    return (
      <Fragment>
        <LoadingBar />
        <div className="container">
          {this.props.loading === true ? null : (
            <QueView
              match={{
                params: { id: "6ni6ok3ym7mf1p33lnez" },
              }}
            />
          )}
        </div>
      </Fragment>
    );
  }
}

function mapStateToProps({ authedUser }) {
  return {
    loading: authedUser === null,
  };
}

export default connect(mapStateToProps)(App);
