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

    // const fetchedUsersWithSessions = fetchedUsers.map((currUser) => ({...currUser, myTestField: 123}));
    // ChatSessions.find({participants: this.userId});



    const fetchedUsersWithSessions = fetchedUsers.map((currUser) => {

        console.log(fetchedChatSessions.find({participants: currUser.userId}))
    });
    console.log(fetchedUsersWithSessions)
// console.log("Dima",fetchedUsers[1])
// console.log("Dima",fetchedUsers.find({participants: currUser.userId}))
    
    return {
      users: fetchedUsers,
      chatSessions: fetchedChatSessions,
      isLoading: false ,
    };
  });
  // console.log(chatSessions.length)

//   console.log(users);
  

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
    // document.location.replace('./ChatBox');
  };
  const isAdmin = Meteor.user().role === "admin";

  // currUser = Meteor.user();
  // console.log(currUser._id)

  // const isSession = chatSessions

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
                {isAdmin && (
                  <button onClick={() => handleEdit(curruser)}>Edit</button>
                )}
                <Link to={`/chatBox/oxR4B6yPfwWK9ZQfw`}>
                  {curruser.username}
                </Link>
                {isAdmin && (
                  <button onClick={() => deleteTask(curruser)}>&times;</button>
                )}
                {/* {Meteor.user() } */}
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
