import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

class SignInForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillUnmount() {
        this.props.removeSessionErrors();
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
            password: this.state.password
        };

        this.props.signIn(user);
    }

    render() {
        return (
            <section className="session-form-container">
                <form onSubmit={this.handleSubmit}>
                    <div className="session-form">
                        <div>
                            <span
                                className="session-switch"
                                onClick={this.props.otherForm}
                            >
                                Register
                            </span>
                            <span>Sign In</span>
                            <FontAwesomeIcon
                                icon={faTimes}
                                onClick={this.props.closeModal}
                            />
                        </div>
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
                            <div>
                                <input
                                    className="session-submit"
                                    type="submit"
                                    value="Submit"
                                />
                                <div className="session-submit"
                                    onClick={() =>
                                        this.props.signIn({
                                            email: "demo@email.com",
                                            password: "password"
                                        })
                                    }>
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

export default SignInForm;