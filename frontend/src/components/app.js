import React from "react";
import { AuthRoute, ProtectedRoute } from "../util/route_util";
import { Switch } from "react-router-dom";

import Modal from "./modal/modal";
import HeaderContainer from "./header/header_container";
import SplashPage from "./splash/splash_page";

const App = () => (
    <>
        <Modal />
        <HeaderContainer />
        <Switch>
            <AuthRoute exact path="/" component={SplashPage} />
        </Switch>
    </>
);

export default App;