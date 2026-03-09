import { useEffect, useState } from "react";

export default function RecommendedProblem({ rating }) {
  const [problem, setProblem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [solved, setSolved] = useState(false);

  const targetRating = Math.ceil(rating / 100) * 100 + 100;

  const getTodayKey = () => new Date().toISOString().split("T")[0];

  const seededIndex = (arr) => {
    const today = getTodayKey();
    let hash = 0;
    for (let i = 0; i < today.length; i++) {
      hash = (hash * 31 + today.charCodeAt(i)) % arr.length;
    }
    return hash;
  };

  useEffect(() => {
    const solvedKey = "solved-" + getTodayKey();
    if (localStorage.getItem(solvedKey)) setSolved(true);

    const fetchProblem = async () => {
      setLoading(true);
      try {
        const res = await fetch("https://codeforces.com/api/problemset.problems");
        const data = await res.json();
        const filtered = data.result.problems.filter(
          (p) => p.rating === targetRating && p.tags.length > 0
        );
        const pick = filtered[seededIndex(filtered)];
        setProblem(pick);
      } catch (e) {
        setProblem(null);
      } finally {
        setLoading(false);
      }
    };
    fetchProblem();
  }, [rating]);

  const markSolved = () => {
    localStorage.setItem("solved-" + getTodayKey(), "true");
    setSolved(true);
  };

  const problemUrl = problem
    ? "https://codeforces.com/problemset/problem/" + problem.contestId + "/" + problem.index
    : "#";

  return (
    <div className="card recommend-card">
      <div className="card-title">Today's Challenge</div>
      {loading && <p>Finding a problem for you...</p>}
      {!loading && problem && !solved && (
        <div>
          <div className="problem-name">{problem.name}</div>
          <div className="problem-meta">
            <span className="problem-rating">Rating: {problem.rating}</span>
            <span className="problem-tags">{problem.tags.slice(0, 3).join(", ")}</span>
          </div>
          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
            <a className="problem-link" href={problemUrl} target="_blank" rel="noreferrer">
              Solve it
            </a>
            <button className="solved-btn" onClick={markSolved}>
              Mark as Solved
            </button>
          </div>
        </div>
      )}
      {!loading && solved && (
        <div className="solved-state">
          <div className="solved-tick">✓</div>
          <div className="solved-text">Problem of the day sorted!</div>
          <div className="solved-sub">Come back tomorrow for a new one.</div>
        </div>
      )}
      {!loading && !problem && <p>No problem found. Try refreshing!</p>}
    </div>
  );
}