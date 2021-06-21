import React from "react";

import "../../style/Global/Headline.css";

 const heading = (props) => {
  return (
    <div className="flotingTitle">
      <h1 className={"headline"}>{props.text}</h1>
    </div>
  );
};
export default heading;
