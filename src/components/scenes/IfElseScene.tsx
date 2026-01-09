import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const IfElseScene = () => {
  const [value, setValue] = useState(5);
  const [threshold, setThreshold] = useState(5);
  const [isAnimating, setIsAnimating] = useState(false);
  const [orbPosition, setOrbPosition] = useState<"start" | "gate" | "true" | "false">("start");

  const condition = value >= threshold;

  const runAnimation = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setOrbPosition("start");
    
    setTimeout(() => setOrbPosition("gate"), 600);
    setTimeout(() => setOrbPosition(condition ? "true" : "false"), 1400);
    setTimeout(() => {
      setIsAnimating(false);
      setOrbPosition("start");
    }, 3000);
  };

  const getOrbCoordinates = (isMobile: boolean) => {
    if (isMobile) {
      switch (orbPosition) {
        case "start": return { x: 0, y: 0 };
        case "gate": return { x: 100, y: 0 };
        case "true": return { x: 200, y: -60 };
        case "false": return { x: 200, y: 60 };
        default: return { x: 0, y: 0 };
      }
    }
    switch (orbPosition) {
      case "start": return { x: 0, y: 0 };
      case "gate": return { x: 200, y: 0 };
      case "true": return { x: 380, y: -90 };
      case "false": return { x: 380, y: 90 };
      default: return { x: 0, y: 0 };
    }
  };

  // Check if mobile
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;

  return (
    <div className="flex flex-col gap-4 sm:gap-8">
      {/* Visualization Area */}
      <div className="scene-card min-h-[300px] sm:min-h-[450px] flex items-center justify-center relative overflow-visible">
        {/* SVG Gradients */}
        <svg className="absolute" width="0" height="0">
          <defs>
            <linearGradient id="gradient-primary" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="hsl(174 100% 50%)" />
              <stop offset="50%" stopColor="hsl(195 100% 45%)" />
              <stop offset="100%" stopColor="hsl(210 100% 50%)" />
            </linearGradient>
            <linearGradient id="gradient-secondary" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="hsl(20 100% 60%)" />
              <stop offset="50%" stopColor="hsl(35 100% 55%)" />
              <stop offset="100%" stopColor="hsl(45 100% 50%)" />
            </linearGradient>
            <filter id="glow-cyan">
              <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
            <filter id="glow-orange">
              <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
        </svg>

        {/* SVG Paths - Hidden on very small screens, simplified on mobile */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none hidden sm:block" style={{ overflow: "visible" }}>
          {/* True Path */}
          <motion.path
            d="M 160 225 L 280 225 Q 310 225 325 195 L 390 130"
            className="flow-path"
            initial={{ pathLength: 0 }}
            animate={{ 
              pathLength: 1,
              stroke: orbPosition === "true" ? "url(#gradient-primary)" : undefined,
              filter: orbPosition === "true" ? "url(#glow-cyan)" : undefined,
            }}
            transition={{ duration: 0.5 }}
            strokeDasharray="8 4"
          />
          {/* False Path */}
          <motion.path
            d="M 160 225 L 280 225 Q 310 225 325 255 L 390 320"
            className="flow-path"
            initial={{ pathLength: 0 }}
            animate={{ 
              pathLength: 1,
              stroke: orbPosition === "false" ? "url(#gradient-secondary)" : undefined,
              filter: orbPosition === "false" ? "url(#glow-orange)" : undefined,
            }}
            transition={{ duration: 0.5 }}
            strokeDasharray="8 4"
          />
        </svg>

        {/* Mobile simplified paths */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none sm:hidden" style={{ overflow: "visible" }}>
          <motion.path
            d="M 80 150 L 140 150 Q 160 150 170 130 L 220 90"
            className="flow-path"
            initial={{ pathLength: 0 }}
            animate={{ 
              pathLength: 1,
              stroke: orbPosition === "true" ? "url(#gradient-primary)" : undefined,
            }}
            transition={{ duration: 0.5 }}
            strokeDasharray="6 3"
          />
          <motion.path
            d="M 80 150 L 140 150 Q 160 150 170 170 L 220 210"
            className="flow-path"
            initial={{ pathLength: 0 }}
            animate={{ 
              pathLength: 1,
              stroke: orbPosition === "false" ? "url(#gradient-secondary)" : undefined,
            }}
            transition={{ duration: 0.5 }}
            strokeDasharray="6 3"
          />
        </svg>

        {/* Start Point */}
        <div className="absolute left-4 sm:left-12 top-1/2 -translate-y-1/2">
          <motion.div 
            className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-primary/60"
            animate={{ scale: [1, 1.2, 1], opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <motion.div 
            className="absolute inset-0 w-4 h-4 sm:w-5 sm:h-5 rounded-full border-2 border-primary/30"
            animate={{ scale: [1, 2], opacity: [0.5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>

        {/* Gate/Condition */}
        <motion.div 
          className={`absolute left-[100px] sm:left-[220px] top-1/2 -translate-y-1/2 w-16 h-16 sm:w-24 sm:h-24 rounded-xl sm:rounded-2xl flex flex-col items-center justify-center font-mono transition-all duration-500 ${condition ? "gate-true text-primary" : "gate-false text-secondary"}`}
          animate={{ 
            scale: orbPosition === "gate" ? [1, 1.15, 1.1] : 1,
            rotate: orbPosition === "gate" ? [0, 5, -5, 0] : 0,
          }}
          transition={{ duration: 0.4 }}
        >
          <motion.span 
            className="text-2xl sm:text-4xl"
            animate={{ 
              scale: orbPosition === "gate" ? [1, 1.3, 1] : 1,
            }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            {condition ? "✓" : "✗"}
          </motion.span>
          <span className="text-[10px] sm:text-xs mt-1 opacity-70">gate</span>
        </motion.div>

        {/* True Endpoint */}
        <motion.div 
          className="absolute right-4 sm:right-12 top-[60px] sm:top-[90px] flex items-center gap-2 sm:gap-4"
          animate={orbPosition === "true" ? { scale: [1, 1.1, 1] } : {}}
          transition={{ duration: 0.4 }}
        >
          <motion.div 
            className={`w-12 h-12 sm:w-20 sm:h-20 rounded-xl sm:rounded-2xl flex items-center justify-center text-xl sm:text-3xl transition-all duration-500 ${orbPosition === "true" ? "bg-primary/30 border-2 border-primary glow-primary" : "bg-muted/30 border border-border/50"}`}
          >
            ✓
          </motion.div>
          <div className="flex flex-col">
            <span className="text-xs sm:text-sm font-bold text-primary">TRUE</span>
            <span className="text-[10px] sm:text-xs text-muted-foreground hidden sm:block">percorso vero</span>
          </div>
        </motion.div>

        {/* False Endpoint */}
        <motion.div 
          className="absolute right-4 sm:right-12 bottom-[60px] sm:bottom-[90px] flex items-center gap-2 sm:gap-4"
          animate={orbPosition === "false" ? { scale: [1, 1.1, 1] } : {}}
          transition={{ duration: 0.4 }}
        >
          <motion.div 
            className={`w-12 h-12 sm:w-20 sm:h-20 rounded-xl sm:rounded-2xl flex items-center justify-center text-xl sm:text-3xl transition-all duration-500 ${orbPosition === "false" ? "bg-secondary/30 border-2 border-secondary glow-secondary" : "bg-muted/30 border border-border/50"}`}
          >
            ✗
          </motion.div>
          <div className="flex flex-col">
            <span className="text-xs sm:text-sm font-bold text-secondary">FALSE</span>
            <span className="text-[10px] sm:text-xs text-muted-foreground hidden sm:block">percorso falso</span>
          </div>
        </motion.div>

        {/* Moving Data Orb */}
        <AnimatePresence>
          {isAnimating && (
            <motion.div
              className="data-orb absolute z-10 w-10 h-10 sm:w-14 sm:h-14 text-base sm:text-lg"
              initial={{ x: isMobile ? 30 : 50, y: isMobile ? 150 : 225, scale: 0, rotate: -180 }}
              animate={{ 
                x: getOrbCoordinates(isMobile).x + (isMobile ? 30 : 50), 
                y: getOrbCoordinates(isMobile).y + (isMobile ? 150 : 225),
                scale: 1,
                rotate: 0,
              }}
              exit={{ scale: 0, opacity: 0, rotate: 180 }}
              transition={{ 
                type: "spring", 
                damping: 15, 
                stiffness: 80,
                mass: 1.2,
              }}
            >
              <motion.span
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 0.5, repeat: Infinity }}
              >
                {value}
              </motion.span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Condition Label */}
        <motion.div 
          className="absolute left-[80px] sm:left-[200px] top-4 sm:top-10 text-center glass rounded-lg sm:rounded-xl px-2 sm:px-4 py-1 sm:py-2"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <span className="font-mono text-xs sm:text-sm">
            <span className="text-muted-foreground">val </span>
            <span className="text-primary font-bold">≥</span>
            <span className="text-muted-foreground"> {threshold}?</span>
          </span>
        </motion.div>

        {/* Animated background particles - fewer on mobile */}
        {[...Array(isMobile ? 3 : 5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-primary/20"
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + (i % 3) * 20}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.2, 0.5, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.3,
            }}
          />
        ))}
      </div>

      {/* Controls */}
      <motion.div 
        className="control-panel flex flex-col sm:flex-row flex-wrap gap-4 sm:gap-8 items-center justify-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex gap-6 sm:gap-8">
          <div className="flex flex-col gap-2 sm:gap-3">
            <label className="text-[10px] sm:text-xs text-muted-foreground font-mono tracking-wider text-center">VALORE</label>
            <div className="flex items-center gap-2 sm:gap-4">
              <motion.button 
                onClick={() => setValue(v => Math.max(0, v - 1))}
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-muted/50 hover:bg-muted border border-border/50 flex items-center justify-center text-lg sm:text-xl text-muted-foreground hover:text-foreground transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                −
              </motion.button>
              <motion.span 
                key={value}
                className="w-10 sm:w-16 text-center font-mono text-2xl sm:text-3xl text-gradient-primary font-bold"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
              >
                {value}
              </motion.span>
              <motion.button 
                onClick={() => setValue(v => Math.min(10, v + 1))}
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-muted/50 hover:bg-muted border border-border/50 flex items-center justify-center text-lg sm:text-xl text-muted-foreground hover:text-foreground transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                +
              </motion.button>
            </div>
          </div>

          <div className="flex flex-col gap-2 sm:gap-3">
            <label className="text-[10px] sm:text-xs text-muted-foreground font-mono tracking-wider text-center">SOGLIA</label>
            <div className="flex items-center gap-2 sm:gap-4">
              <motion.button 
                onClick={() => setThreshold(t => Math.max(0, t - 1))}
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-muted/50 hover:bg-muted border border-border/50 flex items-center justify-center text-lg sm:text-xl text-muted-foreground hover:text-foreground transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                −
              </motion.button>
              <span className="w-10 sm:w-16 text-center font-mono text-2xl sm:text-3xl text-muted-foreground font-bold">{threshold}</span>
              <motion.button 
                onClick={() => setThreshold(t => Math.min(10, t + 1))}
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-muted/50 hover:bg-muted border border-border/50 flex items-center justify-center text-lg sm:text-xl text-muted-foreground hover:text-foreground transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                +
              </motion.button>
            </div>
          </div>
        </div>

        <motion.button 
          onClick={runAnimation}
          disabled={isAnimating}
          className="interactive-button disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none text-sm sm:text-base px-4 sm:px-6 py-2 sm:py-3"
          whileHover={{ scale: isAnimating ? 1 : 1.05 }}
          whileTap={{ scale: isAnimating ? 1 : 0.95 }}
        >
          <span className="relative z-10 flex items-center gap-2">
            {isAnimating ? (
              <>
                <motion.span
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                >
                  ◐
                </motion.span>
                <span className="hidden sm:inline">Eseguendo...</span>
                <span className="sm:hidden">...</span>
              </>
            ) : (
              <>
                <span>▶</span>
                Esegui
              </>
            )}
          </span>
        </motion.button>
      </motion.div>
    </div>
  );
};

export default IfElseScene;
