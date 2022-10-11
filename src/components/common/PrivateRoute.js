import React from "react";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={function (props) {
        const authInfo = JSON.parse(localStorage.getItem("auth"));
        if (!authInfo) {
          return <Redirect to="/login" />;
        }

        const is_verified = authInfo.user_is_verified;
        if (is_verified === 0) {
          return <Redirect to="/verify" />;
        }

        return <Component {...props} />;
      }}
    />
  );
};

export default PrivateRoute;
