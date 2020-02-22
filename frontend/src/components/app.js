import React from "react";
import { AuthRoute, ProtectedRoute } from "../util/route_util";
import { Switch } from "react-router-dom";

import MainPage from "./main/main_page";

const App = () => (
    <div>
        <Switch>
            <AuthRoute exact path="/" component={SplashPage} />
            <MainPage />
        </Switch>
    </div>
);

export default App;