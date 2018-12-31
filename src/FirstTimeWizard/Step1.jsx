import React, { Component } from "react";

class Step1 extends Component {
  render() {
    return (
      <div>
        <p>
          <strong>Welcome to Wet and Wild Adventure Camp!</strong>
        </p>
        <p>
          Before we get started we'll need to collect some preliminary
          information to keep your campers safe.
        </p>
        <p>
          Please proceed through each section by filling out the necessary form
          and clicking the "Next" button.
        </p>
        <p>
          Questions? Please{" "}
          <a href="https://wetwildcamp.com/about-us/contact-us/" target="blank">
            click here
          </a>{" "}
          to get in contact with us.
        </p>
      </div>
    );
  }
}

export default Step1;
