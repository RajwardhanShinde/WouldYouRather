import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { formatQuestion, formatDate } from "../QueApi/helpers";

class Question extends Component {
  render() {
    const {
      name,
      avatarURL,
      optionOne,
      optionTwo,
      timestamp,
      id,
    } = this.props.question;

    const { purpose } = this.props;

    return (
      <div className="question-block">
        <img src={avatarURL} alt={`Avatar of ${name}`} className="avatar" />

        <div className="question-info">
          <span>{name}</span>
          <p>{formatDate(timestamp)}</p>
          <br />
          {purpose == "display" && (
            <button className="pole-btn">View Pole</button>
          )}
        </div>
      </div>
    );
  }
}

function mapStateToProps({ authedUser, users, questions }, props) {
  const { id, purpose } = props.info.params;
  const question = questions[id];

  return {
    authedUser,
    purpose,
    question: question
      ? formatQuestion(question, users[question.author], authedUser)
      : null,
  };
}

export default connect(mapStateToProps)(Question);
