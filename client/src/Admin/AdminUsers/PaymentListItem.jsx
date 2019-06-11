import React, { Component } from "react";
import { Link } from "react-router-dom";
import moment from "moment";

class PaymentListItem extends Component {
  state = {
    formOpen: false
  };

  toggleForm = () => {
    this.setState({
      formOpen: !this.state.formOpen
    });
  };

  updatePayment = () => {
    this.props.updatePayment(this.props.payment._id, this.refs.notes.value);
    this.toggleForm();
  };

  render() {
    let { payment } = this.props;
    return (
      <div key={payment._id} className="mb-2">
        <li>
          <Link to={`/admin/payments/${payment._id}`}>
            {moment(payment.timeCreated).format("MM/DD/YYYY")}
            {" - "}
            {payment.fullAmount}
          </Link>
          <i className="far fa-plus-square ml-2" onClick={this.toggleForm} />
        </li>
        {!this.state.formOpen && (
          <li>
            <small>{payment.notes}</small>
          </li>
        )}
        {this.state.formOpen && (
          <li>
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
          </li>
        )}
      </div>
    );
  }
}

export default PaymentListItem;
