import React from "react";

import "../../style/Global/Subtitle.css";

export default function subtitle(props){
  return (
    <div>
      <h1 className={"subtitle"} style={{color : props.isBlack? "gray" : "white" }} >{props.text}</h1>
    </div>
  );
};
