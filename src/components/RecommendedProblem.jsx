import { useEffect, useState } from "react";

export default function RecommendedProblem({ rating }) {
  const [problem, setProblem] = useState(null);
  const [loading, setLoading] = useState(true);

  const targetRating = Math.ceil(rating / 100) * 100 + 100;

  useEffect(() => {
    const fetchProblem = async () => {
      setLoading(true);
      try {
        const res = await fetch("https://codeforces.com/api/problemset.problems");
        const data = await res.json();
        const filtered = data.result.problems.filter(
          (p) => p.rating === targetRating && p.tags.length > 0
        );
        const random = filtered[Math.floor(Math.random() * filtered.length)];
        setProblem(random);
      } catch (e) {
        setProblem(null);
      } finally {
        setLoading(false);
      }
    };
    fetchProblem();
  }, [rating]);

  const problemUrl = problem
    ? "https://codeforces.com/problemset/problem/" + problem.contestId + "/" + problem.index
    : "#";

  return (
    <div className="card recommend-card">
      <div className="card-title">Today's Challenge</div>
      {loading && <p>Finding a problem for you...</p>}
      {!loading && problem && (
        <div>
          <div className="problem-name">{problem.name}</div>
          <div className="problem-meta">
            <span className="problem-rating">Rating: {problem.rating}</span>
            <span className="problem-tags">{problem.tags.slice(0, 3).join(", ")}</span>
          </div>
          <a className="problem-link" href={problemUrl} target="_blank" rel="noreferrer">
            Solve it
          </a>
        </div>
      )}
      {!loading && !problem && <p>No problem found. Try refreshing!</p>}
    </div>
  );
}