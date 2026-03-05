import { useEffect, useState } from "react";
import api from "../api/api";

export default function ActionFeed() {
  const [actions, setActions] = useState([]);

  useEffect(() => {
    api.get("/api/actions")
      .then((res) => {
        setActions(Array.isArray(res.data) ? res.data : []);
      })
      .catch((err) => {
        console.error("Failed to fetch actions", err);
        setActions([]);
      });
  }, []);

  return (
    <div className="rounded-lg sm:rounded-2xl bg-white/5 border border-white/10 p-4 sm:p-6 w-full">
      <h2 className="text-base sm:text-lg font-semibold mb-4 flex items-center gap-2 flex-wrap">
        🤖 <span className="hidden sm:inline">Live</span> AI Agent Feed
      </h2>

      {actions.length === 0 ? (
        <p className="text-gray-400 text-xs sm:text-sm">No actions yet...</p>
      ) : (
        <ul className="space-y-3 sm:space-y-4 text-xs sm:text-sm">
          {actions.map((a) => (
            <li
              key={a.id}
              className="p-3 sm:p-4 rounded-lg sm:rounded-xl bg-white/5 border border-white/10 line-clamp-4"
            >
              <div className="flex flex-wrap gap-1 items-start">
                <span>🚨</span>
                <span className="font-bold break-words">{a.actionType}</span>
              </div>
              <div className="mt-1 text-gray-300">campaign{" "}
                <span className="text-green-400 font-bold break-all">
                  {a.campaign?.campaignId || "N/A"}
                </span>
              </div>
              <div className="mt-1 text-green-300 font-semibold">Saved ₹{a.saveAmount}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
