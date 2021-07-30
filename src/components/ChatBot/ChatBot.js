import React, { Component } from "react";
import ChatBotImg from "../../assets/chatbot.png";
import GuestImg from "../../assets/guest.png";

class ChatBot extends Component {
  state = {
    Open: false,
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
  toggleChatBox = () => {
    this.setState({
      Open: !this.state.Open
    });
  };
  render() {
    return (
      <div className="ChatBot-Wrapper">
        {this.state.Open && (
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
            <form className="ChatBot-Input"></form>
          </div>
        )}
        <div className="ChatBot-Trigger">
          <img src={ChatBotImg} alt="Open Chat" onClick={this.toggleChatBox} />
        </div>
      </div>
    );
  }
}

export default ChatBot;
