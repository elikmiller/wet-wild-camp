import React, { Component } from "react";
import appClient from "../../appClient";
import AdminSessionForm from "./AdminSessionForm";
import moment from "moment";
import EmailForm from "../../forms/EmailForm";

class AdminSessionFull extends Component {
  state = {
    camp: {},
    emailList: [],
    formOpen: false
  };

  componentDidMount() {
    this.getCampData();
  }

  formatDate = date => {
    return moment.utc(date).format("MMMM Do, YYYY");
  };

  getCampData = () => {
    appClient
      .getCamp(this.props.match.params.sessionId)
      .then(camp => {
        let emailList = camp.data.campers.map(camper => {
          return camper.user.email;
        });
        let filteredList = emailList.filter((email, i) => {
          return emailList.indexOf(email) === i;
        });
        this.setState({
          camp: camp.data,
          emailList: filteredList
        });
      })
      .catch(err => {
        console.error(err);
      });
  };

  // Saves data from form to DB
  handleSubmit = data => {
    appClient
      .updateCamp(this.state.camp._id, data)
      .then(() => {
        this.getCampData();
      })
      .catch(err => {
        console.error(err);
      });
  };

  // Opens and closes camp edit form
  toggleForm = e => {
    if (e) e.preventDefault();
    this.setState({ formOpen: !this.state.formOpen });
  };

  // Adds camper from waitlist to DB
  addToCamp = e => {
    let { value } = e.target;
    e.preventDefault();
    appClient
      .moveFromWaitlist(this.state.camp._id, value)
      .then(() => {
        this.getCampData();
      })
      .catch(err => {
        console.error(err);
      });
  };

  // Removes camper registration
  removeFromCamp = e => {
    e.preventDefault();
    appClient
      .deleteRegistration(e.target.value)
      .then(() => {
        this.getCampData();
      })
      .catch(err => {
        console.error(err);
      });
  };

  deleteCamp = e => {
    e.preventDefault();
    appClient
      .deleteCamp(this.state.camp._id)
      .then(this.props.history.push("/admin/sessions"))
      .catch(err => {
        console.error(err);
      });
  };

  goToRoster = e => {
    e.preventDefault();
    this.props.history.push(`/admin/rosters/${this.state.camp._id}`);
  };

  render() {
    let { camp } = this.state;
    let startDate = this.formatDate(camp.startDate);
    let endDate = this.formatDate(camp.endDate);
    let openDate = this.formatDate(camp.openDate);
    let closeDate = this.formatDate(camp.closeDate);

    let deleteButton;
    if (camp.campers) {
      deleteButton = camp.campers.length ? (
        <button className="btn btn-danger btn-sm float-right" disabled>
          Delete Camp
        </button>
      ) : (
        <button
          className="btn btn-danger btn-sm float-right"
          onClick={this.deleteCamp}
        >
          Delete Camp
        </button>
      );
    }

    return (
      <div>
        <div className="card">
          <div className="card-header">
            {camp.name} {camp.type}
            {deleteButton}
            <button
              className="btn btn-primary btn-sm float-right"
              onClick={this.toggleForm}
              style={{ marginRight: "15px" }}
            >
              Edit
            </button>
          </div>
          <div className="card-body">
            <div className="row justify-content-around">
              <div className="col-lg-5">
                <p className="card-text">
                  {camp.description || "No description provided."}
                </p>
                <br />
                <p className="card-text">
                  <strong>Number of Registrants: </strong>
                  {camp.campers ? camp.campers.length : "Awaiting Data"}
                </p>
                <p className="card-text">
                  <strong>Capacity: </strong>
                  {camp.capacity ? camp.capacity : "Awaiting Data"}
                </p>
                <br />
                <p className="card-text">
                  <strong>Fee: </strong>
                  {camp.fee ? `$${camp.fee}` : "Awaiting Data"}
                </p>
                <br />
              </div>
              <div className="col-lg-5">
                <p className="card-text">
                  <strong>Start: </strong>
                  {startDate ? startDate : "Awaiting Data"}
                </p>
                <p className="card-text">
                  <strong>End: </strong>
                  {endDate ? endDate : "Awaiting Data"}
                </p>
                <br />
                <p className="card-text">
                  <strong>Registration Open: </strong>
                  {openDate ? openDate : "Awaiting Data"}
                </p>
                <p className="card-text">
                  <strong>Registration Close: </strong>
                  {closeDate ? closeDate : "Awaiting Data"}
                </p>
              </div>
            </div>
            <button
              className="btn btn-primary btn-block"
              onClick={this.goToRoster}
            >
              View Roster
            </button>
          </div>
          {this.state.formOpen && (
            <div>
              <h3 className="center">Edit Form</h3>
              <AdminSessionForm
                handleSubmit={this.handleSubmit}
                handleClose={this.toggleForm}
                data={this.state.camp}
              />
            </div>
          )}
        </div>
        <br />
        {this.state.emailList && <EmailForm emails={this.state.emailList} />}
      </div>
    );
  }
}

export default AdminSessionFull;
