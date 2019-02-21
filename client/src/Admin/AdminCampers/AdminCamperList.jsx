import React, { Component } from "react";
import appClient from "../../appClient";
import _ from "lodash";
import Spinner from "../../Spinner/Spinner";
import SearchTable from "../../SearchTable/SearchTable";
import { Link } from "react-router-dom";
import moment from "moment";
import BooleanIndicator from "../../BooleanIndicator/BooleanIndicator";

class AdminRosterList extends Component {
  state = {
    isLoading: false,
    campers: []
  };

  componentDidMount() {
    this.getCampers();
  }

  getCampers = () => {
    this.setState({
      isLoading: true
    });
    appClient.adminGetCampers().then(campers => {
      this.setState({
        campers,
        isLoading: false
      });
    });
  };

  handleQueryChange = e => {
    e.preventDefault();
    this.setState({
      query: e.target.value
    });
  };

  render() {
    return (
      <div className="admin-camper-list spinner-wrapper">
        {this.state.isLoading && <Spinner />}
        <p className="lead">All Campers</p>
        <SearchTable
          items={this.state.campers}
          searchKeys={["firstName", "lastName"]}
          queryPlaceholder="Search Campers"
          columns={[
            {
              key: "firstName",
              name: "First Name",
              displayFunc: item => item.firstName
            },
            {
              key: "lastName",
              name: "Last Name",
              displayFunc: item => item.lastName
            },
            {
              key: "dateOfBirth",
              name: "Date of Birth",
              displayFunc: item =>
                moment.utc(item.dateOfBirth).format("MM/DD/YYYY")
            },
            {
              key: "age",
              name: "Age",
              displayFunc: item => item.age
            },
            {
              key: "swimmingStrength",
              name: "Swimming Strength",
              displayFunc: item => _.capitalize(item.swimmingStrength || "None")
            },
            {
              key: "notes",
              name: "Notes",
              displayFunc: item => <BooleanIndicator value={!!item.notes} />
            },
            {
              key: "",
              name: "",
              displayFunc: item => (
                <Link to={`/admin/campers/${item._id}`}>Details</Link>
              )
            }
          ]}
        />
      </div>
    );
  }
}

export default AdminRosterList;
