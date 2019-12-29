import React, { Component } from "react";
import appClient from "../appClient";
import "./SurveyData.css";
import {
    XYPlot,
    XAxis,
    YAxis,
    HorizontalGridLines,
    VerticalGridLines,
    VerticalBarSeries,
    LabelSeries
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
                    { x: "Previous Camper", y: res.previousCamper },
                    { x: "Internet", y: res.internet },
                    { x: "Friend/Relative", y: res.friendRelative },
                    { x: "Camp Fair", y: res.campFair },
                    { x: "Newspaper/Magazine", y: res.newspaperMagazine },
                    { x: "Other", y: res.other }
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
                        <i className="fas fa-plus fa-lg float-right expand-icon mt-1" onClick={this.openForm} />
                    )}
                    {this.state.open && (
                        <i className="fas fa-minus fa-lg float-right expand-icon mt-1" onClick={this.closeForm} />
                    )}
                </div>
                <div className="card-body" hidden={!this.state.open}>
                    <XYPlot className="xy-chart container" xType="ordinal" width={700} height={300}>
                        <HorizontalGridLines />
                        <VerticalGridLines />
                        <XAxis />
                        <YAxis />
                        <VerticalBarSeries data={this.state.surveyData} barWidth={0.5} />
                        <LabelSeries
                            data={this.state.surveyData.map(obj => {
                                return { ...obj, label: obj.y.toString() };
                            })}
                            labelAnchorX="middle"
                            labelAnchorY="text-after-edge"
                        />
                    </XYPlot>
                </div>
            </div>
        );
    }
}

export default SurveyData;
