import React, { Component } from "react";

class AdminSessionForm extends Component {
  state = {
    formValues: {
      name: "",
      type: "",
      description: "",
      fee: 0,
      startDate: Date.now(),
      endDate: Date.now(),
      openDate: Date.now(),
      closeDate: Date.now(),
      capacity: 0
    }
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
    this.props.handleSubmit(this.state.formValues);
    this.props.handleClose();
  };

  handleClose = e => {
    e.preventDefault();
    this.props.handleClose();
  };

  render() {
    let { formValues } = this.state;
    return (
      <form
        onSubmit={this.handleSubmit}
        style={{ width: "50%", padding: "15px" }}
      >
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
          <label htmlFor="startDate">Start Date</label>
          <input
            id="startDate"
            type="date"
            className="form-control form-control-sm"
            onChange={this.handleChange}
            value={this.state.formValues["startDate"]}
          />
        </div>
        <div className="form-group">
          <label htmlFor="endDate">End Date</label>
          <input
            id="endDate"
            type="date"
            className="form-control form-control-sm"
            onChange={this.handleChange}
            value={this.state.formValues["endDate"]}
          />
        </div>
        <div className="form-group">
          <label htmlFor="openDate">Registration Open</label>
          <input
            id="openDate"
            type="date"
            className="form-control form-control-sm"
            onChange={this.handleChange}
            value={this.state.formValues["openDate"]}
          />
        </div>
        <div className="form-group">
          <label htmlFor="closeDate">Registration Close</label>
          <input
            id="closeDate"
            type="date"
            className="form-control form-control-sm"
            onChange={this.handleChange}
            value={this.state.formValues["closeDate"]}
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
        <button onClick={this.handleCancel} className="btn btn-secondary">
          Cancel
        </button>
        <button onCLick={this.handleSubmit} className="btn btn-primary">
          Submit
        </button>
      </form>
    );
  }
}

export default AdminSessionForm;
