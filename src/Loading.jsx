import React from "react";

const Loading = props => {
  return (
    <div className="progress" style={progressBarStyles}>
      <div
        className="progress-bar progress-bar-striped progress-bar-animated"
        role="progressbar"
        aria-valuenow="100"
        aria-valuemin="0"
        aria-valuemax="100"
        style={{ width: "100%" }}
      />
    </div>
  );
};

const progressBarStyles = {
  width: "60%",
  margin: "10% auto"
};

export default Loading;
