import { useState } from "react";
import Dashboard from "./components/Dashboard";
import "./index.css";

export default function App() {
  const [handle, setHandle] = useState("");
  const [submitted, setSubmitted] = useState("");
  const [input, setInput] = useState("");

  return (
    <div className="app">
      {!submitted ? (
        <div className="landing">
          <div className="landing-inner">
            <div className="logo">⚔️</div>
            <h1>CF Tracker</h1>
            <p>Track your Codeforces journey. Stay consistent. Level up.</p>
            <div className="input-row">
              <input
                type="text"
                placeholder="Enter your CF handle..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && input.trim() && setSubmitted(input.trim())}
              />
              <button onClick={() => input.trim() && setSubmitted(input.trim())}>
                Go →
              </button>
            </div>
          </div>
        </div>
      ) : (
        <Dashboard handle={submitted} onReset={() => setSubmitted("")} />
      )}
    </div>
  );
}