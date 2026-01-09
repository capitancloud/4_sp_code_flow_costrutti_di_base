import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ConceptExplainer from "@/components/ui/ConceptExplainer";

type Action = "idle" | "inserting" | "accessing" | "removing";

const ArrayScene = () => {
  const [array, setArray] = useState<number[]>([3, 7, 2, 9]);
  const [action, setAction] = useState<Action>("idle");
  const [targetIndex, setTargetIndex] = useState<number | null>(null);
  const [newValue, setNewValue] = useState(5);

  const insertElement = () => {
    if (action !== "idle" || array.length >= 8) return;
    setAction("inserting");
    setTargetIndex(array.length);
    
    setTimeout(() => {
      setArray([...array, newValue]);
      setNewValue(Math.floor(Math.random() * 10));
    }, 400);
    
    setTimeout(() => {
      setAction("idle");
      setTargetIndex(null);
    }, 800);
  };

  const accessElement = (index: number) => {
    if (action !== "idle") return;
    setAction("accessing");
    setTargetIndex(index);
    
    setTimeout(() => {
      setAction("idle");
      setTargetIndex(null);
    }, 1200);
  };

  const removeElement = (index: number) => {
    if (action !== "idle" || array.length <= 1) return;
    setAction("removing");
    setTargetIndex(index);
    
    setTimeout(() => {
      setArray(array.filter((_, i) => i !== index));
    }, 600);
    
    setTimeout(() => {
      setAction("idle");
      setTargetIndex(null);
    }, 1000);
  };

  return (
    <div className="flex flex-col gap-8">
      {/* Visualization Area */}
      <div className="scene-card min-h-[400px] flex flex-col items-center justify-center gap-8">
        {/* Index Labels */}
        <div className="flex gap-3">
          {array.map((_, i) => (
            <div key={`idx-${i}`} className="w-16 text-center">
              <span className="font-mono text-xs text-muted-foreground">[{i}]</span>
            </div>
          ))}
          {action === "inserting" && (
            <motion.div
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: 64 }}
              className="text-center"
            >
              <span className="font-mono text-xs text-primary">[{array.length}]</span>
            </motion.div>
          )}
        </div>

        {/* Array Cells */}
        <div className="flex gap-3 relative">
          <AnimatePresence mode="popLayout">
            {array.map((value, i) => (
              <motion.div
                key={`cell-${i}-${value}`}
                layout
                initial={{ scale: 0, opacity: 0 }}
                animate={{ 
                  scale: 1, 
                  opacity: action === "removing" && targetIndex === i ? 0 : 1,
                  y: action === "accessing" && targetIndex === i ? -20 : 0,
                  x: action === "removing" && targetIndex !== null && i > targetIndex ? -76 : 0
                }}
                exit={{ scale: 0, opacity: 0, y: 30 }}
                transition={{ 
                  type: "spring", 
                  damping: 20,
                  layout: { duration: 0.3 }
                }}
                onClick={() => accessElement(i)}
                className={`container-cell cursor-pointer ${
                  targetIndex === i && action === "accessing" 
                    ? "container-cell-active" 
                    : ""
                } ${
                  targetIndex === i && action === "removing"
                    ? "border-destructive bg-destructive/20"
                    : ""
                }`}
              >
                <motion.span 
                  className="font-mono text-xl"
                  animate={{
                    scale: targetIndex === i && action === "accessing" ? 1.3 : 1,
                    color: targetIndex === i && action === "accessing" 
                      ? "hsl(174 72% 56%)" 
                      : "hsl(210 40% 98%)"
                  }}
                >
                  {value}
                </motion.span>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Inserting Animation */}
          <AnimatePresence>
            {action === "inserting" && (
              <motion.div
                initial={{ scale: 0, opacity: 0, y: -50 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ type: "spring", damping: 15 }}
                className="container-cell container-cell-active"
              >
                <span className="font-mono text-xl text-primary">{newValue}</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Access Result */}
        <AnimatePresence>
          {action === "accessing" && targetIndex !== null && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="flex items-center gap-3 bg-primary/10 border border-primary rounded-xl px-6 py-3"
            >
              <span className="font-mono text-sm text-muted-foreground">array[{targetIndex}]</span>
              <span className="font-mono text-lg">=</span>
              <span className="font-mono text-2xl text-primary font-bold">{array[targetIndex]}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Length Indicator */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="font-mono text-sm text-muted-foreground">length:</span>
            <motion.span 
              key={array.length}
              initial={{ scale: 1.5 }}
              animate={{ scale: 1 }}
              className="font-mono text-xl text-accent font-bold"
            >
              {array.length}
            </motion.span>
          </div>
          <div className="w-px h-6 bg-border" />
          <span className="text-xs text-muted-foreground">
            {action === "idle" 
              ? "clicca una cella per accedere" 
              : action === "accessing" 
                ? "accesso in corso..." 
                : action === "inserting"
                  ? "inserimento..."
                  : "rimozione..."}
          </span>
        </div>
      </div>

      {/* Controls */}
      <div className="control-panel flex flex-wrap gap-6 items-center justify-center">
        {/* Insert Control */}
        <div className="flex flex-col gap-2 items-center">
          <label className="text-xs text-muted-foreground font-mono">INSERISCI</label>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <button 
                onClick={() => setNewValue(v => Math.max(0, v - 1))}
                disabled={action !== "idle"}
                className="w-8 h-8 rounded-lg bg-muted hover:bg-muted/80 flex items-center justify-center disabled:opacity-50"
              >
                −
              </button>
              <span className="w-8 text-center font-mono text-lg text-primary">{newValue}</span>
              <button 
                onClick={() => setNewValue(v => Math.min(99, v + 1))}
                disabled={action !== "idle"}
                className="w-8 h-8 rounded-lg bg-muted hover:bg-muted/80 flex items-center justify-center disabled:opacity-50"
              >
                +
              </button>
            </div>
            <button
              onClick={insertElement}
              disabled={action !== "idle" || array.length >= 8}
              className="interactive-button text-sm px-4 py-2 disabled:opacity-50"
            >
              push()
            </button>
          </div>
        </div>

        {/* Remove Control */}
        <div className="flex flex-col gap-2 items-center">
          <label className="text-xs text-muted-foreground font-mono">RIMUOVI</label>
          <div className="flex gap-1 flex-wrap justify-center">
            {array.map((_, i) => (
              <button
                key={i}
                onClick={() => removeElement(i)}
                disabled={action !== "idle" || array.length <= 1}
                className="w-10 h-10 rounded-lg bg-destructive/20 text-destructive border border-destructive/30 font-mono hover:bg-destructive/30 transition-all disabled:opacity-50"
              >
                {i}
              </button>
            ))}
          </div>
        </div>

        {/* Reset */}
        <button
          onClick={() => {
            setArray([3, 7, 2, 9]);
            setAction("idle");
            setTargetIndex(null);
          }}
          disabled={action !== "idle"}
          className="px-4 py-2 rounded-lg bg-muted text-muted-foreground hover:bg-muted/80 transition-all text-sm font-mono disabled:opacity-50"
        >
          Reset
        </button>
      </div>

      {/* Concept Explainer */}
      <ConceptExplainer
        title="Cos'è un Array?"
        description="Un array è una struttura dati che contiene una collezione ordinata di elementi. Ogni elemento ha un indice numerico che parte da 0. Gli array permettono di memorizzare e manipolare gruppi di dati correlati in modo efficiente."
        codeExample={`// Creazione
let numeri = [3, 7, 2, 9];

// Accesso (indice parte da 0)
console.log(numeri[0]);  // 3
console.log(numeri[2]);  // 2

// Modifica
numeri.push(5);     // Aggiunge alla fine
numeri.pop();       // Rimuove l'ultimo
numeri.length;      // Lunghezza: 4`}
        keyPoints={[
          "Gli indici partono da 0, non da 1",
          "push() aggiunge elementi alla fine",
          "pop() rimuove l'ultimo elemento",
          "La proprietà .length restituisce il numero di elementi"
        ]}
      />
    </div>
  );
};

export default ArrayScene;
