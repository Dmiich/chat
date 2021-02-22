import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useTracker } from "meteor/react-meteor-data";
import { AddUserForm } from "/imports/ui/Components/AddUserForm.jsx";
import { EditForm } from "/imports/ui/Components/EditForm.jsx";
import { ChatSessions } from "/imports/api/chatSessions/collections";
import { Redirect } from "react-router";

const Users = () => {
  const [editableInfo, setEditableInfo] = useState({
    userId: "",
    username: "",
    displayEdit: false,
  });
  const [redirect, setRedirect] = useState({
    redirectTo: "",
    isReady: false,
  });

  const { users, chatSessions, isLoading } = useTracker(() => {
    const handler = Meteor.subscribe("users.fetchAll");
    if (!handler.ready()) {
      return { users: [], chatSessions: [], isLoading: true };
    }
    const handler2 = Meteor.subscribe("chatSessions.fetchAllSessions");
    if (!handler2.ready()) {
      return { users: [], chatSessions: [], isLoading: true };
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

  const isAdmin = Meteor.user().role === "admin";
  const currUser = Meteor.user();

  const handlUserClick = ({ _id }) => {
    Meteor.call("chatSessions.getSessionId", _id, (error, value) =>
      setRedirect({
        redirectTo: value,
        isReady: true,
      })
    );
  };

  return (
    <div>
      {redirect.isReady && (
        <Redirect push to={`/chatBox/${redirect.redirectTo}`} />
      )}
      <div>
        <h1>Users</h1>
        <hr></hr>
        {isAdmin && <AddUserForm />}
        <ul className="UsersList">
          <h3>
            {users.map((curruser) => (
              <div className="userName" key={curruser._id}>
                {currUser._id !== curruser._id && (
                  <>
                    {isAdmin && (
                      <button onClick={() => handleEdit(curruser)}>Edit</button>
                    )}
                    <Link
                      // to={`/chatBox/oxR4B6yPfwWK9ZQfw`}    seit nevar saprast, vins itka blauj ka vinam vajag sito, bet man vinu nevajag. tur konsolloga warnings buus es nezinu ko darit :D
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
