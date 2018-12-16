import React, { Component } from "react";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);

    this.handleSelectedCell = this.handleSelectedCell.bind(this);
    this.changeNumber = this.changeNumber.bind(this);
    this.checkProgress = this.checkProgress.bind(this);
  }
  state = {
    puzzle: [],
    rows: [],
    solution: [],
    isLoading: true,
    selectedCell: null,
    cellIndex: 0,
    isMatch: true,
    wrongAnswers: [],
    correctAnswers: []
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
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          puzzle: responseJson.puzzles[0],
          solution: responseJson.puzzles[0].solution
        });
        this.splitPuzzle();
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
  }

  renderCells(i) {
    let j = 0;
    return this.state.rows[i][0].map(cell => (
      <div
        className="cell"
        key={j++}
        style={this.renderBorders(this.state.cellIndex)}
      >
        <button
          value={this.state.cellIndex++}
          onClick={this.handleSelectedCell}
          className="cellBtn"
          style={this.cellColor(this.state.cellIndex)}
        >
          <span className="cellNum">{cell > 0 ? cell : ""}</span>
        </button>
      </div>
    ));
  }

  cellColor(cellIndex) {
    for (let i = 0; i < this.state.wrongAnswers.length; i++) {
      if (cellIndex === this.state.wrongAnswers[i] + 1) {
        return { backgroundColor: "red" };
      }
    }
  }

  //actionhandlers
  handleSelectedCell(event) {
    this.state.selectedCell = event.target.value;
    console.log(this.state.selectedCell);
  }

  changeNumber(event) {
    let oldnumbers = this.state.puzzle.puzzle;
    let updatedNumbers;

    oldnumbers[this.state.selectedCell] = parseInt(event.target.value);
    console.log(typeof oldnumbers[this.state.selectedCell]);
    updatedNumbers = oldnumbers;

    this.splitPuzzle();

    this.setState({
      selectedCell: null,
      cellIndex: 0,
      oldnumbers: updatedNumbers
    });

    console.log(this.state.solution);
    console.log(this.state.puzzle.puzzle);
  }

  checkProgress() {
    let puzzle = this.state.puzzle.puzzle;
    let solution = this.state.solution;
    let wrongAnswers = [];
    let correctAnswers = [];

    for (let i = 0; i < solution.length; i++) {
      if (puzzle[i] !== 0) {
        if (puzzle[i] === solution[i]) {
          correctAnswers.push(i);
        }
        if (puzzle[i] !== solution[i]) {
          wrongAnswers.push(i);
        }
      }
    }

    this.setState({
      selectedCell: null,
      cellIndex: 0,
      correctAnswers: correctAnswers,
      wrongAnswers: wrongAnswers
    });
    console.log(correctAnswers);
    console.log(wrongAnswers);
  }

  render() {
    return (
      <div className="appView">
        {this.state.isLoading ? (
          "loading"
        ) : (
          <div className="gameBoard">
            <div className="grid">
              <div className="cellContainer">{this.renderCells(0)}</div>
              <div className="cellContainer">{this.renderCells(1)}</div>
              <div className="cellContainer">{this.renderCells(2)}</div>
            </div>
            <div className="grid">
              <div className="cellContainer">{this.renderCells(3)}</div>
              <div className="cellContainer">{this.renderCells(4)}</div>
              <div className="cellContainer">{this.renderCells(5)}</div>
            </div>
            <div className="grid">
              <div className="cellContainer">{this.renderCells(6)}</div>
              <div className="cellContainer">{this.renderCells(7)}</div>
              <div className="cellContainer">{this.renderCells(8)}</div>
            </div>
          </div>
        )}

        <div>
          <button value={1} onClick={this.changeNumber}>
            1
          </button>
          <button value={2} onClick={this.changeNumber}>
            2
          </button>
          <button value={3} onClick={this.changeNumber}>
            3
          </button>
          <button value={4} onClick={this.changeNumber}>
            4
          </button>
          <button value={5} onClick={this.changeNumber}>
            5
          </button>
          <button value={6} onClick={this.changeNumber}>
            6
          </button>
          <button value={7} onClick={this.changeNumber}>
            7
          </button>
          <button value={8} onClick={this.changeNumber}>
            8
          </button>
          <button value={9} onClick={this.changeNumber}>
            9
          </button>
        </div>

        <div>
          <button onClick={this.checkProgress}>Check progress</button>
        </div>
      </div>
    );
  }
  //border style
  renderBorders(i) {
    if (
      i === 0 ||
      i === 3 ||
      i === 6 ||
      i === 27 ||
      i === 30 ||
      i === 33 ||
      i === 54 ||
      i === 57 ||
      i === 60
    ) {
      return { borderLeft: "3px solid red", borderTop: "3px solid red" };
    }
    if (
      i === 1 ||
      i === 4 ||
      i === 7 ||
      i === 28 ||
      i === 31 ||
      i === 34 ||
      i === 55 ||
      i === 58 ||
      i === 61
    ) {
      return { borderTop: "3px solid red" };
    }
    if (
      i === 2 ||
      i === 5 ||
      i === 8 ||
      i === 29 ||
      i === 32 ||
      i === 35 ||
      i === 56 ||
      i === 59 ||
      i === 62
    ) {
      return { borderTop: "3px solid red", borderRight: "3px solid red" };
    }
    if (
      i === 9 ||
      i === 12 ||
      i === 15 ||
      i === 36 ||
      i === 39 ||
      i === 42 ||
      i === 63 ||
      i === 66 ||
      i === 69
    ) {
      return { borderLeft: "3px solid red" };
    }
    if (
      i === 11 ||
      i === 14 ||
      i === 17 ||
      i === 38 ||
      i === 41 ||
      i === 44 ||
      i === 59 ||
      i === 65 ||
      i === 68 ||
      i === 71
    ) {
      return { borderRight: "3px solid red" };
    }
    if (
      i === 18 ||
      i === 21 ||
      i === 24 ||
      i === 45 ||
      i === 48 ||
      i === 51 ||
      i === 72 ||
      i === 75 ||
      i === 78
    ) {
      return { borderLeft: "3px solid red", borderBottom: "3px solid red" };
    }
    if (
      i === 19 ||
      i === 22 ||
      i === 25 ||
      i === 46 ||
      i === 49 ||
      i === 52 ||
      i === 73 ||
      i === 76 ||
      i === 79
    ) {
      return { borderBottom: "3px solid red" };
    }
    if (
      i === 20 ||
      i === 23 ||
      i === 26 ||
      i === 47 ||
      i === 50 ||
      i === 53 ||
      i === 74 ||
      i === 77 ||
      i === 80
    ) {
      return { borderBottom: "3px solid red", borderRight: "3px solid red" };
    }
  }
}

export default App;
