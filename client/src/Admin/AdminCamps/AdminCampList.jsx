import React, { Component } from "react";
import appClient from "../../appClient";
import _ from "lodash";
import Spinner from "../../Spinner/Spinner";
import ToggleableAdminCampForm from "./ToggleableAdminCampForm";
import SearchTable from "../../SearchTable/SearchTable";
import { Link } from "react-router-dom";
import moment from "moment";
import BooleanIndicator from "../../BooleanIndicator/BooleanIndicator";

class AdminCampList extends Component {
  state = {
    isLoading: false,
    camps: []
  };

  componentDidMount() {
    this.getCamps();
  }

  getCamps = () => {
    this.setState({
      isLoading: true
    });
    appClient
      .adminGetCamps()
      .then(camps => {
        this.setState({
          camps,
          isLoading: false
        });
      })
      .catch(error => {
        this.setState({
          isLoading: false
        });
        this.setState(() => {
          throw error;
        });
      });
  };

  handleQueryChange = e => {
    e.preventDefault();
    this.setState({
      query: e.target.value
    });
  };

  createCamp = ({
    name,
    type,
    description,
    fee,
    startDate,
    endDate,
    openDate,
    closeDate,
    capacity
  }) => {
    return appClient
      .adminCreateCamp({
        name,
        type,
        description,
        fee,
        startDate,
        endDate,
        openDate,
        closeDate,
        capacity
      })
      .then(() => {
        this.getCamps();
      })
      .catch(error => {
        this.setState(() => {
          throw error;
        });
      });
  };

  render() {
    return (
      <div className="admin-camp-list spinner-wrapper">
        {this.state.isLoading && <Spinner />}
        <p className="lead">All Camps</p>
        <SearchTable
          items={this.state.camps}
          searchKeys={["name", "type"]}
          queryPlaceholder="Search Camps"
          columns={[
            { key: "name", name: "Name", displayFunc: item => item.name },
            {
              key: "type",
              name: "Type",
              displayFunc: item => _.capitalize(item.type)
            },
            {
              key: "description",
              name: "Description",
              displayFunc: item => (
                <BooleanIndicator value={!!item.description} />
              )
            },
            {
              key: "fee",
              name: "Fee",
              displayFunc: item => `$${item.fee.toFixed(2)}`
            },
            {
              key: "capacity",
              name: "Capacity",
              displayFunc: item => item.capacity
            },
            {
              key: "openDate",
              name: "Open Date",
              displayFunc: item =>
                moment.utc(item.openDate).format("MM/DD/YYYY")
            },
            {
              key: "closeDate",
              name: "Close Date",
              displayFunc: item =>
                moment.utc(item.closeDate).format("MM/DD/YYYY")
            },
            {
              key: "startDate",
              name: "Start Date",
              displayFunc: item =>
                moment.utc(item.startDate).format("MM/DD/YYYY")
            },
            {
              key: "endDate",
              name: "End Date",
              displayFunc: item => moment.utc(item.endDate).format("MM/DD/YYYY")
            },
            {
              key: "",
              name: "",
              displayFunc: item => (
                <Link to={`/admin/camps/${item._id}`}>Details</Link>
              )
            }
          ]}
        />
        <ToggleableAdminCampForm createCamp={this.createCamp} />
      </div>
    );
  }
}

export default AdminCampList;
