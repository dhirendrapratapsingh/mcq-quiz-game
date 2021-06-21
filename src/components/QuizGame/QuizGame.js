import {useState, useEffect, Component, useRef } from "react";
import Loader from "react-loader-spinner";
import shortid from "shortid";
import shuffle from "../../utils/shuffle";
import Subtitle from "../Global/Subtitle";
import ProgressBar from "./ProgressBar";
import QuizGameBoard from "./QuizGameBoard";
import ScoreBoard from "./ScoreBoard";
import axios from 'axios'




const Timer = (props) => { //a separate component to show passed time for modularity avoid useless update

    const {initialMinute = 0,initialSeconds = 0} = props;
    const [minutes, setMinutes ] = useState(initialMinute);
    const [seconds, setSeconds ] =  useState(initialSeconds);
    const secs = useRef(0);
    
    useEffect(()=>{

        let secondsInterval = setInterval(() => {           
            setSeconds(seconds=>{
              if (seconds === 15) {
                props.completeQuiz();
              }
              return parseInt( (seconds+1)%60 ) ;
            });
        }, 1000);

        let minutesInterval = setInterval(() => {
            secs.current = secs.current+1;
            setMinutes( parseInt((secs.current)/60) );

      }, 1000);

        return ()=> {
            clearInterval(secondsInterval);
            clearInterval(minutesInterval);
          };
    },[]);

    return (
        <div className="passedTimeContainer">
          <span>{props.cateory} {'\u00A0'}</span>
          <span className="timer">Time : {'\u00A0'} 
              <span id="minutes">{minutes}</span> minute(s)
              <span id="seconds">{seconds}</span> seconds.
          </span>
        </div>
    )
}


export default class QuizGame extends Component {

  constructor(props){
    super(props);
    this.state = {
      isLoading: true,
      QAndAsequence: [],
      AnswerSequence: [],
      correctAnswerSequence: [],
      currentQandA: null,
      currentIndex: 0,
      score: 0,
      showScoreBoard: false,
      totalQuestionsSolved: 0,
      correctOrNotSequence: [],

    };
  }

  async componentDidMount() {

    const categoryNum = this.props.categoryDetails.id;
    const difficulty = this.props.difficulty;
    console.log(categoryNum,difficulty);

    axios.get(`https://opentdb.com/api.php?amount=10&category=${categoryNum}&difficulty=${difficulty}&type=multiple`)
        .then(res => {

            console.log(res);
            let results = res.data.results;
            let QAndA, options,correctAnswerSequence=[];
            let QAndAsequence = results.map((item)=>{
                QAndA = {};
                QAndA.question = item.question.replace(/&quot;/g, '\\"');
                options = [...item.incorrect_answers, item.correct_answer];
                options = shuffle(options);
                QAndA.options = options;
                QAndA.correctAnswer = item.correct_answer;
                QAndA.id = shortid.generate();
                correctAnswerSequence.push(item.correct_answer);

                return QAndA;

            });
            console.log(QAndAsequence);

            this.setState({
              QAndAsequence: QAndAsequence,
              currentQandA: QAndAsequence[0],
              correctAnswerSequence: correctAnswerSequence,
              isLoading: false
            });
        })
        .catch((err)=>{
          console.warn('Could not retrieve data from API');
        });

  }

  updateQuestion = (event)=>{

    let newIndex = event.target.name === "nextButton" ? this.state.currentIndex+1 : this.state.currentIndex -1;
    this.setState({currentIndex: newIndex,
        currentQandA: this.state.QAndAsequence[newIndex]});
  }


  recordAndCheckAnswer = (answer,questionIndex) => {

    let AnswerSequence = this.state.AnswerSequence ;
    let correctOrNotSequence = this.state.correctOrNotSequence ;
    let stateObj = this.state;
    console.log(questionIndex);

    AnswerSequence[this.state.currentIndex] = answer;

    if (answer === this.state.currentQandA.correctAnswer) {

        correctOrNotSequence[this.state.currentIndex] = true;
        stateObj.correctOrNotSequence = correctOrNotSequence;
    }
    else {
      correctOrNotSequence[this.state.currentIndex] = false;
      stateObj.correctOrNotSequence = correctOrNotSequence;
    
    }

    stateObj.AnswerSequence= AnswerSequence;
    stateObj.totalQuestionsSolved = AnswerSequence.reduce((ctr,item)=>{
      ctr = typeof item === "string"? ctr+1 : ctr;
      return ctr;
    },0);

    this.setState(stateObj);
  }

  completeQuiz = (event)=>{

    this.setState({showScoreBoard:true});
  }   

  render() {

    let previouslySelectedAnswer  = this.state.AnswerSequence[this.state.currentIndex] || "";
    console.log('rendered previouslySelectedAnswer is '+previouslySelectedAnswer);
    console.log(this.state);

    const boardToShow = (this.state.currentQandA !== null && this.state.totalQuestionsSolved < 10 && !this.state.showScoreBoard) ? (  //TODO: make 10 a state value 
      <div>
        <QuizGameBoard
          totalQuestionsSolved={this.state.totalQuestionsSolved}
          quizQuestion={this.state.currentQandA.question}
          quizOptions={this.state.currentQandA.options}
          previouslySelectedAnswer = {previouslySelectedAnswer}
          recordAndCheckAnswer={this.recordAndCheckAnswer}
          questionNumber ={this.state.currentIndex+1}
          currentIndex = {this.state.currentIndex}
        />

        <div className={"quizGameBtnGrp"}>
          <button className={this.state.currentIndex === 0 ? "disabled primaryBtn": "primaryBtn"} name="previousButton" onClick={this.updateQuestion}>
            previous
          </button>
          <button className={this.state.currentIndex === 9 ? "disabled primaryBtn": "primaryBtn"}  name="nextButton" onClick={this.updateQuestion}>
            next
          </button>
        </div>

      </div>  
    ):
    (
      <ScoreBoard
        questionCorrectlySolved={this.state.questionCorrectlySolved}
        totalQuestionsSolved={this.state.totalQuestionsSolved}
        goBackToMainMenu={this.props.goBackToMainMenu}
      />
    );

    const contentToShow = !this.state.isLoading ? (
      <div>
          <Timer initialMinute={0} initialSeconds={0}
          cateory={this.props.categoryDetails.categoryLabel}
          completeQuiz= {this.completeQuiz}/>
          {boardToShow}
      </div>
      
    ):
    (
      <div>
        <div style={{marginTop: "10rem"}}>
          <Subtitle text={"🐱‍🏍 Loading questions..."} />
          <br />
          <Loader type="TailSpin" color="#7d4bc3" height={90} width={90} />
        </div>
      </div>
    );
   
    return (

      <div className="quizContnr">
        <ProgressBar completed={this.state.totalQuestionsSolved * 10} />
         {contentToShow}
      </div>
    )
  }
}
