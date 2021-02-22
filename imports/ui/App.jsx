import React from "react";
import { useTracker } from "meteor/react-meteor-data";
import { LoggedOutLayout } from "./LoggedOutLayout";
import { LoggedInLayout } from "./LoggedInLayout";

export const App = () => {
  const user = useTracker(() => Meteor.user());

  return <>{user ? <LoggedInLayout /> : <LoggedOutLayout />}</>;
};
