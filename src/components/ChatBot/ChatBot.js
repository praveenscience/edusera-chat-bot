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
    ],
    GitHubUser: null
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
      fetch("https://api.github.com/users/" + LastMessage)
        .then(res => res.json())
        .then(GitHubUser => {
          const Text = `Hey ${
            GitHubUser.name ? GitHubUser.name : GitHubUser.login
          }! I found you! You're awesome, coz you have got ${
            GitHubUser.public_repos
          } public repos! Saving your details!`;
          const NoName = {
            Text: (
              <>
                Hey, {GitHubUser.login}, it seems like you haven't set your
                name. Would you like to please set one by going to{" "}
                <a
                  href="https://github.com/settings/profile"
                  target="_blank"
                  rel="noreferrer"
                >
                  your profile settings
                </a>{" "}
                after you login?
              </>
            ),
            Bot: true
          };
          const Messages = [
            ...this.state.Messages,
            {
              Text,
              Bot: true
            },
            {
              Text: (
                <>
                  So what do you want to do now? Please enter one of the options
                  here:
                  <br />- bio
                  <br />- company
                  <br />- avatar
                  <br />- blog site
                  <br />- location
                  <br />- can hire
                  <br />- followers
                  <br />- following
                  <br />- reset
                </>
              ),
              Bot: true
            }
          ];
          if (!GitHubUser.name) {
            Messages.push(NoName);
          }
          this.setState({
            GitHubUser,
            ChatBotState: 3,
            Messages
          });
        });
    }
    if (this.state.ChatBotState === 3) {
      switch (LastMessage) {
        case "bio":
          this.setState({
            Messages: [
              ...this.state.Messages,
              {
                Text: this.state.GitHubUser.bio,
                Bot: true
              }
            ]
          });
          break;
        case "company":
          this.setState({
            Messages: [
              ...this.state.Messages,
              {
                Text: this.state.GitHubUser.company,
                Bot: true
              }
            ]
          });
          break;
        case "avatar":
          this.setState({
            Messages: [
              ...this.state.Messages,
              {
                Text: (
                  <>
                    <img
                      src={this.state.GitHubUser.avatar_url}
                      alt={`${this.state.GitHubUser.login}'s Avatar`}
                    />
                  </>
                ),
                Bot: true
              }
            ]
          });
          break;
        case "blog site":
          this.setState({
            Messages: [
              ...this.state.Messages,
              {
                Text: (
                  <>
                    Find {this.state.GitHubUser.login}'s blogs{" "}
                    <a
                      href={this.state.GitHubUser.blog}
                      target="_blank"
                      rel="noreferrer"
                    >
                      here
                    </a>
                    ...
                  </>
                ),
                Bot: true
              }
            ]
          });
          break;
        case "location":
          this.setState({
            Messages: [
              ...this.state.Messages,
              {
                Text: `${
                  this.state.GitHubUser.name
                    ? this.state.GitHubUser.name
                    : this.state.GitHubUser.login
                } lives in ${this.state.GitHubUser.location}`,
                Bot: true
              }
            ]
          });
          break;
        case "can hire":
          this.setState({
            Messages: [
              ...this.state.Messages,
              {
                Text: `${
                  this.state.GitHubUser.name
                    ? this.state.GitHubUser.name
                    : this.state.GitHubUser.login
                } is${
                  this.state.GitHubUser.hireable ? "" : " not"
                } available for hire.`,
                Bot: true
              }
            ]
          });
          break;
        case "followers":
          this.setState({
            Messages: [
              ...this.state.Messages,
              {
                Text: `${
                  this.state.GitHubUser.name
                    ? this.state.GitHubUser.name
                    : this.state.GitHubUser.login
                } has got ${this.state.GitHubUser.followers} followers.`,
                Bot: true
              }
            ]
          });
          break;
        case "following":
          this.setState({
            Messages: [
              ...this.state.Messages,
              {
                Text: `${
                  this.state.GitHubUser.name
                    ? this.state.GitHubUser.name
                    : this.state.GitHubUser.login
                } follows ${this.state.GitHubUser.following} users.`,
                Bot: true
              }
            ]
          });
          break;
        case "reset":
        default:
          this.setState({
            GitHubUser: null,
            ChatBotState: 0,
            Messages: [
              ...this.state.Messages,
              {
                Text: "Thanks for using my service. Please type start to begin once again...",
                Bot: true
              }
            ]
          });
          break;
      }
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
                    src={
                      msg.Bot
                        ? ChatBotImg
                        : this.state.GitHubUser
                        ? this.state.GitHubUser.avatar_url
                        : GuestImg
                    }
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
                placeholder={
                  this.state.GitHubUser
                    ? `Please write something ${
                        this.state.GitHubUser.name
                          ? this.state.GitHubUser.name
                          : this.state.GitHubUser.login
                      }...`
                    : "Please start typing something..."
                }
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
