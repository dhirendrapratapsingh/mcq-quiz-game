import React from "react";
import { useEffect, useState } from "react";

import "../../style/QuizGame/QuizGameBoard.css";


const QuizGameBoard = function QuizQuestionBoard (props) {

  const [options, setOptions]= useState([]);

  const sendAnswer = (optionText)=>{
    props.recordAndCheckAnswer(optionText);
  }


  useEffect(()=>{

      console.log(props.previouslySelectedAnswer)
      let optionsArr = props.quizOptions.map((optionText, index) => (
          <label className={"rad-label"} key={index} id={index}>
            <input type="radio"  className="rad-input" id={optionText} name='question' value={optionText} checked={props.previouslySelectedAnswer === optionText? true : false} onChange={()=>sendAnswer(optionText)}  />
            <div className="rad-design"></div>
            <label htmlFor={optionText} className="rad-text">{index+1 + ' : ' + optionText}</label>
          </label>

        ));
        setOptions(optionsArr);

  },[ props]);

  return (
    <div>
      <div className={"QuizCard-container"}>

        <div className={"QuizCard-title"}>Question  {props.questionNumber}: {props.quizQuestion}</div>
        <form className={"QuizCard-form "}>
            {options}
        </form>

      </div>
    </div>
  );
}
//);

export default QuizGameBoard;