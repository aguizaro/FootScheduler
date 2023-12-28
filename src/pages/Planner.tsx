import React from "react";
import Survey from "../components/Survey";

const Planner = () => {
  return (
    <div className="inner-container">
      <h1 className="title">My Planner</h1>
      <div className="content">
        <p>
          Please select your favorite football teams and leagues to follow. You
          can select as many teams and leagues as you want and we will create a
          schedule of upcoming games for you.
        </p>
        <Survey />
      </div>
    </div>
  );
};

export default Planner;
