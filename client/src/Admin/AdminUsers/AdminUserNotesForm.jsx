import React, { Component } from 'react';
import Textarea from '../../forms/Textarea';

class AdminUserNotesForm extends Component {
    state = {
        notes: this.props.notes || ""
    };

    handleOnChange = e => {
        e.preventDefault();
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    handleSubmit = e => {
        e.preventDefault();
    
        this.props.onSubmit(this.state.notes);
        this.props.closeForm();
    };

    render() {
        return (
            <div className="admin-user-notes-form">
                <form onSubmit={this.handleSubmit}></form>
                <Textarea
                    name="notes"
                    label="Notes"
                    type="input"
                    onChange={this.handleOnChange}
                    value={this.state.notes}
                />
                <div className="mb-3">
                    <button
                        onClick={this.props.closeForm}
                        className="btn btn-outline-secondary mr-3"
                        type="button"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={this.handleSubmit}
                        className="btn btn-primary"
                        type="button"
                    >
                        Submit
                    </button>
                </div>
            </div>
        )
    }
}

export default AdminUserNotesForm;