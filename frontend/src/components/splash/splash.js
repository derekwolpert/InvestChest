import React from "react";

class Splash extends React.Component {

    componentDidMount() {
        document.title = "InvestChest";
    }

    componentDidUpdate() {
        document.title = "InvestChest";
    }

    render() {
        return (
            <section className="splash-container">
                <div className="splash">
                    <div className="splash-content">
                        <h1>Trade and Grow</h1>
                        <div>
                            <span>Welcome to InvestChest!</span>
                            <span>
                                The online destination for building your very own (mock) stock investment portfolio
                            </span>
                        </div>
                        <div className="splash-button-container">
                            <div
                                onClick={() => this.props.openModal("register")}
                                className="splash-button"
                            >
                                Register
                            </div>
                            <div onClick={() => this.props.openModal("signIn")}>
                                Sign In
                            </div>
                        </div>
                        <div
                            onClick={() => this.props.openModal("signIn")}
                            className="splash-button-container"
                        >
                            <div>Login as a Demo User</div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default Splash;