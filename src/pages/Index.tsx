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
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
                <span className="text-primary text-xl">▶</span>
              </div>
              <div>
                <h1 className="font-bold text-lg text-gradient-primary">CodeFlow</h1>
                <p className="text-xs text-muted-foreground">Impara vedendo</p>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-sm text-muted-foreground hidden md:block"
            >
              Programmazione visuale interattiva
            </motion.div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Scene Selector */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <SceneSelector currentScene={currentScene} onSceneChange={setCurrentScene} />
        </motion.section>

        {/* Scene Content */}
        <AnimatePresence mode="wait">
          <motion.section
            key={currentScene}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="max-w-4xl mx-auto"
          >
            {renderScene()}
          </motion.section>
        </AnimatePresence>
      </main>

      {/* Footer Hint */}
      <footer className="fixed bottom-4 left-0 right-0 flex justify-center pointer-events-none">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-card/80 backdrop-blur-sm border border-border rounded-full px-4 py-2 text-xs text-muted-foreground"
        >
          💡 Modifica i valori e osserva cosa succede
        </motion.div>
      </footer>
    </div>
  );
};

export default Index;
