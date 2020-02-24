import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoins } from "@fortawesome/free-solid-svg-icons";

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
                    <Link className="header-spacing" to={"/portfolio"}>
                        Portfolio
                    </Link>
                    <Link className="header-spacing" to={"/transactions"}>
                        Transactions
                    </Link>
                    <div onClick={this.logoutUser}>Logout</div>
                </div>
            );
        } else {
            return (
                <div>
                    <div
                        className="header-spacing"
                        onClick={() => this.props.openModal("register")}
                    >
                        Register
                    </div>
                    <div onClick={() => this.props.openModal("signIn")}>
                        Sign In
                    </div>
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