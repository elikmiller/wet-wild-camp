import React from "react";
import App from "./App.jsx";
import appClient from "./appClient";
import { shallow } from "enzyme";
jest.mock("./appClient");

describe("after valid call to currentUser", () => {
  let state;

  beforeEach(async () => {
    appClient.currentUser.mockReturnValue(
      Promise.resolve({
        data: {
          user: {
            firstName: "Unit",
            lastName: "Test",
            email: "unit_test@example.com"
          }
        }
      })
    );
    const wrapper = shallow(<App />);
    await Promise.resolve();
    state = wrapper.state();
  });

  afterEach(() => {
    appClient.currentUser.mockReset();
  });

  it("authenticated state should be true", () => {
    appClient.currentUser.mock.calls.length.should.equal(1);
    state.authenticated.should.be.true;
  });

  it("user object should be populated", () => {
    appClient.currentUser.mock.calls.length.should.equal(1);
    state.user.firstName.should.equal("Unit");
    state.user.lastName.should.equal("Test");
    state.user.email.should.equal("unit_test@example.com");
  });
});

describe("after invalid call to currentUser", () => {
  let state;

  beforeEach(async () => {
    appClient.currentUser.mockReturnValue(Promise.reject());
    const wrapper = shallow(<App />);
    await Promise.resolve();
    state = wrapper.state();
  });

  afterEach(() => {
    appClient.currentUser.mockReset();
  });

  it("authenticated state should be false", () => {
    state.authenticated.should.be.false;
  });

  it("user object should be empty", () => {
    state.user.firstName.should.be.empty;
    state.user.lastName.should.be.empty;
    state.user.email.should.be.empty;
  });
});
