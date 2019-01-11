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
          If this is a recurring issue, please contact us by{" "}
          <a
            href="https://wetwildcamp.com/about-us/contact-us/"
            target="_blank"
            rel="noopener noreferrer"
            className="alert-link"
          >
            clicking here
          </a>
          .
        </p>
      </div>
    );
  }
}

export default ServerError;
