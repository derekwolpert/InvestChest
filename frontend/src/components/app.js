import React from "react";
import { AuthRoute, ProtectedRoute } from "../util/route_util";
import { Switch } from "react-router-dom";

import Modal from "./modal/modal";
import HeaderContainer from "./header/header_container";
import SplashPage from "./splash/splash_page";
import PortfolioContainer from "./portfolio/portfolio_container";

const App = () => (
    <>
        <AuthRoute exact path="/" component={Modal} />
        <HeaderContainer />
        <Switch>
            <AuthRoute exact path="/" component={SplashPage} />
            <ProtectedRoute exact path="/portfolio" component={PortfolioContainer} />
        </Switch>
    </>
);

export default App;