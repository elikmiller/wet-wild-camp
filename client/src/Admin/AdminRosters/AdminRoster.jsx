import React, { Component } from "react";
import _ from "lodash";
import SearchTable from "../../SearchTable/SearchTable";
import { Link } from "react-router-dom";

class AdminRoster extends Component {
  render() {
    return (
      <div className="admin-roster">
        <SearchTable
          items={this.props.camp.campers || []}
          searchKeys={[
            "camper.firstName",
            "camper.lastName",
            "user.primaryContact.firstName",
            "user.primaryContact.lastName"
          ]}
          queryPlaceholder="Search Roster"
          columns={[
            {
              key: "camper.firstName",
              name: "First Name",
              displayFunc: item => item.camper.firstName
            },
            {
              key: "camper.lastName",
              name: "Last Name",
              displayFunc: item => item.camper.lastName
            },
            {
              key: "camper.age",
              name: "Age",
              displayFunc: item => item.camper.age
            },
            {
              key: "camper.swimmingStrength",
              name: "Swimming",
              displayFunc: item =>
                _.capitalize(item.camper.swimmingStrength) || "None"
            },
            {
              key: "camper.morningDropoff",
              name: "AM Dropoff",
              displayFunc: item => _.capitalize(item.morningDropoff)
            },
            {
              key: "camper.afternoonPickup",
              name: "PM Pickup",
              displayFunc: item => _.capitalize(item.afternoonPickup)
            },
            {
              key: "user.primaryContact.firstName",
              name: "Primary First Name",
              displayFunc: item =>
                item.user.primaryContact
                  ? item.user.primaryContact.firstName
                  : ""
            },
            {
              key: "user.primaryContact.lastName",
              name: "Primary Last Name",
              displayFunc: item =>
                item.user.primaryContact
                  ? item.user.primaryContact.lastName
                  : ""
            },
            {
              key: "",
              name: "",
              displayFunc: item => (
                <Link to={`/admin/campers/${item.camper._id}`}>
                  View Camper
                </Link>
              )
            },
            {
              key: "",
              name: "",
              displayFunc: item => (
                <Link to={`/admin/users/${item.user._id}`}>View User</Link>
              )
            }
          ]}
        />
      </div>
    );
  }
}

export default AdminRoster;
