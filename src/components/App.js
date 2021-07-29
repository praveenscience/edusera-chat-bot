import React, { Component } from "react";
import Child from "./Child";

class App extends Component {
  state = {
    Name: "Edusera"
  };
  handleClick = e => {
    e.preventDefault();
    this.setState({ Name: "Devlina" });
  };
  render() {
    return (
      <div className="App">
        <h1>Learn React</h1>
        <p>Hey {this.state.Name}, you are the best!</p>
        <button onClick={this.handleClick}>Change Name</button>
        <pre>{JSON.stringify(this.state, null, 2)}</pre>
        <Child Name="Nirankar" MainName={this.state.Name} handleClick={this.handleClick} />
      </div>
    );
  }
}

export default App;
