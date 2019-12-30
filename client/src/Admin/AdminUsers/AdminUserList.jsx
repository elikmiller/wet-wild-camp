import React, { Component } from "react";
import appClient from "../../appClient";
import Spinner from "../../Spinner/Spinner";
import SearchTable from "../../SearchTable/SearchTable";
import SurveyData from "../SurveyData";
import { Link } from "react-router-dom";
import { CopyToClipboard } from "react-copy-to-clipboard";

class AdminUserList extends Component {
    state = {
        users: [],
        selectedEmails: [],
        isLoading: false
    };

    componentDidMount() {
        this.getUsers();
    }

    getUsers = () => {
        this.setState({
            isLoading: true
        });
        return appClient
            .adminGetUsers()
            .then(users => {
                users = users.filter(user => !user.admin);
                this.setState({ users, isLoading: false });
            })
            .catch(err => {
                this.setState({ isLoading: false });
                this.setState(() => {
                    throw err;
                });
            });
    };

    render() {
        let emailList = [];
        this.state.users.forEach(user => {
            if (user.primaryContact) emailList.push(user.primaryContact.email);
            if (user.secondaryContact) emailList.push(user.secondaryContact.email);
        });
        return (
            <div className="admin-user-list spinner-wrapper">
                {this.state.isLoading && <Spinner />}
                <SurveyData />
                <div className="d-flex justify-content-between">
                    <p className="lead">All Users</p>
                    <CopyToClipboard text={emailList.join("; ")}>
                        <button className="btn btn-secondary btn-sm mb-3">Copy All Emails</button>
                    </CopyToClipboard>
                </div>
                <SearchTable
                    items={this.state.users}
                    searchKeys={["firstName", "lastName", "email"]}
                    queryPlaceholder="Search Users"
                    columns={[
                        {
                            key: "firstName",
                            name: "First Name",
                            displayFunc: item => item.firstName
                        },
                        {
                            key: "lastName",
                            name: "Last Name",
                            displayFunc: item => item.lastName
                        },
                        {
                            key: "email",
                            name: "Email Address",
                            displayFunc: item => item.email
                        },
                        {
                            key: "",
                            name: "",
                            displayFunc: item => <Link to={`/admin/users/${item._id}`}>Details</Link>
                        }
                    ]}
                />
            </div>
        );
    }
}

export default AdminUserList;
