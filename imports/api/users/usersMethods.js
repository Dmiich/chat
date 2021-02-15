import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";


Meteor.methods({
    "users.insert"(username, password) {
        check((username && password), String);

        if (!this.userId) {
            throw new Meteor.Error("Not authorized.");
        }

        if (!Accounts.findUserByUsername(username)) {
            const createdUser = Accounts.createUser({
                username: username,
                password: password,
            });

            Meteor.users.update(createdUser, { $set: { role: "user" } });
        }
    },

    "users.edit"(userId, username) {
        check(username, String);

        if (!this.userId) {
            throw new Meteor.Error("Not authorized.");
        }
        console.log(userId);
        Meteor.users.update({ _id: userId }, {
            $set: {
                username: username,
            }
        });
    },

    "users.remove"(userId) {
        check(userId, String);
        const curruser = Meteor.users.findOne(this.userId)

        if (!curruser || curruser.role !== "admin") {
            throw new Meteor.Error("Not authorized or admin.");
        }

        const removableUser = Meteor.users.findOne(userId);

        if (!removableUser || removableUser.role === "admin") {

            throw new Meteor.Error("Not today :)");

        }

        Meteor.users.remove(removableUser._id);
    },

});
