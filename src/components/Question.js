import React, { Component } from "react";
import { connect } from "react-redux";
import { formatQuestion, formatDate } from "../QueApi/helpers";
import { Link } from "react-router-dom";

class Question extends Component {
  render() {
    const { name, avatarURL, timestamp, id, hasVoted } = this.props.question;
    const { question, show } = this.props;

    if (question === null) {
      return <p>This Question Doesn't Exists</p>;
    }

    if (show === "answered" && hasVoted !== true) {
      return false;
    } else if (show === "unanswered" && hasVoted === true) {
      return false;
    }

    let redirect = `/question/${id}`;
    if (show === "answered") {
      redirect = `/question/${id}/results`;
    }
    return (
      <Link to={redirect} className="question-block">
        <img src={avatarURL} alt={`Avatar of ${name}`} className="avatar" />

        <div className="question-info">
          <span>{name}</span>
          <p>{formatDate(timestamp)}</p>
          <br />
          <button className="pole-btn">View Poll</button>
        </div>
      </Link>
    );
  }
}

function mapStateToProps({ authedUser, users, questions }, { id, show }) {
  const question = questions[id];

  return {
    authedUser,
    question: question
      ? formatQuestion(question, users[question.author], authedUser)
      : null,
    show,
  };
}

export default connect(mapStateToProps)(Question);
