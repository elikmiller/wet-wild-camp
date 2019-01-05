import React, { Component } from "react";
import appClient from "../appClient";
import InputDropdown from "../forms/InputDropdown";
import Spinner from "../Spinner/Spinner";
import validator from "validator";

class SurveyQuestion extends Component {
  state = {
    surveyQuestion: this.props.surveyQuestion,
    isLoading: false,
    errors: {},
    wasValidated: false
  };

  isValidated = () => {
    const errors = this.validate();
    this.setState({
      errors,
      wasValidated: true
    });

    if (Object.keys(errors).length === 0) {
      this.setState({
        isLoading: true
      });
      return appClient
        .updateUser({
          id: this.props.userId,
          data: {
            surveyQuestion: this.state.surveyQuestion
          }
        })
        .then(res => {
          this.setState({
            isLoading: false
          });
          return res;
        });
    } else {
      return false;
    }
  };

  validate = () => {
    let errors = {};
    if (validator.isEmpty(this.state.surveyQuestion + ""))
      errors.surveyQuestion = "Please select a response.";
    return errors;
  };

  handleChange = e => {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    return (
      <div className="survey-question">
        {this.state.isLoading && <Spinner />}
        <form>
          <InputDropdown
            name="surveyQuestion"
            label="How did you hear about us?"
            onChange={this.handleChange}
            wasValidated={this.state.wasValidated}
            error={this.state.errors.surveyQuestion}
            value={this.state["surveyQuestion"]}
            placeholder={"Please Select"}
            options={[
              { value: "previousCamper", name: "Previous Camper" },
              { value: "internet", name: "Internet" },
              { value: "friend/relative", name: "Friend/Relative" },
              { value: "campFair", name: "Camp Fair" },
              { value: "newspaper/magazine", name: "Newspaper/Magazine" },
              { value: "other", name: "Other" }
            ]}
          />
        </form>
      </div>
    );
  }
}

SurveyQuestion.defaultProps = { surveyQuestion: "" };

export default SurveyQuestion;
