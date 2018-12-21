import React, { Component } from "react";
import appClient from "../appClient";
import InputDropdown from "../forms/InputDropdown";
import Spinner from "../Spinner/Spinner";
import moment from "moment";

class CampRegisterForm extends Component {
  state = {
    campers: [],
    camp: {},
    formValues: {
      selectedCamper: "",
      morningDropoff: "",
      afternoonPickup: ""
    },
    errors: {},
    loading: false
  };

  locations = [
    { value: "north", name: "North" },
    { value: "central", name: "Central" },
    { value: "south", name: "South" }
  ];

  componentDidMount() {
    this.getCampers();
    this.getCamp();
  }

  isCorrectAge = birthDate => {
    let { type, startDate } = this.state.camp;
    let age = moment(birthDate);
    let lowerBound = moment(age);
    let upperBound = moment(lowerBound);
    if (type === "junior") {
      lowerBound.add(6, "years");
      upperBound.add(10, "years");
    } else {
      lowerBound.add(9, "years");
      upperBound.add(16, "years");
    }
    return moment(startDate).isBetween(lowerBound, upperBound);
  };

  getCampers = () => {
    appClient
      .getCampers(this.props.userId)
      .then(campers => {
        this.setState({ campers: campers.data });
      })
      .catch(err => {
        if (err.response) {
          if (err.response.status === 401) this.props.logout();
        } else if (err.response.status === 500) {
          this.setState({ errors: { server: "Server error." } });
        }
      });
  };

  getCamp = () => {
    this.setState({
      loading: true
    });
    appClient
      .getCamp(this.props.campId)
      .then(camp => {
        this.setState({
          camp: camp.data,
          loading: false
        });
      })
      .catch(err => {
        if (err.response) {
          if (err.response.status === 401) this.props.logout();
        } else if (err.response.status === 500) {
          this.setState({
            errors: { server: "Server error." },
            loading: false
          });
        }
      });
  };

  handleChange = e => {
    e.preventDefault();
    let { formValues } = this.state;
    let { name, value } = e.target;

    formValues[name] = value;
    this.setState({
      formValues: formValues
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    let { camp, formValues } = this.state;
    let camperArr = this.state.campers.filter(camper => {
      return camper._id === this.state.formValues.selectedCamper;
    });
    let camper = camperArr.length ? camperArr[0] : "";
    if (
      camper !== "" &&
      formValues.morningDropoff !== "" &&
      formValues.afternoonPickup !== "" &&
      this.isCorrectAge(camper.dateOfBirth) &&
      !camper.registrations.some(elem => camp.campers.includes(elem)) &&
      !camper.registrations.some(elem => camp.waitlist.includes(elem))
    ) {
      let dataObject = {
        user: this.props.userId,
        camper: camper,
        camp: camp._id,
        morningDropoff: formValues.morningDropoff,
        afternoonPickup: formValues.afternoonPickup
      };
      appClient
        .createRegistration(dataObject)
        .then(() => {
          this.props.history.push("/schedule/0/success");
        })
        .catch(err => {
          if (err.response.status === 500) {
            this.setState({ errors: { server: "Server error." } });
          }
        });
    } else if (
      camper !== "" &&
      formValues.morningDropoff !== "" &&
      formValues.afternoonPickup !== "" &&
      this.isCorrectAge(camper.dateOfBirth)
    ) {
      this.setState({
        errors: {
          registration: "Please select a camper who is not already registered."
        }
      });
    } else if (camper === "") {
      this.setState({
        errors: {
          registration: "Please select a camper."
        }
      });
    } else if (!this.isCorrectAge(camper.dateOfBirth)) {
      this.setState({
        errors: {
          registration: "Camper is not the correct age for this camp session."
        }
      });
    } else {
      this.setState({
        errors: {
          registration: "Please select dropoff and pickup locations."
        }
      });
    }
  };

  cancelRegistration = e => {
    e.preventDefault();
    this.props.history.push("/schedule/0/cancelled");
  };

  render() {
    let camperOptions = this.state.campers.map(camper => {
      return {
        value: camper._id,
        name: `${camper.firstName} ${camper.lastName}`
      };
    });
    if (this.state.loading) return <Spinner />;
    return (
      <div>
        {this.state.errors.registration && (
          <CampError text={this.state.errors.registration} />
        )}
        {this.state.camp.waitlisted && (
          <div className="alert alert-warning" role="alert">
            <p>
              This camp is currently full. If you sign up for the waitlist, you
              will be notified once a spot opens.
            </p>
          </div>
        )}
        <form onSubmit={this.handleSubmit}>
          <InputDropdown
            name="selectedCamper"
            label="Select a Camper to Register:"
            onChange={this.handleChange}
            wasValidated={this.state.wasValidated}
            error={this.state.errors.selectedCamper}
            value={this.state.formValues.selectedCamper}
            placeholder={"Please Select"}
            options={camperOptions}
          />
          <InputDropdown
            name="morningDropoff"
            label="Select a Morning Dropoff Location:"
            onChange={this.handleChange}
            wasValidated={this.state.wasValidated}
            error={this.state.errors.morningDropoff}
            value={this.state.formValues.morningDropoff}
            placeholder={"Please Select"}
            options={this.locations}
          />
          <InputDropdown
            name="afternoonPickup"
            label="Select an Afternoon Pickup Location:"
            onChange={this.handleChange}
            wasValidated={this.state.wasValidated}
            error={this.state.errors.afternoonPickup}
            value={this.state.formValues.afternoonPickup}
            placeholder={"Please Select"}
            options={this.locations}
          />
          <div className="form-group">
            <button
              className="btn btn-outline-secondary mr-3"
              onClick={this.cancelRegistration}
            >
              Cancel
            </button>
            <button
              className="btn btn-primary"
              type="submit"
              onClick={this.handleSubmit}
            >
              {this.state.camp.waitlisted ? "Join Waitlist" : "Register"}
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default CampRegisterForm;

export const CampError = props => {
  return (
    <div className="alert alert-danger" role="alert">
      <h4 className="alert-heading">Registration Error</h4>
      <p>{props.text}</p>
      <hr />
      <p className="mb-0">
        If this is a recurring issue, please
        <a href="https://wetwildcamp.com/about-us/contact-us/">contact us</a>.
      </p>
    </div>
  );
};
