import React, { Component } from "react";
import { Link } from "react-router-dom";

class Schedule extends Component {
  render() {
    return (
      <div className="wrapper schedule-wrapper">
        <div className="alert alert-dark" role="alert">
          <p className="mb-0">
            The <strong>Register</strong> page is where you can begin the
            registration process for our camp sessions.
          </p>
          <hr />
          <p className="mb-0">
            Choose between our two camp types based on the age of the child you
            want to register. 9 year olds can choose between Junior and
            Adventure camps.{" "}
            <a
              href="https://wetwildcamp.com/camp-information/8-year-olds-adv-camp-or-jr-camp/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn More
            </a>
          </p>
        </div>
        <div className="card mb-3">
          <div className="card-body">
            <h5 className="card-title">Junior Camps</h5>
            <p className="card-text">
              These camps are aimed at children between the ages of 6 and 9
              years old.
            </p>
            <Link to="/register/junior">
              <button className="btn btn-primary btn-block">
                View Junior Camps
              </button>
            </Link>
          </div>
        </div>
        <div className="card mb-3">
          <div className="card-body">
            <h5 className="card-title">Adventure Camps</h5>
            <p className="card-text">
              These camps are aimed at children between the ages of 9 and 15
              years old.
            </p>
            <Link to="/register/adventure">
              <button className="btn btn-primary btn-block">
                View Adventure Camps
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Schedule;
