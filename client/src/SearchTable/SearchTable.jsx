import React, { Component } from "react";
import Fuse from "fuse.js";
import _ from "lodash";
import SortIndicator from "../SortIndicator/SortIndicator";
import "./SearchTable.css";

const Row = props => {
  return (
    <tr>
      {props.numbered && <td>{props.number}</td>}
      {props.columns.map((column, i) => (
        <td key={i}>{column.displayFunc(props.item)}</td>
      ))}
    </tr>
  );
};

class SearchList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: "",
      sortKey: null,
      sortOrder: null
    };
    this.fuse = new Fuse(props.items, {
      tokenize: true,
      threshold: 0.3,
      location: 0,
      distance: 100,
      maxPatternLength: 32,
      minMatchCharLength: 1,
      keys: this.props.searchKeys
    });
  }

  componentDidUpdate(prevProps) {
    if (this.props.items !== prevProps.items) {
      this.fuse.setCollection(this.props.items);
      this.forceUpdate();
    }
  }

  handleSort = e => {
    // Click once for ascending order, twice for decending, and three times to clear
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

  render() {
    // Filter items array via fuse.js
    let items = this.state.query
      ? this.fuse.search(this.state.query)
      : this.props.items;

    // Sort items according to sortKey and sortOrder
    if (this.state.sortKey && this.state.sortOrder)
      items = _.orderBy(items, this.state.sortKey, this.state.sortOrder);

    return (
      <div className="search-table">
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
                placeholder={this.props.queryPlaceholder}
                disabled={this.state.isLoading}
              />
            </div>
          </div>
        </div>
        <div className="table-responsive">
          <table
            className="table table-sm table-hover"
            style={{ tableLayout: "fixed" }}
          >
            <thead>
              <tr>
                {this.props.numbered && <td />}
                {this.props.columns.map((column, i) => (
                  <td key={i}>
                    {column.key ? (
                      <button
                        className="btn btn-light btn-sm"
                        onClick={this.handleSort}
                        value={column.key}
                      >
                        {column.name}{" "}
                        <SortIndicator
                          isVisible={this.state.sortKey === column.key}
                          order={this.state.sortOrder}
                        />
                      </button>
                    ) : (
                      column.name
                    )}
                  </td>
                ))}
              </tr>
            </thead>
            <tbody>
              {items.map((item, i) => (
                <Row
                  key={i}
                  item={item}
                  columns={this.props.columns}
                  numbered={this.props.numbered}
                  number={i + 1}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default SearchList;
