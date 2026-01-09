import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, RotateCcw, Pause, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import ConceptExplainer from "@/components/ui/ConceptExplainer";

interface Variable {
  name: string;
  value: number | number[];
  color: string;
}

type AnimationStep = {
  type: "init-array" | "init-var" | "loop-start" | "access-element" | "check-condition" | "condition-true" | "condition-false" | "call-function" | "function-process" | "function-return" | "update-var" | "loop-next" | "loop-end" | "result";
  description: string;
  highlightVar?: string;
  highlightIndex?: number;
  conditionResult?: boolean;
  functionInput?: number;
  functionOutput?: number;
};

// Algorithm: Sum of even numbers using a helper function
const generateSteps = (arr: number[]): AnimationStep[] => {
  const steps: AnimationStep[] = [];
  
  steps.push({ type: "init-array", description: "Inizializzo l'array con i numeri" });
  steps.push({ type: "init-var", description: "Creo la variabile 'somma' = 0", highlightVar: "somma" });
  steps.push({ type: "loop-start", description: "Inizio il ciclo FOR" });
  
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    steps.push({ type: "access-element", description: `Accedo all'elemento [${i}] = ${arr[i]}`, highlightIndex: i });
    steps.push({ type: "check-condition", description: `${arr[i]} è pari? (${arr[i]} % 2 === 0)`, highlightIndex: i });
    
    if (arr[i] % 2 === 0) {
      steps.push({ type: "condition-true", description: "Sì! Condizione vera", conditionResult: true, highlightIndex: i });
      steps.push({ type: "call-function", description: `Chiamo aggiungi(${sum}, ${arr[i]})`, functionInput: arr[i], highlightVar: "somma" });
      steps.push({ type: "function-process", description: `Calcolo: ${sum} + ${arr[i]}`, functionInput: arr[i] });
      sum += arr[i];
      steps.push({ type: "function-return", description: `Ritorno: ${sum}`, functionOutput: sum });
      steps.push({ type: "update-var", description: `Aggiorno somma = ${sum}`, highlightVar: "somma" });
    } else {
      steps.push({ type: "condition-false", description: "No! Condizione falsa, salto", conditionResult: false, highlightIndex: i });
    }
    
    if (i < arr.length - 1) {
      steps.push({ type: "loop-next", description: `i++ → i = ${i + 1}` });
    }
  }
  
  steps.push({ type: "loop-end", description: "Fine del ciclo" });
  steps.push({ type: "result", description: `Risultato finale: somma = ${sum}`, highlightVar: "somma" });
  
  return steps;
};

