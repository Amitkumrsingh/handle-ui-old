import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { dashboard as dashboardRoutes, 
  auth as authRoutes, 
  organisation as organisationRoutes,
  branch as branchRoutes
} from "./index";

import DashboardLayout from "../layouts/Dashboard";
import AuthLayout from "../layouts/Auth";
import Page404 from "../pages/auth/Page404";
import SignIn from "../pages/auth/SignIn";

const childRoutes = (Layout, routes) =>
  routes.map(({ children, path, component: Component }, index) =>
    children ? (
      // Route item with children
      children.map(({ path, component: Component }, index) => (
        <Route
          key={index}
          path={path}
          exact
          render={props => (
            <Layout routes={routes}>
              <Component {...props} />
            </Layout>
          )}
        />
      ))
    ) : (
      // Route item without children
      <Route
        key={index}
        path={path}
        exact
        render={props => (
          <Layout routes={routes}>
            <Component {...props} />
          </Layout>
        )}
      />
    )
  );

const Routes = () => (
  <Router>
    <Switch>
      {childRoutes(DashboardLayout, organisationRoutes)}
      {childRoutes(DashboardLayout, branchRoutes)}
      {childRoutes(DashboardLayout, dashboardRoutes)}
      {childRoutes(AuthLayout, authRoutes)}
      <Route path='/auth/sign-in'
        render={() => (
          <AuthLayout>
            <SignIn />
          </AuthLayout>
        )}
      />
      <Route
        render={() => (
          <AuthLayout>
            <Page404 />
          </AuthLayout>
        )}
      />
    </Switch>
  </Router>
);

export default Routes;
