import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useTracker } from "meteor/react-meteor-data";
import { AddUserForm } from "/imports/ui/Components/AddUserForm.jsx";
import { EditForm } from "/imports/ui/Components/EditForm.jsx";
import { ChatSessions } from "/imports/api/chatSessions/collections";

const Users = () => {
  const [editableInfo, setEditableInfo] = useState({
    userId: "",
    username: "",
    displayEdit: false,
  });

  const { users, chatSessions, isLoading } = useTracker(() => {
    const handler = Meteor.subscribe("users.fetchAll");
    if (!handler.ready()) {
      return { users: [], isLoading: true };
    }
    const handler2 = Meteor.subscribe("chatSessions.fetchAllSessions");
    if (!handler2.ready()) {
      return { users: [], isLoading: true };
    }
    const fetchedUsers = Meteor.users.find().fetch();
    const fetchedChatSessions = ChatSessions.find().fetch();

    const sessions = fetchedChatSessions.reduce(
      (pV, cV) => [...pV, ...cV.participants],
      []
    );

    const fetchedUsersWithSessions = fetchedUsers.map((currUser) => {
      if (sessions.includes(currUser._id)) {
        return { ...currUser, hasSession: true };
      } else {
        return { ...currUser, hasSession: false };
      }
    });

    return {
      users: fetchedUsersWithSessions,
      chatSessions: fetchedChatSessions,
      isLoading: false,
    };
  });

  console.log(chatSessions);

  const deleteTask = ({ _id }) => {
    return Meteor.call("users.remove", _id);
  };

  const handleEdit = ({ _id }) => {
    const updateableUser = Meteor.users.findOne(_id);

    setEditableInfo({
      userId: updateableUser._id,
      username: updateableUser.username,
      displayEdit: true,
    });
  };

  const handleChat = ({ _id }) => {
    const updateableUser = Meteor.users.findOne(_id);

    console.log(updateableUser.username);
    setEditableInfo({
      userId: updateableUser._id,
      username: updateableUser.username,
      displayEdit: false,
    });
  };
  const isAdmin = Meteor.user().role === "admin";
  const currUser = Meteor.user();

  const handlUserClick = ({ _id }) => {
    Meteor.call(
      "chatSessions.getSessionId",
      _id, 
      (error, value) => console.log("Dima", error, value)
    );
  };

  return (
    <div>
      <div>
        <h1>Users</h1>
        <hr></hr>
        {isAdmin && <AddUserForm />}
        <ul className="UsersList">
          <h3>
            {users.map((curruser) => (
              <div className="userName">
                {currUser._id !== curruser._id && (
                  <>
                    {isAdmin && (
                      <button onClick={() => handleEdit(curruser)}>Edit</button>
                    )}
                    <Link
                      to={`/chatBox/oxR4B6yPfwWK9ZQfw`}
                      onClick={() => handlUserClick(curruser)}
                    >
                      {curruser.username}
                    </Link>
                    {curruser.hasSession ? "YES" : "NO"}
                    {isAdmin && (
                      <button onClick={() => deleteTask(curruser)}>
                        &times;
                      </button>
                    )}
                  </>
                )}
              </div>
            ))}
          </h3>
        </ul>
        {editableInfo.displayEdit && (
          <EditForm
            editableInfo={editableInfo}
            setEditableInfo={setEditableInfo}
          />
        )}
      </div>
    </div>
  );
};

export default Users;
