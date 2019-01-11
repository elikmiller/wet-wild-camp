var should = require("chai").should();
var request = require("supertest");
var app = require("../../../app");
var { User } = require("../../models");

describe("Auth Routes", () => {
  describe("POST /login", () => {
    describe("with valid credentials", () => {
      let testUser;

      // Create a test User
      before(done => {
        const userData = {
          firstName: "Unit",
          lastName: "Test",
          email: "unit@example.com",
          password: "password"
        };
        User.create(userData, (err, user) => {
          if (err) {
            throw err;
          } else {
            testUser = user;
            done();
          }
        });
      });

      // Logout the test User
      afterEach(done => {
        request(app)
          .get("/logout")
          .end(done);
      });

      // Delete the test User
      after(done => {
        User.deleteOne({ _id: testUser._id }, err => {
          if (err) {
            throw err;
          } else {
            done();
          }
        });
      });

      it("should respond with status 200", done => {
        request(app)
          .post("/login")
          .send({ email: "unit@example.com", password: "password" })
          .expect(200)
          .expect(res => {
            res.body.user.firstName.should.equal("Unit");
            res.body.user.lastName.should.equal("Test");
          })
          .end(done);
      });
    });
  });
});
