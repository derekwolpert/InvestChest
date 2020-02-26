import React from "react";
import { AuthRoute, ProtectedRoute } from "../util/route_util";
import { Switch } from "react-router-dom";

import Modal from "./modal/modal";
import HeaderContainer from "./header/header_container";
import Footer from "./footer/footer";
import SplashContainer from "./splash/splash_container";
import PortfolioContainer from "./portfolio/portfolio_container";

const App = () => (
    <>
        <AuthRoute exact path="/" component={Modal} />
        <header>
            <HeaderContainer />
        </header>
        <section className="body-container">
            <Switch>
                <AuthRoute exact path="/" component={SplashContainer} />
                <ProtectedRoute
                    exact
                    path="/portfolio"
                    component={PortfolioContainer}
                />
                <ProtectedRoute
                    exact
                    path="/transactions"
                    component={PortfolioContainer}
                />
            </Switch>
        </section>
        <footer>
            <Footer />
        </footer>
    </>
);

export default App;