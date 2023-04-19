import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Main from "./components/layouts/main";
import Login from "./components/layouts/login";
import NavBar from "./components/ui/navBar";
import Users from "./components/layouts/users";
import { ToastContainer } from "react-toastify";
import ProtectedRoute from "./components/common/protectedRoute";
import LogOut from "./components/layouts/logOut";
import AppLoader from "./components/ui/hoc/appLoader";

const App = () => {
    return (
        <>
            <AppLoader>
                    <NavBar />
                    <Switch>
                        <Route path="/login/:type?" component={Login} />
                        <Route path="/logout" component={LogOut} />
                        <ProtectedRoute
                            path="/users/:userId?/:action?"
                            component={Users}
                        />
                        <Route path="/" exact component={Main} />
                        <Redirect to="/" />
                    </Switch>
            </AppLoader>

            <ToastContainer />
        </>
    );
};

export default App;
