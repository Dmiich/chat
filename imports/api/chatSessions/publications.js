import { Meteor } from 'meteor/meteor';
import { ChatSessions } from "/imports/api/chatSessions/collections"


Meteor.publish('chatSessions.fetchAllSessions', function publishChatSessions() {
    const curruser = Meteor.users.findOne(this.userId);

    if (!curruser) {
        throw new Meteor.Error('Access denied.');
    }
    return ChatSessions.find({participants: this.userId});
});
Meteor.publish('chatSessions.single', function publishChatSessins(sessionId) {
    const curruser = Meteor.users.findOne(this.userId);

    if (!curruser) {
        throw new Meteor.Error('Access denied.');
    }

    // const querry = {};
    // const options = { fields: { createdAt: 1, username: 1, role: 1 } };

    return ChatSessions.find({_id: sessionId});
});