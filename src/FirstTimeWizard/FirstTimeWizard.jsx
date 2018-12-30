import React, { Component } from "react";
import StepZilla from "react-stepzilla";

class FirstTimeWizard extends Component {
  render() {
    const steps = [
      { name: "Primary Contact Information", component: <div>Step 1</div> },
      { name: "Secondary Contact Information", component: <div>Step 2</div> },
      { name: "Emergency Contact Information", component: <div>Step 3</div> },
      { name: "Campers", component: <div>Step 4</div> }
    ];

    return <StepZilla steps={steps} />;
  }
}

export default FirstTimeWizard;
