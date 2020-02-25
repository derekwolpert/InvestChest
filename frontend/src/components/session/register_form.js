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

    componentDidUpdate(prevProps) {
        if (this.props.signedIn && !prevProps.signedIn) {
            this.props.signIn({ email: this.state.email, password: this.state.password});
        }
    }

    componentWillUnmount() {
        this.props.removeSessionErrors();
    }

    render() {
        return (
            <section className="session-form-container">
                <form onSubmit={this.handleSubmit}>
                    <div className="session-form">
                        <div>
                            <span>Register</span>
                            <span
                                className="session-switch"
                                onClick={this.props.otherForm}
                            >
                                Sign In
                            </span>
                        </div>

                        <FontAwesomeIcon
                            icon={faTimes}
                            onClick={this.props.closeModal}
                        />
                        <div className="session-input-container">
                            <input
                                type="email"
                                value={this.state.email}
                                onChange={this.update("email")}
                                placeholder="Email"
                            />
                            {this.props.errors.email ? (
                                <div className="session-error">
                                    {this.props.errors.email}
                                </div>
                            ) : null}
                            <input
                                type="text"
                                value={this.state.name}
                                onChange={this.update("name")}
                                placeholder="Name"
                            />
                            {this.props.errors.name ? (
                                <div className="session-error">
                                    {this.props.errors.name}
                                </div>
                            ) : null}
                            <input
                                type="password"
                                value={this.state.password}
                                onChange={this.update("password")}
                                placeholder="Password"
                            />
                            {this.props.errors.password ? (
                                <div className="session-error">
                                    {this.props.errors.password}
                                </div>
                            ) : null}
                            <input
                                type="password"
                                value={this.state.password2}
                                onChange={this.update("password2")}
                                placeholder="Confirm Password"
                            />
                            {this.props.errors.password2 ? (
                                <div className="session-error">
                                    {this.props.errors.password2}
                                </div>
                            ) : null}

                            <div>
                                <input
                                    className="session-submit"
                                    type="submit"
                                    value="Submit"
                                />
                                <div
                                    className="session-submit"
                                    onClick={() =>
                                        this.props.signIn({
                                            email: "demo@email.com",
                                            password: "password"
                                        })
                                    }
                                >
                                    Demo User Login
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </section>
        );
    }
}

export default RegisterForm;