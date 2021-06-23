import { useState, useEffect, Component, useRef } from "react";
import Loader from "react-loader-spinner";
import shortid from "shortid";
import shuffle from "../../utils/shuffle";
import Subtitle from "../Global/Subtitle";
import ProgressBar from "./ProgressBar";
import QuizGameBoard from "./QuizGameBoard";
import ScoreBoard from "./ScoreBoard";
import axios from 'axios'


const Timer = (props) => { //a separate component to show passed time for modularity avoid useless update

    const { initialMinute = 0, initialSeconds = 0 } = props;
    const [minutes, setMinutes] = useState(initialMinute);
    const [seconds, setSeconds] = useState(initialSeconds);
    const secs = useRef(0);

    useEffect(() => {

        let secondsInterval = setInterval(() => {
            setSeconds(seconds => {
               
                return parseInt((seconds + 1) % 60);
            });
        }, 1000);

        let minutesInterval = setInterval(() => {
            secs.current = secs.current + 1;
            if (secs.current === 600) {
                props.completeQuiz();
            }
            setMinutes(parseInt((secs.current) / 60));

        }, 1000);

        return () => {
            clearInterval(secondsInterval);
            clearInterval(minutesInterval);
        };
    });

    return (
        <div>
          
            <div className="passedTimeContainer">
                <span>{props.cateory} {'\u00A0'}</span>
                <span className="timer" style={{ display: props.hideTime ? "none" : "block" }}>Time : {'\u00A0'}
                    <span id="minutes">{minutes}</span> minute(s)
                    <span id="seconds">{seconds}</span> seconds.
                </span>
            </div>
           
        </div>
       
    )
}


export default class QuizGame extends Component {

    constructor(props) {
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
            mode: 'online'
        };
    }

    componentDidMount() {

        const categoryNum = this.props.categoryDetails.id;
        const difficulty = this.props.difficulty;
        let retrievedData ={};

        axios.get(`https://opentdb.com/api.php?amount=10&category=${categoryNum}&difficulty=${difficulty}&type=multiple`)
            .then(res => {

                let results = res.data.results;
                let QAndA, options, correctAnswerSequence = [];
                let QAndAsequence = results.map((item) => {
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

                this.setState({
                    QAndAsequence: QAndAsequence,
                    currentQandA: QAndAsequence[0],
                    correctAnswerSequence: correctAnswerSequence,
                    isLoading: false
                });

                retrievedData.QAndAsequence = QAndAsequence;
                retrievedData.correctAnswerSequence = correctAnswerSequence;
                localStorage.setItem('retrievedData',JSON.stringify(retrievedData));
            })
            .catch((err) => {
                console.warn('Could not retrieve data from API Last succesful quiz would be loaded');
                retrievedData = JSON.parse(localStorage.getItem('retrievedData'));

                if(retrievedData) {
                    
                    this.setState({
                        QAndAsequence: retrievedData.QAndAsequence,
                        currentQandA: retrievedData.QAndAsequence[0],
                        correctAnswerSequence: retrievedData.correctAnswerSequence,
                        isLoading: false,
                        mode: 'offline'
                    });
                }
                else{
                    this.setState({
                        mode: 'offline'
                    });
                }

            });

    }

    updateQuestion = (event) => {

        let newIndex = event.target.name === "nextButton" ? this.state.currentIndex + 1 : this.state.currentIndex - 1;
        this.setState({
            currentIndex: newIndex,
            currentQandA: this.state.QAndAsequence[newIndex]
        });
    }


    recordAndCheckAnswer = (answer, questionIndex) => {

        let AnswerSequence = this.state.AnswerSequence;
        let correctOrNotSequence = this.state.correctOrNotSequence;
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

        stateObj.AnswerSequence = AnswerSequence;
        stateObj.totalQuestionsSolved = AnswerSequence.reduce((ctr, item) => {
            ctr = typeof item === "string" ? ctr + 1 : ctr;
            return ctr;
        }, 0);

        this.setState(stateObj);

        if (stateObj.totalQuestionsSolved === 10) {
            this.completeQuiz();
        }
    }

    completeQuiz = () => {

        let score = this.state.correctOrNotSequence.reduce((score, isCorrect) => {
            return isCorrect ? score + 1 : score;
        }, 0);

        this.setState({
            showScoreBoard: true,
            score: score
        });
    }

    render() {

        let previouslySelectedAnswer = this.state.AnswerSequence[this.state.currentIndex] || "";
        //console.log(this.state);

        const boardToShow = (this.state.currentQandA && !this.state.showScoreBoard) ? (  //TODO: make 10 a state value 
            <div>
                <QuizGameBoard
                    totalQuestionsSolved={this.state.totalQuestionsSolved}
                    quizQuestion={this.state.currentQandA.question}
                    quizOptions={this.state.currentQandA.options}
                    previouslySelectedAnswer={previouslySelectedAnswer}
                    recordAndCheckAnswer={this.recordAndCheckAnswer}
                    questionNumber={this.state.currentIndex + 1}
                    currentIndex={this.state.currentIndex}
                />

                <div className={"quizGameBtnGrp"}>
                    <button className={this.state.currentIndex === 0 ? "disabled primaryBtn" : "primaryBtn"} name="previousButton" onClick={this.updateQuestion}>
                        previous
                    </button>
                    <button className={this.state.currentIndex === 9 ? "disabled primaryBtn" : "primaryBtn"} name="nextButton" onClick={this.updateQuestion}>
                        next
                    </button>
                </div>

            </div>
        ) :
            (
                <ScoreBoard
                    questionCorrectlySolved={this.state.score}
                    totalQuestionsSolved={this.state.totalQuestionsSolved}
                    goBackToMainMenu={this.props.goBackToMainMenu}
                    yourAnswers={this.state.AnswerSequence}
                    correctAnswers={this.state.correctAnswerSequence}
                    QAndAsequence={this.state.QAndAsequence}
                />
            );

        const contentToShow = !this.state.isLoading ? (
            <div>
                <Timer initialMinute={0} initialSeconds={0}
                    cateory={this.props.categoryDetails.categoryLabel}
                    completeQuiz={this.completeQuiz}
                    hideTime={this.state.showScoreBoard} />

                {boardToShow}
            </div>

        ) :
            (
                <div>
                    <div style={{ marginTop: "10rem" }}>
                        <Subtitle text={"🐱‍🏍 Loading questions..."} />
                        <br />
                        <div style={{width: '100px',margin: 'auto'}}>
                            <Loader type="TailSpin" color="#7d4bc3" height={90} width={90} />
                        </div>
                        
                    </div>
                </div>
            );

        return (

            <div className="quizContnr">
                <div style={{ textAlign: "center",color: '#9F6000',backgroundColor: '#FEEFB3' }}>
                {
                    this.state.mode === 'offline'?
                    <label>You are in offline mode, check Internet connectivity</label>:
                    null
                }
                </div>
                <ProgressBar completed={this.state.totalQuestionsSolved * 10} />
                {contentToShow}
            </div>
        )
    }
}
