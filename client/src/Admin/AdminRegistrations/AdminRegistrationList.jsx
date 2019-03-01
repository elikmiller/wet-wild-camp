import React, { Component } from "react";
import appClient from "../../appClient";
import Spinner from "../../Spinner/Spinner";
import SearchTable from "../../SearchTable/SearchTable";
import { Link } from "react-router-dom";
import moment from "moment";

class AdminRegistrationList extends Component {
  state = {
    registrations: [],
    isLoading: false
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
        isLoading: false
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
              key: "camp.startDate",
              name: "Start Date",
              displayFunc: item =>
                item.camp &&
                moment.utc(item.camp.startDate).format("MM/DD/YYYY")
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
                    {!item.paid && !item.deposit && (
                      <span className="badge badge-danger">Unpaid</span>
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
