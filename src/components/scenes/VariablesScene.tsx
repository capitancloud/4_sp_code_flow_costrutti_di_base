import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ConceptExplainer from "@/components/ui/ConceptExplainer";

interface Variable {
  name: string;
  value: number | string;
  color: "primary" | "secondary" | "accent";
}

const VariablesScene = () => {
  const [variables, setVariables] = useState<Variable[]>([
    { name: "x", value: 0, color: "primary" },
  ]);
  const [pendingValue, setPendingValue] = useState<number | null>(null);
  const [targetVar, setTargetVar] = useState<string | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const assignValue = (varName: string, newValue: number) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setPendingValue(newValue);
    setTargetVar(varName);

    setTimeout(() => {
      setVariables(vars => 
        vars.map(v => v.name === varName ? { ...v, value: newValue } : v)
      );
      setPendingValue(null);
      setTargetVar(null);
      setIsAnimating(false);
    }, 800);
  };

  const addVariable = () => {
    const names = ["y", "z", "a", "b"];
    const colors: ("primary" | "secondary" | "accent")[] = ["secondary", "accent", "primary", "secondary"];
    const nextIndex = variables.length - 1;
    if (nextIndex < names.length) {
      setVariables([...variables, { 
        name: names[nextIndex], 
        value: 0, 
        color: colors[nextIndex] 
      }]);
    }
  };

  const removeVariable = (name: string) => {
    if (variables.length > 1) {
      setVariables(variables.filter(v => v.name !== name));
    }
  };

  const getColorClass = (color: "primary" | "secondary" | "accent") => {
    switch (color) {
      case "primary": return "bg-primary/20 border-primary text-primary";
      case "secondary": return "bg-secondary/20 border-secondary text-secondary";
      case "accent": return "bg-accent/20 border-accent text-accent";
    }
  };

  const getGlowClass = (color: "primary" | "secondary" | "accent") => {
    switch (color) {
      case "primary": return "glow-primary";
      case "secondary": return "glow-secondary";
      case "accent": return "glow-accent";
    }
  };

  return (
    <div className="flex flex-col gap-8">
      {/* Visualization Area */}
      <div className="scene-card min-h-[400px] flex flex-col items-center justify-center gap-8 relative">
        {/* Pending Value Animation */}
        <AnimatePresence>
          {pendingValue !== null && targetVar && (
            <motion.div
              className="data-orb absolute z-10"
              initial={{ y: -100, opacity: 0, scale: 0.5 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ type: "spring", damping: 15 }}
              style={{ top: "30%", left: "50%", marginLeft: "-24px" }}
            >
              {pendingValue}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Variables Display */}
        <div className="flex flex-wrap gap-6 justify-center">
          <AnimatePresence mode="popLayout">
            {variables.map((variable) => (
              <motion.div
                key={variable.name}
                layout
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                className="flex flex-col items-center gap-3"
              >
                {/* Variable Container */}
                <motion.div
                  className={`w-24 h-24 rounded-2xl border-2 flex flex-col items-center justify-center relative ${getColorClass(variable.color)} ${targetVar === variable.name ? getGlowClass(variable.color) : ""}`}
                  animate={{ 
                    scale: targetVar === variable.name ? 1.1 : 1,
                  }}
                  transition={{ type: "spring", damping: 10 }}
                >
                  {/* Value */}
                  <motion.span 
                    className="font-mono text-3xl font-bold"
                    key={variable.value}
                    initial={{ scale: 1.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                  >
                    {variable.value}
                  </motion.span>
                  
                  {/* Remove Button */}
                  {variables.length > 1 && (
                    <button
                      onClick={() => removeVariable(variable.name)}
                      className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-destructive text-destructive-foreground text-sm flex items-center justify-center hover:scale-110 transition-transform"
                    >
                      ×
                    </button>
                  )}
                </motion.div>
                
                {/* Variable Name */}
                <span className="font-mono text-lg text-muted-foreground">{variable.name}</span>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Add Variable Button */}
          {variables.length < 4 && (
            <motion.button
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              onClick={addVariable}
              className="w-24 h-24 rounded-2xl border-2 border-dashed border-muted-foreground/30 flex items-center justify-center text-3xl text-muted-foreground/50 hover:border-muted-foreground hover:text-muted-foreground transition-all"
            >
              +
            </motion.button>
          )}
        </div>

        {/* Assignment Indicator */}
        <div className="text-center">
          <span className="font-mono text-sm text-muted-foreground">
            {isAnimating ? (
              <span className="text-primary">assegnando valore...</span>
            ) : (
              "clicca un valore per assegnarlo"
            )}
          </span>
        </div>
      </div>

      {/* Controls */}
      <div className="control-panel">
        <div className="flex flex-wrap gap-4 justify-center">
          {variables.map(variable => (
            <div key={variable.name} className="flex flex-col gap-2 items-center">
              <span className="font-mono text-xs text-muted-foreground">{variable.name} =</span>
              <div className="flex gap-2">
                {[0, 1, 5, 10, 42].map(val => (
                  <button
                    key={val}
                    onClick={() => assignValue(variable.name, val)}
                    disabled={isAnimating}
                    className={`w-12 h-12 rounded-lg font-mono text-lg transition-all disabled:opacity-50 ${
                      variable.value === val 
                        ? getColorClass(variable.color)
                        : "bg-muted text-muted-foreground hover:bg-muted/80"
                    }`}
                  >
                    {val}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Concept Explainer */}
      <ConceptExplainer
        title="Cos'è una Variabile?"
        description="Una variabile è un contenitore che memorizza un valore nella memoria del computer. Puoi pensarla come una scatola etichettata: il nome è l'etichetta, il valore è ciò che contiene. Il valore può essere modificato durante l'esecuzione del programma."
        codeExample={`// Dichiarazione e assegnazione
let x = 5;
let nome = "Mario";

// Modifica del valore
x = 10;  // x ora vale 10`}
        keyPoints={[
          "Ogni variabile ha un nome univoco che la identifica",
          "Il valore può cambiare (mutabilità)",
          "Esistono diversi tipi: numeri, stringhe, booleani, ecc.",
          "let e const sono le parole chiave per dichiarare variabili in JavaScript"
        ]}
      />
    </div>
  );
};

export default VariablesScene;
