import { Meteor } from "meteor/meteor";
import { ChatSessions } from "/imports/api/chatSessions/collections";

Meteor.publish("chatSessions.fetchAllSessions", function publishChatSessions() {
  const curruser = Meteor.users.findOne(this.userId);

  if (!curruser) {
    throw new Meteor.Error("Access denied.");
  }
  return ChatSessions.find({ participants: this.userId });
});
Meteor.publish("chatSessions.single", function publishChatSessins(sessionId) {
  if (!ChatSessions.findOne({ _id: sessionId })) {
    throw new Meteor.Error("Does not exist.");
  }
  const curruser = Meteor.users.findOne(this.userId);
  if (!curruser) {
    throw new Meteor.Error("Access denied.");
  }
  const chatSession = ChatSessions.findOne({ _id: sessionId });

  if (!chatSession.participants.includes(curruser._id)) {
    return [];
  }

  return ChatSessions.find({ _id: sessionId });
});
