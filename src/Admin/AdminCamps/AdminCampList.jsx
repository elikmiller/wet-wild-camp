import React, { Component } from "react";
import appClient from "../../appClient";
import AdminCampCell from "./AdminCampCell";
import Fuse from "fuse.js";
import _ from "lodash";
import SortIndicator from "../../SortIndicator/SortIndicator";
import Spinner from "../../Spinner/Spinner";
import ToggleableAdminCampForm from "./ToggleableAdminCampForm";

class AdminCampList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      camps: [],
      query: "",
      sortKey: null,
      sortOrder: null
    };
    this.fuse = new Fuse([], {
      tokenize: true,
      threshold: 0.3,
      location: 0,
      distance: 100,
      maxPatternLength: 32,
      minMatchCharLength: 1,
      keys: ["name", "type"]
    });
  }

  componentDidMount() {
    this.refreshCamps();
  }

  refreshCamps = () => {
    this.setState({
      isLoading: true
    });
    appClient
      .getCamps()
      .then(camps => {
        this.fuse.setCollection(camps.data);
        return camps;
      })
      .then(camps => {
        this.setState({
          camps: camps.data,
          isLoading: false
        });
      })
      .catch(err => {
        console.error(err);
        this.setState({
          isLoading: false
        });
      });
  };

  createNewCamp = e => {
    e.preventDefault();
    this.setState({
      formOpen: !this.state.formOpen
    });
  };

  handleCampSort = e => {
    e.preventDefault();
    let sortOrder;
    if (!this.state.sortOrder) sortOrder = "asc";
    else if (this.state.sortKey !== e.target.value) sortOrder = "asc";
    else {
      if (this.state.sortOrder === "asc") sortOrder = "desc";
      if (this.state.sortOrder === "desc") sortOrder = null;
    }
    this.setState({
      sortKey: e.target.value,
      sortOrder
    });
  };

  handleQueryChange = e => {
    e.preventDefault();
    this.setState({
      query: e.target.value
    });
  };

  handleSubmit = data => {
    appClient
      .newCamp(data)
      .then(() => {
        this.refreshCamps();
      })
      .catch(err => {
        console.error(err);
      });
  };

  handleClose = () => {
    this.setState({
      formOpen: !this.state.formOpen
    });
  };

  render() {
    let camps = this.state.query
      ? this.fuse.search(this.state.query)
      : this.state.camps;
    if (this.state.sortKey && this.state.sortOrder)
      camps = _.orderBy(camps, this.state.sortKey, this.state.sortOrder);
    let adminCampCells = camps.map((camp, i) => {
      return <AdminCampCell key={i} data={camp} />;
    });
    return (
      <div className="admin-camp-list">
        <p className="lead">All Camps</p>
        <div className="row">
          <div className="col-xl-3 col-12">
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text">
                  <i className="fas fa-search" />
                </span>
              </div>
              <input
                className="form-control"
                type="text"
                value={this.state.query}
                onChange={this.handleQueryChange}
                placeholder={"Search Camps"}
                disabled={this.state.isLoading}
              />
            </div>
          </div>
        </div>
        <div className="table-responsive spinner-wrapper">
          {this.state.isLoading && <Spinner />}
          <table className="table table-sm table-hover admin-table">
            <thead>
              <tr>
                <td>
                  <button
                    className="btn btn-light btn-sm"
                    onClick={this.handleCampSort}
                    value="name"
                    disabled={this.state.isLoading}
                  >
                    Name{" "}
                    <SortIndicator
                      isVisible={this.state.sortKey === "name"}
                      order={this.state.sortOrder}
                    />
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-light btn-sm"
                    onClick={this.handleCampSort}
                    value="type"
                    disabled={this.state.isLoading}
                  >
                    Type{" "}
                    <SortIndicator
                      isVisible={this.state.sortKey === "type"}
                      order={this.state.sortOrder}
                    />
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-light btn-sm"
                    onClick={this.handleCampSort}
                    value="campers.length"
                    disabled={this.state.isLoading}
                  >
                    Registrations / Capacity{" "}
                    <SortIndicator
                      isVisible={this.state.sortKey === "campers.length"}
                      order={this.state.sortOrder}
                    />
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-light btn-sm"
                    onClick={this.handleCampSort}
                    value="waitlisted"
                    disabled={this.state.isLoading}
                  >
                    Waitlist{" "}
                    <SortIndicator
                      isVisible={this.state.sortKey === "waitlisted"}
                      order={this.state.sortOrder}
                    />
                  </button>
                </td>
                <td />
              </tr>
            </thead>
            <tbody>{adminCampCells}</tbody>
          </table>
          <ToggleableAdminCampForm addCamp={this.handleSubmit} />
        </div>
      </div>
    );
  }
}

export default AdminCampList;
