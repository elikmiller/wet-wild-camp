import React from "react";
import "./BooleanIndicator.css";

const BooleanIndicator = props => {
  if (props.value)
    return (
      <div className="boolean-indicator">
        <i className="fas fa-check text-success" /> Yes
      </div>
    );
  return (
    <div className="boolean-indicator">
      <i className="fas fa-times text-muted" /> No
    </div>
  );
};

export default BooleanIndicator;
