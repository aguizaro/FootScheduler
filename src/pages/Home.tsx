import React, { useState, useEffect } from "react";
import "../css/index.css";
import "../css/Home.css";

interface PlannerProps {
  public_calendar_url: string;
  calendar_name: string;
  fixtures: { fixture; league; teams }[];
}

const Home = () => {
  const [currentPlanners] = useState<PlannerProps[] | null>(() => {
    const savedPlanner = localStorage.getItem("activePlanners");
    if (savedPlanner) {
      return JSON.parse(savedPlanner) as PlannerProps[];
    } else {
      return null;
    }
  });

  useEffect(() => {
    console.log("useEffect: ", currentPlanners);
  }, [currentPlanners]);
  return (
    <div className="inner-container">
      <h1>
        Create a <span className="title">Football Planner</span>
      </h1>
      <div className="content">
        <p>
          This site allows you to select your favorite football teams, leagues,
          and tournaments. Your selected teams will be used to create a planner
          containing a schedule of upcoming football matches. All created
          planners will be displayed on this page and may be imported into your
          google calendar account.
        </p>
        <p>
          Click the <span className="title">Plan</span> link in the navbar to
          get started!
        </p>
        <br />
      </div>
      <div className="my-planners">
        {currentPlanners ? (
          currentPlanners.map((planner) => (
            <div key={planner.public_calendar_url}>
              <h2 className="title">{planner.calendar_name}</h2>
              <div className="planner">
                <iframe
                  src={planner.public_calendar_url}
                  style={{ border: "0" }}
                  width="400"
                  height="300"
                ></iframe>
              </div>
            </div>
          ))
        ) : (
          <p>You have no planners.</p>
        )}
      </div>
    </div>
  );
};

export default Home;
