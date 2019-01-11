import React, { Component } from "react";
import appClient from "../../appClient";
import ContactInformationContainerWrapper from "../../ContactInformation/ContactInformationContainerWrapper";
import CampersContainerWrapper from "../../Campers/CampersContainerWrapper";

class AdminUserFull extends Component {
  state = {
    user: {}
  };

  componentDidMount() {
    this.getUserData();
  }

  getUserData = () => {
    appClient
      .getAdminUser(this.props.match.params.userId)
      .then(user => {
        this.setState({
          user: user.data
        });
      })
      .catch(err => {
        console.error(err);
      });
  };

  render() {
    let { user } = this.state;
    return (
      <div className="card">
        <div className="card-header">
          {user.firstName} {user.lastName}
        </div>
        <div className="card-body">
          <p className="card-text">
            <strong>Email: </strong>
            {user.email}
          </p>
          <h3 className="mt-5">Campers</h3>
          <div className="card mt-1">
            <div className="card-body">
              <CampersContainerWrapper
                userId={this.props.match.params.userId}
              />
            </div>
          </div>
          <h3 className="mt-5">Contact Information</h3>
          <div className="card">
            <div className="card-body">
              <ContactInformationContainerWrapper
                userId={this.props.match.params.userId}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AdminUserFull;
