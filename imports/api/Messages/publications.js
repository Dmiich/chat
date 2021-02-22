import { Meteor } from "meteor/meteor";
import { Messages } from "/imports/api/Messages/collections.js";

Meteor.publish("messages.singleSession", function publishMessages(sessionID) {
  const curruser = Meteor.users.findOne(this.userId);

  if (!curruser) {
    throw new Meteor.Error("Access denied.");
  }

  return Messages.find({ chatSessionID: sessionID });
});
