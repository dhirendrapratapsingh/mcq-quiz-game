## `Dependencies/Libraries used `

### `No heavy weightinging th application with Layout frameworks, icon libraries etc. Fully reponsive PWA with modurarized CSS  structure `

[React JS(UI)](https://reactjs.org/docs/getting-started.html),
[axios( http API Calls)](https://www.npmjs.com/package/axios),
[react-loader-spinner(to show Loader)](https://www.npmjs.com/package/react-loader-spinner),
[shortid(generate unique id's)](https://www.npmjs.com/package/shortid),


## `Steps to create Project & add all dependencies in Windows OS`

`Install nodejs npm ` <br>
From the step by step Guide described here [Installation of Node JS on Window](https://www.geeksforgeeks.org/installation-of-node-js-on-windows/)

Download full codebase with public & src folder<br>

using terminal cd to mcq-quiz-game then run npm start<br>
open http://localhost:3000/ to run app again.

## Problem Statemnet and basic Features

`Build a quiz game , The game should`
  - show some questions (MCQs) with single select or multi select options.
  - the questions and options can come from an API (you can use static jsons).
  - User should be able to go back and change my ans till the time player has not finished the game.
  - there should be a time limit to finish the game (once time is over player should not be allowed to attempt answering).
  - once test ends the game candidate should see the result with correct answers.

`While doing that you need to take care of few things.`

 1. How do you want to structure the app / options / UI - UX is totally up to your creativity.
 2. You need to handle basic pending / success / failure states. In real life we have PAI failures, slow internet, no internet... no results etc.
 3. App needs to be responsive.
 4. Also have all of this in .git folder with proper commit messages.
 
 `Note:` 
 1. Bonus points for a PWA   2. Bonus points for react 

#### I have made a [presentation video of this MCQ quiz PWA game](https://drive.google.com/file/d/1p4fIP5CIIxfEd0VRIaHlIWardjfk3ph1/view?usp=sharing) developed explainig how to play, all the features, codebase & progrssive web app features 


## Extra features implemented or points taken care of

- Used a real API https://opentdb.com/ to mak a real game fun to play & Addictive
- Gave a choice to player in which category he wants to play the quiz
- Added a Modal which tells player about the rules before game starts & lets him select difficulty level in vanilla CSS
- Used light-weight simple to use emoji's
- This game is a progressive web app, can run on any device with/without browsers, without/internet. Works Oflline
- Install & play
- Push Notifications enabled
- Fully responsive, supports, phone, i-pad, desktop viewports.
- Used React 17 having impeccable performance
- handled Error condition by enclosing Whole application tree in Error boundary HOC
- Implemented Modular coding structure, Code re-use techniques : used Subtitle comp in many places
  Whenever JSX got larger broke it into chunks or sub components
- Added Fallback UI to handle Loading/negative cases in all components
- Used lighter more relatable emmoji rather than icons library
- Added error handling and validation check practices

## Screeshots

Homepage of Quiz Categories to choose in which user wants to play : Different Viewports screenshots
![HomepageCategoriesDifferentViewports](https://user-images.githubusercontent.com/32532380/123013231-7640e980-d3e1-11eb-994b-fc9cb5769734.jpg)

Mobile & Ipad viewports
![HomepageCategoriesDifferentViewports2](https://user-images.githubusercontent.com/32532380/123013425-d3d53600-d3e1-11eb-9e5f-31d6d84bc924.jpg)

A Modal which tells player about the rules before game starts & lets him select difficulty level : Different Viewports screenshots
![Difficulty levelDialogViewPorts](https://user-images.githubusercontent.com/32532380/123013466-e6e80600-d3e1-11eb-9d2a-5e4921e07746.jpg)

Questions Board with appealable radio buttons & previous next navigation menu
![QuestionsBoardViewports](https://user-images.githubusercontent.com/32532380/123013712-58c04f80-d3e2-11eb-879c-4febeee08517.jpg)

Scoreborad tels score tells tells all answers given by him & correct answers along with the score
![ScoreBoardViewports](https://user-images.githubusercontent.com/32532380/123013883-ad63ca80-d3e2-11eb-9060-622d4ad837b1.jpg)

Added Loader, Error boundary, made this game a PWA which can even be layed offline
![Loader-ErrorBoundary-WorksOffline](https://user-images.githubusercontent.com/32532380/123014010-f025a280-d3e2-11eb-8b38-79c4eb7a8909.jpg)







