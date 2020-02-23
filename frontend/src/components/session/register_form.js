import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

class RegisterForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            name: "",
            password: "",
            password2: "",
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.renderErrors = this.renderErrors.bind(this);
    }

    update(field) {
        return e => this.setState({
            [field]: e.currentTarget.value
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        let user = {
            email: this.state.email,
            name: this.state.name,
            password: this.state.password,
            password2: this.state.password2
        };
        this.props.register(user);
    }

    componentWillUnmount() {
        this.props.removeSessionErrors();
    }

    renderErrors() {
        return (
            <ul>
                {Object.keys(this.props.errors).map((error, i) => (
                    <li key={`error-${i}`}>
                        {this.props.errors[error]}
                    </li>
                ))}
            </ul>
        );
    }

    render() {
        return (
            <div className="session-form-container">
                <form onSubmit={this.handleSubmit}>
                    <div className="session-form">
                        <br />
                        Please{" "}
                        <span onClick={this.props.otherForm}>Sign In</span> or
                        Register
                        <FontAwesomeIcon
                            icon={faTimes}
                            onClick={this.props.closeModal}
                            className="close-x"
                        />
                        <input
                            type="text"
                            value={this.state.email}
                            onChange={this.update("email")}
                            placeholder="Email"
                        />
                        <br />
                        <input
                            type="text"
                            value={this.state.name}
                            onChange={this.update("name")}
                            placeholder="Name"
                        />
                        <br />
                        <input
                            type="password"
                            value={this.state.password}
                            onChange={this.update("password")}
                            placeholder="Password"
                        />
                        <br />
                        <input
                            type="password"
                            value={this.state.password2}
                            onChange={this.update("password2")}
                            placeholder="Confirm Password"
                        />
                        <br />
                        <input type="submit" value="Submit" />
                        {this.renderErrors()}
                    </div>
                </form>
            </div>
        );
    }
}

export default RegisterForm;