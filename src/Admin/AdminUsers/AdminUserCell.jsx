import React, { Component } from "react";
import { Link } from "react-router-dom";

class AdminUserCell extends Component {
  state = {
    checked: false
  };

  // Calls select/deselect method from props when box is checked/unchecked, updates state
  // to reflect change
  handleChange = e => {
    let { email } = this.props.data;
    let { props } = this;
    e.target.checked ? props.handleSelect(email) : props.handleDeselect(email);
    this.setState({
      checked: e.target.checked
    });
  };

  // When this.props.selectedEmails changes, updates component state (bound to checkbox value)
  componentWillReceiveProps(nextProps) {
    if (this.props.selectedEmails !== nextProps.selectedEmails) {
      if (nextProps.selectedEmails.indexOf(this.props.data.email) <= -1) {
        this.setState({ checked: false });
      } else if (this.state.checked === false) {
        this.setState({ checked: true });
      }
    }
  }

  render() {
    let { data } = this.props;
    return (
      <tr>
        <td>
          <input
            className="form-check-input"
            type="checkbox"
            onChange={this.handleChange}
            checked={this.state.checked}
            style={{ marginLeft: "5px" }}
          />
        </td>
        <td>{data.firstName}</td>
        <td>{data.lastName}</td>
        <td>{data.email}</td>
        <td>
          <Link to={`/admin/users/${data._id}`}>More</Link>
        </td>
      </tr>
    );
  }
}

export default AdminUserCell;
