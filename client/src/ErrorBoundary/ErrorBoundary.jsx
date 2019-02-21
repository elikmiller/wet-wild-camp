import React, { Component } from "react";

class ErrorBoundary extends Component {
  state = {
    error: {}
  };

  static getDerivedStateFromError(error) {
    return { error };
  }

  dismiss = () => {
    this.setState({
      error: {}
    });
  };

  render() {
    return (
      <div>
        {this.state.error.message && (
          <div className="alert alert-danger">
            <strong>Error: </strong>
            {this.state.error.message}
            <button onClick={this.dismiss} type="button" className="close">
              <span>
                <i className="fas fa-times" />
              </span>
            </button>
          </div>
        )}
        {this.props.children}
      </div>
    );
  }
}

export default ErrorBoundary;
