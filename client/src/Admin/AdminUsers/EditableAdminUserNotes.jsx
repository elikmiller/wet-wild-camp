import React, { Component } from 'react';
import AdminUserNotesForm from './AdminUserNotesForm';

class EditableAdminUserNotes extends Component {
    state = {
        isOpen: false
    }

    handleSubmit = notes => {
        this.props.updateUser({ notes }).then(() => {
            this.closeForm();
        });
    }

    openForm = () => {
        this.setState({
            isOpen: true
        });
    }

    closeForm = () => {
        this.setState({
            isOpen: false
        });
    }

    render() {
        return (
            <div className="editable-admin-user-notes">
                {this.state.isOpen && (
                    <AdminUserNotesForm 
                        notes={this.props.notes}
                        onSubmit={this.handleSubmit}
                        closeForm={this.closeForm}
                    />
                )}
                {!this.state.isOpen && (
                    <div>
                        <p>{this.props.notes}</p>
                        <div className="mt-3">
                            <button className="btn btn-primary" onClick={this.openForm}>
                                Edit Notes
                            </button>
                        </div>
                    </div>
                )}
            </div>
        );
    }
}

export default EditableAdminUserNotes;