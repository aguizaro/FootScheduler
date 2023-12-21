import React from "react";

const Home: React.FC = () => {
  return (
    <div>
      <h1>About</h1>
      <p>
        This site is a demo of a React app that uses React Router, React Hooks,
        and React Context.
      </p>
      <p>
        This is my first time using React, so I'm sure there are many things
        that could be improved.
      </p>
      <p>
        This site was inspired by{" "}
        <a href="https://www.youtube.com/watch?v=-DTUdOJv8w8&list=PL0X6fGhFFNTe_vJIlAQQo0IEgPgk9er3g">
          this video
        </a>{" "}
        explanation of React + Vite by Sam Meech-Ward.
      </p>
    </div>
  );
};

export default Home;
