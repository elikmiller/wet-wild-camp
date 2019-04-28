import React, { Component } from "react";
import appClient from "../../appClient";
import Spinner from "../../Spinner/Spinner";
import AdminPayment from "./AdminPayment";

class AdminPaymentDetail extends Component {
  state = {
    isLoading: false,
    formOpen: false,
    payment: {}
  };

  componentDidMount() {
    this.getPayment();
  }

  getPayment = () => {
    this.setState({ isLoading: true });
    return appClient
      .adminGetPayment(this.props.match.params.paymentId)
      .then(payment => {
        this.setState({
          payment,
          isLoading: false
        });
      })
      .catch(error => {
        this.setState({ isLoading: false });
        this.setState(() => {
          throw error;
        });
      });
  };

  updatePayment = e => {
    e.preventDefault();
    appClient
      .adminUpdatePayment(this.state.payment._id, {
        notes: this.refs.notes.value
      })
      .then(() => {
        this.toggleForm();
        this.getPayment();
      });
  };

  toggleForm = () => {
    this.setState({
      formOpen: !this.state.formOpen
    });
  };

  render() {
    const { payment } = this.state;
    return (
      <div className="admin-payment-detail">
        <div className="card spinner-wrapper">
          {this.state.isLoading && <Spinner />}
          <div className="card-header">
            <div className="d-flex justify-content-between align-items-center">
              <h5 className="card-title mb-0">Payment Details</h5>
            </div>
          </div>

          <div className="card-body">
            <div className="mb-3">
              <strong>Payment: </strong>
              <AdminPayment
                amount={payment.amount}
                created={payment.timeCreated}
                paypalId={payment.paypalId}
                paypal={payment.paypal}
                notes={payment.notes || ""}
              />
            </div>
            {this.state.formOpen && (
              <form className="w-50" onSubmit={this.updatePayment}>
                <textarea
                  className="form-control mb-1"
                  defaultValue={payment.notes || ""}
                  name="notes"
                  ref="notes"
                />
                <button className="btn btn-primary" type="submit">
                  Update Notes
                </button>
              </form>
            )}
            {!this.state.formOpen && (
              <button className="btn btn-secondary" onClick={this.toggleForm}>
                Edit Notes
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default AdminPaymentDetail;
