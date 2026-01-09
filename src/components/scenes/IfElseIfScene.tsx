import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ConceptExplainer from "@/components/ui/ConceptExplainer";

const IfElseIfScene = () => {
  const [value, setValue] = useState(75);
  const [isAnimating, setIsAnimating] = useState(false);
  const [currentStep, setCurrentStep] = useState<number | null>(null);
  const [result, setResult] = useState<string | null>(null);

  const conditions = [
    { threshold: 90, label: "≥ 90", result: "Eccellente", color: "text-primary" },
    { threshold: 70, label: "≥ 70", result: "Buono", color: "text-accent" },
    { threshold: 50, label: "≥ 50", result: "Sufficiente", color: "text-warning" },
    { threshold: 0, label: "else", result: "Insufficiente", color: "text-destructive" },
  ];

  const runAnimation = async () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setResult(null);
    setCurrentStep(null);

    // Animate through each condition
    for (let i = 0; i < conditions.length; i++) {
      setCurrentStep(i);
      await new Promise(r => setTimeout(r, 800));

      const condition = conditions[i];
      const passes = i === conditions.length - 1 
        ? true // else always passes
        : value >= condition.threshold;

      if (passes) {
        setResult(condition.result);
        await new Promise(r => setTimeout(r, 600));
        break;
      }
    }

    setIsAnimating(false);
  };

  const getMatchedConditionIndex = () => {
    for (let i = 0; i < conditions.length - 1; i++) {
      if (value >= conditions[i].threshold) return i;
    }
    return conditions.length - 1;
  };

  const matchedIndex = getMatchedConditionIndex();

  return (
    <div className="flex flex-col items-center gap-8 p-8">
      {/* Header */}
      <div className="text-center">
        <div className="font-mono text-sm text-muted-foreground mb-2">
          if / else if / else
        </div>
        <div className="text-2xl font-bold text-gradient-primary">
          Valutazione Sequenziale
        </div>
      </div>

      {/* Main visualization */}
      <div className="relative flex flex-col items-center gap-2">
        {/* Data orb at top */}
        <motion.div
          className="data-orb w-16 h-16 flex items-center justify-center text-xl font-bold mb-4"
          animate={isAnimating ? {
            y: currentStep !== null ? (currentStep + 1) * 80 : 0,
            scale: result ? 1.2 : 1,
          } : {}}
          transition={{ type: "spring", stiffness: 100, damping: 15 }}
        >
          {value}
        </motion.div>

        {/* Condition cascade */}
        <div className="flex flex-col gap-2">
          {conditions.map((condition, index) => {
            const isCurrentStep = currentStep === index;
            const isMatched = matchedIndex === index && result !== null;
            const isPassed = currentStep !== null && currentStep > index;
            const isElse = index === conditions.length - 1;

            return (
              <motion.div
                key={index}
                className="relative flex items-center gap-4"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                {/* Condition gate */}
                <motion.div
                  className={`relative w-48 h-16 rounded-xl border-2 flex items-center justify-center gap-3 transition-all duration-300 ${
                    isCurrentStep
                      ? "border-primary bg-primary/20 shadow-lg shadow-primary/30"
                      : isMatched
                        ? "border-accent bg-accent/20"
                        : isPassed
                          ? "border-muted bg-muted/10 opacity-50"
                          : "border-border bg-card/50"
                  }`}
                  animate={isCurrentStep ? { scale: [1, 1.05, 1] } : {}}
                  transition={{ duration: 0.3 }}
                >
                  {/* Condition label */}
                  <span className="font-mono text-sm">
                    {isElse ? (
                      <span className="text-muted-foreground">else</span>
                    ) : (
                      <>
                        <span className="text-muted-foreground">value </span>
                        <span className="text-primary">{condition.label}</span>
                      </>
                    )}
                  </span>

                  {/* Check/X indicator */}
                  <AnimatePresence>
                    {(isPassed || isMatched) && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        className={`absolute -right-2 -top-2 w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                          isMatched ? "bg-accent text-accent-foreground" : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {isMatched ? "✓" : "✗"}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* Arrow to result */}
                <motion.div
                  className={`flex items-center gap-2 transition-opacity duration-300 ${
                    isMatched ? "opacity-100" : "opacity-30"
                  }`}
                >
                  <div className={`w-8 h-0.5 ${isMatched ? "bg-accent" : "bg-border"}`} />
                  <motion.div
                    className={`px-4 py-2 rounded-lg border-2 font-medium ${
                      isMatched
                        ? `border-accent bg-accent/20 ${condition.color}`
                        : "border-border bg-card/30 text-muted-foreground"
                    }`}
                    animate={isMatched ? { scale: [1, 1.1, 1] } : {}}
                    transition={{ duration: 0.3 }}
                  >
                    {condition.result}
                  </motion.div>
                </motion.div>

                {/* Vertical connector */}
                {index < conditions.length - 1 && (
                  <div className="absolute left-24 top-16 w-0.5 h-2 bg-border" />
                )}
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Result display */}
      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="text-center"
          >
            <div className="text-sm text-muted-foreground mb-1">Risultato</div>
            <div className={`text-2xl font-bold ${conditions[matchedIndex].color}`}>
              {result}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Controls */}
      <div className="control-panel">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground w-16">Valore</span>
            <input
              type="range"
              min="0"
              max="100"
              value={value}
              onChange={(e) => {
                setValue(Number(e.target.value));
                setResult(null);
                setCurrentStep(null);
              }}
              className="flex-1 accent-primary"
              disabled={isAnimating}
            />
            <span className="font-mono text-primary w-12 text-right">{value}</span>
          </div>

          <motion.button
            onClick={runAnimation}
            disabled={isAnimating}
            className="interactive-button w-full"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {isAnimating ? "Valutando..." : "Valuta Condizioni"}
          </motion.button>
        </div>
      </div>

      {/* Legend */}
      <div className="flex gap-4 text-xs text-muted-foreground">
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded-full bg-primary/50" />
          <span>Controllo attivo</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded-full bg-accent/50" />
          <span>Condizione vera</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded-full bg-muted/50" />
          <span>Saltato</span>
        </div>
      </div>

      {/* Concept Explainer */}
      <ConceptExplainer
        title="Cos'è IF/ELSE IF/ELSE?"
        description="Quando hai bisogno di valutare più condizioni in sequenza, usi la catena IF/ELSE IF/ELSE. Le condizioni vengono controllate dall'alto verso il basso, e appena una risulta vera, il suo blocco viene eseguito e gli altri vengono ignorati."
        codeExample={`if (voto >= 90) {
  console.log("Eccellente");
} else if (voto >= 70) {
  console.log("Buono");
} else if (voto >= 50) {
  console.log("Sufficiente");
} else {
  console.log("Insufficiente");
}`}
        keyPoints={[
          "Le condizioni sono valutate in ordine sequenziale",
          "Solo il primo blocco con condizione vera viene eseguito",
          "L'ELSE finale cattura tutti i casi rimanenti",
          "L'ordine delle condizioni è fondamentale per la logica corretta"
        ]}
      />
    </div>
  );
};

export default IfElseIfScene;
