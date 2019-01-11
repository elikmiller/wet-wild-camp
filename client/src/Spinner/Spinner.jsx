import React, { Component } from "react";
import "./Spinner.css";

class Spinner extends Component {
  render() {
    return (
      <div className="spinner">
        <i className="fas fa-spinner fa-3x fa-spin" />
      </div>
    );
  }
}

export default Spinner;
