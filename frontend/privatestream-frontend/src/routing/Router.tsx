import React from "react";
import { Switch, Route, Router } from "react-router-dom";
import DefaultLayout from "../layouts/DefaultLayout";
import { HealthChecker } from "../components/healthChecker";
import logo from "../logo.svg";
import { createBrowserHistory } from "history";

const customHistory = createBrowserHistory();

const AppRouter = (props: any) => {
  return (
    <Router history={customHistory}>
      <div>
        <Switch>
          <Route path="/signup">
            <DefaultLayout showNavbar>
              <div>SINGUP</div>
            </DefaultLayout>
          </Route>
          <Route path="/login">
            <DefaultLayout showNavbar>
              <div>LOGIN</div>
            </DefaultLayout>
          </Route>
          <Route path="/">
            <DefaultLayout showNavbar>
              <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                  Edit <code>src/App.tsx</code> and save to reload.
                </p>
                <HealthChecker />
              </header>
            </DefaultLayout>
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default AppRouter;
