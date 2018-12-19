import React, { Component } from "react";
import ContactInformationContainer from "../../ContactInformation/ContactInformationContainer";
import CamperForm from "../../Campers/CamperForm";
import appClient from "../../appClient";
import moment from "moment";
import { Link } from "react-router-dom";

class AdminCamperFull extends Component {
  state = {
    camper: {},
    formOpen: false
  };

  componentDidMount() {
    this.getCamper();
  }

  getCamper = () => {
    appClient
      .getCamper(this.props.match.params.camperId)
      .then(camper => {
        this.setState({
          camper: camper.data[0]
        });
      })
      .catch(err => {
        console.error(err);
      });
  };

  formatDate = date => {
    let dob = moment.utc(date).format("MM/DD/YYYY");
    let age = moment().diff(moment(date), "years", false);
    return `${dob} (${age} years old)`;
  };

  toggleForm = e => {
    if (e) e.preventDefault();
    this.setState({ formOpen: !this.state.formOpen });
  };

  editCamper = camper => {
    let id = this.state.camper._id;
    appClient
      .updateCamper({ id, data: camper })
      .then(() => {
        this.getCamper();
        this.toggleForm();
      })
      .catch(err => {
        console.error(err);
      });
  };

  render() {
    let { camper } = this.state;
    let registrationArr;
    if (camper.registrations) {
      registrationArr = camper.registrations.map((reg, i) => {
        let ending = "";
        if (i < camper.registrations.length - 1) ending = ", ";
        return `${reg.camp.name} ${reg.camp.type}${ending}`;
      });
    }
    return (
      <div className="card">
        <div className="card-header">
          <strong>Camper: </strong>
          {camper.firstName} {camper.lastName}
          <button
            className="btn btn-primary btn-sm float-right"
            onClick={this.toggleForm}
          >
            Edit
          </button>
        </div>
        <div className="card-body">
          <p className="card-text">
            <strong>Date of Birth: </strong>
            {this.formatDate(camper.dateOfBirth)}
            <br />
            <br />
            <strong>Gender: </strong>
            {camper.gender}
            <br />
            <br />
            <strong>Notes: </strong>
            {camper.notes}
            <br />
            <br />
            <strong>Associated User: </strong>
            {this.state.camper.user && (
              <Link to={`/admin/users/${camper.user._id}`}>
                {camper.user.firstName} {camper.user.lastName}
              </Link>
            )}
            <br />
            <br />
            <strong>Registered Camps: </strong>
            {registrationArr}
            <br />
            <br />
          </p>
          <div className="card">
            <div className="card-body">
              {this.state.camper.user && (
                <ContactInformationContainer userId={camper.user._id} />
              )}
            </div>
          </div>
          {this.state.formOpen && (
            <div>
              <br />
              <br />
              <h3 className="center">Edit Form</h3>
              <CamperForm
                onSubmit={this.editCamper}
                closeForm={this.toggleForm}
                data={this.state.camper}
              />
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default AdminCamperFull;
