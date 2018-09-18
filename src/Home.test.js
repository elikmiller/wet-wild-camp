import React from "react";
import Home from "./Home.jsx";
import { shallow } from "enzyme";

describe("Home", () => {
  it("should render", () => {
    shallow(<Home />);
  });

  describe("while authenticated", () => {
    let wrapper;
    const onLogin = jest.fn(() => Promise.resolve());
    const onLogout = jest.fn(() => Promise.resolve());

    beforeEach(() => {
      wrapper = shallow(
        <Home
          authenticated
          onLogin={onLogin}
          onLogout={onLogout}
          history={[]}
        />
      );
    });

    it("should display a logout link", () => {
      wrapper.find("a").should.have.prop("children", "Logout");
    });

    it("should trigger a logout when the logout link is clicked", async () => {
      await wrapper.instance().handleLogout();
      onLogout.mock.calls.length.should.equal(1);
      wrapper.instance().props.history.should.contain("/");
    });
  });
});
