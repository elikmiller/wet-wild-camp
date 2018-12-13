import React, { Component } from "react";

class ServerError extends Component {
  render() {
    return (
      <div className="alert alert-danger" role="alert">
        <h4 className="alert-heading">Server Error</h4>
        <p>
          Sorry, we are currently having trouble communicating with the server.
          Please try again later.
        </p>
        <hr />
        <p className="mb-0">
          If this is a recurring issue, please contact us at 000-000-0000.
        </p>
      </div>
    );
  }
}

export default ServerError;
