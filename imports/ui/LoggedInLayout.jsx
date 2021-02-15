import React from "react";
import { NavBar } from "./Components/NavBar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Chat } from "./Pages/Chat";
import Users from "./Pages/Users";
import { ChatBox } from "./Pages/ChatBox";

const logout = () => Meteor.logout();

export const LoggedInLayout = () => {
  return (
    <Router>
      <NavBar logout={logout} />
      <Switch>
        <Route path="/chat" component={Chat} />
        <Route path="/users" component={Users} />
        <Route path="/chatBox/:chatSessionID" component={ChatBox} />
      </Switch>
    </Router>
  );
};
