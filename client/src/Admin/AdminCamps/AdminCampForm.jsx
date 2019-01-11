import React, { Component } from "react";
import moment from "moment";

class AdminSessionForm extends Component {
  state = {
    formValues: {
      name: this.props.data ? this.props.data.name : "",
      type: this.props.data ? this.props.data.type : "",
      description: this.props.data ? this.props.data.description : "",
      fee: this.props.data ? this.props.data.fee : 0,
      startDate: this.props.data ? this.props.data.startDate : Date.now(),
      endDate: this.props.data ? this.props.data.endDate : Date.now(),
      openDate: this.props.data ? this.props.data.openDate : Date.now(),
      closeDate: this.props.data ? this.props.data.closeDate : Date.now(),
      capacity: this.props.data ? this.props.data.capacity : 0
    }
  };

  formatDate = date => {
    return moment(date)
      .utc()
      .format("YYYY-MM-DD");
  };

  handleChange = e => {
    e.preventDefault();
    let { formValues } = this.state;
    let { id, value } = e.target;

    formValues[id] = value;
    this.setState({
      formValues: formValues
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.onSubmit(this.state.formValues);
    this.props.closeForm();
  };

  render() {
    let { formValues } = this.state;
    let startDate = this.formatDate(formValues.startDate);
    let endDate = this.formatDate(formValues.endDate);
    let openDate = this.formatDate(formValues.openDate);
    let closeDate = this.formatDate(formValues.closeDate);
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="input"
            className="form-control form-control-sm"
            onChange={this.handleChange}
            value={formValues["name"]}
          />
        </div>
        <div className="form-group">
          <label htmlFor="type">Type</label>
          <select
            id="type"
            className="custom-select"
            onChange={this.handleChange}
            value={formValues["type"]}
          >
            <option defaultValue>Choose a camp type</option>
            <option value="junior">Junior</option>
            <option value="adventure">Adventure</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            className="form-control form-control-sm"
            onChange={this.handleChange}
            value={formValues["description"]}
          />
        </div>
        <div className="form-group">
          <label htmlFor="fee">Fee</label>
          <input
            id="fee"
            type="input"
            className="form-control form-control-sm"
            onChange={this.handleChange}
            value={formValues["fee"]}
          />
        </div>
        <div className="form-group">
          <label htmlFor="capacity">Capacity</label>
          <input
            id="capacity"
            type="input"
            className="form-control form-control-sm"
            onChange={this.handleChange}
            value={formValues["capacity"]}
          />
        </div>
        <div className="form-group">
          <label htmlFor="openDate">Registration Open</label>
          <input
            id="openDate"
            type="date"
            className="form-control form-control-sm"
            onChange={this.handleChange}
            value={openDate}
          />
        </div>
        <div className="form-group">
          <label htmlFor="closeDate">Registration Close</label>
          <input
            id="closeDate"
            type="date"
            className="form-control form-control-sm"
            onChange={this.handleChange}
            value={closeDate}
          />
        </div>
        <div className="form-group">
          <label htmlFor="startDate">Start Date</label>
          <input
            id="startDate"
            type="date"
            className="form-control form-control-sm"
            onChange={this.handleChange}
            value={startDate}
          />
        </div>
        <div className="form-group">
          <label htmlFor="endDate">End Date</label>
          <input
            id="endDate"
            type="date"
            className="form-control form-control-sm"
            onChange={this.handleChange}
            value={endDate}
          />
        </div>
        <button
          onClick={this.props.closeForm}
          className="btn btn-outline-secondary mr-3"
        >
          Cancel
        </button>
        <button onClick={this.handleSubmit} className="btn btn-primary">
          Submit
        </button>
      </form>
    );
  }
}

export default AdminSessionForm;
