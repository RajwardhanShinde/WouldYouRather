import React, { Component } from "react";
import { setAuthedUser } from "../actions/authedUser";
import { connect } from "react-redux";

class Login extends Component {
  state = {
    selected: "",
  };

  handleChange = (selected) => {
    this.setState({
      selected,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { selected } = this.state;
    const { setAuthedUser } = this.props;

    if (selected) {
      setAuthedUser(selected);
    } else alert("Select A User");
  };
  render() {
    const { users } = this.props;
    const { selected } = this.state;
    return (
      <div>
        <form onSubmit={this.handleSubmit} className="login-form">
          <img
            className="login-avatar"
            src={
              selected === ""
                ? "https://cdn3.vectorstock.com/i/1000x1000/26/87/user-icon-man-profile-human-person-avatar-vector-10552687.jpg"
                : users[selected].avatarURL
            }
            alt={selected}
          />
          <br />
          <select
            className="login-select"
            onChange={(e) => this.handleChange(e.target.value)}
          >
            <option value="">Select User</option>
            {Object.keys(users).map((user) => (
              <option key={user} value={user}>
                {user}
              </option>
            ))}
          </select>
          <br />
          <button className="login-btn">LOG IN</button>
        </form>
      </div>
    );
  }
}

function mapStateToProps({ users }) {
  return {
    users,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setAuthedUser: (id) => {
      dispatch(setAuthedUser(id));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
