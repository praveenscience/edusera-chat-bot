import React, { Component } from "react";
import Header from "./Bootstrap/Header";
import ChatBot from "./ChatBot/ChatBot";

class App extends Component {
  state = {};
  render() {
    return (
      <div className="App">
        <Header containerClass="justify-content-center" dark={true}>
          ChatBot Without AI
        </Header>
        <ChatBot />
      </div>
    );
  }
}

export default App;
