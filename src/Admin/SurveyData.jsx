import React, { Component } from "react";
import appClient from "../appClient";
import "./SurveyData.css";
import {
  XYPlot,
  XAxis,
  YAxis,
  HorizontalGridLines,
  VerticalGridLines,
  VerticalBarSeries
} from "react-vis";

class SurveyData extends Component {
  state = {
    open: false,
    data: []
  };

  componentDidMount() {
    this.getData();
  }

  openForm = () => {
    this.setState({ open: true });
  };

  closeForm = () => {
    this.setState({ open: false });
  };

  getData = () => {
    appClient
      .getSurveyResults()
      .then(res => {
        console.log(res.data);
      })
      .catch(err => {
        console.error(err);
      });
  };

  render() {
    return (
      <div className="card mb-3">
        <div className="card-header">
          Survey Statistics
          {!this.state.open && (
            <i
              className="fas fa-plus fa-lg float-right expand-icon mt-1"
              onClick={this.openForm}
            />
          )}
          {this.state.open && (
            <i
              className="fas fa-minus fa-lg float-right expand-icon mt-1"
              onClick={this.closeForm}
            />
          )}
        </div>
        <div className="card-body" hidden={!this.state.open}>
          <XYPlot xType="ordinal" width={1000} height={300}>
            <HorizontalGridLines />
            <VerticalGridLines />
            <XAxis />
            <YAxis />
            <VerticalBarSeries
              data={[
                { x: "Previous Camper", y: 3 },
                { x: "Internet", y: 5 },
                { x: "Friend/Relative", y: 15 },
                { x: "Camp Fair", y: 20 },
                { x: "Newspaper/Magazine", y: 0 },
                { x: "Other", y: 10 }
              ]}
            />
          </XYPlot>
        </div>
      </div>
    );
  }
}

export default SurveyData;
