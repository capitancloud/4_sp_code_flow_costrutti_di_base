import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ConceptExplainer from "@/components/ui/ConceptExplainer";

type EventType = "click" | "timer" | "hover";
type Phase = "idle" | "triggered" | "traveling" | "listening" | "reacting";

interface EventParticle {
  id: number;
  type: EventType;
}

const EventsScene = () => {
  const [eventType, setEventType] = useState<EventType>("click");
  const [phase, setPhase] = useState<Phase>("idle");
  const [particles, setParticles] = useState<EventParticle[]>([]);
  const [reactionCount, setReactionCount] = useState(0);
  const [timerActive, setTimerActive] = useState(false);
  const [timerProgress, setTimerProgress] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const particleIdRef = useRef(0);

  const triggerEvent = (type: EventType) => {
    if (phase !== "idle" && type !== "timer") return;
    
    const newParticle: EventParticle = {
      id: particleIdRef.current++,
      type
    };
    
    setParticles(prev => [...prev, newParticle]);
    setPhase("triggered");
    
    setTimeout(() => setPhase("traveling"), 200);
    setTimeout(() => setPhase("listening"), 800);
    setTimeout(() => {
      setPhase("reacting");
      setReactionCount(c => c + 1);
    }, 1200);
    setTimeout(() => {
      setPhase("idle");
      setParticles(prev => prev.filter(p => p.id !== newParticle.id));
    }, 1800);
  };

  // Timer logic
  useEffect(() => {
    if (timerActive && eventType === "timer") {
      timerRef.current = setInterval(() => {
        setTimerProgress(prev => {
          if (prev >= 100) {
            triggerEvent("timer");
            return 0;
          }
          return prev + 5;
        });
      }, 100);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      setTimerProgress(0);
    }
    
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [timerActive, eventType]);

  const getEventColor = (type: EventType) => {
    switch (type) {
      case "click": return "primary";
      case "timer": return "warning";
      case "hover": return "accent";
    }
  };

  return (
    <div className="flex flex-col gap-8">
      {/* Visualization Area */}
      <div className="scene-card min-h-[400px] flex items-center justify-center relative overflow-hidden">
        {/* Connection Line */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          <defs>
            <linearGradient id="eventGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="hsl(174 72% 56%)" stopOpacity="0.5" />
              <stop offset="50%" stopColor="hsl(45 93% 58%)" stopOpacity="0.8" />
              <stop offset="100%" stopColor="hsl(262 83% 68%)" stopOpacity="0.5" />
            </linearGradient>
          </defs>
          <path
            d="M 120 200 Q 250 200 250 200 Q 250 200 380 200"
            className={`flow-path transition-all duration-300 ${phase !== "idle" ? "stroke-primary/50" : ""}`}
            strokeDasharray="8 4"
          />
        </svg>

        {/* TRIGGER */}
        <div className="absolute left-12 flex flex-col items-center gap-3">
          <span className="font-mono text-xs text-muted-foreground">TRIGGER</span>
          
          {eventType === "click" && (
            <motion.button
              onClick={() => triggerEvent("click")}
              disabled={phase !== "idle"}
              whileTap={{ scale: 0.9 }}
              className={`w-20 h-20 rounded-2xl border-2 flex items-center justify-center text-3xl transition-all ${
                phase === "triggered" 
                  ? "border-primary bg-primary/30 glow-primary" 
                  : "border-border bg-muted hover:border-primary/50"
              } disabled:cursor-not-allowed`}
            >
              👆
            </motion.button>
          )}

          {eventType === "timer" && (
            <div className="relative">
              <motion.div
                className={`w-20 h-20 rounded-full border-2 flex items-center justify-center text-2xl transition-all ${
                  timerActive ? "border-warning bg-warning/20" : "border-border bg-muted"
                }`}
                animate={{ rotate: timerActive ? 360 : 0 }}
                transition={{ duration: 2, repeat: timerActive ? Infinity : 0, ease: "linear" }}
              >
                ⏱️
              </motion.div>
              {/* Timer Progress Ring */}
              <svg className="absolute inset-0 w-20 h-20 -rotate-90">
                <circle
                  cx="40"
                  cy="40"
                  r="36"
                  fill="none"
                  stroke="hsl(45 93% 58%)"
                  strokeWidth="3"
                  strokeDasharray={`${timerProgress * 2.26} 226`}
                  className="transition-all duration-100"
                />
              </svg>
            </div>
          )}

          {eventType === "hover" && (
            <motion.div
              onHoverStart={() => phase === "idle" && triggerEvent("hover")}
              className={`w-20 h-20 rounded-2xl border-2 flex items-center justify-center text-3xl cursor-pointer transition-all ${
                phase === "triggered"
                  ? "border-accent bg-accent/30 glow-accent"
                  : "border-border bg-muted hover:border-accent/50"
              }`}
            >
              🖱️
            </motion.div>
          )}
        </div>

        {/* EVENT PARTICLE */}
        <AnimatePresence>
          {particles.map(particle => (
            <motion.div
              key={particle.id}
              className={`absolute w-10 h-10 rounded-full flex items-center justify-center text-lg ${
                particle.type === "click" 
                  ? "bg-primary glow-primary" 
                  : particle.type === "timer"
                    ? "bg-warning"
                    : "bg-accent glow-accent"
              }`}
              initial={{ left: 100, top: "50%", y: "-50%", scale: 0 }}
              animate={
                phase === "triggered" ? { scale: 1, left: 100 } :
                phase === "traveling" ? { left: 250, scale: 1.2 } :
                phase === "listening" ? { left: 380, scale: 1 } :
                { left: 380, scale: 0, opacity: 0 }
              }
              exit={{ scale: 0, opacity: 0 }}
              transition={{ type: "spring", damping: 15 }}
            >
              {particle.type === "click" ? "📨" : particle.type === "timer" ? "⏰" : "✨"}
            </motion.div>
          ))}
        </AnimatePresence>

        {/* LISTENER */}
        <div className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
          <span className="font-mono text-xs text-muted-foreground">LISTENER</span>
          <motion.div
            className={`w-24 h-24 rounded-2xl border-2 flex flex-col items-center justify-center gap-1 transition-all ${
              phase === "listening" || phase === "reacting"
                ? "border-success bg-success/20 shadow-[0_0_30px_hsl(142_71%_45%_/_0.4)]"
                : "border-border bg-card"
            }`}
            animate={{ 
              scale: phase === "listening" ? 1.1 : 1,
            }}
          >
            <span className="text-2xl">{phase === "listening" || phase === "reacting" ? "👂" : "📡"}</span>
            <span className="font-mono text-xs text-muted-foreground">
              on{eventType.charAt(0).toUpperCase() + eventType.slice(1)}
            </span>
          </motion.div>
        </div>

        {/* REACTION */}
        <div className="absolute right-12 flex flex-col items-center gap-3">
          <span className="font-mono text-xs text-muted-foreground">REAZIONE</span>
          <motion.div
            className={`w-20 h-20 rounded-2xl border-2 flex items-center justify-center text-3xl transition-all ${
              phase === "reacting"
                ? "border-secondary bg-secondary/30 glow-secondary"
                : "border-border bg-muted"
            }`}
            animate={{ 
              scale: phase === "reacting" ? [1, 1.2, 1] : 1,
              rotate: phase === "reacting" ? [0, 10, -10, 0] : 0
            }}
            transition={{ duration: 0.4 }}
          >
            {phase === "reacting" ? "🎉" : "💤"}
          </motion.div>
          
          {/* Reaction Counter */}
          <motion.div
            key={reactionCount}
            initial={{ scale: 1.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="font-mono text-sm text-muted-foreground"
          >
            ×{reactionCount}
          </motion.div>
        </div>

        {/* Phase Label */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
          <motion.div
            key={phase}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`font-mono text-sm px-4 py-2 rounded-full ${
              phase === "idle" ? "bg-muted text-muted-foreground" :
              phase === "triggered" ? "bg-primary/20 text-primary" :
              phase === "traveling" ? "bg-warning/20 text-warning" :
              phase === "listening" ? "bg-success/20 text-success" :
              "bg-secondary/20 text-secondary"
            }`}
          >
            {phase === "idle" && "in attesa..."}
            {phase === "triggered" && "evento generato!"}
            {phase === "traveling" && "propagazione..."}
            {phase === "listening" && "listener attivato!"}
            {phase === "reacting" && "callback eseguita!"}
          </motion.div>
        </div>
      </div>

      {/* Controls */}
      <div className="control-panel flex flex-wrap gap-6 items-center justify-center">
        <div className="flex flex-col gap-2 items-center">
          <label className="text-xs text-muted-foreground font-mono">TIPO EVENTO</label>
          <div className="flex gap-2">
            {(["click", "timer", "hover"] as EventType[]).map(type => (
              <button
                key={type}
                onClick={() => {
                  setEventType(type);
                  setTimerActive(false);
                }}
                disabled={phase !== "idle"}
                className={`px-4 py-2 rounded-lg font-mono text-sm transition-all ${
                  eventType === type
                    ? type === "click" 
                      ? "bg-primary/20 text-primary border border-primary"
                      : type === "timer"
                        ? "bg-warning/20 text-warning border border-warning"
                        : "bg-accent/20 text-accent border border-accent"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                } disabled:opacity-50`}
              >
                {type === "click" ? "👆 Click" : type === "timer" ? "⏱️ Timer" : "🖱️ Hover"}
              </button>
            ))}
          </div>
        </div>

        {eventType === "timer" && (
          <button
            onClick={() => setTimerActive(!timerActive)}
            className={`interactive-button ${timerActive ? "interactive-button-secondary" : ""}`}
          >
            {timerActive ? "Stop Timer" : "Start Timer"}
          </button>
        )}

        <button
          onClick={() => {
            setReactionCount(0);
            setTimerActive(false);
          }}
          className="px-4 py-2 rounded-lg bg-muted text-muted-foreground hover:bg-muted/80 transition-all text-sm font-mono"
        >
          Reset
        </button>
      </div>

      {/* Concept Explainer */}
      <ConceptExplainer
        title="Cosa sono gli Eventi?"
        description="Gli eventi sono azioni che si verificano nel browser (click, hover, timer, input, ecc.). La programmazione a eventi permette di rispondere a queste azioni eseguendo codice specifico. Il pattern base prevede un trigger (evento), un listener (ascoltatore) e un callback (funzione di reazione)."
        codeExample={`// Event listener
button.addEventListener("click", function() {
  console.log("Bottone cliccato!");
});

// Hover
elemento.addEventListener("mouseenter", () => {
  elemento.style.color = "blue";
});

// Timer
setInterval(() => {
  console.log("Tick!");
}, 1000);`}
        keyPoints={[
          "addEventListener() registra un listener per un evento specifico",
          "Il callback è la funzione eseguita quando l'evento si verifica",
          "Gli eventi 'propagano' dal target verso gli elementi parent",
          "setInterval e setTimeout sono eventi basati sul tempo"
        ]}
      />
    </div>
  );
};

export default EventsScene;
