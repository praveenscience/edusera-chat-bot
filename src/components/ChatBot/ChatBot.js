import React, { Component } from "react";
import ChatBotImg from "../../assets/chatbot.png";

class ChatBot extends Component {
  render() {
    return (
      <div className="ChatBot-Wrapper">
        <div className="ChatBot-Messages"></div>
        <div className="ChatBot-Trigger">
          <img src={ChatBotImg} alt="Open Chat" />
        </div>
      </div>
    );
  }
}

export default ChatBot;
