import React, { Component } from "react";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);

    this.handleSelectedCell = this.handleSelectedCell.bind(this);
    this.changeNumber = this.changeNumber.bind(this);
  }

  state = {
    puzzle: [],
    rows: [],
    solution: [],
    isLoading: true,
    selectedCell: null,
    cellIndex: 0
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
          puzzle: responseJson.puzzles[0],
          solution: responseJson.solution
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

  renderCells(i) {
    let j = 0;

    return this.state.puzzle.puzzle.map(row => (
      <div className="cell" key={j++}>
        <button
          value={this.state.cellIndex++}
          onClick={this.handleSelectedCell}
          className="cellBtn"
        >
          {row}
        </button>
      </div>
    ));
  }

  handleSelectedCell(event) {
    this.state.selectedCell = event.target.value;
    console.log(this.state.selectedCell);
  }

  changeNumber(event) {
    let oldnumbers = this.state.puzzle.puzzle;
    let updatedNumbers;

    oldnumbers[this.state.selectedCell] = event.target.value;
    updatedNumbers = oldnumbers;

    this.setState({
      selectedCell: null,
      cellIndex: 0,
      oldnumbers: updatedNumbers
    });
  }

  render() {
    return (
      <div className="appView">
        {this.state.isLoading ? (
          "loading"
        ) : (
          <div className="gameBoard">{this.renderCells()}</div>
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
      </div>
    );
  }
}

export default App;
