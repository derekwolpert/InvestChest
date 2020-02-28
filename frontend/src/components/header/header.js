import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoins } from "@fortawesome/free-solid-svg-icons";
import ThemeSwitch from "../theme_switch/theme_switch";

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.logoutUser = this.logoutUser.bind(this);
        this.getLinks = this.getLinks.bind(this);
    }

    logoutUser(e) {
        e.preventDefault();
        this.props.logout();
    }

    getLinks() {
        if (this.props.loggedIn) {
            return (
                <div>
                    <Link to={"/portfolio"} className={this.props.history.location.pathname === "/portfolio" ? "active" : ""}>
                        Portfolio
                    </Link>
                    <Link to={"/transactions"} className={this.props.history.location.pathname === "/transactions" ? "active" : ""}>
                        Transactions
                    </Link>
                    <div onClick={this.logoutUser}>Logout</div>
                    <ThemeSwitch />
                </div>
            );
        } else {
            return (
                <div>
                    <div
                        onClick={() => this.props.openModal("register")}
                    >
                        Register
                    </div>
                    <div onClick={() => this.props.openModal("signIn")}>
                        Sign In
                    </div>
                    <ThemeSwitch />
                </div>
            );
        }
    }

    render() {
        return (
            <section className="header-container">
                <div className="header">
                    <Link to={this.props.loggedIn ? "/portfolio" : "/"}>
                        <h1>
                            <FontAwesomeIcon icon={faCoins} />
                            InvestChest
                        </h1>
                    </Link>
                    {this.getLinks()}
                </div>
            </section>
        );
    }
}

export default Header;