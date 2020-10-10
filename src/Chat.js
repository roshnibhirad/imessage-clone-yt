import React, { useEffect, useState } from "react";
import "./Chat.css";
import { IconButton } from "@material-ui/core";
import { MicNone } from "@material-ui/icons";
import Message from "./Message";
import { useSelector } from "react-redux";
import { selectChatName, selectChatId } from "./features/chatSlice";
import db from "./firebase";
import firebase from "firebase";
import { selectUser } from "./features/userSlice";
import FlipMove from "react-flip-move";

const Chat = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const chatName = useSelector(selectChatName);
  const chatId = useSelector(selectChatId);
  const user = useSelector(selectUser);
 
  useEffect(() => {
    if (chatId) {
      db.collection("chats")
        .doc(chatId).collection("messages").orderBy("timestamp", "asc").onSnapshot(snapshot => {
          setMessages(
            snapshot.docs.map(doc => ({
              id: doc.id,
              data: doc.data(),
            }))
          );
        });
    }
  }, [chatId]); 

  useEffect(() => {
    const scrollArea = document.getElementById("scroll-area");
    if (scrollArea) {
      scrollArea.scrollTop = scrollArea.scrollHeight;
    }
  });

  const sendMessage = e => {
    e.preventDefault();
    db.collection("chats").doc(chatId).collection("messages").add({
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      message: input,
      uid: user.uid,
      photo: user.photo,
      email: user.email,
      displayName: user.displayName,
    });
    setInput("");
  };
  return (
    <div className="chat">
      <div className="chat__header">
        <h4>
          To: <span className="chat__name">{chatName}</span>
        </h4>
        <strong>Details</strong>
      </div>
      <div className="chat__messages" id="scroll-area">
        <FlipMove>
          {messages.map(({ id, data }) => (
            <Message key={id} contents={data} />
          ))}
        </FlipMove>
      </div>
      <div className="chat__input">
        <form>
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            type="text"
            placeholder="iMessage"
          /> 
          <button type="submit" onClick={sendMessage}>
            Send Message
          </button>
        </form>
        <IconButton>
          <MicNone />
        </IconButton>
      </div>
    </div>
  );
};

export default Chat; 