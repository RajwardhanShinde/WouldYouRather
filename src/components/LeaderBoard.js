import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

class LeaderBoard extends Component {
  render() {
    const { users, questions } = this.props;

    let all_scores = {};
    let req_Info = Object.keys(questions).map((key, index) => {
      return {
        author: questions[key].author,
        optionOneVotes: questions[key].optionOne.votes,
        optionTwoVotes: questions[key].optionTwo.votes,
      };
    });

    let questionsAsk = {},
      questionsAns = {};

    req_Info.map((record) => {
      questionsAsk[record.author] = questionsAsk[record.author]
        ? questionsAsk[record.author] + 1
        : 1;
      for (var vote in record.optionOneVotes) {
        let user = record.optionOneVotes[vote];
        questionsAns[user] = questionsAns[user] ? questionsAns[user] + 1 : 1;
      }
      for (vote in record.optionTwoVotes) {
        let user = record.optionTwoVotes[vote];
        questionsAns[user] = questionsAns[user] ? questionsAns[user] + 1 : 1;
      }
      return null;
    });

    all_scores = Object.keys(questionsAns).map((key) => {
      let total = questionsAns[key] + questionsAsk[key];
      return {
        author: key,
        avatarURL: users[key].avatarURL,
        Answered: questionsAns[key],
        Asked: questionsAsk[key],
        Total: total,
      };
    });

    all_scores.sort((a, b) => {
      if (b.Total > a.Total) return 1;
      if (b.Total < a.Total) return -1;
      return 0;
    });

    return (
      <div>
        {all_scores.map((record, index) => {
          return (
            <Fragment key={index}>
              <div className="question-block" key={index}>
                <img
                  src={record.avatarURL}
                  alt={`Avatar of ${record.author}`}
                  className="avatar"
                />
                <div className="question-info">
                  <span>{record.author}</span>
                </div>
                <div className="score">
                  <p className="total">{record.Total ? record.Total : 0}</p>
                  <p>
                    Questions Asked:
                    {record.Asked ? record.Asked : 0}
                  </p>
                  <p>
                    Questions Answered:
                    {record.Answered ? record.Answered : 0}
                  </p>
                </div>
              </div>
              <br />
            </Fragment>
          );
        })}
      </div>
    );
  }
}

function mapStateToProps({ questions, users }) {
  return {
    questions,
    users,
  };
}

export default connect(mapStateToProps)(LeaderBoard);
