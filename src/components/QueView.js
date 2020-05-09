import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { formatQuestion, formatDate } from "../QueApi/helpers";
import { handleSaveAnswer } from "../actions/shared";
import { Redirect } from "react-router-dom";

const PollOption = ({ options, selected, onChange }) => {
  return (
    <div className="pollOption">
      {options.map((choice, index) => (
        <Fragment key={choice.text}>
          <label key={index}>
            <input
              type="radio"
              name="vote"
              className="input-option"
              value={choice.text}
              key={index}
              checked={selected === choice.text}
              onChange={onChange}
            />
            {choice.text}
          </label>
          <br />
        </Fragment>
      ))}
    </div>
  );
};

class QueView extends Component {
  constructor(props) {
    super(props);
    this.state = { selectedOption: "", answerSubmitted: false };
  }

  handleSubmit = (e) => {
    e.preventDefault();

    const { id } = this.props.question;
    const qid = id;
    let answer = this.state.selectedOption;

    if (answer === this.props.question.optionOne.text) {
      answer = "optionOne";
    } else {
      answer = "optionTwo";
    }

    const { dispatch } = this.props;
    console.log("id:", qid);
    dispatch(handleSaveAnswer(qid, answer));
    this.setState(() => ({
      selectedOption: "",
      answerSubmitted: true,
    }));
  };

  handleOnChange(e) {
    this.setState({ selectedOption: e.target.value });
  }

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

    const { answerSubmitted } = this.state;
    if (answerSubmitted === true) {
      return <Redirect to={`/question/${id}/results`} />;
    }

    return (
      <div className="question-block">
        <img src={avatarURL} alt={`Avatar of ${name}`} className="avatar" />
        <div className="question-info">
          <span>{name}</span>
          <p>{formatDate(timestamp)}</p>
          <form className="group" onSubmit={this.handleSubmit}>
            <PollOption
              options={options}
              onChange={(e) => this.handleOnChange(e)}
              selected={this.state.selectedOption}
            />
            <button className="vote-btn" type="submit">
              Vote!
            </button>
          </form>
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

export default connect(mapStateToProps)(QueView);
