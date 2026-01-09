import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ConceptExplainer from "@/components/ui/ConceptExplainer";

const SwitchScene = () => {
  const [value, setValue] = useState<string>("B");
  const [isAnimating, setIsAnimating] = useState(false);
  const [activePath, setActivePath] = useState<string | null>(null);
  const [matchedCase, setMatchedCase] = useState<string | null>(null);

  const cases = [
    { value: "A", label: "case 'A'", action: "Azione Alpha", color: "primary" },
    { value: "B", label: "case 'B'", action: "Azione Beta", color: "secondary" },
    { value: "C", label: "case 'C'", action: "Azione Gamma", color: "accent" },
    { value: "D", label: "case 'D'", action: "Azione Delta", color: "warning" },
    { value: "default", label: "default", action: "Azione Default", color: "muted" },
  ];

  const options = ["A", "B", "C", "D", "X"];

  const runAnimation = async () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActivePath(null);
    setMatchedCase(null);

    // Animate the switch evaluation
    await new Promise(r => setTimeout(r, 400));
    
    // Find matching case
    const matched = cases.find(c => c.value === value) || cases[cases.length - 1];
    setActivePath(matched.value);
    
    await new Promise(r => setTimeout(r, 600));
    setMatchedCase(matched.value);

    await new Promise(r => setTimeout(r, 800));
    setIsAnimating(false);
  };

  const getColorClasses = (color: string, isActive: boolean) => {
    const colors: Record<string, { border: string; bg: string; text: string }> = {
      primary: { border: "border-primary", bg: "bg-primary/20", text: "text-primary" },
      secondary: { border: "border-secondary", bg: "bg-secondary/20", text: "text-secondary" },
      accent: { border: "border-accent", bg: "bg-accent/20", text: "text-accent" },
      warning: { border: "border-warning", bg: "bg-warning/20", text: "text-warning" },
      muted: { border: "border-muted-foreground", bg: "bg-muted/20", text: "text-muted-foreground" },
    };
    const c = colors[color] || colors.muted;
    return isActive ? `${c.border} ${c.bg} ${c.text}` : "border-border bg-card/30 text-muted-foreground";
  };

  return (
    <div className="flex flex-col items-center gap-8 p-8">
      {/* Header */}
      <div className="text-center">
        <div className="font-mono text-sm text-muted-foreground mb-2">
          switch / case
        </div>
        <div className="text-2xl font-bold text-gradient-secondary">
          Selezione Multipla
        </div>
      </div>

      {/* Main visualization */}
      <div className="relative flex flex-col items-center">
        {/* Switch box at top */}
        <motion.div
          className={`relative w-32 h-20 rounded-xl border-2 flex flex-col items-center justify-center mb-8 transition-all duration-300 ${
            isAnimating ? "border-primary bg-primary/10" : "border-border bg-card/50"
          }`}
          animate={isAnimating ? { scale: [1, 1.05, 1] } : {}}
        >
          <span className="text-xs text-muted-foreground">switch</span>
          <motion.span 
            className="text-2xl font-bold font-mono text-primary"
            key={value}
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            '{value}'
          </motion.span>
        </motion.div>

        {/* Connection lines and cases */}
        <div className="relative">
          {/* Central vertical line */}
          <div className="absolute left-1/2 -translate-x-1/2 w-0.5 h-full bg-border -top-8" />

          {/* Cases grid */}
          <div className="grid grid-cols-5 gap-4">
            {cases.map((caseItem, index) => {
              const isActive = activePath === caseItem.value || 
                (activePath === "default" && caseItem.value === "default" && !cases.slice(0, -1).some(c => c.value === value));
              const isMatched = matchedCase === caseItem.value ||
                (matchedCase === "default" && caseItem.value === "default");
              const isDefault = caseItem.value === "default";

              return (
                <div key={caseItem.value} className="flex flex-col items-center">
                  {/* Vertical connector from top */}
                  <motion.div
                    className={`w-0.5 h-8 transition-colors duration-300 ${
                      isActive ? `bg-${caseItem.color}` : "bg-border"
                    }`}
                    style={{
                      backgroundColor: isActive 
                        ? `hsl(var(--${caseItem.color === "muted" ? "muted-foreground" : caseItem.color}))`
                        : undefined
                    }}
                  />

                  {/* Case box */}
                  <motion.div
                    className={`relative w-24 rounded-lg border-2 p-3 flex flex-col items-center gap-2 transition-all duration-300 ${
                      getColorClasses(caseItem.color, isActive || isMatched)
                    }`}
                    animate={isMatched ? { 
                      scale: [1, 1.1, 1],
                      boxShadow: [
                        "0 0 0 0 transparent",
                        `0 0 20px 5px hsl(var(--${caseItem.color === "muted" ? "muted-foreground" : caseItem.color}) / 0.3)`,
                        "0 0 0 0 transparent"
                      ]
                    } : {}}
                    transition={{ duration: 0.5 }}
                  >
                    <span className="font-mono text-xs">
                      {isDefault ? "default" : `'${caseItem.value}'`}
                    </span>

                    {/* Match indicator */}
                    <AnimatePresence>
                      {isMatched && (
                        <motion.div
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0, opacity: 0 }}
                          className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-accent flex items-center justify-center text-[10px] text-accent-foreground"
                        >
                          ✓
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>

                  {/* Arrow down */}
                  <motion.div
                    className={`w-0.5 h-4 transition-colors duration-300`}
                    style={{
                      backgroundColor: isMatched 
                        ? `hsl(var(--${caseItem.color === "muted" ? "muted-foreground" : caseItem.color}))`
                        : "hsl(var(--border))"
                    }}
                  />

                  {/* Action box */}
                  <motion.div
                    className={`w-28 p-2 rounded-lg border text-center text-xs transition-all duration-300 ${
                      isMatched 
                        ? `border-${caseItem.color} bg-${caseItem.color}/10` 
                        : "border-border/50 bg-card/20 opacity-50"
                    }`}
                    animate={isMatched ? { scale: [1, 1.05, 1] } : {}}
                    style={{
                      borderColor: isMatched 
                        ? `hsl(var(--${caseItem.color === "muted" ? "muted-foreground" : caseItem.color}))`
                        : undefined
                    }}
                  >
                    <div className="font-mono text-[10px] text-muted-foreground mb-1">break;</div>
                    <div className={isMatched ? getColorClasses(caseItem.color, true).split(" ")[2] : ""}>
                      {caseItem.action}
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Animated data orb */}
      <AnimatePresence>
        {isAnimating && activePath && (
          <motion.div
            className="absolute data-orb w-10 h-10 flex items-center justify-center text-sm font-bold"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {value}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Controls */}
      <div className="control-panel">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">Valore</span>
            <div className="flex gap-2">
              {options.map((opt) => (
                <motion.button
                  key={opt}
                  onClick={() => {
                    setValue(opt);
                    setActivePath(null);
                    setMatchedCase(null);
                  }}
                  className={`w-10 h-10 rounded-lg border-2 font-mono font-bold transition-all ${
                    value === opt
                      ? "border-primary bg-primary/20 text-primary"
                      : "border-border hover:border-primary/50"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  disabled={isAnimating}
                >
                  {opt}
                </motion.button>
              ))}
            </div>
          </div>

          <motion.button
            onClick={runAnimation}
            disabled={isAnimating}
            className="interactive-button w-full"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {isAnimating ? "Eseguendo..." : "Esegui Switch"}
          </motion.button>
        </div>
      </div>

      {/* Result display */}
      <AnimatePresence>
        {matchedCase && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="text-center"
          >
            <div className="text-sm text-muted-foreground">
              {matchedCase === "default" 
                ? `Nessun case corrisponde a '${value}' → default`
                : `Match trovato: case '${matchedCase}'`
              }
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Concept Explainer */}
      <ConceptExplainer
        title="Cos'è SWITCH/CASE?"
        description="Lo SWITCH è un costrutto di selezione multipla che confronta un valore con diversi casi (case). A differenza di IF/ELSE IF, lo switch è più leggibile quando hai molti valori da confrontare con uguaglianza. Il caso 'default' gestisce tutti i valori non previsti."
        codeExample={`switch (giorno) {
  case "Lunedì":
    console.log("Inizio settimana");
    break;
  case "Venerdì":
    console.log("Quasi weekend!");
    break;
  default:
    console.log("Giorno normale");
}`}
        keyPoints={[
          "Confronta il valore con uguaglianza stretta (===)",
          "Il 'break' è essenziale per uscire dopo un match",
          "Senza break, l'esecuzione 'cade' nel caso successivo (fall-through)",
          "'default' è opzionale ma consigliato per gestire casi imprevisti"
        ]}
      />
    </div>
  );
};

export default SwitchScene;
