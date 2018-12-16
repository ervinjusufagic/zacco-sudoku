import React, { Component } from "react";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);

    this.handleSelectedCell = this.handleSelectedCell.bind(this);
    this.changeNumber = this.changeNumber.bind(this);
    this.checkProgress = this.checkProgress.bind(this);
    this.chooseDifficulty = this.chooseDifficulty.bind(this);
    this.splitPuzzle = this.splitPuzzle.bind(this);
    this.solve = this.solve.bind(this);
  }
  state = {
    puzzles: [],
    currentPuzzle: [],
    solution: [],
    rows: [],
    easyPuzzles: [],
    mediumPuzzles: [],
    hardPuzzles: [],
    wrongAnswers: [],
    correctAnswers: [],
    cellIndex: 0,
    selectedCell: null,
    isLoading: true,
    haveWon: false
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
          puzzles: responseJson.puzzles
          //puzzle: responseJson.puzzles[0],
          //solution: responseJson.puzzles[0].solution
        });
        this.orderByDifficulty();
        console.log(responseJson);
      })

      .catch(error => {
        console.error(error);
      });
  }

  orderByDifficulty() {
    for (let i = 0; i < this.state.puzzles.length; i++) {
      if (this.state.puzzles[i].difficulty === "easy") {
        this.setState({
          easyPuzzles: [...this.state.easyPuzzles, this.state.puzzles[i]]
        });
      }
      if (this.state.puzzles[i].difficulty === "medium") {
        this.setState({
          mediumPuzzles: [...this.state.mediumPuzzles, this.state.puzzles[i]]
        });
      }
      if (this.state.puzzles[i].difficulty === "hard") {
        this.setState({
          hardPuzzles: [...this.state.hardPuzzles, this.state.puzzles[i]]
        });
      }
    }
  }

  splitPuzzle() {
    const rows = [[], [], [], [], [], [], [], [], []];

    rows[0].push(this.state.currentPuzzle.slice(0, 9));
    rows[1].push(this.state.currentPuzzle.slice(9, 18));
    rows[2].push(this.state.currentPuzzle.slice(18, 27));
    rows[3].push(this.state.currentPuzzle.slice(27, 36));
    rows[4].push(this.state.currentPuzzle.slice(36, 45));
    rows[5].push(this.state.currentPuzzle.slice(45, 54));
    rows[6].push(this.state.currentPuzzle.slice(54, 63));
    rows[7].push(this.state.currentPuzzle.slice(63, 72));
    rows[8].push(this.state.currentPuzzle.slice(72, 81));

    this.setState({
      rows: rows,
      isLoading: false,
      cellIndex: 0
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

  //actionhandlers
  handleSelectedCell(event) {
    this.state.selectedCell = event.target.value;
  }

  changeNumber(event) {
    let oldnumbers = this.state.currentPuzzle;
    let updatedNumbers;

    oldnumbers[this.state.selectedCell] = parseInt(event.target.value);

    updatedNumbers = oldnumbers;

    this.splitPuzzle();

    this.setState({
      selectedCell: null,
      cellIndex: 0,
      oldnumbers: updatedNumbers
    });
  }

  checkProgress() {
    let puzzle = this.state.currentPuzzle;
    let solution = this.state.solution;
    let wrongAnswers = [];
    let correctAnswers = [];
    let haveWon = false;

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

    if (correctAnswers.length === 81) {
      haveWon = true;
    }

    this.setState({
      selectedCell: null,
      cellIndex: 0,
      correctAnswers: correctAnswers,
      wrongAnswers: wrongAnswers,
      haveWon: haveWon
    });
  }

  solve() {
    this.setState(
      {
        currentPuzzle: this.state.solution,
        selectedCell: null,
        cellIndex: 0
      },
      () => this.splitPuzzle()
    );
  }

  chooseDifficulty(event) {
    this.setState(
      {
        isLoading: true,
        difficulty: event.target.value
      },
      () => {
        if (this.state.difficulty === "easy") {
          let index = Math.floor(
            Math.random() * Math.floor(this.state.easyPuzzles.length)
          );
          this.setState(
            {
              currentPuzzle: this.state.easyPuzzles[index].puzzle,
              solution: this.state.easyPuzzles[index].solution,
              correctAnswers: [],
              wrongAnswers: [],
              cellIndex: 0,
              haveWon: false
            },
            () => this.splitPuzzle()
          );
        }
        if (this.state.difficulty === "medium") {
          let index = Math.floor(
            Math.random() * Math.floor(this.state.mediumPuzzles.length)
          );
          this.setState(
            {
              currentPuzzle: this.state.mediumPuzzles[index].puzzle,
              solution: this.state.mediumPuzzles[index].solution,
              correctAnswers: [],
              wrongAnswers: [],
              cellIndex: 0,
              haveWon: false
            },
            () => this.splitPuzzle()
          );
        }
        if (this.state.difficulty === "hard") {
          let index = Math.floor(
            Math.random() * Math.floor(this.state.hardPuzzles.length)
          );
          this.setState(
            {
              currentPuzzle: this.state.hardPuzzles[index].puzzle,
              solution: this.state.hardPuzzles[index].solution,
              correctAnswers: [],
              wrongAnswers: [],
              cellIndex: 0,
              haveWon: false
            },
            () => this.splitPuzzle()
          );
        }
      }
    );
  }

  render() {
    return (
      <div className="appView">
        {this.state.isLoading ? (
          <span className="welcomeText">
            Select a difficulty to start a game.
          </span>
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

        <div className="numberBtnContainer">
          <button
            className="numberBtn"
            value={1}
            onClick={this.changeNumber}
            hidden={this.state.difficulty === undefined ? true : false}
          >
            1
          </button>
          <button
            className="numberBtn"
            value={2}
            onClick={this.changeNumber}
            hidden={this.state.difficulty === undefined ? true : false}
          >
            2
          </button>
          <button
            className="numberBtn"
            value={3}
            onClick={this.changeNumber}
            hidden={this.state.difficulty === undefined ? true : false}
          >
            3
          </button>
          <button
            className="numberBtn"
            value={4}
            onClick={this.changeNumber}
            hidden={this.state.difficulty === undefined ? true : false}
          >
            4
          </button>
          <button
            className="numberBtn"
            value={5}
            onClick={this.changeNumber}
            hidden={this.state.difficulty === undefined ? true : false}
          >
            5
          </button>
          <button
            className="numberBtn"
            value={6}
            onClick={this.changeNumber}
            hidden={this.state.difficulty === undefined ? true : false}
          >
            6
          </button>
          <button
            className="numberBtn"
            value={7}
            onClick={this.changeNumber}
            hidden={this.state.difficulty === undefined ? true : false}
          >
            7
          </button>
          <button
            className="numberBtn"
            value={8}
            onClick={this.changeNumber}
            hidden={this.state.difficulty === undefined ? true : false}
          >
            8
          </button>
          <button
            className="numberBtn"
            value={9}
            onClick={this.changeNumber}
            hidden={this.state.difficulty === undefined ? true : false}
          >
            9
          </button>
        </div>

        <div className="actionBtnContainer">
          <button
            className="actionBtn"
            onClick={this.checkProgress}
            hidden={this.state.difficulty === undefined ? true : false}
          >
            Check progress
          </button>
        </div>

        <div className="difficulty">
          <div className="difficultyLbl">
            <label>
              {this.state.haveWon
                ? "Congratulations! Choose a difficulty to play again!"
                : "Difficulty:"}
            </label>
          </div>

          <div className="difficultyBtnContainer">
            <button
              style={
                this.state.difficulty === "easy"
                  ? { backgroundColor: "green" }
                  : { backgroundColor: "white" }
              }
              value="easy"
              className="actionBtn"
              onClick={this.chooseDifficulty}
            >
              EASY
            </button>

            <button
              style={
                this.state.difficulty === "medium"
                  ? { backgroundColor: "yellow" }
                  : { backgroundColor: "white" }
              }
              value="medium"
              className="actionBtn"
              onClick={this.chooseDifficulty}
            >
              MEDIUM
            </button>
            <button
              style={
                this.state.difficulty === "hard"
                  ? { backgroundColor: "red" }
                  : { backgroundColor: "white" }
              }
              value="hard"
              className="actionBtn"
              onClick={this.chooseDifficulty}
            >
              HARD
            </button>
          </div>
          <div>
            <button
              className="actionBtn"
              hidden={this.state.difficulty === undefined ? true : false}
              onClick={this.solve}
            >
              Solve sudoku
            </button>
          </div>
        </div>
      </div>
    );
  }
  //styling

  cellColor(cellIndex) {
    for (let i = 0; i < this.state.wrongAnswers.length; i++) {
      if (cellIndex === this.state.wrongAnswers[i] + 1) {
        return { backgroundColor: "red" };
      }
    }

    if (this.state.haveWon) {
      for (let i = 0; i < this.state.correctAnswers.length; i++) {
        return { backgroundColor: "green" };
      }
    }
  }

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
