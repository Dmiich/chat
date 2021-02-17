import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";
import { ChatSessions } from "/imports/api/chatSessions/collections";

Meteor.methods({
  "chatSessions.getSessionId"(targetUser) {
    check(targetUser, String);

    if (!this.userId) {
      throw new Meteor.Error("Not authorized.");
    }
    // atrast vai tadas id sesija eksiste
    // ja eksiste tad atgreiz ID
    // ja neeksiste, tad izveidojam sesiju un atgriezam

    // ChatSessions.insert({
    //   participants: [this.userId, targetUser],
    // });
    const test = ChatSessions.find({})
    console.log("DR", test)
    return "qwerty"
  },
});
