import React, { Component } from "react";
import { connect } from "react-redux";
import Question from "./Question";

class Home extends Component {
  render() {
    const { que } = this.props;
    return (
      <div>
        <h3 className="center">All Questions</h3>
        <ul>
          {que.map((id) => (
            <li style={{ listStyle: "none" }} key={id}>
              <Question info={{ params: { id, purpose: "display" } }} />
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

function mapStateToProps({ questions }) {
  return {
    que: Object.keys(questions).sort(
      (a, b) => questions[b].timestamp - questions[a].timestamp
    ),
  };
}

export default connect(mapStateToProps)(Home);
