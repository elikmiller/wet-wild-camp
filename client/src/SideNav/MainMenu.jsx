import React, { Component } from "react";
import SideNav from "./SideNav";
import { withRouter } from "react-router-dom";

class MainMenu extends Component {
  state = {
    isOpen: false
  };

  openMenu = () => {
    this.setState({
      isOpen: true
    });
  };

  closeMenu = () => {
    this.setState({
      isOpen: false
    });
  };

  componentDidMount = () => {
    this.unlisten = this.props.history.listen((location, action) => {
      this.closeMenu();
    });
  };

  componentWillUnmount = () => {
    this.unlisten();
  };

  render() {
    if (this.state.isOpen)
      return (
        <div className="main-menu mb-3 d-xl-none">
          <button
            onClick={this.closeMenu}
            className="btn btn-block btn-light mb-3"
          >
            Main Menu <i className="fas fa-chevron-up" />
          </button>
          <SideNav navs={this.props.navs} onLogout={this.props.onLogout} />
        </div>
      );
    return (
      <div className="main-menu mb-3 d-xl-none">
        <button onClick={this.openMenu} className="btn btn-block btn-light">
          Main Menu <i className="fas fa-chevron-down" />
        </button>
      </div>
    );
  }
}

export default withRouter(MainMenu);
