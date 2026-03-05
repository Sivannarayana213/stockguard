export default function KpiCard({ title, value }) {
  return (
    <div className="w-full sm:w-auto p-4 sm:p-5 rounded-lg sm:rounded-xl bg-gray-900/50 border border-white/10 hover:border-white/20 transition-all">
      <h3 className="text-xs sm:text-sm text-gray-400 opacity-70 mb-2">{title}</h3>
      <p className="text-2xl sm:text-3xl font-bold text-white">{value}</p>
    </div>
  );
}