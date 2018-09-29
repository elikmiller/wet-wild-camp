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
        </tr>
      );
    });
    return (
      <table className="table">
        <thead>
          <tr>
            <th>Camp Session</th>
            <th>Level</th>
            <th>Camper</th>
          </tr>
        </thead>
        <tbody>{content}</tbody>
      </table>
    );
  }
}

export default RegistrationTable;
