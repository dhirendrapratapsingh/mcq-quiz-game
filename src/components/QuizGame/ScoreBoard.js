import React from "react";

import "../../style/QuizGame/ScoreBoard.css";
import "../../style/QuizGame/QuizGameBoard.css";

function getEmoji(props) {
  let emoji = null;

  if (props.questionCorrectlySolved === 0) {
    emoji = "🤢🤮";
  } else if (props.questionCorrectlySolved === 1) {
    emoji = "🥺";
  } else if (props.questionCorrectlySolved === 2) {
    emoji = "😶";
  } else if (props.questionCorrectlySolved === 3) {
    emoji = "🙄🥱";
  } else if (props.questionCorrectlySolved === 4) {
    emoji = "🤔";
  } else if (props.questionCorrectlySolved === 5) {
    emoji = "😵🥴";
  } else if (props.questionCorrectlySolved === 6) {
    emoji = "🙃🐒";
  } else if (props.questionCorrectlySolved === 7) {
    emoji = "🤓🤭";
  } else if (props.questionCorrectlySolved === 8) {
    emoji = "😉🤩";
  } else if (props.questionCorrectlySolved === 9) {
    emoji = "🤑🐱‍🏍";
  } else if (props.questionCorrectlySolved === 10) {
    emoji = "😱🦄😎";
  }
  return emoji;
}

export default function scoreBoard (props){
  const emoji = getEmoji(props);

  return (
    <div>
      <div className={"score"}>
        Score: {emoji} {props.questionCorrectlySolved}/{props.totalQuestionsSolved}
      </div>

      <div className={"quizGameBtnGrp"}>
        <button className={"submitBtn"} onClick={props.refresh}>
          👍 Play Again
        </button>
        <button className={"submitBtn"} onClick={props.goBackToMainMenu}>
          🚁 Main Menu
        </button>
      </div>
    </div>
  );
};
