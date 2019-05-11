import React, { Component } from "react";
import _ from "lodash";
import SearchTable from "../../SearchTable/SearchTable";
import { Button, Popover, PopoverHeader, PopoverBody } from "reactstrap";
import { Link } from "react-router-dom";

class AdminRoster extends Component {
  render() {
    let registrations = this.props.camp.registrations || [];
    registrations = registrations.filter(registration => {
      if (this.props.type === "roster")
        return registration.deposit || registration.paid;
      else if (this.props.type === "unpaid")
        return !registration.paid && !registration.waitlist;
      else return registration.waitlist;
    });
    return (
      <div className="admin-roster">
        <div className="row">
          <h4 className="col-6">
            {this.props.type === "roster" && "Roster"}
            {this.props.type === "waitlist" && "Waitlist"}
            {this.props.type === "unpaid" && "Unpaid Registrations"}
          </h4>
          <p className="col-6 text-right">Total: {registrations.length}</p>
        </div>
        <SearchTable
          items={registrations}
          searchKeys={[
            "camper.firstName",
            "camper.lastName",
            "user.primaryContact.firstName",
            "user.primaryContact.lastName"
          ]}
          queryPlaceholder={
            this.props.type === "roster" ? "Search Roster" : "Search Waitlist"
          }
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
              key: "camper.age",
              name: "Age",
              displayFunc: item => item.camper.age
            },
            {
              key: "camper.swimmingStrength",
              name: "Swimming",
              displayFunc: item =>
                _.capitalize(item.camper.swimmingStrength) || "None"
            },
            {
              key: "camper.morningDropoff",
              name: "AM Dropoff",
              displayFunc: item => _.capitalize(item.morningDropoff)
            },
            {
              key: "camper.afternoonPickup",
              name: "PM Pickup",
              displayFunc: item => _.capitalize(item.afternoonPickup)
            },
            {
              key: "user.primaryContact.firstName",
              name: "Primary First Name",
              displayFunc: item =>
                item.user.primaryContact
                  ? item.user.primaryContact.firstName
                  : ""
            },
            {
              key: "user.primaryContact.lastName",
              name: "Primary Last Name",
              displayFunc: item =>
                item.user.primaryContact
                  ? item.user.primaryContact.lastName
                  : ""
            },
            {
              key: "",
              name: "",
              displayFunc: item => (
                <Link to={`/admin/campers/${item.camper._id}`}>
                  View Camper
                </Link>
              )
            },
            {
              key: "",
              name: "",
              displayFunc: item => (
                <Link to={`/admin/users/${item.user._id}`}>View User</Link>
              )
            },
            {
              key: "",
              name: "",
              displayFunc: item => (
                <NotesPopover
                  notes={item.camper.notes || ""}
                  id={item.id}
                  name={`${item.camper.firstName} ${item.camper.lastName}`}
                />
              )
            }
          ]}
        />
      </div>
    );
  }
}

export default AdminRoster;

class NotesPopover extends Component {
  state = {
    popoverOpen: false
  };

  togglePopover = () => {
    this.setState({
      popoverOpen: !this.state.popoverOpen
    });
  };

  render() {
    if (this.props.notes === "") return <span>----</span>;
    else
      return (
        <div>
          <Button
            id={`popover${this.props.id}`}
            style={{ padding: "0px 7px", margin: "0px" }}
            type="button"
          >
            <i className="far fa-clipboard fa-xs" />
          </Button>
          <Popover
            placement="bottom"
            isOpen={this.state.popoverOpen}
            target={`popover${this.props.id}`}
            trigger="focus"
            toggle={this.togglePopover}
            flip={false}
          >
            <PopoverHeader>{this.props.name}</PopoverHeader>
            <PopoverBody>{this.props.notes}</PopoverBody>
          </Popover>
        </div>
      );
  }
}
