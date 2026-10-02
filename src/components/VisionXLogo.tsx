interface VisionXLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'light' | 'dark' | 'full';
  showSubtitle?: boolean;
}

export default function VisionXLogo({
  size = 'md',
  variant = 'dark',
  showSubtitle = true,
}: VisionXLogoProps) {
  // Dimensions
  const iconSize = size === 'sm' ? 28 : size === 'md' ? 36 : size === 'lg' ? 48 : 64;
  const textSize = size === 'sm' ? 'text-lg' : size === 'md' ? 'text-xl' : size === 'lg' ? 'text-2xl' : 'text-3xl';
  const subtitleSize = size === 'sm' ? 'text-[8px]' : size === 'md' ? 'text-[10px]' : 'text-xs';

  return (
    <div className="flex items-center gap-3 select-none group">
      {/* Luxury Golden Sacred Emblem */}
      <div
        className="relative flex items-center justify-center rounded-2xl p-1 transition-transform duration-500 group-hover:scale-105"
        style={{ width: iconSize, height: iconSize }}
      >
        {/* Ambient Glow */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-amber-600/30 via-amber-400/20 to-yellow-300/30 blur-md group-hover:blur-lg transition-all" />

        {/* SVG Emblem */}
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full relative z-10 drop-shadow-md"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Primary Imperial Gold Gradient */}
            <linearGradient id="vxGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FDE68A" />
              <stop offset="35%" stopColor="#F59E0B" />
              <stop offset="70%" stopColor="#D97706" />
              <stop offset="100%" stopColor="#92400E" />
            </linearGradient>

            {/* Radiant Cross Gradient for X */}
            <linearGradient id="vxCrossGrad" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FFFBEB" />
              <stop offset="50%" stopColor="#FBBF24" />
              <stop offset="100%" stopColor="#B45309" />
            </linearGradient>

            {/* Dark Inner Shield Gradient */}
            <radialGradient id="vxShieldBg" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#292524" />
              <stop offset="70%" stopColor="#1C1917" />
              <stop offset="100%" stopColor="#0C0A09" />
            </radialGradient>
          </defs>

          {/* Outer Sun Wheel Beveled Rim */}
          <circle
            cx="50"
            cy="50"
            r="46"
            stroke="url(#vxGoldGrad)"
            strokeWidth="2.5"
            strokeDasharray="4 2"
            opacity="0.85"
          />

          {/* Inner Protective Octagon Frame */}
          <rect
            x="14"
            y="14"
            width="72"
            height="72"
            rx="18"
            fill="url(#vxShieldBg)"
            stroke="url(#vxGoldGrad)"
            strokeWidth="2"
          />

          {/* 8 Sacred Solar Spokes / Rays */}
          <g stroke="url(#vxGoldGrad)" strokeWidth="1.2" opacity="0.65">
            <line x1="50" y1="18" x2="50" y2="82" />
            <line x1="18" y1="50" x2="82" y2="50" />
            <line x1="27" y1="27" x2="73" y2="73" />
            <line x1="27" y1="73" x2="73" y2="27" />
          </g>

          {/* Central Sun Halo */}
          <circle
            cx="50"
            cy="50"
            r="20"
            fill="none"
            stroke="url(#vxGoldGrad)"
            strokeWidth="1.8"
          />

          {/* Dynamic Faceted "X" Wings */}
          {/* Top-Left to Bottom-Right Blade */}
          <path
            d="M32 28L68 72M38 28L74 72M26 28L62 72"
            stroke="url(#vxCrossGrad)"
            strokeWidth="4"
            strokeLinecap="round"
          />

          {/* Top-Right to Bottom-Left Blade */}
          <path
            d="M68 28L32 72M74 28L38 72M62 28L26 72"
            stroke="url(#vxCrossGrad)"
            strokeWidth="4"
            strokeLinecap="round"
          />

          {/* Diamond Centerpiece Jewel */}
          <polygon
            points="50,42 58,50 50,58 42,50"
            fill="#FFFBEB"
            stroke="url(#vxGoldGrad)"
            strokeWidth="1.5"
          />
          <circle cx="50" cy="50" r="2.5" fill="#D97706" />
        </svg>
      </div>

      {/* Typography */}
      <div className="flex flex-col">
        <div className="flex items-center gap-1.5 leading-none">
          <span
            className={`font-serif font-black tracking-wider ${
              variant === 'light' ? 'text-white' : 'text-stone-900'
            } ${textSize}`}
          >
            VISION
          </span>
          <span
            className={`font-serif font-black bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 bg-clip-text text-transparent italic ${textSize}`}
          >
            X
          </span>
        </div>

        {showSubtitle && (
          <div className="flex items-center gap-1.5 mt-0.5">
            <span
              className={`font-sans font-extrabold uppercase tracking-widest text-amber-600 dark:text-amber-400 ${subtitleSize}`}
            >
              Odisha
            </span>
            <span className="text-stone-300 dark:text-stone-600 text-[8px]">•</span>
            <span
              className={`font-sans font-bold uppercase tracking-wider text-stone-500 ${subtitleSize}`}
            >
              Smart Tourism
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
