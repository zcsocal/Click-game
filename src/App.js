import React, { Component } from "react";
import FriendCard from "./components/FriendCard";
import Nav from "./components/Nav";
import Wrapper from "./components/Wrapper";
import Title from "./components/Title";
import Container from "./Container";
import Row from "./Row";
import Column from "./Column";
import friends from "./friends.json";
import "./App.css";


// Random shuffle
function randomFriends(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

class App extends Component {
  state = {
    friends,
    currentScore: 0,
    topScore: 0,
    correctIncorrect: "",
    clicked: [],
    currentTime: 30,

  };



  setInterval = () => {
    this.interval = setInterval(this.tick, 1000)
  }

  tick = () => {
    if (this.state.currentTime > 0) {
      this.setState({currentTime: this.state.currentTime - 1})
    } else {
      this.handleReset()
    }
  }

  handleReset = () => {
    console.log('handle reset was called!')
    clearInterval(this.interval)

    this.setState({
      currentScore: 0,
      topScore: 0,
      correctIncorrect: "Oops! Try again!",
      clicked: [],
      currentTime: 30,
    });
    this.setInterval()
    this.handleShuffle();
  }

  handleClick = id => {
    if (this.state.clicked.length === 0) {
      this.handleReset()
    }
    if (this.state.clicked.indexOf(id) === -1) {
      this.handleIncrement();
      this.setState({ clicked: this.state.clicked.concat(id) });
    } else {
      this.handleReset();
    }
  };

  handleIncrement = () => {
    const newScore = this.state.currentScore + 1;
    this.setState({
      currentScore: newScore,
      correctIncorrect: "Good job! Keep going!"
    });
    if (newScore >= this.state.topScore) {
      this.setState({ topScore: newScore });
    }
    else if (newScore === 19) {
      this.setState({ correctIncorrect: "You win!" });
    }
    this.handleShuffle();
  };



  handleShuffle = () => {
    let shuffledFriends = randomFriends(friends);
    this.setState({ friends: shuffledFriends });
  };

  render() {
    return (
      <Wrapper>

        <Title>
        <div class="jumbotron jumbotron-fluid">
            <div class="container">
              <h1 class="display-4">MST3K Clicky-Game!</h1>
              <p class="lead">To earn points click on a DIFFERENT image each time! <br />Click on the same image twice, and you have to start over.</p>
            </div>
        </div>

        </Title>

        <Nav
          title="Satellite of Love"
          score={this.state.currentScore}
          topScore={this.state.topScore}
          correctIncorrect={this.state.correctIncorrect}
          handleReset={this.handleReset}
          currentTime={this.state.currentTime}

        />

        
        
        <Container>
          <Row>
            {this.state.friends.map(friend => (
              <Column size="md-3 sm-6">
                <FriendCard
                  key={friend.id}
                  handleClick={this.handleClick}
                  handleIncrement={this.handleIncrement}
                  handleReset={this.handleReset}
                  handleShuffle={this.handleShuffle}
                  id={friend.id}
                  image={friend.image}
                />
              </Column>
            ))}
          </Row>
        </Container>
      </Wrapper>
    );
  }
}
export default App;
