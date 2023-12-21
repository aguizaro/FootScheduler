import { useState } from "react";
import axios from "axios";

function App() {
  const [quote, setQuote] = useState(0);

  return (
    <div className="App">
      <p>{quote}</p>
      <button
        onClick={() =>
          axios
            .get("https://api.kanye.rest")
            .then((result) => setQuote(result.data.quote))
        }
      >
        Click Me
      </button>
    </div>
  );
}

export default App;
