import React, { Component } from "react";
import appClient from "../../appClient";
import Spinner from "../../Spinner/Spinner";
import SearchTable from "../../SearchTable/SearchTable";
import moment from "moment";
import { Link } from "react-router-dom";

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
          payments: payments.filter(payment => payment.executed === true),
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
                item.user ? (
                  `${item.user.firstName} ${item.user.lastName}`
                ) : (
                  <em>No User Found</em>
                )
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
            },
            {
              key: "",
              name: "",
              displayFunc: item => (
                <Link to={`/admin/payments/${item._id}`}>Details</Link>
              )
            }
          ]}
        />
      </div>
    );
  }
}

export default AdminPaymentList;
