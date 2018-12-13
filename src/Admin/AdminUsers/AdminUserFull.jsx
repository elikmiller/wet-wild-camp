import React, { Component } from "react";
import appClient from "../../appClient";
import ContactInformation from "../../ContactInformation/ContactInformation";
import CampersContainer from "../../Campers/CampersContainer";

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
          <div className="card">
            <div className="card-body">
              <ContactInformation userId={this.props.match.params.userId} />
            </div>
          </div>
          <div className="card" style={{ marginTop: "5px" }}>
            <div className="card-body">
              <CampersContainer userId={this.props.match.params.userId} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AdminUserFull;
