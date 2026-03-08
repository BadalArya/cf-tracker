export default function StreakCard({ submissions }) {
  const solvedDays = new Set(
    submissions
      .filter((s) => s.verdict === "OK")
      .map((s) => {
        const date = new Date(s.creationTimeSeconds * 1000);
        return date.toISOString().split("T")[0];
      })
  );

  const sortedDays = [...solvedDays].sort();
  let streak = 0;
  let maxStreak = 0;
  let temp = 1;

  for (let i = 1; i < sortedDays.length; i++) {
    const prev = new Date(sortedDays[i - 1]);
    const curr = new Date(sortedDays[i]);
    const diff = (curr - prev) / (1000 * 60 * 60 * 24);
    if (diff === 1) {
      temp++;
      maxStreak = Math.max(maxStreak, temp);
    } else {
      temp = 1;
    }
  }

  const today = new Date().toISOString().split("T")[0];
  const yesterday = new Date(Date.now() - 86400000).toISOString().split("T")[0];
  if (solvedDays.has(today) || solvedDays.has(yesterday)) {
    streak = temp;
  }

  return (
    <div className="card streak-card">
      <div className="card-title">🔥 Streak</div>
      <div className="streak-number">{streak}</div>
      <div className="streak-label">current streak (days)</div>
      <div className="streak-max">Best: {maxStreak} days</div>
      <div className="streak-total">Total days solved: {solvedDays.size}</div>
    </div>
  );
}