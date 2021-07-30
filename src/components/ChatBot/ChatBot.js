import React, { Component } from "react";
import ChatBotImg from "../../assets/chatbot.png";
import GuestImg from "../../assets/guest.png";

class ChatBot extends Component {
  state = {
    Open: false,
    GuestMsg: "",
    ChatBotState: 0,
    Messages: [
      {
        Text: "Hey there! I am a ChatBot! Type start to begin...",
        Bot: true
      }
    ]
  };
  toggleChatBox = () => {
    this.setState({
      Open: !this.state.Open
    });
  };
  handleGuestMsgChange = e => {
    this.setState({
      GuestMsg: e.target.value
    });
  };
  botAction = () => {
    const LastMessage = [...this.state.Messages].reverse()[0].Text;
    if (
      LastMessage.toLowerCase() === "start" &&
      this.state.ChatBotState === 0
    ) {
      const Text =
        "Hey Guest, thanks for starting me up! Please enter your github username.";
      this.setState({
        ChatBotState: 1,
        Messages: [
          ...this.state.Messages,
          {
            Text,
            Bot: true
          }
        ]
      });
    }
    if (this.state.ChatBotState === 1) {
      const Text = `Thanks for providing ${LastMessage} as your GitHub username...`;
      this.setState({
        ChatBotState: 2,
        Messages: [
          ...this.state.Messages,
          {
            Text,
            Bot: true
          },
          {
            Text: "Let's look it up with GitHub... Please wait...",
            Bot: true
          }
        ]
      });
    }
  };
  handleGuestMsgSubmit = e => {
    e.preventDefault();
    const Text = this.state.GuestMsg;
    this.setState(
      {
        GuestMsg: "",
        Messages: [
          ...this.state.Messages,
          {
            Text,
            Bot: false
          }
        ]
      },
      () => {
        this.botAction();
      }
    );
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
            <form
              className="ChatBot-Input"
              onSubmit={this.handleGuestMsgSubmit}
            >
              <input
                type="text"
                value={this.state.GuestMsg}
                onChange={this.handleGuestMsgChange}
              />
            </form>
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
