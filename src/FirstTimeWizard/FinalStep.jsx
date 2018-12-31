import React, { Component } from "react";
import { Link } from "react-router-dom";

class FinalStep extends Component {
  render() {
    return (
      <div>
        <p>
          <strong>Thank you!</strong>
        </p>
        <p>
          Visit the <Link to="/schedule">Register</Link> page if you would like
          to browse the available camp sessions.
        </p>
        <p>
          Visit the <Link to="/campers">Campers</Link> page if you would like to
          add provide information for additional campers.
        </p>
        <p>
          Once you've selected a camp session and a camper to particiapate you
          can head over to the <Link to="/payments">Payments</Link> page to
          complete the registration process!
        </p>
        <p>
          Questions? Please{" "}
          <a href="https://wetwildcamp.com/about-us/contact-us/" target="blank">
            click here
          </a>{" "}
          to get in contact with us.
        </p>
        <Link to="/schedule">
          <button type="button" className="btn btn-primary">
            Browse Camp Sessions
          </button>
        </Link>
      </div>
    );
  }
}

export default FinalStep;
