import React, { Component } from "react";
import appClient from "../../appClient";
import _ from "lodash";
import Spinner from "../../Spinner/Spinner";
import AdminRoster from "./AdminRoster";
import { Link } from "react-router-dom";

class AdminRosterDetail extends Component {
  state = {
    camp: {},
    isLoading: false
  };

  componentDidMount() {
    this.getCamp(this.props.match.params.campId);
  }

  getCamp = campId => {
    this.setState({ isLoading: true });
    appClient
      .getCamp(campId)
      .then(camp => {
        this.setState({
          camp: camp.data,
          isLoading: false
        });
      })
      .catch(err => {
        this.setState({ isLoading: false });
        console.error(err);
      });
  };

  render() {
    return (
      <div className="admin-roster-detail spinner-wrapper">
        {this.state.isLoading && <Spinner />}
        <Link to="/admin/rosters">
          <button type="button" className="btn btn-link mb-3 pl-0">
            <i className="fas fa-arrow-left" /> Back to All Rosters
          </button>
        </Link>
        <p className="lead">
          {this.state.camp.name} {_.capitalize(this.state.camp.type)} Roster
        </p>
        <ul>
          <li>
            <a
              href={`${process.env.REACT_APP_SERVER_URL}/camps/${
                this.state.camp._id
              }/csv/contact`}
              download
            >
              Download Contact Report (.csv)
            </a>
          </li>
          <li>
            <a
              href={`${process.env.REACT_APP_SERVER_URL}/camps/${
                this.state.camp._id
              }/csv/monday`}
              download
            >
              Download Monday Report (.csv)
            </a>
          </li>
          <li>
            <a
              href={`${process.env.REACT_APP_SERVER_URL}/camps/${
                this.state.camp._id
              }/csv/swimming`}
              download
            >
              Download Swimming Report (.csv)
            </a>
          </li>
          <li>
            <Link to={`/admin/rosters/${this.state.camp._id}/swimming`}>
              Update Swimming Ability
            </Link>
          </li>
        </ul>
        <AdminRoster camp={this.state.camp} />
      </div>
    );
  }
}

export default AdminRosterDetail;
