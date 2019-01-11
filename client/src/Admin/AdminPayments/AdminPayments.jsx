import React, { Component } from "react";
import appClient from "../../appClient";
import handleSort from "../../sort";
import AdminPaymentCell from "./AdminPaymentCell";

class AdminPayments extends Component {
  state = {
    payments: [],
    sortStatus: {
      user: {
        engaged: false,
        ascending: true
      },
      amount: {
        engaged: false,
        ascending: true
      },
      timeCreated: {
        engaged: false,
        ascending: true
      }
    }
  };

  componentDidMount() {
    this.getAllPayments();
  }

  getAllPayments = () => {
    appClient
      .getAllPayments()
      .then(res => {
        this.setState({
          payments: res.data
        });
      })
      .catch(err => {
        console.error(err);
      });
  };

  handleUserSort = e => {
    e.preventDefault();
    let sortedData = handleSort(e, this.state.payments, this.state.sortStatus);
    this.setState({
      payments: sortedData.data,
      sortStatus: sortedData.sortStatus
    });
  };

  render() {
    let content = this.state.payments.map((payment, i) => {
      return <AdminPaymentCell key={i} data={payment} />;
    });
    return (
      <div>
        <table className="table table-sm admin-table">
          <thead>
            <tr>
              <td>
                <button
                  className="btn btn-light btn-sm"
                  onClick={this.handleUserSort}
                  id="user"
                  value="lastName"
                >
                  User
                </button>
              </td>
              <td>
                <button
                  className="btn btn-light btn-sm"
                  onClick={this.handleUserSort}
                  id="amount"
                  value="amount"
                >
                  Amount
                </button>
              </td>
              <td>
                <button
                  className="btn btn-light btn-sm"
                  onClick={this.handleUserSort}
                  id="timeCreated"
                  value="timeCreated"
                >
                  Date
                </button>
              </td>
            </tr>
          </thead>
          <tbody>{content}</tbody>
        </table>
      </div>
    );
  }
}

export default AdminPayments;
