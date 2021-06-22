import React from "react";
import Subtitle from "../Global/Subtitle";

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
        
      </div>
      <div className={"QuizCard-container"}>
        <div className={"QuizCard-title"} style={{textAlign:'center'}}>
            Score: {emoji} {props.questionCorrectlySolved}/{10}
        </div>
        <form className={"QuizCard-form "}>
            {props.correctAnswers.length ? (
              <div id="answerContainer">
                <div className="answerRow heading">
                  <label>Your Answer</label>
                  <label>Correct Answer</label>
                </div>
                {props.correctAnswers.map((ans,index)=>(
                  <div className="answerRow" key={index}>
                    <label className={props.yourAnswers[index] === ans ? "correct": "incorrect"}>
                        {typeof props.yourAnswers[index] === "string" ? props.yourAnswers[index] : "Not answered"}
                    </label>
                    <label className="">{ans}</label>
                  </div>
                ))}
              </div>
            ):(
              <Subtitle text="Loading result..."/>
            )}
        </form>

      </div>

      <div className={"quizGameBtnGrp"}>
        <button className={"primaryBtn"} onClick={props.goBackToMainMenu}>
          🚁 Play Again
        </button>
      </div>
    </div>
  );
};
