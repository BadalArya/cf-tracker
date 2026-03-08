import { useEffect, useState } from "react";
import StatsBar from "./StatsBar";
import StreakCard from "./StreakCard";
import RecommendedProblem from "./RecommendedProblem";
import RecentSubmissions from "./RecentSubmissions";

export default function Dashboard({ handle, onReset }) {
  const [userData, setUserData] = useState(null);
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError("");
      try {
        const userRes = await fetch("https://codeforces.com/api/user.info?handles=" + handle);
        const subRes = await fetch("https://codeforces.com/api/user.status?handle=" + handle + "&from=1&count=100");
        const userData = await userRes.json();
        const subData = await subRes.json();

        if (userData.status !== "OK") throw new Error("Handle not found");

        setUserData(userData.result[0]);
        setSubmissions(subData.result || []);
      } catch (e) {
        setError(e.message || "Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [handle]);

  if (loading) return <div className="centered">Loading your stats...</div>;
  if (error) return (
    <div className="centered">
      <p>Error: {error}</p>
      <button onClick={onReset}>Try again</button>
    </div>
  );

  return (
    <div className="dashboard">
      <header className="dash-header">
        <div>
          <h2>{userData.handle}</h2>
          <span className="rank-badge">{userData.rank || "unranked"}</span>
        </div>
        <button className="reset-btn" onClick={onReset}>Change Handle</button>
      </header>
      <StatsBar userData={userData} />
      <div className="cards-grid">
        <StreakCard submissions={submissions} />
        <RecommendedProblem rating={userData.rating || 800} />
      </div>
      <RecentSubmissions submissions={submissions} />
    </div>
  );
}