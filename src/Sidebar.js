import React, { useEffect, useState } from "react";
import "./Sidebar.css";
import SidebarChat from "./SidebarChat";
import { useSelector } from "react-redux";
import { selectUser } from "./features/userSlice";
import db, { auth } from "./firebase";
import { Avatar, IconButton } from "@material-ui/core";
import { RateReviewOutlined, Search } from "@material-ui/icons";

const Sidebar = () => {
  const user = useSelector(selectUser);
  const [chats, setChats] = useState([]);
  const addChat = () => {
    const chatName = prompt("Please enter a chatName");
    if (chatName) {
      db.collection("chats").add({
        chatName: chatName,
      });
    }
  };
  useEffect(() => {
    db.collection("chats").onSnapshot(snapshot => {
      setChats(
        snapshot.docs.map(doc => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
  }, []);
  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <Avatar
          onClick={() => auth.signOut()}
          src={user.photo}
          className="sidebar__avatar"
        />
        <div className="sidebar__input">
          <Search />
          <input type="text" placeholder="Search" />
        </div>
        <IconButton variant="outlined" className="sidebar__inputButton">
          <RateReviewOutlined onClick={addChat} />
        </IconButton>
      </div>
      <div className="sidebar__chats">
        {chats.map(({ id, data: { chatName } }) => (
          <SidebarChat key={id} id={id} chatName={chatName} />
        ))}
      </div>
    </div>
  );
};

export default Sidebar;