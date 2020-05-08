import React, { Component } from "react";
import { connect } from "react-redux";
import { formatQuestion, formatDate } from "../QueApi/helpers";

class Result extends Component {
  render() {
    const {
      name,
      avatarURL,
      optionOne,
      optionTwo,
      timestamp,
      id,
    } = this.props.question;

    const { authedUser } = this.props;
    const first = optionOne.votes.includes(authedUser) ? "selected" : "";
    const second = optionTwo.votes.includes(authedUser) ? "selected" : "";

    const options = [optionOne, optionTwo];
    const length1 = optionOne.votes.length;
    const length2 = optionTwo.votes.length;
    const total = length1 + length2;

    return (
      <div className="question-block">
        <img src={avatarURL} alt={`Avatar of ${name}`} className="avatar" />
        <div className="question-info">
          <span>{name}</span>
          <p>{formatDate(timestamp)}</p>
          <h4>Result</h4>
          <div className={first}>
            <p>Would You Rather {optionOne.text} ?</p>
            <p>
              <progress value={length1} max={total}>
                {length1}
              </progress>{" "}
              <br />
              {length1} out of {total} votes
            </p>
          </div>
          <div className={second}>
            <p>Would You Rather {optionTwo.text} ?</p>
            <p>
              <progress value={length2} max={total}>
                {length2}
              </progress>
              <br />
              {length2} out of {total} votes
            </p>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ authedUser, users, questions }, props) {
  const { id } = props.match.params;
  const question = questions[id];
  return {
    authedUser,
    question: question
      ? formatQuestion(question, users[question.author], authedUser)
      : null,
  };
}
export default connect(mapStateToProps)(Result);
