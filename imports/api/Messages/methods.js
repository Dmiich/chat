import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";
import { Messages } from "/imports/api/Messages/collections";

Meteor.methods({
  "messages.insert"(text, chatSessionID) {
    check(text, String);

    if (!this.userId) {
      throw new Meteor.Error("Not authorized.");
    }

    Messages.insert({
      text: text,
      userID: Meteor.user()._id,
      createdAt: new Date(),
      chatSessionID: chatSessionID,
      isRead: false,
    });
  },
});
