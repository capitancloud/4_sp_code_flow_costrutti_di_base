import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ForLoopScene = () => {
  const [count, setCount] = useState(5);
  const [speed, setSpeed] = useState(1);
  const [isAnimating, setIsAnimating] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [processedItems, setProcessedItems] = useState<number[]>([]);

  const runAnimation = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setProcessedItems([]);
    setCurrentIndex(-1);

    const interval = 800 / speed;
    
    for (let i = 0; i < count; i++) {
      setTimeout(() => {
        setCurrentIndex(i);
        setProcessedItems(prev => [...prev, i]);
      }, interval * (i + 1));
    }

    setTimeout(() => {
      setCurrentIndex(-1);
      setIsAnimating(false);
    }, interval * (count + 1));
  };

  return (
    <div className="flex flex-col gap-8">
      {/* Visualization Area */}
      <div className="scene-card min-h-[400px] flex flex-col items-center justify-center gap-8">
        {/* Counter Display */}
        <div className="flex items-center gap-4">
          <span className="font-mono text-muted-foreground text-sm">i =</span>
          <motion.div 
            className="w-16 h-16 rounded-xl bg-accent/20 border-2 border-accent flex items-center justify-center font-mono text-2xl text-accent glow-accent"
            key={currentIndex}
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
          >
            {currentIndex >= 0 ? currentIndex : "-"}
          </motion.div>
          <span className="font-mono text-muted-foreground text-sm">/ {count - 1}</span>
        </div>

        {/* Array Visualization */}
        <div className="flex items-center gap-3">
          <AnimatePresence mode="popLayout">
            {Array.from({ length: count }).map((_, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ 
                  scale: 1, 
                  opacity: 1,
                  y: currentIndex === i ? -15 : 0
                }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ 
                  type: "spring", 
                  delay: i * 0.05,
                  y: { type: "spring", damping: 10 }
                }}
                className={`container-cell relative ${
                  currentIndex === i ? "container-cell-active" : ""
                } ${processedItems.includes(i) && currentIndex !== i ? "border-success/50 bg-success/10" : ""}`}
              >
                <span className="font-mono">{i}</span>
                
                {/* Cursor */}
                {currentIndex === i && (
                  <motion.div
                    className="absolute -top-8 left-1/2 -translate-x-1/2"
                    initial={{ y: -10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    layoutId="cursor"
                  >
                    <div className="w-0 h-0 border-l-8 border-r-8 border-t-8 border-transparent border-t-primary" />
                  </motion.div>
                )}

                {/* Processed Indicator */}
                {processedItems.includes(i) && currentIndex !== i && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-success text-lg"
                  >
                    ✓
                  </motion.div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Progress Bar */}
        <div className="w-full max-w-md h-2 bg-muted rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-primary"
            initial={{ width: 0 }}
            animate={{ width: `${((currentIndex + 1) / count) * 100}%` }}
            transition={{ type: "spring", damping: 20 }}
          />
        </div>

        {/* Loop Status */}
        <div className="flex items-center gap-3">
          <span className="font-mono text-sm text-muted-foreground">
            {isAnimating ? (
              <span className="text-primary">loop in corso...</span>
            ) : processedItems.length === count ? (
              <span className="text-success">loop completato</span>
            ) : (
              "premi Esegui per iniziare"
            )}
          </span>
        </div>
      </div>

      {/* Controls */}
      <div className="control-panel flex flex-wrap gap-6 items-center justify-center">
        <div className="flex flex-col gap-2">
          <label className="text-xs text-muted-foreground font-mono">ELEMENTI</label>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setCount(c => Math.max(2, c - 1))}
              disabled={isAnimating}
              className="w-10 h-10 rounded-lg bg-muted hover:bg-muted/80 flex items-center justify-center text-lg disabled:opacity-50"
            >
              −
            </button>
            <span className="w-12 text-center font-mono text-2xl text-primary">{count}</span>
            <button 
              onClick={() => setCount(c => Math.min(8, c + 1))}
              disabled={isAnimating}
              className="w-10 h-10 rounded-lg bg-muted hover:bg-muted/80 flex items-center justify-center text-lg disabled:opacity-50"
            >
              +
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-xs text-muted-foreground font-mono">VELOCITÀ</label>
          <div className="flex items-center gap-2">
            {[0.5, 1, 2].map(s => (
              <button
                key={s}
                onClick={() => setSpeed(s)}
                disabled={isAnimating}
                className={`px-4 py-2 rounded-lg font-mono text-sm transition-all ${
                  speed === s 
                    ? "bg-primary/20 text-primary border border-primary" 
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                } disabled:opacity-50`}
              >
                {s}x
              </button>
            ))}
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

export default ForLoopScene;
