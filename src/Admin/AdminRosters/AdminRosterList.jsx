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
    this.refreshCamps();
  }

  refreshCamps = () => {
    this.setState({
      isLoading: true
    });
    appClient
      .getCamps()
      .then(camps => {
        this.setState({
          camps: camps.data,
          isLoading: false
        });
      })
      .catch(err => {
        console.error(err);
        this.setState({
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
              key: "campers.length",
              name: "Registrations / Capacity",
              displayFunc: item => `${item.campers.length} / ${item.capacity}`
            },
            {
              key: "waitlisted.length",
              name: "Waitlist",
              displayFunc: item => item.waitlist.length
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
