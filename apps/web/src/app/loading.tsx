export default function GlobalLoading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-50/50 backdrop-blur-sm transition-all duration-300">
      <div className="flex flex-col items-center gap-3">
        {/* Campfire Animation */}
        <div className="relative flex items-center justify-center w-12 h-12">
          <div className="absolute inset-0 rounded-full border-4 border-orange-200/50"></div>
          <div className="absolute inset-0 rounded-full border-4 border-orange-500 border-t-transparent animate-spin"></div>
          <span className="text-orange-600 text-xl font-bold font-serif leading-none animate-pulse">↟</span>
        </div>
        <p className="text-xs font-semibold text-stone-500 tracking-widest uppercase animate-pulse">
          Loading
        </p>
      </div>
    </div>
  );
}
