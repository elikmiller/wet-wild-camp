import React, { Component } from "react";
import appClient from "../../appClient";
import _ from "lodash";
import Spinner from "../../Spinner/Spinner";
import SearchTable from "../../SearchTable/SearchTable";
import { Link } from "react-router-dom";

class AdminRosterList extends Component {
  state = {
    isLoading: false,
    camps: []
  };

  componentDidMount() {
    this.getCamps();
  }

  getCamps = () => {
    this.setState({
      isLoading: true
    });
    appClient
      .adminGetCamps()
      .then(camps => {
        this.setState({
          camps: camps,
          isLoading: false
        });
      })
      .catch(err => {
        this.setState({
          isLoading: false
        });
        this.setState(() => {
          throw err;
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
      <div className="admin-camp-list spinner-wrapper">
        {this.state.isLoading && <Spinner />}
        <p className="lead">All Rosters</p>
        <SearchTable
          items={this.state.camps}
          searchKeys={["name", "type"]}
          queryPlaceholder="Search Rosters"
          columns={[
            { key: "name", name: "Name", displayFunc: item => item.name },
            {
              key: "type",
              name: "Type",
              displayFunc: item => _.capitalize(item.type)
            },
            {
              key: "registrations.length",
              name: "Registrations / Capacity",
              displayFunc: item => {
                let confirmedRegistrations = item.registrations.filter(
                  registrations => registrations.deposit || registrations.paid
                );
                return `${confirmedRegistrations.length} / ${item.capacity}`;
              }
            },
            {
              key: "waitlisted.length",
              name: "Waitlist",
              displayFunc: item => {
                let waitlistedRegistrations = item.registrations.filter(
                  registrations => registrations.waitlist
                );
                return `${waitlistedRegistrations.length}`;
              }
            },
            {
              key: "",
              name: "",
              displayFunc: item => (
                <Link to={`/admin/rosters/${item._id}`}>Details</Link>
              )
            }
          ]}
        />
      </div>
    );
  }
}

export default AdminRosterList;
