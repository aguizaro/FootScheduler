import React from "react";
import "../css/index.css";

const Home = () => {
  return (
    <div className="inner-container">
      <h1>
        Create a <span className="title">Football Schedule</span>
      </h1>
      <div className="content">
        <p>
          This site allows you to select your favorite football teams, players,
          leagues, and tournaments and create a schedule of upcoming games. This
          schedule can be exported to google clanedar, pdf, and more.
        </p>
        <p>Click the 'Schedule' link in the navbar to get started!</p>
        <br />
      </div>
    </div>
  );
};

export default Home;
