import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { formatQuestion, formatDate } from "../QueApi/helpers";

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
    this.state = { selectedOption: "" };
  }

  handleClick() {
    console.log("submitted option", this.state.selectedOption);
  }

  handleOnChange(e) {
    console.log("selected option", e.target.value);
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
    return (
      <div className="question-block">
        <img src={avatarURL} alt={`Avatar of ${name}`} className="avatar" />
        <div className="question-info">
          <span>{name}</span>
          <p>{formatDate(timestamp)}</p>
          <div className="group">
            <PollOption
              options={options}
              onChange={(e) => this.handleOnChange(e)}
              selected={this.state.selectedOption}
            />
            <button className="vote-btn" onClick={() => this.handleClick()}>
              Vote!
            </button>
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

export default connect(mapStateToProps)(QueView);
