import React, { Component } from "react";
import appClient from "../../appClient";
import Spinner from "../../Spinner/Spinner";
import AdminRoster from "./AdminRoster";
import SearchTable from "../../SearchTable/SearchTable";
import { Link } from "react-router-dom";
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Modal,
  ModalHeader,
  ModalBody
} from "reactstrap";
import { CopyToClipboard } from "react-copy-to-clipboard";

class AdminRosterDetail extends Component {
  state = {
    camp: {},
    isLoading: false,
    modalOpen: false
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

  toggleModal = () => {
    this.setState({
      modalOpen: !this.state.modalOpen
    });
  };

  render() {
    let rosterEmails = (this.state.camp.registrations || [])
      .filter(registration => registration.paid || registration.deposit)
      .map(registration => registration.user.primaryContact.email);
    let depositEmails = (this.state.camp.registrations || [])
      .filter(registration => !registration.paid && registration.deposit)
      .map(registration => registration.user.primaryContact.email);
    return (
      <div className="admin-roster-detail">
        <div className="card spinner-wrapper">
          {this.state.isLoading && <Spinner />}
          <div className="card-header">
            <div className="d-flex justify-content-between align-items-center">
              <h5 className="card-title mb-0">Roster Details</h5>
              <div className="d-flex">
                <button
                  className="btn btn-info mr-2"
                  onClick={this.toggleModal}
                >
                  Bus
                </button>
                <Modal isOpen={this.state.modalOpen} toggle={this.toggleModal}>
                  <ModalHeader toggle={this.toggleModal}>
                    Bus Roster
                  </ModalHeader>
                  <ModalBody>
                    <BusList items={this.state.camp.registrations} />
                  </ModalBody>
                </Modal>
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
                    <CopyToClipboard text={rosterEmails.join("; ")}>
                      <DropdownItem>Copy Roster Emails</DropdownItem>
                    </CopyToClipboard>
                    <CopyToClipboard text={depositEmails.join("; ")}>
                      <DropdownItem>Copy Deposit Emails</DropdownItem>
                    </CopyToClipboard>
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
              <AdminRoster camp={this.state.camp} type="roster" />
            </div>
          </div>
          <div className="card-body">
            <div className="mb-3">
              <AdminRoster camp={this.state.camp} type="waitlist" />
            </div>
          </div>
          <div className="card-body">
            <div className="mb-3">
              <AdminRoster camp={this.state.camp} type="unpaid" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AdminRosterDetail;

const BusList = props => {
  const items = props.items.filter(
    item => !item.waitlist && (item.paid || item.deposit)
  );
  return (
    <SearchTable
      items={items || []}
      searchKeys={["camper.firstName", "camper.lastName", "afternoonPickup"]}
      queryPlaceholder="Search List"
      columns={[
        {
          key: "camper.firstName",
          name: "First Name",
          displayFunc: item => item.camper.firstName
        },
        {
          key: "camper.lastName",
          name: "Last Name",
          displayFunc: item => item.camper.lastName
        },
        {
          key: "afternoonPickup",
          name: "Afternoon Pickup",
          displayFunc: item => item.afternoonPickup
        }
      ]}
      modal
    />
  );
};
