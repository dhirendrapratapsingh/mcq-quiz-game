import React from "react";

import "../../style/LandingPage/Popup.css";

export default class Popup extends React.Component {



  showQuizGame = (difficultyLevel)=>{
    this.props.showQuizGame(difficultyLevel);
  }

  render() {
    return (
      <div className={"popup"}>
        <div className={"popupContainer"}>
          <div className={"popupDialog"}>
            
            <span >💪 Select Difficulty level</span>
            <button
              className={"closeBtn"}
              onClick={() => this.props.closePopup("")}>
              ❌
            </button>
            <div className={"btnGrp"}>
              <button
                className={"difficultyBtn"}
                onClick={this.showQuizGame.bind(this,'easy')}
              >
                🤓Easy
              </button>
              <button
                className={"difficultyBtn"}
                onClick={this.showQuizGame.bind(this,'easy')}
              >
                🧐Medium
              </button>
              <button
                className={"difficultyBtn"}
                onClick={this.showQuizGame.bind(this,'easy')}
              >
                😎Hard
              </button>
            </div>
          </div>
          
        </div>
      </div>
    );
  }
}
