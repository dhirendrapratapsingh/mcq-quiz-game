import React from "react";

import Card from "./Card";
import Popup from "./Popup";
import Headline from "../Global/Headline";
import Subtitle from "../Global/Subtitle";
import QuizGame from "../QuizGame/QuizGame";
import ErrorBoundary from "./ErrorBoundary";

import "../../style/LandingPage/LandingPage.css";

export default class LandingPage extends React.Component {
  constructor() {
    super();
    this.state = {   
        displayQuizGame: false, // No: false, Yes: true
        showPopup: false,
        category: null,
        categoryDetails : null,
        difficulty: null,
        categoryArray : []
    }
  }

  componentDidMount() {
    //We are interested to test player's knowledge in specifc domains
    const categories = [{
      categoryName: "gk",
      categoryLabel: "📚 General Knowledge",
      id: 9
    },
    {
      categoryName: "sci&nat",
      categoryLabel: "🧪 Science & Nature",
      id: 17
    },
    {
      categoryName: "comp",
      categoryLabel: "💻 Computers",
      id: 18
    },
    {
      categoryName: "hist",
      categoryLabel: "👴 History",
      id: 23
    },
    {
      categoryName: "geo",
      categoryLabel: "🌎 Geography",
      id: 22
    },
    {
      categoryName: "politics",
      categoryLabel: "👨‍⚖️ Politics",
      id: 24
    },
    {
      categoryName: "sports",
      categoryLabel: "⚽ Sports",
      id: 21
    },
    {
      categoryName: "vehicles",
      categoryLabel: "🚗 Vehicles",
      id: 28
    },
    {
      categoryName: "electronics",
      categoryLabel: "📲 Electronic gadgets",
      id: 30
    }]

    this.setState({categoryArray: categories});


  }


  // Choose difficulty from the Popup
  togglePopup = (category , categoryDetails) => {        //togglePopup is passed as props & invoked from child comp Card

    this.setState((prevState) => ({
      category: category,                               //currently category is selected category received from card
      categoryDetails: categoryDetails,
      showPopup: !prevState.showPopup
    }));
  };

  // Show quiz game once the category & difficulty is selected
  showQuizGame = (difficulty) => {
    console.log(this.state.category)
    if (difficulty) {
      this.setState({
        difficulty: difficulty,
        displayQuizGame: true
      });
    }
    else{
      console.warn('Difficulty level not selected')
    }

  };

  goBackToMainMenu = () => {
    this.setState({
      showPopup: false,
      displayQuizGame: false,
    });
  };

 

  render() {

    return (
      <div>
        <ErrorBoundary>
      
          {this.state.displayQuizGame ? null : (
            <Headline text={"MCQ Quiz Game"} />
          )}

          {this.state.displayQuizGame ? (
              <QuizGame
                category={this.state.category}
                categoryDetails= {this.state.categoryDetails}
                difficulty={this.state.difficulty}
                displayQuizGame={this.state.displayQuizGame}
                goBackToMainMenu={this.goBackToMainMenu}
              />
          ) : 
          (
            <div id="CategoriesContainer">
              <Subtitle text="Select MCQ category in which you want to test your knowledge"/>

              <hr />

              <div className={"category-grid"}>

                {this.state.categoryArray ? (
                  this.state.categoryArray.map((categoryItem)=>(
                    <Card
                      togglePopup={this.togglePopup}
                      category={categoryItem.categoryName}
                      text={categoryItem.categoryLabel}
                      key={categoryItem.id}
                      id={categoryItem.id}
                      categoryDetails={categoryItem}
                    />
                  ))
                ) : <h3> {"Categories are loading"} </h3>}

              </div>

              {this.state.showPopup ? (
                <Popup
                  text={"popup"}
                  showQuizGame={this.showQuizGame}
                  closePopup={this.togglePopup}
                />
              ) : null}

            </div>
          )}

        </ErrorBoundary>
      </div>

      

    );
  }
}
