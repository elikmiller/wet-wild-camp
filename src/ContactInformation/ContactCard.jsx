import React, { Component } from "react";

class ContactCard extends Component {
  render() {
    let { data } = this.props;
    let extraData = Object.values(data).slice(2);
    let dataDisplay = extraData.map((str, i) => {
      return (
        <p className="card-text" key={i}>
          {str}
        </p>
      );
    });
    return (
      <div>
        <div className="card">
          <div className="card-body">
            <h5 className="card-title text-muted">{this.props.title}</h5>
            <h3 className="card-subtitle mb-2">
              {`${data.firstName} ${data.lastName}`}
            </h3>
            {dataDisplay}
            <button className="btn btn-primary" onClick={this.props.openForm}>
              Edit
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default ContactCard;
