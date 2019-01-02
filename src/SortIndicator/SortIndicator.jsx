import React, { Component } from "react";
import "./SortIndicator.css";

class SortIndicator extends Component {
  render() {
    if (this.props.isVisible) {
      if (this.props.order === "asc") {
        return <i className="fas fa-chevron-down sort-indicator" />;
      } else {
        return <i className="fas fa-chevron-up sort-indicator" />;
      }
    }
    return null;
  }
}

export default SortIndicator;
