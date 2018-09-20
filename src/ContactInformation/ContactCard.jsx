import React, { Component } from "react";

class ContactCard extends Component {
  render() {
    let { data } = this.props;
    return (
      <div>
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">{this.props.title}</h5>
            <h6 className="card-subtitle mb-2 text-muted">
              {`${data.firstName} ${data.lastName}`}
            </h6>
            <p className="card-text">
              {data.phoneNumber}
              <br />
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default ContactCard;
