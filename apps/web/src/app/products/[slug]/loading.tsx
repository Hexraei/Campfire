export default function GlobalLoading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xl transition-all duration-300">
      <div className="flex flex-col items-center gap-4">
        {/* Campfire Logo Animation */}
        <div className="relative flex items-center justify-center w-16 h-16">
          <div className="absolute inset-0 rounded-full border-4 border-white/20"></div>
          <div className="absolute inset-0 rounded-full border-4 border-orange-500 border-t-transparent animate-spin"></div>
          <img src="/logo-transparent.png" alt="Loading..." className="w-8 h-8 object-contain animate-pulse" />
        </div>
        <p className="text-xs font-semibold text-white tracking-widest uppercase animate-pulse">
          Loading
        </p>
      </div>
    </div>
  );
}
