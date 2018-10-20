import React, { Component } from "react";
import appClient from "../../appClient";
import moment from "moment";

class AdminSessionFull extends Component {
  state = {
    camp: {}
  };

  componentDidMount() {
    this.getCampData();
  }

  formatDate = date => {
    return moment.utc(date).format("MMMM Do, YYYY");
  };

  createDateStrings = data => {
    data.startDate = this.formatDate(data.startDate);
    data.endDate = this.formatDate(data.endDate);
    data.openDate = this.formatDate(data.openDate);
    data.closeDate = this.formatDate(data.closeDate);
    return data;
  };

  getCampData = () => {
    appClient
      .getCamp(this.props.match.params.sessionId)
      .then(camp => {
        let formattedData = this.createDateStrings(camp.data);
        this.setState({
          camp: formattedData
        });
      })
      .catch(err => {
        console.error(err);
      });
  };

  render() {
    let { camp } = this.state;
    let campers;
    if (camp.campers) {
      campers = camp.campers.map((camper, i) => {
        return (
          <li key={i} className="list-group-item">
            {camper.firstName} {camper.lastName}
          </li>
        );
      });
    }
    return (
      <div className="card">
        <div className="card-header">
          {camp.name} {camp.type}
        </div>
        <div className="card-body">
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
          <div className="row justify-content-around">
            <div className="card col-lg-5" style={{ padding: "0" }}>
              <div className="card-header">Dates</div>
              <div className="card-body" style={{ padding: "0" }}>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">
                    <strong>Start: </strong>
                    {camp.startDate}
                  </li>
                  <li className="list-group-item">
                    <strong>End: </strong>
                    {camp.endDate}
                  </li>
                  <li className="list-group-item">
                    <strong>Registration Open: </strong>
                    {camp.openDate}
                  </li>
                  <li className="list-group-item">
                    <strong>Registration Close: </strong>
                    {camp.closeDate}
                  </li>
                </ul>
              </div>
            </div>
            <div className="card col-lg-5" style={{ padding: "0" }}>
              <div className="card-header">Campers</div>
              <div className="card-body" style={{ padding: "0" }}>
                <ul className="list-group list-group-flush">{campers}</ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AdminSessionFull;
