export default function StatsBar({ userData }) {
  const stats = [
    { label: "Rating", value: userData.rating ?? "Unrated" },
    { label: "Max Rating", value: userData.maxRating ?? "N/A" },
    { label: "Rank", value: userData.rank ?? "Unranked" },
    { label: "Max Rank", value: userData.maxRank ?? "N/A" },
    { label: "Contribution", value: userData.contribution ?? 0 },
    { label: "Friends", value: userData.friendOfCount ?? 0 },
  ];

  return (
    <div className="stats-bar">
      {stats.map((s) => (
        <div className="stat-card" key={s.label}>
          <span className="stat-value">{s.value}</span>
          <span className="stat-label">{s.label}</span>
        </div>
      ))}
    </div>
  );
}