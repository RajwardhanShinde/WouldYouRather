import React, { Component } from "react";
import { connect } from "react-redux";
import { handleAddQuestion } from "../actions/questions";

class NewQuestion extends Component {
  state = {
    optionOneText: "",
    optionTwoText: "",
  };

  handleInputChange = (e) => {
    const name = e.target.name;
    this.setState({
      [name]: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { optionOneText, optionTwoText } = this.state;
    console.log(optionOneText, optionTwoText);
    const { dispatch } = this.props;
    dispatch(handleAddQuestion({ optionOneText, optionTwoText }));
    this.setState(() => ({
      optionOneText: "",
      optionTwoText: "",
    }));
  };

  render() {
    const { optionOneText, optionTwoText } = this.state;
    return (
      <div>
        <h1>Create New Question</h1>
        <form onSubmit={this.handleSubmit} className="form">
          <h3>Would You Rather....?</h3>
          <input
            name="optionOneText"
            value={optionOneText}
            onChange={this.handleInputChange}
            placeholder="Enter Option One"
          />
          <br />
          <input
            name="optionTwoText"
            value={optionTwoText}
            onChange={this.handleInputChange}
            placeholder="Enter Option Two"
          />
          <br />

          <button
            className="btn"
            disabled={optionOneText === "" || optionTwoText === ""}
          >
            Create
          </button>
        </form>
      </div>
    );
  }
}

export default connect()(NewQuestion);
