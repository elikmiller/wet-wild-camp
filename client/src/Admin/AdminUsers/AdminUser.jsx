import React from "react";

const AdminUser = props => {
  let firstName = props.firstName;
  let lastName = props.lastName;
  let email = props.email;
  return (
    <div className="admin-user">
      <div>First Name: {firstName}</div>
      <div>Last Name: {lastName}</div>
      <div>
        Email Address: <a href={`mailto:${email}`}>{email}</a>
      </div>
    </div>
  );
};

export default AdminUser;