const CompleteFlowScene = () => {
  const [array] = useState<number[]>([3, 8, 5, 2, 7, 4]);
  const [steps, setSteps] = useState<AnimationStep[]>([]);
  const [currentStep, setCurrentStep] = useState(-1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1000);
  
  // Computed state based on current step
  const [variables, setVariables] = useState<Variable[]>([]);
  const [highlightedIndex, setHighlightedIndex] = useState<number | null>(null);
  const [loopIndex, setLoopIndex] = useState<number | null>(null);
  const [conditionActive, setConditionActive] = useState<boolean | null>(null);
  const [functionActive, setFunctionActive] = useState(false);
  const [functionValue, setFunctionValue] = useState<{ input: number; output: number } | null>(null);
  
  useEffect(() => {
    setSteps(generateSteps(array));
  }, [array]);
  
  useEffect(() => {
    if (!isPlaying || currentStep >= steps.length - 1) {
      if (currentStep >= steps.length - 1) setIsPlaying(false);
      return;
    }
    
    const timer = setTimeout(() => {
      setCurrentStep(prev => prev + 1);
    }, speed);
    
    return () => clearTimeout(timer);
  }, [isPlaying, currentStep, steps.length, speed]);
  
  // Process step effects
  useEffect(() => {
    if (currentStep < 0 || currentStep >= steps.length) return;
    
    const step = steps[currentStep];
    
    switch (step.type) {
      case "init-array":
        setVariables([{ name: "numeri", value: array, color: "orange" }]);
        break;
      case "init-var":
        setVariables(prev => [...prev, { name: "somma", value: 0, color: "cyan" }]);
        break;
      case "loop-start":
        setLoopIndex(0);
        break;
      case "access-element":
        setHighlightedIndex(step.highlightIndex ?? null);
        break;
      case "check-condition":
        setConditionActive(null);
        break;
      case "condition-true":
        setConditionActive(true);
        break;
      case "condition-false":
        setConditionActive(false);
        break;
      case "call-function":
        setFunctionActive(true);
        setFunctionValue({ input: step.functionInput ?? 0, output: 0 });
        break;
      case "function-process":
        break;
      case "function-return":
        setFunctionValue(prev => prev ? { ...prev, output: step.functionOutput ?? 0 } : null);
        break;
      case "update-var":
        setVariables(prev => prev.map(v => 
          v.name === "somma" ? { ...v, value: step.description.match(/= (\d+)/)?.[1] ? parseInt(step.description.match(/= (\d+)/)![1]) : v.value } : v
        ));
        setFunctionActive(false);
        setFunctionValue(null);
        break;
      case "loop-next":
        const nextIndex = step.description.match(/i = (\d+)/)?.[1];
        setLoopIndex(nextIndex ? parseInt(nextIndex) : null);
        setHighlightedIndex(null);
        setConditionActive(null);
        break;
      case "loop-end":
        setLoopIndex(null);
        setHighlightedIndex(null);
        setConditionActive(null);
        break;
      case "result":
        break;
    }
  }, [currentStep, steps, array]);
  
  const reset = () => {
    setCurrentStep(-1);
    setIsPlaying(false);
    setVariables([]);
    setHighlightedIndex(null);
    setLoopIndex(null);
    setConditionActive(null);
    setFunctionActive(false);
    setFunctionValue(null);
  };
  
  const togglePlay = () => {
    if (currentStep >= steps.length - 1) {
      reset();
      setTimeout(() => setIsPlaying(true), 100);
    } else {
      setIsPlaying(!isPlaying);
    }
  };
  
  const stepForward = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };
  
  const getCurrentSum = () => {
    const sumVar = variables.find(v => v.name === "somma");
    return typeof sumVar?.value === "number" ? sumVar.value : 0;
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-5xl mx-auto">
      {/* Main visualization area */}
      <div className="relative glass rounded-3xl p-6 sm:p-8 min-h-[400px] overflow-hidden">
        {/* Code preview - pseudo code */}
        <div className="absolute top-4 left-4 glass rounded-xl p-3 text-xs font-mono space-y-1 text-muted-foreground max-w-[200px] hidden sm:block">
          <div className={currentStep >= 0 && steps[currentStep]?.type === "init-array" ? "text-orange-400" : ""}>
            numeri = [3,8,5,2,7,4]
          </div>
          <div className={steps[currentStep]?.type === "init-var" ? "text-cyan-400" : ""}>
            somma = 0
          </div>
          <div className={steps[currentStep]?.type === "loop-start" || steps[currentStep]?.type === "loop-next" ? "text-green-400" : ""}>
            for i in numeri:
          </div>
          <div className={`pl-2 ${steps[currentStep]?.type === "check-condition" ? "text-purple-400" : ""}`}>
            if numeri[i] % 2 == 0:
          </div>
          <div className={`pl-4 ${steps[currentStep]?.type === "call-function" ? "text-teal-400" : ""}`}>
            somma = aggiungi(somma, n)
          </div>
          <div className={steps[currentStep]?.type === "result" ? "text-primary" : ""}>
            return somma
          </div>
        </div>

        {/* Variables section */}
        <div className="flex flex-col items-center gap-8">
          <div className="text-sm font-mono text-muted-foreground">Variabili</div>
          
          <div className="flex flex-wrap gap-4 justify-center">
            <AnimatePresence>
              {variables.map((v) => (
                <motion.div
                  key={v.name}
                  initial={{ opacity: 0, scale: 0.5, y: -20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  className={`glass rounded-xl p-4 border-2 ${
                    v.name === "somma" ? "border-cyan-500/50" : "border-orange-500/50"
                  }`}
                >
                  <div className={`text-xs font-mono mb-2 ${
                    v.name === "somma" ? "text-cyan-400" : "text-orange-400"
                  }`}>
                    {v.name}
                  </div>
                  {Array.isArray(v.value) ? (
                    <div className="flex gap-1">
                      {v.value.map((num, idx) => (
                        <motion.div
                          key={idx}
                          animate={{
                            scale: highlightedIndex === idx ? 1.2 : 1,
                            backgroundColor: highlightedIndex === idx 
                              ? "hsl(var(--primary))" 
                              : "hsl(var(--muted))",
                          }}
                          className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold"
                        >
                          {num}
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <motion.div
                      key={v.value}
                      initial={{ scale: 1.5 }}
                      animate={{ scale: 1 }}
                      className="text-2xl font-bold text-center"
                    >
                      {v.value}
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
          
          {/* Loop indicator */}
          <AnimatePresence>
            {loopIndex !== null && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="flex items-center gap-3 glass rounded-xl px-6 py-3"
              >
                <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
                <span className="font-mono text-green-400">FOR Loop</span>
                <span className="text-muted-foreground">i = {loopIndex}</span>
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Condition gate */}
          <AnimatePresence>
            {conditionActive !== null && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className={`glass rounded-2xl px-8 py-4 border-2 ${
                  conditionActive ? "border-green-500 bg-green-500/10" : "border-red-500 bg-red-500/10"
                }`}
              >
                <div className="flex items-center gap-4">
                  <span className="font-mono text-purple-400">IF</span>
                  <span className="text-sm">n % 2 === 0</span>
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className={`px-3 py-1 rounded-full text-sm font-bold ${
                      conditionActive ? "bg-green-500 text-green-950" : "bg-red-500 text-red-950"
                    }`}
                  >
                    {conditionActive ? "TRUE" : "FALSE"}
                  </motion.span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Function box */}
          <AnimatePresence>
            {functionActive && functionValue && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                className="relative glass rounded-2xl border-2 border-teal-500/50 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-teal-500/10 to-cyan-500/10" />
                <div className="relative flex items-center">
                  {/* Input */}
                  <motion.div
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    className="px-6 py-4 border-r border-teal-500/30"
                  >
                    <div className="text-xs text-teal-400 mb-1">input</div>
                    <div className="text-xl font-bold">{functionValue.input}</div>
                  </motion.div>
                  
                  {/* Function name */}
                  <div className="px-6 py-4 text-center">
                    <div className="font-mono text-teal-400 text-sm">aggiungi()</div>
                    <motion.div
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-6 h-6 border-2 border-teal-500 border-t-transparent rounded-full mx-auto mt-2"
                    />
                  </div>
                  
                  {/* Output */}
                  <motion.div
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="px-6 py-4 border-l border-teal-500/30"
                  >
                    <div className="text-xs text-cyan-400 mb-1">output</div>
                    <div className="text-xl font-bold">{functionValue.output || "..."}</div>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Result display */}
          <AnimatePresence>
            {currentStep >= 0 && steps[currentStep]?.type === "result" && (
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass rounded-2xl p-8 border-2 border-primary bg-primary/10"
              >
                <div className="text-sm text-primary mb-2">Risultato Finale</div>
                <div className="text-5xl font-bold bg-gradient-to-r from-primary to-cyan-400 bg-clip-text text-transparent">
                  {getCurrentSum()}
                </div>
                <div className="text-xs text-muted-foreground mt-2">
                  Somma dei numeri pari: 8 + 2 + 4 = 14
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        {/* Step description */}
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute bottom-4 left-1/2 -translate-x-1/2 glass rounded-xl px-6 py-3 text-sm font-mono text-center max-w-md"
        >
          {currentStep >= 0 ? steps[currentStep]?.description : "Premi Play per iniziare"}
        </motion.div>
      </div>
      
      {/* Progress bar */}
      <div className="glass rounded-xl p-4">
        <div className="flex items-center gap-4 mb-3">
          <span className="text-xs text-muted-foreground">Progresso</span>
          <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-primary to-cyan-400"
              initial={{ width: 0 }}
              animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            />
          </div>
          <span className="text-xs font-mono">{currentStep + 1}/{steps.length}</span>
        </div>
        
        {/* Step indicators */}
        <div className="flex gap-1 flex-wrap">
          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              className={`w-2 h-2 rounded-full ${
                idx === currentStep 
                  ? "bg-primary" 
                  : idx < currentStep 
                    ? "bg-primary/50" 
                    : "bg-muted"
              }`}
              animate={{ scale: idx === currentStep ? 1.5 : 1 }}
            />
          ))}
        </div>
      </div>
      
      {/* Controls */}
      <div className="flex flex-wrap items-center justify-center gap-4">
        <Button
          onClick={togglePlay}
          size="lg"
          className="gap-2"
        >
          {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
          {isPlaying ? "Pausa" : currentStep >= steps.length - 1 ? "Ricomincia" : "Esegui"}
        </Button>
        
        <Button
          onClick={stepForward}
          variant="outline"
          size="lg"
          disabled={isPlaying || currentStep >= steps.length - 1}
          className="gap-2"
        >
          <ChevronRight className="w-5 h-5" />
          Step
        </Button>
        
        <Button
          onClick={reset}
          variant="outline"
          size="lg"
          className="gap-2"
        >
          <RotateCcw className="w-5 h-5" />
          Reset
        </Button>
        
        {/* Speed control */}
        <div className="flex items-center gap-2 glass rounded-xl px-4 py-2">
          <span className="text-xs text-muted-foreground">Velocità</span>
          {[2000, 1000, 500].map((s) => (
            <Button
              key={s}
              size="sm"
              variant={speed === s ? "default" : "ghost"}
              onClick={() => setSpeed(s)}
              className="text-xs"
            >
              {s === 2000 ? "0.5x" : s === 1000 ? "1x" : "2x"}
            </Button>
          ))}
        </div>
      </div>
      
      {/* Legend */}
      <div className="glass rounded-xl p-4">
        <div className="text-xs font-mono text-muted-foreground mb-3">Legenda costrutti</div>
        <div className="flex flex-wrap gap-3">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-orange-500" />
            <span className="text-xs">Array</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-cyan-500" />
            <span className="text-xs">Variabile</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500" />
            <span className="text-xs">FOR Loop</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-purple-500" />
            <span className="text-xs">IF/ELSE</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-teal-500" />
            <span className="text-xs">Funzione</span>
          </div>
        </div>
      </div>

      {/* Concept Explainer */}
      <ConceptExplainer
        title="Come lavorano insieme i costrutti?"
        description="In un programma reale, variabili, array, cicli, condizioni e funzioni cooperano per risolvere problemi complessi. Questo esempio mostra come calcolare la somma dei numeri pari: l'array contiene i dati, il ciclo itera, la condizione filtra, la funzione calcola e la variabile accumula il risultato."
        codeExample={`function sommaPari(numeri) {
  let somma = 0;
  
  for (let i = 0; i < numeri.length; i++) {
    if (numeri[i] % 2 === 0) {
      somma = aggiungi(somma, numeri[i]);
    }
  }
  
  return somma;
}

function aggiungi(a, b) {
  return a + b;
}`}
        keyPoints={[
          "Le variabili memorizzano stato e risultati intermedi",
          "I cicli permettono di processare collezioni di dati",
          "Le condizioni filtrano e dirigono il flusso di esecuzione",
          "Le funzioni incapsulano logica riutilizzabile"
        ]}
      />
    </div>
  );
};

export default CompleteFlowScene;
