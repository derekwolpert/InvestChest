import React from "react";

class Splash extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            height: null
        };
        this.handleSplashHeight = this.handleSplashHeight.bind(this);
    }

    componentDidMount() {
        if (this.state.height === null) {
            this.handleSplashHeight();
            window.addEventListener("resize", this.handleSplashHeight);
        } else {
            document.title = "InvestChest";
        }
    }

    componentDidUpdate() {
        document.title = "InvestChest";
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.handleSplashHeight);
    }

    handleSplashHeight() {
        this.setState({ height: window.innerHeight });
    }

    render() {
        return (
            <section className="splash-container">
                <div
                    className="splash"
                    style={{ height: `${this.state.height - 76}px` }}
                 >
                    <div className="splash-content">
                        <h1>Trade and Grow</h1>
                        <div>
                            <span>
                                Welcome to the online destination for building your very
                                own (mock) stock investment portfolio
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