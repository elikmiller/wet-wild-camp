import React, { Component } from "react";
import { Link, Route } from "react-router-dom";

class SideNav extends Component {
  render() {
    return (
      <div className="list-group mb-3">
        {this.props.navs.map((nav, i) => (
          <ListItemLink key={i} to={nav.path} label={nav.label} />
        ))}
        <a
          href="/"
          onClick={this.props.onLogout}
          className="list-group-item list-group-item-action"
        >
          Logout
        </a>
      </div>
    );
  }
}

const ListItemLink = ({ to, label }) => (
  <Route
    path={to}
    children={({ match }) => (
      <Link
        to={to}
        className={
          "list-group-item list-group-item-action" + (match ? " active" : "")
        }
      >
        {label}
      </Link>
    )}
  />
);

export default SideNav;
