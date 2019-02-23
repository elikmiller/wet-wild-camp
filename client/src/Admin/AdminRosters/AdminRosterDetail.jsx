import React, { Component } from "react";
import appClient from "../../appClient";
import Spinner from "../../Spinner/Spinner";
import AdminRoster from "./AdminRoster";
import { Link } from "react-router-dom";
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";

class AdminRosterDetail extends Component {
  state = {
    camp: {},
    isLoading: false
  };

  componentDidMount() {
    this.getCamp();
  }

  getCamp = () => {
    this.setState({ isLoading: true });
    return appClient
      .adminGetCamp(this.props.match.params.campId)
      .then(camp => {
        this.setState({
          camp: camp,
          isLoading: false
        });
      })
      .catch(err => {
        this.setState({ isLoading: false });
        this.setState(() => {
          throw err;
        });
      });
  };

  render() {
    return (
      <div className="admin-roster-detail">
        <div className="card spinner-wrapper">
          {this.state.isLoading && <Spinner />}
          <div className="card-header">
            <div className="d-flex justify-content-between align-items-center">
              <h5 className="card-title mb-0">Roster Details</h5>
              <div>
                <UncontrolledDropdown>
                  <DropdownToggle caret>Options</DropdownToggle>
                  <DropdownMenu right>
                    <Link to={`/admin/camps/${this.props.match.params.campId}`}>
                      <div className="dropdown-item">View Camp</div>
                    </Link>
                    <DropdownItem divider />
                    <DropdownItem
                      tag="a"
                      href={`${process.env.REACT_APP_SERVER_URL}admin/camps/${
                        this.props.match.params.campId
                      }/csv/monday`}
                      download
                    >
                      Download Monday Report
                    </DropdownItem>
                    <DropdownItem
                      tag="a"
                      href={`${process.env.REACT_APP_SERVER_URL}admin/camps/${
                        this.props.match.params.campId
                      }/csv/contact`}
                      download
                    >
                      Download Contact Report
                    </DropdownItem>
                    <DropdownItem
                      tag="a"
                      href={`${process.env.REACT_APP_SERVER_URL}admin/camps/${
                        this.props.match.params.campId
                      }/csv/swimming`}
                      download
                    >
                      Download Swimming Report
                    </DropdownItem>
                    <DropdownItem divider />
                    <Link to={`/admin/rosters/${this.state.camp._id}/swimming`}>
                      <div className="dropdown-item">
                        Update Swimming Ability
                      </div>
                    </Link>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </div>
            </div>
          </div>
          <div className="card-body">
            <div className="mb-3">
              <AdminRoster camp={this.state.camp} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AdminRosterDetail;
