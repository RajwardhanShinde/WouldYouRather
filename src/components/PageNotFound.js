import React, { Component } from "react";
import { NavLink } from "react-router-dom";

class PageNotFound extends Component {
  render() {
    return (
      <div className="center">
        <h1>404 PAGE NOT FOUND</h1>
        <NavLink to="/"> Go To Login </NavLink>
      </div>
    );
  }
}
export default PageNotFound;
