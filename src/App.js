import { useState, useEffect } from "react";

import "bootstrap/dist/css/bootstrap.min.css";

import "./assets/App.css";

import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import ResendVerify from "./pages/ResendVerify";
import Register from "./pages/Register";
import SettingsPage from "./pages/Settings";
import Profile from "./pages/Profile";
import PrivateRoute from "./components/common/PrivateRoute";
import Verify from "./pages/Verify";

import Context from "./context";

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [hasNewPost, setHasNewPost] = useState(false);
  const [selectedPost, setSelectedPost] = useState(false);

  useEffect(() => {
    initAuthUser();
  }, []);

  const initAuthUser = () => {
    const authenticatedUser = localStorage.getItem("auth");
    if (authenticatedUser) {
      setUser(JSON.parse(authenticatedUser));
    }
  };

  return (
    <Context.Provider
      value={{
        isLoading,
        setIsLoading,
        user,
        setUser,
        hasNewPost,
        setHasNewPost,
        selectedPost,
        setSelectedPost,
      }}
    >
      <Router>
        <Switch>
          <PrivateRoute exact path="/" component={Home} />
          <PrivateRoute exact path="/settings" component={SettingsPage} />
          <PrivateRoute exact path="/profile/:id" component={Profile} />
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/verify/" component={ResendVerify} />
          <Route exact path="/verify/:verification_code" component={Verify} />
          <Route exact path="/register">
            <Register />
          </Route>
        </Switch>
      </Router>
    </Context.Provider>
  );
}

export default App;
