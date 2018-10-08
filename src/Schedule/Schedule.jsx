import React, { Component } from "react";
import appClient from "../appClient";
import CampList from "./CampList";

class Schedule extends Component {
  state = {
    juniorCamps: [],
    adventureCamps: []
  };

  refreshSchedule = () => {
    appClient.getCamps().then(res => {
      let juniorCamps = [];
      let adventureCamps = [];
      res.data.forEach(camp => {
        if (camp.type === "junior") juniorCamps.push(camp);
        else if (camp.type === "adventure") adventureCamps.push(camp);
      });
      this.setState({
        juniorCamps: juniorCamps,
        adventureCamps: adventureCamps
      });
    });
  };

  componentDidMount() {
    this.refreshSchedule();
  }

  render() {
    return (
      <div>
        <CampList camps={this.state.adventureCamps} type="adventure" />
        <CampList camps={this.state.juniorCamps} type="junior" />
      </div>
    );
  }
}

export default Schedule;
