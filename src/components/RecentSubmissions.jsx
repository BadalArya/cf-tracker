export default function RecentSubmissions({ submissions }) {
  const recent = submissions.slice(0, 10);

  const verdictStyle = (verdict) => {
    if (verdict === "OK") return "verdict ok";
    if (verdict === "WRONG_ANSWER") return "verdict wa";
    if (verdict === "TIME_LIMIT_EXCEEDED") return "verdict tle";
    return "verdict other";
  };

  const verdictLabel = (verdict) => {
    if (verdict === "OK") return "AC";
    if (verdict === "WRONG_ANSWER") return "WA";
    if (verdict === "TIME_LIMIT_EXCEEDED") return "TLE";
    if (verdict === "RUNTIME_ERROR") return "RE";
    if (verdict === "COMPILATION_ERROR") return "CE";
    return verdict ? verdict.slice(0, 3) : "?";
  };

  const getUrl = (s) => {
    return "https://codeforces.com/problemset/problem/" + s.problem.contestId + "/" + s.problem.index;
  };

  return (
    <div className="recent-submissions">
      <div className="card-title">Recent Submissions</div>
      <div className="submissions-list">
        {recent.map((s, i) => (
          <div className="submission-row" key={i}>
            <span className={verdictStyle(s.verdict)}>
              {verdictLabel(s.verdict)}
            </span>
            <span className="sub-name">
              <a href={getUrl(s)} target="_blank" rel="noreferrer">
                {s.problem.name}
              </a>
            </span>
            <span className="sub-rating">
              {s.problem.rating ? "Rating: " + s.problem.rating : "N/A"}
            </span>
            <span className="sub-lang">
              {s.programmingLanguage.split(" ")[0]}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}