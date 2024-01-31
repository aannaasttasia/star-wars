import * as React from "react";
import { Component } from "react";
import "./css/Nav.scss";

class Nav extends Component {
  render() {
    return (
      <nav className="nav">
        <div className="nav__logo">aannaasttasia</div>
        <div className="nav__title">Star <span className="nav__wars">Wars</span> </div>
      </nav>
    );
  }
}

export default Nav;
