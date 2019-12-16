import React, { Component } from 'react';
import appClient from '../../appClient';
import Input from '../../forms/Input';
import Spinner from "../../Spinner/Spinner";

class AdminSettings extends Component {
    state = {
        isLoading: false,
        settings: {
            campArchiveDate: "",
            registrationArchiveDate: "",
            paymentArchiveDate: "",
            earlyBirdCutoff: ""
        }
    };

    componentDidMount() {
        this.getSettings();
    }

    getSettings = () => {
        this.setState({ isLoading: true });
        appClient.adminGetSettings().then(settings => {
            this.setState({
                isLoading: false,
                settings: {
                    campArchiveDate: settings.campArchiveDate.substr(0,10),
                    registrationArchiveDate: settings.registrationArchiveDate.substr(0,10),
                    paymentArchiveDate: settings.paymentArchiveDate.substr(0,10),
                    earlyBirdCutoff: settings.earlyBirdCutoff.substr(0,10)
                }
            });
        }).catch(err => { console.error(err) });
    }

    onChange = e => {
        let { settings } = this.state;
        settings[e.target.name] = e.target.value;
        this.setState({ settings });
    }

    onSubmit = e => {
        e.preventDefault();
        this.setState({ isLoading: true });
        appClient.adminUpdateSettings(this.state.settings).then(settings => {
            this.getSettings();
            this.setState({ isLoading: false });
        }).catch(err => {
            console.error(err);
        });
    }

    render() {
        if (this.state.isLoading) return <Spinner />;
        return (
            <div className="container" >
                <form className="col-sm-6">
                <Input 
                    type="date" 
                    label="Camp Archive Date:" 
                    onChange={this.onChange} 
                    name="campArchiveDate"
                    value={this.state.settings.campArchiveDate}
                />
                <Input 
                    type="date" 
                    label="Registration Archive Date:" 
                    onChange={this.onChange} 
                    name="registrationArchiveDate"
                    value={this.state.settings.registrationArchiveDate}
                />
                <Input 
                    type="date" 
                    label="Payment Archive Date:" 
                    onChange={this.onChange} 
                    name="paymentArchiveDate"
                    value={this.state.settings.paymentArchiveDate}
                />
                <Input 
                    type="date" 
                    label="Current Early Bird Cutoff:" 
                    onChange={this.onChange} 
                    name="earlyBirdCutoff"
                    value={this.state.settings.earlyBirdCutoff}
                />
                <button onClick={this.onSubmit} className="btn btn-primary" type="button">Save</button>
                </form>
            </div>
        );
    }
}

export default AdminSettings;