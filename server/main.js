import { Meteor } from "meteor/meteor";
import { Accounts } from "meteor/accounts-base";
import "/imports/api/users/publications";
import "/imports/api/users/usersMethods";
import "/imports/api/chatSessions/publications";
import "/imports/api/chatSessions/methods.js";
import "/imports/api/Messages/methods.js";
import "/imports/api/Messages/publications.js";

const SEED_ADMIN_USERNAME = "admin";
const SEED_USER1_USERNAME = "Dima";
const SEED_USER2_USERNAME = "Zigis";
const SEED_USER3_USERNAME = "Karins";
const SEED_PASSWORD = "password";

Meteor.startup(() => {
  if (!Accounts.findUserByUsername(SEED_ADMIN_USERNAME)) {
    const createdAdminId = Accounts.createUser({
      username: SEED_ADMIN_USERNAME,
      password: SEED_PASSWORD,
    });

    Meteor.users.update(createdAdminId, { $set: { role: "admin" } });
  }

  if (!Accounts.findUserByUsername(SEED_USER1_USERNAME)) {
    const createdUserId = Accounts.createUser({
      username: SEED_USER1_USERNAME,
      password: SEED_PASSWORD,
    });

    Meteor.users.update(createdUserId, { $set: { role: "user" } });
  }
  if (!Accounts.findUserByUsername(SEED_USER2_USERNAME)) {
    const createdUserId = Accounts.createUser({
      username: SEED_USER2_USERNAME,
      password: SEED_PASSWORD,
    });

    Meteor.users.update(createdUserId, { $set: { role: "user" } });
  }
  if (!Accounts.findUserByUsername(SEED_USER3_USERNAME)) {
    const createdUserId = Accounts.createUser({
      username: SEED_USER3_USERNAME,
      password: SEED_PASSWORD,
    });

    Meteor.users.update(createdUserId, { $set: { role: "user" } });
  }
});
