import React, { Component } from "react";
import { AuthContext } from "../App";
import { Link } from "react-router-dom";
import moment from "moment";

class Camp extends Component {
  state = {
    registerOpen: false,
    campers: [],
    selectedCamper: "",
    isClosed: false,
    errors: {}
  };

  componentDidMount() {
    this.isClosed();
  }

  calculateSpaceRemaining = () => {
    let { camp } = this.props;
    let diff = camp.capacity - camp.campers.length;
    if (diff > 0) {
      return diff >= 10 ? "10+" : `${diff}`;
    }
    return "waitlisted";
  };

  goToRegistration = e => {
    e.preventDefault();
    this.props.history.push(`/schedule/${this.props.camp._id}`);
  };

  formatDate = date => {
    return moment.utc(date).format("MM/DD/YYYY");
  };

  isClosed = () => {
    let date = moment();
    let closeDate = moment(this.props.camp.closeDate);
    this.setState({
      isClosed: date > closeDate
    });
  };

  render() {
    let { camp } = this.props;
    // Calculates remaining space in camp
    let spaceRemaining = this.calculateSpaceRemaining();
    return (
      <tbody>
        <tr>
          <td>{camp.name}</td>
          <td>{this.formatDate(camp.startDate)}</td>
          <td>{this.formatDate(camp.endDate)}</td>
          <td>${camp.fee}</td>
          <td>{spaceRemaining}</td>
          <td>
            {!this.state.isClosed && (
              <Link to={`/schedule/${this.props.camp._id}`}>
                <button className="btn btn-secondary float-right btn-sm">
                  Register
                </button>
              </Link>
            )}
            {this.state.isClosed && (
              <button className="btn btn-danger float-right btn-sm" disabled>
                Closed
              </button>
            )}
          </td>
        </tr>
      </tbody>
    );
  }
}

export default props => (
  <AuthContext.Consumer>
    {auth => <Camp userId={auth.userId} logout={auth.logout} {...props} />}
  </AuthContext.Consumer>
);
