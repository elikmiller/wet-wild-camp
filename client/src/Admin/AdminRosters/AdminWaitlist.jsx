import React, { Component } from "react";
import SearchTable from "../../SearchTable/SearchTable";
import { Link } from "react-router-dom";

class AdminWaitlist extends Component {
  render() {
    let registrations = this.props.camp.registrations || [];
    registrations = registrations.filter(registration => registration.waitlist);
    return (
      <div className="admin-waitlist">
        <SearchTable
          items={registrations}
          searchKeys={["camper.firstName", "camper.lastName"]}
          queryPlaceholder="Search Waitlist"
          columns={[
            {
              key: "camper.firstName",
              name: "First Name",
              displayFunc: item => item.camper.firstName
            },
            {
              key: "camper.firstName",
              name: "First Name",
              displayFunc: item => item.camper.firstName
            },
            {
              key: "camper.age",
              name: "Age",
              displayFunc: item => item.camper.age
            }
          ]}
        />
      </div>
    );
  }
}

export default AdminWaitlist;
