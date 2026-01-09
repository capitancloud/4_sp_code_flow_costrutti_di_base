import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

interface Scene {
  id: string;
  title: string;
  icon: string;
  description: string;
}

interface Category {
  id: string;
  title: string;
  icon: string;
  color: "primary" | "secondary" | "accent" | "warning";
  scenes: Scene[];
}

const categories: Category[] = [
  {
    id: "fundamentals",
    title: "Fondamenti",
    icon: "◈",
    color: "accent",
    scenes: [
      { id: "variables", title: "Variabili", icon: "□", description: "Memoria e stato" },
    ],
  },
  {
    id: "selection",
    title: "Selezione",
    icon: "⑂",
    color: "primary",
    scenes: [
      { id: "if-else", title: "IF / ELSE", icon: "⑂", description: "Decisione binaria" },
      { id: "if-else-if", title: "IF / ELSE IF", icon: "⑃", description: "Condizioni multiple" },
      { id: "switch", title: "SWITCH", icon: "⎇", description: "Selezione multipla" },
    ],
  },
  {
    id: "iteration",
    title: "Iterazione",
    icon: "↻",
    color: "secondary",
    scenes: [
      { id: "for-loop", title: "FOR Loop", icon: "↻", description: "Ripetizione controllata" },
      { id: "while-loop", title: "WHILE Loop", icon: "⟳", description: "Ripetizione condizionata" },
    ],
  },
  {
    id: "data-structures",
    title: "Strutture Dati",
    icon: "▤",
    color: "primary",
    scenes: [
      { id: "arrays", title: "Array", icon: "▤", description: "Liste indicizzate" },
      { id: "objects", title: "Oggetti", icon: "{ }", description: "Coppie chiave-valore" },
    ],
  },
  {
    id: "abstraction",
    title: "Astrazione",
    icon: "ƒ",
    color: "warning",
    scenes: [
      { id: "functions", title: "Funzioni", icon: "ƒ", description: "Input → Output" },
    ],
  },
  {
    id: "reactivity",
    title: "Reattività",
    icon: "⚡",
    color: "secondary",
    scenes: [
      { id: "events", title: "Eventi", icon: "⚡", description: "Trigger → Reazione" },
    ],
  },
];

interface SceneSelectorProps {
  currentScene: string;
  onSceneChange: (sceneId: string) => void;
}

const SceneSelector = ({ currentScene, onSceneChange }: SceneSelectorProps) => {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(() => {
    // Find which category contains the current scene
    for (const category of categories) {
      if (category.scenes.some(scene => scene.id === currentScene)) {
        return category.id;
      }
    }
    return "selection";
  });

  const getColorClasses = (color: Category["color"], isActive: boolean, isCategory: boolean) => {
    const base = {
      primary: isActive 
        ? "border-primary bg-primary/10 text-primary" 
        : isCategory 
          ? "border-primary/30 hover:border-primary/60 hover:bg-primary/5"
          : "border-border hover:border-primary/50",
      secondary: isActive 
        ? "border-secondary bg-secondary/10 text-secondary" 
        : isCategory 
          ? "border-secondary/30 hover:border-secondary/60 hover:bg-secondary/5"
          : "border-border hover:border-secondary/50",
      accent: isActive 
        ? "border-accent bg-accent/10 text-accent" 
        : isCategory 
          ? "border-accent/30 hover:border-accent/60 hover:bg-accent/5"
          : "border-border hover:border-accent/50",
      warning: isActive 
        ? "border-warning bg-warning/10 text-warning" 
        : isCategory 
          ? "border-warning/30 hover:border-warning/60 hover:bg-warning/5"
          : "border-border hover:border-warning/50",
    };
    return base[color];
  };

  const getIconColor = (color: Category["color"]) => {
    const colors = {
      primary: "text-primary",
      secondary: "text-secondary",
      accent: "text-accent",
      warning: "text-warning",
    };
    return colors[color];
  };

  const isSceneAvailable = (sceneId: string) => {
    const availableScenes = ["variables", "if-else", "if-else-if", "switch", "for-loop", "functions", "arrays", "events"];
    return availableScenes.includes(sceneId);
  };

  return (
    <div className="flex flex-col gap-3 md:gap-4 w-full max-w-4xl mx-auto px-2 sm:px-0">
      {/* Category Buttons */}
      <div className="flex flex-wrap gap-1.5 sm:gap-2 justify-center">
        {categories.map((category, index) => {
          const isExpanded = expandedCategory === category.id;
          const hasActiveScene = category.scenes.some(s => s.id === currentScene);
          
          return (
            <motion.button
              key={category.id}
              onClick={() => setExpandedCategory(isExpanded ? null : category.id)}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-lg border-2 transition-all duration-300 ${getColorClasses(category.color, isExpanded || hasActiveScene, true)}`}
            >
              <span className={`text-base sm:text-xl ${getIconColor(category.color)}`}>{category.icon}</span>
              <span className="font-medium text-xs sm:text-sm">{category.title}</span>
              <motion.span
                animate={{ rotate: isExpanded ? 180 : 0 }}
                transition={{ duration: 0.2 }}
                className="text-[10px] sm:text-xs opacity-60"
              >
                ▼
              </motion.span>
            </motion.button>
          );
        })}
      </div>

      {/* Expanded Scene Options */}
      <AnimatePresence mode="wait">
        {expandedCategory && (
          <motion.div
            key={expandedCategory}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="flex flex-wrap gap-2 sm:gap-3 justify-center p-3 sm:p-4 rounded-xl bg-card/50 border border-border">
              {categories
                .find(c => c.id === expandedCategory)
                ?.scenes.map((scene, index) => {
                  const isActive = currentScene === scene.id;
                  const isAvailable = isSceneAvailable(scene.id);
                  const category = categories.find(c => c.id === expandedCategory)!;

                  return (
                    <motion.button
                      key={scene.id}
                      onClick={() => isAvailable && onSceneChange(scene.id)}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={isAvailable ? { scale: 1.05 } : {}}
                      whileTap={isAvailable ? { scale: 0.95 } : {}}
                      disabled={!isAvailable}
                      className={`flex items-center gap-2 sm:gap-3 px-3 sm:px-5 py-2 sm:py-3 rounded-xl border-2 transition-all duration-300 
                        ${isAvailable 
                          ? getColorClasses(category.color, isActive, false) 
                          : "border-border/50 opacity-40 cursor-not-allowed"
                        }`}
                    >
                      <span className={`text-xl sm:text-2xl ${isAvailable ? getIconColor(category.color) : "text-muted-foreground"}`}>
                        {scene.icon}
                      </span>
                      <div className="text-left">
                        <div className="font-medium text-xs sm:text-sm flex items-center gap-1.5 sm:gap-2">
                          {scene.title}
                          {!isAvailable && (
                            <span className="text-[8px] sm:text-[10px] px-1 sm:px-1.5 py-0.5 rounded bg-muted text-muted-foreground">
                              SOON
                            </span>
                          )}
                        </div>
                        <div className="text-[10px] sm:text-xs text-muted-foreground">{scene.description}</div>
                      </div>
                    </motion.button>
                  );
                })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SceneSelector;
