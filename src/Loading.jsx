import React from "react";

const Loading = () => {
  return (
    <div className="d-flex w-100 h-100 justify-content-center align-items-center">
      <div className="progress w-75">
        <div
          className="progress-bar progress-bar-striped progress-bar-animated"
          role="progressbar"
          aria-valuenow="100"
          aria-valuemin="0"
          aria-valuemax="100"
        />
      </div>
    </div>
  );
};

export default Loading;
