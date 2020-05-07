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

    const options = [optionOne, optionTwo];
    return (
      <div className="question-block">
        <img src={avatarURL} alt={`Avatar of ${name}`} className="avatar" />
        <div className="question-info">
          <span>{name}</span>
          <p>{formatDate(timestamp)}</p>
          <h4>Result</h4>
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
