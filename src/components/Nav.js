import React, { Component } from "react";
import { NavLink, withRouter } from "react-router-dom";
import { setAuthedUser } from "../actions/authedUser";
import { connect } from "react-redux";

class Nav extends Component {
  handleLogout = () => {
    const { setAuthedUser, history } = this.props;
    setAuthedUser(null);
    history.push("/");
  };

  render() {
    const { authedUser, avatarURL } = this.props;
    return (
      <nav className="nav">
        <ul>
          <li>
            <NavLink to="/" exact activeClassName="active">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/new" activeClassName="active">
              New Pole
            </NavLink>
          </li>
          <li>
            <NavLink to="/leaderboard" activeClassName="active">
              Leaderboard
            </NavLink>
          </li>
          <li className="logout" onClick={this.handleLogout}>
            Logout
          </li>
          <li>
            <img
              className="account-avatar"
              src={avatarURL}
              alt={`Avatar of ${avatarURL}`}
            />
          </li>
          <span className="user-name">{authedUser}</span>
        </ul>
      </nav>
    );
  }
}

function mapStateToProps({ authedUser, users }) {
  const avatarURL = users[authedUser].avatarURL;
  return {
    authedUser,
    avatarURL,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setAuthedUser: (id) => {
      dispatch(setAuthedUser(id));
    },
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Nav));
