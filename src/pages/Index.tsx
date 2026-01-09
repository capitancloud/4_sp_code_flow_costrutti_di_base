import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SceneSelector from "@/components/SceneSelector";
import IfElseScene from "@/components/scenes/IfElseScene";
import IfElseIfScene from "@/components/scenes/IfElseIfScene";
import SwitchScene from "@/components/scenes/SwitchScene";
import ForLoopScene from "@/components/scenes/ForLoopScene";
import VariablesScene from "@/components/scenes/VariablesScene";
import FunctionsScene from "@/components/scenes/FunctionsScene";
import ArrayScene from "@/components/scenes/ArrayScene";
import EventsScene from "@/components/scenes/EventsScene";

// Floating particles component
const FloatingParticles = () => (
  <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
    {[...Array(20)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-1 h-1 rounded-full"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          background: i % 3 === 0 
            ? 'hsl(174 100% 50% / 0.3)' 
            : i % 3 === 1 
              ? 'hsl(280 100% 65% / 0.2)'
              : 'hsl(20 100% 60% / 0.2)',
        }}
        animate={{
          y: [0, -100, 0],
          x: [0, Math.random() * 50 - 25, 0],
          opacity: [0.2, 0.6, 0.2],
          scale: [1, 2, 1],
        }}
        transition={{
          duration: 8 + Math.random() * 10,
          repeat: Infinity,
          delay: Math.random() * 5,
          ease: "easeInOut",
        }}
      />
    ))}
  </div>
);

const Index = () => {
  const [currentScene, setCurrentScene] = useState("if-else");

  const renderScene = () => {
    switch (currentScene) {
      case "if-else":
        return <IfElseScene />;
      case "if-else-if":
        return <IfElseIfScene />;
      case "switch":
        return <SwitchScene />;
      case "for-loop":
        return <ForLoopScene />;
      case "variables":
        return <VariablesScene />;
      case "functions":
        return <FunctionsScene />;
      case "arrays":
        return <ArrayScene />;
      case "events":
        return <EventsScene />;
      default:
        return <IfElseScene />;
    }
  };

  return (
    <div className="min-h-screen relative pb-20 sm:pb-24">
      <FloatingParticles />
      
      {/* Header */}
      <header className="border-b border-border/50 glass-strong sticky top-0 z-50">
        <div className="container mx-auto px-3 sm:px-4 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-2 sm:gap-4"
            >
              <motion.div 
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl flex items-center justify-center relative overflow-hidden"
                style={{ background: 'var(--gradient-primary)' }}
                whileHover={{ scale: 1.05, rotate: 5 }}
                animate={{ 
                  boxShadow: [
                    '0 0 20px hsl(174 100% 50% / 0.3)',
                    '0 0 40px hsl(174 100% 50% / 0.5)',
                    '0 0 20px hsl(174 100% 50% / 0.3)',
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <span className="text-primary-foreground text-xl sm:text-2xl font-bold">▶</span>
              </motion.div>
              <div>
                <h1 className="font-bold text-lg sm:text-xl text-gradient-primary">CodeFlow</h1>
                <p className="text-[10px] sm:text-xs text-muted-foreground">Impara vedendo il codice</p>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-xs sm:text-sm text-muted-foreground hidden md:flex items-center gap-2"
            >
              <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
              Programmazione visuale interattiva
            </motion.div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-2 sm:px-4 py-4 sm:py-8 relative z-10">
        {/* Scene Selector */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
          className="mb-6 sm:mb-10"
        >
          <SceneSelector currentScene={currentScene} onSceneChange={setCurrentScene} />
        </motion.section>

        {/* Scene Content */}
        <AnimatePresence mode="wait">
          <motion.section
            key={currentScene}
            initial={{ opacity: 0, y: 30, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.98 }}
            transition={{ 
              duration: 0.4, 
              type: "spring", 
              stiffness: 100,
              damping: 20 
            }}
            className="max-w-4xl mx-auto"
          >
            {renderScene()}
          </motion.section>
        </AnimatePresence>
      </main>

      {/* Footer Hint */}
      <footer className="fixed bottom-4 sm:bottom-6 left-2 right-2 sm:left-0 sm:right-0 flex justify-center pointer-events-none z-50">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="glass-strong rounded-full px-4 sm:px-6 py-2 sm:py-3 text-xs sm:text-sm text-muted-foreground flex items-center gap-2"
        >
          <motion.span
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
          >
            💡
          </motion.span>
          <span className="hidden sm:inline">Modifica i valori e osserva cosa succede</span>
          <span className="sm:hidden">Modifica i valori</span>
        </motion.div>
      </footer>
    </div>
  );
};

export default Index;
