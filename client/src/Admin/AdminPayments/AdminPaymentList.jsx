import React, { Component } from "react";
import appClient from "../../appClient";
import Spinner from "../../Spinner/Spinner";
import SearchTable from "../../SearchTable/SearchTable";
import moment from "moment";

class AdminPaymentList extends Component {
  state = {
    payments: [],
    isLoading: false
  };

  componentDidMount() {
    this.getPayments();
  }

  getPayments = () => {
    this.setState({
      isLoading: true
    });
    return appClient
      .adminGetPayments()
      .then(payments => {
        this.setState({
          payments,
          isLoading: false
        });
      })
      .catch(err => {
        this.setState(() => {
          throw err;
        });
      });
  };

  render() {
    return (
      <div className="admin-payment-list">
        {this.state.isLoading && <Spinner />}
        <p className="lead">All Payments</p>
        <SearchTable
          items={this.state.payments}
          searchKeys={["user.firstName", "user.lastName", "amount"]}
          queryPlaceholder="Search Payments"
          columns={[
            {
              key: "user.lastName",
              name: "User",
              displayFunc: item =>
                `${item.user.firstName} ${item.user.lastName}`
            },
            {
              key: "amount",
              name: "Amount",
              displayFunc: item => `$${item.amount.toFixed(2)}`
            },
            {
              key: "timeCreated",
              name: "Date",
              displayFunc: item =>
                moment.utc(item.timeCreated).format("MM/DD/YYYY")
            }
          ]}
        />
      </div>
    );
  }
}

export default AdminPaymentList;
