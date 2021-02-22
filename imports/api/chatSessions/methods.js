import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";
import { ChatSessions } from "/imports/api/chatSessions/collections";

Meteor.methods({
  "chatSessions.getSessionId"(targetUser) {
    check(targetUser, String);

    if (!this.userId) {
      throw new Meteor.Error("Not authorized.");
    }
    if (!Meteor.users.findOne(targetUser)) {
      throw new Meteor.Error("User does not exist");
    }

    if (this.userId === targetUser) {
      throw new Meteor.Error("This user ID === target use ID");
    }

    const test = ChatSessions.findOne({
      participants: { $all: [this.userId, targetUser] },
    });

    if (test) {
      return test._id;
    }

    return ChatSessions.insert({
      participants: [this.userId, targetUser],
    });
  },
});
