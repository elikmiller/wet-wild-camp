import React, { Component } from "react";
import appClient from "../../appClient";
import Spinner from "../../Spinner/Spinner";
import SearchTable from "../../SearchTable/SearchTable";
import { Link } from "react-router-dom";
import moment from "moment";

class AdminRegistrationList extends Component {
  state = {
    registrations: [],
    isLoading: false,
    default: {
      sortKey: null,
      sortOrder: null
    }
  };

  componentDidMount() {
    this.getRegistrations();
  }

  getRegistrations = () => {
    this.setState({
      isLoading: true
    });
    appClient.adminGetRegistrations().then(registrations => {
      this.setState({
        registrations,
        isLoading: false,
        default: {
          sortKey: "user.firstName",
          sortOrder: "asc"
        }
      });
    });
  };

  render() {
    return (
      <div className="admin-registration-list spinner-wrapper">
        {this.state.isLoading && <Spinner />}
        <p className="lead">All Registrations</p>
        <SearchTable
          items={this.state.registrations}
          searchKeys={[
            "user.firstName",
            "user.lastName",
            "camper.firstName",
            "camper.lastName",
            "camp.fullName"
          ]}
          queryPlaceholder="Search Registrations"
          default={this.state.default}
          columns={[
            {
              key: "user.lastName",
              name: "User",
              displayFunc: item =>
                item.user && `${item.user.firstName} ${item.user.lastName}`
            },
            {
              key: "camp.fullName",
              name: "Camp",
              displayFunc: item => item.camp && item.camp.fullName
            },
            {
              key: "camper.lastName",
              name: "Camper",
              displayFunc: item => item.camper && item.camper.fullName
            },
            {
              key: "created",
              name: "Created",
              displayFunc: item => moment.utc(item.created).format("MM/DD/YYYY")
            },
            {
              key: "paid",
              name: "Status",
              displayFunc: item => {
                return (
                  <div>
                    {item.paid && (
                      <span className="badge badge-success">Paid in Full</span>
                    )}
                    {item.deposit && !item.paid && (
                      <span className="badge badge-warning">Deposit Paid</span>
                    )}
                    {!item.paid && !item.deposit && !item.waitlist && item.spaceSaved && (
                      <span className="badge badge-primary">Space Saved</span>
                    )}
                    {!item.paid && !item.deposit && !item.waitlist && !item.spaceSaved && (
                      <span className="badge badge-danger">Unpaid</span>
                    )}
                    {!item.paid && !item.deposit && item.waitlist && (
                      <span className="badge badge-secondary">Waitlisted</span>
                    )}
                  </div>
                );
              }
            },
            {
              key: "",
              name: "",
              displayFunc: item => (
                <Link to={`/admin/registrations/${item._id}`}>Details</Link>
              )
            }
          ]}
        />
      </div>
    );
  }
}

export default AdminRegistrationList;
