import React from "react";
import App from "../components/App";
import "../css/index.css";

const Home: React.FC = () => {
  return (
    <div className="inner-container">
      <h1>
        Welcome to <span className="title">Foot Scheduler</span>
      </h1>
      <div className="content">
        <p>
          This site allows you to select your favorite football teams, players,
          leagues, and tournaments and create a schedule of upcoming games. This
          schedule can be exported to google clanedar, pdf, and more.
        </p>
        <p>Click the 'Schedule' link in the navbar to get started!</p>
        <br />
        <h3>Kanye Quotes</h3>
        <App />
      </div>
    </div>
  );
};

export default Home;
