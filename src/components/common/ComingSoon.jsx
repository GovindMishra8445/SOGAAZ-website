// ComingSoon.jsx
const ComingSoon = ({
  title = "Something extraordinary is coming",
  highlightWord = "extraordinary",
  description = "We're crafting a premium experience. Be the first to know when we launch.",
  launchDays = 47,
  badge = "In development",
}) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#070b18] px-4">
      <div className="w-full max-w-2xl bg-[#0a0f1e] rounded-[24px] p-12 text-center relative overflow-hidden">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-400/30 bg-blue-400/8 text-blue-300 text-xs font-medium tracking-widest uppercase mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
          {badge}
        </div>

        {/* Title */}
        <h1 className="text-5xl font-medium text-white leading-tight tracking-tight mb-4">
          {title}
        </h1>

        {/* Description */}
        <p className="text-sm text-white/40 max-w-sm mx-auto mb-10">
          {description}
        </p>

        {/* Countdown — apna logic lagao */}
        {/* Email form */}
        {/* Social links */}
      </div>
    </div>
  );
};

export default ComingSoon;
