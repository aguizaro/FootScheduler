import React from "react";
import App from "../components/App";
import "../css/index.css";

const Home: React.FC = () => {
  return (
    <div>
      <h1>
        Welcome to <span id="title">Foot Scheduler</span>
      </h1>
      <p>
        This site allows you to select your favorite football teams, players,
        leagues, and tournaments and create a schedule of upcoming games. This
        schedule can be exported to google clanedar, pdf, and more.
      </p>
      <p>Click the 'Schedule' link in the navbar to get started!</p>
      <br />
      <h3>Kanye Quotes</h3>
      <App />
      <App />
      <App />
      <App />
      <App />
      <App />
      <App />
      <App />
    </div>
  );
};

export default Home;
