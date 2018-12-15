import React, { Component } from "react";
import "./App.css";
import { GameBoard } from "./components";

class App extends Component {
  state = {
    puzzle: [],
    rows: [],
    isLoading: true
  };

  componentWillMount() {
    this.getPuzzle();
  }

  getPuzzle() {
    fetch("http://localhost:3000/puzzles", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json()) //
      .then(responseJson => {
        this.setState({
          puzzle: responseJson.puzzles[0]
        });
        this.splitPuzzle();
        console.log(this.state.puzzle);
      })

      .catch(error => {
        console.error(error);
      });
  }

  splitPuzzle() {
    const rows = [[], [], [], [], [], [], [], [], []];

    rows[0].push(this.state.puzzle.puzzle.slice(0, 9));
    rows[1].push(this.state.puzzle.puzzle.slice(9, 18));
    rows[2].push(this.state.puzzle.puzzle.slice(18, 27));
    rows[3].push(this.state.puzzle.puzzle.slice(27, 36));
    rows[4].push(this.state.puzzle.puzzle.slice(36, 45));
    rows[5].push(this.state.puzzle.puzzle.slice(45, 54));
    rows[6].push(this.state.puzzle.puzzle.slice(54, 63));
    rows[7].push(this.state.puzzle.puzzle.slice(63, 72));
    rows[8].push(this.state.puzzle.puzzle.slice(72, 81));

    this.setState({
      rows: rows,
      isLoading: false
    });

    console.log(this.state.rows);
  }

  render() {
    return (
      <div className="appView">
        {this.state.isLoading ? (
          "loading"
        ) : (
          <GameBoard rows={this.state.rows} />
        )}
      </div>
    );
  }
}

export default App;
