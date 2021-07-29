import React, { Component } from "react";

class Child extends Component {
  render() {
    return (
      <div className="Child">
        <h2>Child Component</h2>
        <p>I'll wait for my props!</p>
        <pre>{JSON.stringify(this.props, null, 2)}</pre>
        <button onClick={this.props.handleClick}>Change Name from Child</button>
      </div>
    );
  }
}
export default Child;
