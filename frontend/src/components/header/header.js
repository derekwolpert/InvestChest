import React from "react";
import { Link } from "react-router-dom";

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
                    <Link to={"/portfolio"}>Portfolio</Link>
                    <Link to={"/transactions"}>Transactions</Link>
                    <button onClick={this.logoutUser}>Logout</button>
                </div>
            );
        } else {
            return (
                <div>
                    <div onClick={() => this.props.openModal("register")}>Register</div>
                    <div onClick={() => this.props.openModal("signIn")}>Sign In</div>
                </div>
            );
        }
    }

    render() {
        return (
            <div>
                <h1>InvestChest</h1>
                {this.getLinks()}
            </div>
        );
    }
}

export default Header;