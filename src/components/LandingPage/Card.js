import React from "react";

import "../../style/LandingPage/Card.css";

const card = (props) => {
  return (
    <div className={"card"} onClick={() => props.togglePopup(props.category, props.categoryDetails)}>
      {props.text}
    </div>
  );
};

export default card;
