import React, { Component } from "react";
import appClient from "../../appClient";
import AdminSessionForm from "./AdminSessionForm";
import moment from "moment";

class AdminSessionFull extends Component {
  state = {
    camp: {},
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
        console.log(camp.data);
        this.setState({
          camp: camp.data
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

  // Creates list elements for waitlisted and registered campers
  generateListOfNames = (arr, waitlist) => {
    let list = arr.map((elem, i) => {
      return (
        <li key={i} className="list-group-item">
          {elem.camper.firstName} {elem.camper.lastName}
          {waitlist ? (
            <button
              className="btn btn-primary btn-sm float-right"
              onClick={this.addToCamp}
              value={elem._id}
            >
              Add
            </button>
          ) : (
            <button
              className="btn btn-danger btn-sm float-right"
              onClick={this.removeFromCamp}
              value={elem._id}
            >
              Remove
            </button>
          )}
        </li>
      );
    });
    return list;
  };

  render() {
    let { camp } = this.state;
    let startDate = this.formatDate(camp.startDate);
    let endDate = this.formatDate(camp.endDate);
    let openDate = this.formatDate(camp.openDate);
    let closeDate = this.formatDate(camp.closeDate);
    let campers, waitlist;
    if (camp.campers) {
      campers = this.generateListOfNames(camp.campers, false);
      waitlist = this.generateListOfNames(camp.waitlist, true);
    }
    return (
      <div className="card">
        <div className="card-header">
          {camp.name} {camp.type}
          <button
            className="btn btn-primary btn-sm float-right"
            onClick={this.toggleForm}
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
          <div className="row justify-content-around">
            <div className="card col-lg-5" style={{ padding: "0" }}>
              <div className="card-header">Campers</div>
              <div className="card-body" style={{ padding: "0" }}>
                <ul className="list-group list-group-flush">{campers}</ul>
              </div>
            </div>
            <div className="card col-lg-5" style={{ padding: "0" }}>
              <div className="card-header">Waitlist</div>
              <div className="card-body" style={{ padding: "0" }}>
                <ul className="list-group list-group-flush">{waitlist}</ul>
              </div>
            </div>
          </div>
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
    );
  }
}

export default AdminSessionFull;
