import React from "react";
import Subtitle from "../Global/Subtitle";

import "../../style/QuizGame/QuizGameBoard.css";


const QuizGameBoard = function QuizQuestionBoard(props) {

    const sendAnswer = (optionText) => {
        props.recordAndCheckAnswer(optionText, props.currentIndex);
    }

    return (
        <div>
            <div className={"QuizCard-container"}>

                <div className={"QuizCard-title"}>Question  {props.questionNumber}: {props.quizQuestion}</div>
                <form className={"QuizCard-form "}>
                    {props.quizOptions.length ? (
                        <div>
                            {props.quizOptions.map((optionText, index) => (
                            <label className={"rad-label"} key={index} id={index}>
                                <input type="radio" className="rad-input" id={optionText} name='question' value={optionText} checked={props.previouslySelectedAnswer === optionText ? true : false} onChange={() => sendAnswer(optionText)} />
                                <div className="rad-design"></div>
                                <label htmlFor={optionText} className="rad-text">{index + 1 + ' : ' + optionText}</label>
                            </label>))}
                        </div>
                    ):(
                        <Subtitle text="Loading MCQ options "/>
                    )}
                </form>

            </div>
        </div>
    );
}
//);

export default QuizGameBoard;