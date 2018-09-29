import React, { Component } from "react";
import { AuthContext } from "../App";
import appClient from "../appClient";
import RegistrationTable from "./RegistrationTable";

class Overview extends Component {
  state = {
    registrations: []
  };

  componentDidMount() {
    this.getRegistrations();
  }

  getRegistrations = () => {
    appClient
      .getUserRegistrations(this.props.userId)
      .then(registrations => {
        this.setState({ registrations: registrations.data });
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    let content;
    if (this.state.registrations.length) {
      content = <RegistrationTable data={this.state.registrations} />;
    } else {
      content = (
        <div>
          <br />
          <h4>It looks like you don't have any registrations yet!</h4>
          <br />
          <p>
            Use the tabs on the left to add new campers and update your contact
            info.
          </p>
          <p>Check out the Camp Schedule to register for available sessions!</p>
        </div>
      );
    }
    return (
      <div>
        <h1>Overview</h1>
        {content}
      </div>
    );
  }
}

export default props => (
  <AuthContext.Consumer>
    {auth => <Overview userId={auth.userId} logout={auth.logout} {...props} />}
  </AuthContext.Consumer>
);
