import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type FunctionType = "double" | "square" | "increment";

const FunctionsScene = () => {
  const [inputValue, setInputValue] = useState(3);
  const [functionType, setFunctionType] = useState<FunctionType>("double");
  const [isAnimating, setIsAnimating] = useState(false);
  const [animationPhase, setAnimationPhase] = useState<"idle" | "entering" | "processing" | "exiting">("idle");
  const [outputValue, setOutputValue] = useState<number | null>(null);

  const calculate = (type: FunctionType, value: number): number => {
    switch (type) {
      case "double": return value * 2;
      case "square": return value * value;
      case "increment": return value + 1;
    }
  };

  const getFunctionLabel = (type: FunctionType): string => {
    switch (type) {
      case "double": return "×2";
      case "square": return "x²";
      case "increment": return "+1";
    }
  };

  const runAnimation = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setOutputValue(null);
    
    setAnimationPhase("entering");
    setTimeout(() => setAnimationPhase("processing"), 600);
    setTimeout(() => {
      setOutputValue(calculate(functionType, inputValue));
      setAnimationPhase("exiting");
    }, 1200);
    setTimeout(() => {
      setAnimationPhase("idle");
      setIsAnimating(false);
    }, 2000);
  };

  return (
    <div className="flex flex-col gap-8">
      {/* Visualization Area */}
      <div className="scene-card min-h-[400px] flex items-center justify-center relative">
        {/* Input Side */}
        <div className="absolute left-16 flex flex-col items-center gap-2">
          <span className="font-mono text-xs text-muted-foreground">INPUT</span>
          <motion.div
            className="data-orb"
            animate={{ 
              opacity: animationPhase === "idle" ? 1 : animationPhase === "entering" ? 0.5 : 0.3,
              scale: animationPhase === "entering" ? 0.8 : 1
            }}
          >
            {inputValue}
          </motion.div>
        </div>

        {/* Input Arrow */}
        <motion.div 
          className="absolute left-32 w-24 h-1 bg-gradient-to-r from-primary to-transparent"
          animate={{ 
            opacity: animationPhase === "entering" ? 1 : 0.3,
            scaleX: animationPhase === "entering" ? 1.2 : 1
          }}
        />

        {/* Function Box */}
        <motion.div 
          className="function-box relative"
          animate={{ 
            scale: animationPhase === "processing" ? 1.05 : 1,
            boxShadow: animationPhase === "processing" 
              ? "0 0 50px hsl(262 83% 68% / 0.4)" 
              : "0 0 30px hsl(262 83% 68% / 0.2)"
          }}
          transition={{ type: "spring", damping: 10 }}
        >
          <div className="w-32 h-32 flex flex-col items-center justify-center gap-2">
            <span className="font-mono text-4xl font-bold text-accent">
              {getFunctionLabel(functionType)}
            </span>
            <span className="text-xs text-muted-foreground">f(x)</span>
          </div>

          {/* Animated Input Orb */}
          <AnimatePresence>
            {animationPhase === "entering" && (
              <motion.div
                className="data-orb absolute"
                initial={{ left: -60, top: "50%", y: "-50%" }}
                animate={{ left: 20, top: "50%", y: "-50%", opacity: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                {inputValue}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Processing Indicator */}
          {animationPhase === "processing" && (
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="w-full h-full rounded-2xl border-2 border-accent animate-pulse" />
            </motion.div>
          )}
        </motion.div>

        {/* Output Arrow */}
        <motion.div 
          className="absolute right-32 w-24 h-1 bg-gradient-to-l from-secondary to-transparent"
          animate={{ 
            opacity: animationPhase === "exiting" ? 1 : 0.3,
            scaleX: animationPhase === "exiting" ? 1.2 : 1
          }}
        />

        {/* Output Side */}
        <div className="absolute right-16 flex flex-col items-center gap-2">
          <span className="font-mono text-xs text-muted-foreground">OUTPUT</span>
          <AnimatePresence mode="wait">
            {outputValue !== null ? (
              <motion.div
                key="output"
                className="data-orb-secondary w-12 h-12 rounded-full flex items-center justify-center font-mono text-sm font-medium"
                initial={{ scale: 0, x: -50 }}
                animate={{ scale: 1, x: 0 }}
                exit={{ scale: 0 }}
                transition={{ type: "spring", damping: 12 }}
              >
                {outputValue}
              </motion.div>
            ) : (
              <motion.div
                key="placeholder"
                className="w-12 h-12 rounded-full border-2 border-dashed border-muted-foreground/30 flex items-center justify-center"
              >
                <span className="text-muted-foreground/50">?</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Arrow Animation */}
        <AnimatePresence>
          {animationPhase === "exiting" && (
            <motion.div
              className="data-orb-secondary w-12 h-12 rounded-full flex items-center justify-center font-mono text-sm font-medium absolute"
              initial={{ right: 200, top: "50%", y: "-50%" }}
              animate={{ right: 72, top: "50%", y: "-50%" }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              {calculate(functionType, inputValue)}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Controls */}
      <div className="control-panel flex flex-wrap gap-6 items-center justify-center">
        <div className="flex flex-col gap-2">
          <label className="text-xs text-muted-foreground font-mono">INPUT</label>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setInputValue(v => Math.max(1, v - 1))}
              disabled={isAnimating}
              className="w-10 h-10 rounded-lg bg-muted hover:bg-muted/80 flex items-center justify-center text-lg disabled:opacity-50"
            >
              −
            </button>
            <span className="w-12 text-center font-mono text-2xl text-primary">{inputValue}</span>
            <button 
              onClick={() => setInputValue(v => Math.min(10, v + 1))}
              disabled={isAnimating}
              className="w-10 h-10 rounded-lg bg-muted hover:bg-muted/80 flex items-center justify-center text-lg disabled:opacity-50"
            >
              +
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-xs text-muted-foreground font-mono">FUNZIONE</label>
          <div className="flex gap-2">
            {(["double", "square", "increment"] as FunctionType[]).map(type => (
              <button
                key={type}
                onClick={() => setFunctionType(type)}
                disabled={isAnimating}
                className={`px-4 py-2 rounded-lg font-mono text-lg transition-all ${
                  functionType === type 
                    ? "bg-accent/20 text-accent border border-accent" 
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                } disabled:opacity-50`}
              >
                {getFunctionLabel(type)}
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

export default FunctionsScene;
