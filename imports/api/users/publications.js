import { Meteor } from 'meteor/meteor';

Meteor.publish('users.fetchAll', function publishUsers() {
    const curruser = Meteor.users.findOne(this.userId);

    if (!curruser) {
        throw new Meteor.Error('Access denied.');
    }

    const querry = {};
    const options = { fields: { createdAt: 1, username: 1, role: 1 } };

    return Meteor.users.find(querry, options);
});
Meteor.publish('users.single', function publishUsers(targetUser) {
    const curruser = Meteor.users.findOne(this.userId);

    if (!curruser) {
        throw new Meteor.Error('Access denied.');
    }

    const querry = { _id: targetUser };
    const options = { fields: { username: 1 } };

    return Meteor.users.find(querry, options);
});
