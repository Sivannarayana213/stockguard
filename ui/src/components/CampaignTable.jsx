import { useEffect, useState } from "react";
import api from "../api/api";

export default function CampaignTable() {
  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    api.get("/api/campaigns")
      .then((res) => {
        setCampaigns(Array.isArray(res.data) ? res.data : []);
      })
      .catch((err) => {
        console.error("Failed to fetch campaigns", err);
        setCampaigns([]);
      });
  }, []);

  return (
    <div className="rounded-lg sm:rounded-2xl bg-white/5 border border-white/10 p-4 sm:p-6 w-full">
      <h2 className="text-base sm:text-lg font-semibold mb-4">
        Ad Campaign Status
      </h2>

      <div className="overflow-x-auto -mx-4 sm:mx-0 sm:rounded-lg">
        <table className="w-full text-xs sm:text-sm">
          <thead>
            <tr className="text-gray-400 border-b border-white/10">
              <th className="py-3 px-4 sm:px-0 text-left whitespace-nowrap">Platform</th>
              <th className="py-3 px-4 sm:px-0 text-center whitespace-nowrap">Campaign</th>
              <th className="py-3 px-4 sm:px-0 text-center whitespace-nowrap">Product</th>
              <th className="py-3 px-4 sm:px-0 text-center whitespace-nowrap">Status</th>
            </tr>
          </thead>

          <tbody>
            {campaigns.map((c) => (
              <tr
                key={c.id}
                className="border-b border-white/5 hover:bg-white/5 transition"
              >
                <td className="py-3 px-4 sm:px-0">{c.platform}</td>
                <td className="py-3 px-4 sm:px-0 text-center font-mono">{c.campaignId}</td>
                <td className="py-3 px-4 sm:px-0 text-center">{c.product?.name || "Unknown Product"}</td>

                <td className="py-3 px-4 sm:px-0 text-center">
                  <span
                    className={`px-2 sm:px-3 py-1 rounded-full text-xs font-bold ${c.status === "ACTIVE"
                      ? "bg-green-500/20 text-green-400"
                      : "bg-red-500/20 text-red-400"
                      }`}
                  >
                    {c.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
