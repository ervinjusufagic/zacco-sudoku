import React, { Component } from "react";
import { Cell } from "./Cell";
class GameBoard extends Component {
  constructor(props) {
    super(props);

    this.state = { rows: [] };
    console.log(this.props);
  }

  componentWillMount() {
    this.setState({
      rows: this.props.rows
    });
    console.log(this.props);
  }

  renderCells(i) {
    let j = 0;
    return this.state.rows[i].map(row =>
      row.map(num => <Cell key={j++} number={num} />)
    );
  }

  render() {
    return (
      <div className="gameBoard">
        <div>{this.renderCells(0)}</div>
        <div>{this.renderCells(1)}</div>
        <div>{this.renderCells(2)}</div>
        <div>{this.renderCells(3)}</div>
        <div>{this.renderCells(4)}</div>
        <div>{this.renderCells(5)}</div>
        <div>{this.renderCells(6)}</div>
        <div>{this.renderCells(7)}</div>
        <div>{this.renderCells(8)}</div>
      </div>
    );
  }
}

export { GameBoard };
