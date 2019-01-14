import React, { Component } from "react";
import ContactInformationContainerWrapper from "../../ContactInformation/ContactInformationContainerWrapper";
import CamperForm from "../../Campers/CamperForm";
import appClient from "../../appClient";
import moment from "moment";
import { Link } from "react-router-dom";

class AdminCamperDetail extends Component {
  state = {
    camper: {},
    formOpen: false,
    confirmMessage: false,
    errors: {}
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

  toggleConfirm = () => {
    this.setState({
      confirmMessage: !this.state.confirmMessage
    });
  };

  deleteCamper = () => {
    let id = this.state.camper._id;
    appClient
      .adminDeleteCamper(id)
      .then(() => {
        this.props.history.push("/admin/campers");
      })
      .catch(err => {
        this.toggleConfirm();
        if (err.response.status === 400) {
          this.setState({
            errors: {
              delete:
                "This camper has existing registrations and cannot be deleted."
            }
          });
        } else if (err.response.status === 500) {
          this.setState({
            errors: { delete: "Could not communicate with server." }
          });
        } else {
          this.setState({ errors: { delete: "Unknown Error." } });
        }
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
          <div className="d-flex justify-content-between align-items-center">
            <p className="mb-0">
              <strong>Camper: </strong>
              {camper.firstName} {camper.lastName}
            </p>
            <div>
              <button
                className="btn btn-primary btn-sm"
                onClick={this.toggleForm}
              >
                <i className="fas fa-edit" /> Edit
              </button>
              <button
                className="btn btn-danger btn-sm mb-0 ml-1"
                onClick={this.toggleConfirm}
              >
                <i className="fas fa-trash" /> Delete
              </button>
            </div>
          </div>
        </div>
        <div className="card-body">
          {this.state.confirmMessage && (
            <div
              className="alert alert-info d-flex justify-content-between align-items-center"
              role="alert"
            >
              Are you sure you want to delete this camper?
              <div>
                <button
                  className="btn btn-secondary btn-sm"
                  onClick={this.toggleConfirm}
                >
                  Cancel
                </button>
                <button
                  className="btn btn-danger btn-sm mb-0 ml-1"
                  onClick={this.deleteCamper}
                >
                  Delete
                </button>
              </div>
            </div>
          )}
          {this.state.errors.delete && (
            <div className="alert alert-danger" role="alert">
              {this.state.errors.delete}
            </div>
          )}
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
                <ContactInformationContainerWrapper userId={camper.user._id} />
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

export default AdminCamperDetail;
