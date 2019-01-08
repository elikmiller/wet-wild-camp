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
    surveyData: []
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
        let surveyData = [
          { x: "Previous Camper", y: res.data.previousCamper },
          { x: "Internet", y: res.data.internet },
          { x: "Friend/Relative", y: res.data["friend/relative"] },
          { x: "Camp Fair", y: res.data.campFair },
          { x: "Newspaper/Magazine", y: res.data["newspaper/magazine"] },
          { x: "Other", y: res.data.other }
        ];
        this.setState({
          surveyData: surveyData
        });
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
            <VerticalBarSeries data={this.state.surveyData} />
          </XYPlot>
        </div>
      </div>
    );
  }
}

export default SurveyData;
