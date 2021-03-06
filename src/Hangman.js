import React, { Component } from "react";
import "./Hangman.css";
import Input from "./Input";
import img0 from "./0.jpg";
import img1 from "./1.jpg";
import img2 from "./2.jpg";
import img3 from "./3.jpg";
import img4 from "./4.jpg";
import img5 from "./5.jpg";
import img6 from "./6.jpg";

class Hangman extends Component {
  /** by default, allow 6 guesses and use provided gallows images. */
  static defaultProps = {
    maxWrong: 6,
    images: [img0, img1, img2, img3, img4, img5, img6],
  };

  constructor(props) {
    super(props);
    this.state = {
      guessedWord: [],
      nWrong: 0,
      guessed: new Set(),
      mode: "input",
      answer: "apple",
    };
    this.handleGuess = this.handleGuess.bind(this);
  }

  /** guessedWord: show current-state of word:
    if guessed letters are {a,p,e}, show "app_e" for "apple"
  */
  guessedWord() {
    let arr = this.state.answer.split("");
    return arr.map((ltr) => {
      return this.state.guessed.has(ltr) ? ltr : ltr === " " ? " " : "_";
    });
  }

  /** handleGuest: handle a guessed letter:
    - add to guessed letters
    - if not in answer, increase number-wrong guesses
  */
  handleGuess(evt) {
    let ltr = evt.target.value;

    this.setState((st) => ({
      guessedWord: [...st.guessedWord, ltr],
      guessed: st.guessed.add(ltr),
      nWrong: st.nWrong + (st.answer.includes(ltr) ? 0 : 1),
    }));
  }

  /** generateButtons: return array of letter buttons to render */
  generateButtons() {
    return "abcdefghijklmnopqrstuvwxyz".split("").map((ltr) => (
      <button
        value={ltr}
        key={ltr}
        onClick={this.handleGuess}
        disabled={this.state.guessed.has(ltr)}
      >
        {ltr}
      </button>
    ));
  }

  reset = () => {
    this.setState({
      guessedWord: [],
      nWrong: 0,
      guessed: new Set(),
      mode: "input",
      answer: "apple",
    });
  };

  onHandleSubmit = (e) => {
    this.setState({
      answer: e.toLowerCase(),
      mode: "hangman",
    });
  };

  /** render: render game */
  render() {
    let gameOver = this.state.nWrong >= this.props.maxWrong;
    const gameWon = this.guessedWord().join("") === this.state.answer;

    if (this.state.mode === "input") {
      return <Input onSubmit={this.onHandleSubmit} />;
    } else {
      return (
        <div className="Hangman">
          <h1>Hangman</h1>
          <img
            src={this.props.images[this.state.nWrong]}
            alt={`${this.state.nWrong}/${this.props.maxWrong}`}
          />
          <p>Number of incorrect guesses : {this.state.nWrong}</p>

          <p className="Hangman-word">
            {!gameOver ? this.guessedWord() : this.state.answer}
          </p>

          {gameWon ? (
            <div>
              <h3>You Won</h3>
              <button id="button" onClick={this.reset}>
                Restart
              </button>
            </div>
          ) : (
            <div className="Hangman-btns">
              {!gameOver ? (
                this.generateButtons()
              ) : (
                <div>
                  <h3>You Lose</h3>
                  <button id="button" onClick={this.reset}>
                    Restart
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      );
    }
  }
}

export default Hangman;
