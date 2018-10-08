import React, { Component } from "react";

class RegistrationTable extends Component {
  render() {
    let content = this.props.data.map((reg, i) => {
      let type =
        reg.camp.type.charAt(0).toUpperCase() + reg.camp.type.substr(1);
      return (
        <tr key={i}>
          <td>{reg.camp.name}</td>
          <td>{type}</td>
          <td>
            {reg.camper.firstName} {reg.camper.lastName}
          </td>
          <td>
            <button
              type="button"
              className="btn btn-danger btn-sm"
              onClick={e => e.preventDefault()}
            >
              Cancel
            </button>
          </td>
        </tr>
      );
    });
    return (
      <table className="table table-sm">
        <thead>
          <tr>
            <th>Camp Session</th>
            <th>Camp</th>
            <th>Camper</th>
            <th />
          </tr>
        </thead>
        <tbody>{content}</tbody>
      </table>
    );
  }
}

export default RegistrationTable;
