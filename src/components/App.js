import React, { Component } from "react";
import Header from "./Bootstrap/Header";

class App extends Component {
  state = {};
  render() {
    return (
      <div className="App">
        <Header containerClass="justify-content-center">
          ChatBot Without AI
        </Header>
      </div>
    );
  }
}

export default App;
