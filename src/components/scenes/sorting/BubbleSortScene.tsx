import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, RotateCcw, StepForward, Shuffle } from "lucide-react";

type SortState = "idle" | "comparing" | "swapping" | "sorted" | "complete";

interface ArrayElement {
  value: number;
  id: string;
  state: "default" | "comparing" | "swapping" | "sorted";
}

const BubbleSortScene = () => {
  const [array, setArray] = useState<ArrayElement[]>([]);
  const [sortState, setSortState] = useState<SortState>("idle");
  const [currentI, setCurrentI] = useState(0);
  const [currentJ, setCurrentJ] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(500);
  const [comparisons, setComparisons] = useState(0);
  const [swaps, setSwaps] = useState(0);

  const generateArray = useCallback((size: number = 8) => {
    const newArray: ArrayElement[] = [];
    for (let i = 0; i < size; i++) {
      newArray.push({
        value: Math.floor(Math.random() * 50) + 10,
        id: `${i}-${Date.now()}`,
        state: "default",
      });
    }
    setArray(newArray);
    setSortState("idle");
    setCurrentI(0);
    setCurrentJ(0);
    setComparisons(0);
    setSwaps(0);
    setIsPlaying(false);
  }, []);

  useEffect(() => {
    generateArray();
  }, [generateArray]);

  const step = useCallback(() => {
    if (sortState === "complete") return;

    setArray(prev => {
      const newArray = [...prev];
      const n = newArray.length;

      // Reset previous states
      newArray.forEach(el => {
        if (el.state !== "sorted") el.state = "default";
      });

      if (currentI >= n - 1) {
        // All sorted
        newArray.forEach(el => el.state = "sorted");
        setSortState("complete");
        setIsPlaying(false);
        return newArray;
      }

      if (currentJ >= n - 1 - currentI) {
        // Mark the last element of this pass as sorted
        newArray[n - 1 - currentI].state = "sorted";
        setCurrentJ(0);
        setCurrentI(prev => prev + 1);
        return newArray;
      }

      // Compare
      newArray[currentJ].state = "comparing";
      newArray[currentJ + 1].state = "comparing";
      setComparisons(prev => prev + 1);

      if (newArray[currentJ].value > newArray[currentJ + 1].value) {
        // Swap
        newArray[currentJ].state = "swapping";
        newArray[currentJ + 1].state = "swapping";
        
        const temp = newArray[currentJ];
        newArray[currentJ] = newArray[currentJ + 1];
        newArray[currentJ + 1] = temp;
        setSwaps(prev => prev + 1);
        setSortState("swapping");
      } else {
        setSortState("comparing");
      }

      setCurrentJ(prev => prev + 1);
      return newArray;
    });
  }, [sortState, currentI, currentJ]);

  useEffect(() => {
    if (!isPlaying || sortState === "complete") return;

    const timer = setTimeout(step, speed);
    return () => clearTimeout(timer);
  }, [isPlaying, step, speed, sortState]);

  const togglePlay = () => {
    if (sortState === "complete") {
      generateArray(array.length);
      return;
    }
    setIsPlaying(!isPlaying);
  };

  const reset = () => {
    generateArray(array.length);
  };

  const shuffle = () => {
    const shuffled = [...array].sort(() => Math.random() - 0.5);
    shuffled.forEach(el => {
      el.state = "default";
      el.id = `${el.value}-${Date.now()}-${Math.random()}`;
    });
    setArray(shuffled);
    setSortState("idle");
    setCurrentI(0);
    setCurrentJ(0);
    setComparisons(0);
    setSwaps(0);
    setIsPlaying(false);
  };

  const getBarColor = (state: ArrayElement["state"]) => {
    switch (state) {
      case "comparing":
        return "from-yellow-400 to-orange-500";
      case "swapping":
        return "from-red-400 to-pink-500";
      case "sorted":
        return "from-emerald-400 to-teal-500";
      default:
        return "from-primary to-secondary";
    }
  };

  const getBarGlow = (state: ArrayElement["state"]) => {
    switch (state) {
      case "comparing":
        return "0 0 20px hsl(45 100% 50% / 0.5)";
      case "swapping":
        return "0 0 25px hsl(350 100% 60% / 0.6)";
      case "sorted":
        return "0 0 15px hsl(160 100% 45% / 0.5)";
      default:
        return "none";
    }
  };

  const maxValue = Math.max(...array.map(el => el.value));

  return (
    <div className="flex flex-col gap-6 sm:gap-8">
      {/* Visualization Area */}
      <div className="scene-card min-h-[350px] sm:min-h-[400px] flex flex-col items-center justify-center gap-6 sm:gap-8 p-4 sm:p-8">
        {/* Bars */}
        <div className="flex items-end justify-center gap-1 sm:gap-2 h-48 sm:h-64 w-full">
          <AnimatePresence mode="popLayout">
            {array.map((element, index) => (
              <motion.div
                key={element.id}
                layout
                initial={{ opacity: 0, y: 50 }}
                animate={{ 
                  opacity: 1, 
                  y: 0,
                  scale: element.state === "swapping" ? 1.05 : 1,
                }}
                exit={{ opacity: 0, y: 50 }}
                transition={{ 
                  type: "spring", 
                  stiffness: 300, 
                  damping: 25,
                  layout: { duration: 0.3 }
                }}
                className="relative flex flex-col items-center"
                style={{ flex: 1, maxWidth: 60 }}
              >
                {/* Bar */}
                <motion.div
                  className={`w-full rounded-t-lg bg-gradient-to-t ${getBarColor(element.state)} relative overflow-hidden`}
                  style={{ 
                    height: `${(element.value / maxValue) * 100}%`,
                    minHeight: 40,
                    boxShadow: getBarGlow(element.state),
                  }}
                  animate={{
                    y: element.state === "swapping" ? [-5, 0] : 0,
                  }}
                  transition={{ duration: 0.2 }}
                >
                  {/* Shine effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    animate={{
                      x: element.state !== "default" ? ["-100%", "100%"] : "-100%",
                    }}
                    transition={{
                      duration: 0.6,
                      repeat: element.state === "comparing" || element.state === "swapping" ? Infinity : 0,
                    }}
                  />
                  
                  {/* Value label */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="font-mono text-xs sm:text-sm font-bold text-white drop-shadow-lg">
                      {element.value}
                    </span>
                  </div>
                </motion.div>

                {/* Index */}
                <motion.span 
                  className="font-mono text-[10px] sm:text-xs text-muted-foreground mt-2"
                  animate={{
                    color: (currentJ === index || currentJ + 1 === index) && sortState !== "complete"
                      ? "hsl(var(--primary))"
                      : "hsl(var(--muted-foreground))",
                  }}
                >
                  [{index}]
                </motion.span>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Status */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500" />
            <span className="text-xs sm:text-sm text-muted-foreground">Confronto</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-gradient-to-r from-red-400 to-pink-500" />
            <span className="text-xs sm:text-sm text-muted-foreground">Scambio</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-gradient-to-r from-emerald-400 to-teal-500" />
            <span className="text-xs sm:text-sm text-muted-foreground">Ordinato</span>
          </div>
        </div>

        {/* Stats */}
        <motion.div 
          className="flex gap-6 sm:gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="text-center">
            <motion.div 
              key={comparisons}
              initial={{ scale: 1.2 }}
              animate={{ scale: 1 }}
              className="font-mono text-xl sm:text-2xl font-bold text-primary"
            >
              {comparisons}
            </motion.div>
            <div className="text-[10px] sm:text-xs text-muted-foreground">Confronti</div>
          </div>
          <div className="w-px h-10 bg-border" />
          <div className="text-center">
            <motion.div 
              key={swaps}
              initial={{ scale: 1.2 }}
              animate={{ scale: 1 }}
              className="font-mono text-xl sm:text-2xl font-bold text-accent"
            >
              {swaps}
            </motion.div>
            <div className="text-[10px] sm:text-xs text-muted-foreground">Scambi</div>
          </div>
        </motion.div>
      </div>

      {/* Controls */}
      <div className="control-panel flex flex-col gap-4 sm:gap-6">
        {/* Main controls */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={togglePlay}
            className={`interactive-button px-4 sm:px-6 py-2 sm:py-3 flex items-center gap-2 ${
              sortState === "complete" ? "bg-success/20 border-success text-success" : ""
            }`}
          >
            {sortState === "complete" ? (
              <>
                <RotateCcw className="w-4 h-4" />
                <span className="text-sm">Ricomincia</span>
              </>
            ) : isPlaying ? (
              <>
                <Pause className="w-4 h-4" />
                <span className="text-sm">Pausa</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4" />
                <span className="text-sm">Avvia</span>
              </>
            )}
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={step}
            disabled={isPlaying || sortState === "complete"}
            className="interactive-button px-4 py-2 sm:py-3 flex items-center gap-2 disabled:opacity-50"
          >
            <StepForward className="w-4 h-4" />
            <span className="text-sm hidden sm:inline">Step</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={shuffle}
            disabled={isPlaying}
            className="px-4 py-2 sm:py-3 rounded-xl bg-muted hover:bg-muted/80 flex items-center gap-2 transition-colors disabled:opacity-50"
          >
            <Shuffle className="w-4 h-4" />
            <span className="text-sm hidden sm:inline">Mescola</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={reset}
            disabled={isPlaying}
            className="px-4 py-2 sm:py-3 rounded-xl bg-muted hover:bg-muted/80 flex items-center gap-2 transition-colors disabled:opacity-50"
          >
            <RotateCcw className="w-4 h-4" />
            <span className="text-sm hidden sm:inline">Reset</span>
          </motion.button>
        </div>

        {/* Speed control */}
        <div className="flex items-center justify-center gap-4">
          <span className="text-xs sm:text-sm text-muted-foreground">Velocità:</span>
          <div className="flex gap-2">
            {[1000, 500, 200, 50].map((s) => (
              <motion.button
                key={s}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSpeed(s)}
                className={`px-3 py-1 rounded-lg text-xs sm:text-sm font-mono transition-all ${
                  speed === s 
                    ? "bg-primary text-primary-foreground" 
                    : "bg-muted hover:bg-muted/80"
                }`}
              >
                {s === 1000 ? "0.5x" : s === 500 ? "1x" : s === 200 ? "2x" : "5x"}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Array size control */}
        <div className="flex items-center justify-center gap-4">
          <span className="text-xs sm:text-sm text-muted-foreground">Elementi:</span>
          <div className="flex gap-2">
            {[4, 6, 8, 10].map((size) => (
              <motion.button
                key={size}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => generateArray(size)}
                disabled={isPlaying}
                className={`px-3 py-1 rounded-lg text-xs sm:text-sm font-mono transition-all disabled:opacity-50 ${
                  array.length === size 
                    ? "bg-primary text-primary-foreground" 
                    : "bg-muted hover:bg-muted/80"
                }`}
              >
                {size}
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* Algorithm explanation */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="glass rounded-2xl p-4 sm:p-6"
      >
        <h3 className="font-mono text-sm font-bold text-primary mb-2">Come funziona</h3>
        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
          Il <span className="text-foreground font-medium">Bubble Sort</span> confronta coppie di elementi adiacenti 
          e li scambia se sono nell'ordine sbagliato. Dopo ogni passata, l'elemento più grande "galleggia" 
          verso la fine dell'array. Complessità: O(n²)
        </p>
      </motion.div>
    </div>
  );
};

export default BubbleSortScene;
