import React, {Component} from 'react';
import Board from './Board';
import './Game.css';
import calculateWinner from './helpers';

class Game extends Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill(null)
            }],
            stepNumber: 0,
            xIsNext: true
        }
    }

    handleClick (i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';

        // const pos = current.pos.slice();
        // pos.y = Math.floor(i/3);
        // pos.x = Math.floor(i-pos.y*3);

        this.setState({
            history: history.concat([{
                squares: squares,
                // pos: pos
            }]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext
        });
    }

    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0
        });
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);

        // const pos = current.pos.slice();
        // pos.y = Math.floor(i/3);
        // pos.x = Math.floor(i-pos.y*3);

        const moves = history.map((step, move) => {

            var x = 0, y = 0;
            y = Math.floor((move-1)/3);
            x = Math.floor((move-1)-y*3);

            const desc = move ?
                `Go to move #${move}, pos(${x}, ${y})` :
                'Go to game start';
            return (
                <li key={move}>
                    <button onClick={() => this.jumpTo(move)}>{desc}</button>
                </li>
            );
        });

        let status;
        if (winner) {
            status = 'Winner: ' + winner;
        } else {
            status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        }

        return (
            <div className="game">
                <div className="game-board">
                    <Board squares={current.squares}
                        onClick={(i) => this.handleClick(i)} />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <ol>{moves}</ol>
                </div>
            </div>
        );
    }
}

export default Game;