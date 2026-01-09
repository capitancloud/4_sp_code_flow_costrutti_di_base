import { useState, useEffect } from "react";
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
    
    setTimeout(() => setOrbPosition("gate"), 500);
    setTimeout(() => setOrbPosition(condition ? "true" : "false"), 1200);
    setTimeout(() => {
      setIsAnimating(false);
      setOrbPosition("start");
    }, 2500);
  };

  const getOrbCoordinates = () => {
    switch (orbPosition) {
      case "start": return { x: 0, y: 0 };
      case "gate": return { x: 200, y: 0 };
      case "true": return { x: 350, y: -80 };
      case "false": return { x: 350, y: 80 };
      default: return { x: 0, y: 0 };
    }
  };

  return (
    <div className="flex flex-col gap-8">
      {/* Visualization Area */}
      <div className="scene-card min-h-[400px] flex items-center justify-center relative overflow-visible">
        <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ overflow: "visible" }}>
          {/* True Path */}
          <path
            d="M 160 200 L 260 200 Q 280 200 290 180 L 350 120"
            className={`flow-path transition-all duration-500 ${orbPosition === "true" ? "flow-path-active" : ""}`}
            strokeDasharray="5 5"
          />
          {/* False Path */}
          <path
            d="M 160 200 L 260 200 Q 280 200 290 220 L 350 280"
            className={`flow-path transition-all duration-500 ${orbPosition === "false" ? "flow-path-false" : ""}`}
            strokeDasharray="5 5"
          />
        </svg>

        {/* Start Point */}
        <div className="absolute left-12 top-1/2 -translate-y-1/2">
          <div className="w-4 h-4 rounded-full bg-muted-foreground/50" />
        </div>

        {/* Gate/Condition */}
        <motion.div 
          className={`absolute left-[220px] top-1/2 -translate-y-1/2 w-20 h-20 rounded-xl flex items-center justify-center font-mono text-lg font-bold transition-all duration-300 ${condition ? "gate-true text-primary" : "gate-false text-secondary"}`}
          animate={{ scale: orbPosition === "gate" ? 1.1 : 1 }}
        >
          {condition ? "✓" : "✗"}
        </motion.div>

        {/* True Endpoint */}
        <div className="absolute right-16 top-[100px] flex items-center gap-3">
          <motion.div 
            className={`w-16 h-16 rounded-xl flex items-center justify-center text-2xl transition-all duration-300 ${orbPosition === "true" ? "bg-primary/30 border-2 border-primary glow-primary" : "bg-muted border border-border"}`}
          >
            ✓
          </motion.div>
          <span className="text-xs font-mono text-primary">TRUE</span>
        </div>

        {/* False Endpoint */}
        <div className="absolute right-16 bottom-[100px] flex items-center gap-3">
          <motion.div 
            className={`w-16 h-16 rounded-xl flex items-center justify-center text-2xl transition-all duration-300 ${orbPosition === "false" ? "bg-secondary/30 border-2 border-secondary glow-secondary" : "bg-muted border border-border"}`}
          >
            ✗
          </motion.div>
          <span className="text-xs font-mono text-secondary">FALSE</span>
        </div>

        {/* Moving Data Orb */}
        <AnimatePresence>
          {isAnimating && (
            <motion.div
              className="data-orb absolute"
              initial={{ x: 50, y: 200, scale: 0 }}
              animate={{ 
                x: getOrbCoordinates().x + 50, 
                y: getOrbCoordinates().y + 200,
                scale: 1
              }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ type: "spring", damping: 20, stiffness: 100 }}
            >
              {value}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Condition Label */}
        <div className="absolute left-[200px] top-8 text-center">
          <span className="font-mono text-sm text-muted-foreground">
            valore ≥ {threshold}?
          </span>
        </div>
      </div>

      {/* Controls */}
      <div className="control-panel flex flex-wrap gap-6 items-center justify-center">
        <div className="flex flex-col gap-2">
          <label className="text-xs text-muted-foreground font-mono">VALORE</label>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setValue(v => Math.max(0, v - 1))}
              className="w-10 h-10 rounded-lg bg-muted hover:bg-muted/80 flex items-center justify-center text-lg"
            >
              −
            </button>
            <span className="w-12 text-center font-mono text-2xl text-primary">{value}</span>
            <button 
              onClick={() => setValue(v => Math.min(10, v + 1))}
              className="w-10 h-10 rounded-lg bg-muted hover:bg-muted/80 flex items-center justify-center text-lg"
            >
              +
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-xs text-muted-foreground font-mono">SOGLIA</label>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setThreshold(t => Math.max(0, t - 1))}
              className="w-10 h-10 rounded-lg bg-muted hover:bg-muted/80 flex items-center justify-center text-lg"
            >
              −
            </button>
            <span className="w-12 text-center font-mono text-2xl text-muted-foreground">{threshold}</span>
            <button 
              onClick={() => setThreshold(t => Math.min(10, t + 1))}
              className="w-10 h-10 rounded-lg bg-muted hover:bg-muted/80 flex items-center justify-center text-lg"
            >
              +
            </button>
          </div>
        </div>

        <button 
          onClick={runAnimation}
          disabled={isAnimating}
          className="interactive-button disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isAnimating ? "..." : "Esegui"}
        </button>
      </div>
    </div>
  );
};

export default IfElseScene;
