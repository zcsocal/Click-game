import React from "react";
import "./Nav.css";



export default class Nav extends React.Component {
  render() {
    return (
      <nav>
      

      <ul>
        <li className="brand animated lightSpeedIn ">
          <a href="/clicky-game/">{this.props.title}</a>
          </li>
  
        <li id="rw" >{this.props.correctIncorrect}</li>
  
  
        <li className="alignRight"> CurrentScore : {this.props.score} | Top Score: {this.props.topScore}  </li>

  
      </ul>
    </nav>
    )
  }
};



