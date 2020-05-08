import React, { Component } from "react";
import { connect } from "react-redux";
import Question from "./Question";

class Home extends Component {
  state = {
    Tab: "unanswered",
  };

  handleChange = (e) => {
    const tab = e.target.name;
    this.setState(() => ({
      Tab: tab,
    }));
  };

  render() {
    const { Tab } = this.state;
    const { que } = this.props;
    return (
      <div>
        <div className="center">All Questions</div>
        <div className="tab center  ">
          <button type="button" name="unanswered" onClick={this.handleChange}>
            Unanswered
          </button>
          <button type="button" name="answered" onClick={this.handleChange}>
            Answered
          </button>
        </div>

        <ul>
          {que.map((id) => (
            <li style={{ listStyle: "none" }} key={id}>
              <Question key={id} id={id} show={Tab} />
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
