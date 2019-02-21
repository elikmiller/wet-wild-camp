import React, { Component } from "react";

class Dropdown extends Component {
  state = {
    isOpen: false
  };

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  setWrapperRef = node => {
    this.wrapperRef = node;
  };

  handleClickOutside = event => {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.close();
    }
  };

  open = () => {
    this.setState({
      isOpen: true
    });
  };

  close = () => {
    this.setState({
      isOpen: false
    });
  };

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };

  render() {
    return (
      <div className="dropdown" ref={this.setWrapperRef}>
        <button className="btn btn-outline-secondary" onClick={this.toggle}>
          {this.props.label} <i className="fas fa-caret-down" />
        </button>
        <div
          className="dropdown-menu dropdown-menu-right"
          style={{ display: this.state.isOpen ? "block" : "none" }}
        >
          {this.props.items.map((item, i) => (
            <button
              className="dropdown-item"
              type="button"
              key={i}
              onClick={() => {
                item.onClick();
                this.close();
              }}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    );
  }
}

Dropdown.defaultProps = {
  label: "",
  items: []
};

export default Dropdown;
