import React from "react";

const ProgressBar = (props) => {
  const { completed } = props;

  let bgcolor = null;

  if (completed <= 20) {
    bgcolor = "#ff0000";
  } else if (completed > 20 && completed <= 50) {
    bgcolor = "#ff4500";
  } else if (completed > 50 && completed <= 70) {
    bgcolor = "#ffa500";
  } else if (completed > 70 && completed <= 90) {
    bgcolor = "#0be586";
  } else {
    bgcolor = "#00ff00";
  }


  //We can give give inline styls as objects to component' style attrivute. Just a demo of that. This has highest specificity

  const containerStyles = {
    height: "1.5rem",
    width: "30rem",
    backgroundColor: "#e0e0de",
    borderRadius: "1rem",
    margin: "20px 10px 0px 10px"
  };

  const fillerStyles = {
    height: "inherit",
    width: `${completed}%`,
    backgroundColor: bgcolor,
    borderRadius: "inherit",
  };

  const labelStyles = {
    color: "white",
    fontWeight: "bold",
    marginLeft: '10px'
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div style={containerStyles}>
        <div style={fillerStyles}>
          <span style={labelStyles}>{`${completed}%`}</span>
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
