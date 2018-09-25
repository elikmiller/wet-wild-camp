import React, { Component } from "react";

class Camp extends Component {
  state = {
    registerOpen: false
  };

  toggleRegistration = () => {
    this.setState({ registerOpen: !this.state.registerOpen });
  };

  render() {
    let { camp } = this.props;
    let registerDisplay = this.state.registerOpen ? (
      <tr>
        <td colSpan="5">Register Here!</td>
      </tr>
    ) : (
      <tr colSpan="5" />
    );
    return (
      <tbody>
        <tr>
          <td>{camp.name}</td>
          <td>{camp.startDate.slice(0, 10)}</td>
          <td>{camp.endDate.slice(0, 10)}</td>
          <td>${camp.fee}</td>
          <td>
            <button onClick={this.toggleRegistration}>
              {this.state.registerOpen ? "Cancel" : "Register"}
            </button>
          </td>
        </tr>
        {registerDisplay}
      </tbody>
    );
  }
}

export default Camp;
