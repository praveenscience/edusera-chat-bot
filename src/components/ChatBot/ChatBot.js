import React, { Component } from "react";
import ChatBotImg from "../../assets/chatbot.png";
import GuestImg from "../../assets/guest.png";

class ChatBot extends Component {
  state = {
    Messages: [
      {
        Text: "Hey there! I am a ChatBot! Type start!",
        Bot: true
      },
      {
        Text: "Hey ChatBot! You look beautiful!",
        Bot: false
      }
    ]
  };
  render() {
    return (
      <div className="ChatBot-Wrapper">
        <div className="ChatBot-Messages">
          <ul>
            {this.state.Messages.map((msg, key) => (
              <li key={key} className={msg.Bot ? "ChatBot" : "Guest"}>
                <img
                  src={msg.Bot ? ChatBotImg : GuestImg}
                  alt={msg.Bot ? "ChatBot" : "Guest"}
                />
                <p>{msg.Text}</p>
              </li>
            ))}
          </ul>
        </div>
        <form className="ChatBot-Input"></form>
        <div className="ChatBot-Trigger">
          <img src={ChatBotImg} alt="Open Chat" />
        </div>
      </div>
    );
  }
}

export default ChatBot;
