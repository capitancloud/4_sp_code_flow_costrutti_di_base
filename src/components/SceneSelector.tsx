import { motion } from "framer-motion";

interface Scene {
  id: string;
  title: string;
  icon: string;
  description: string;
  color: "primary" | "secondary" | "accent" | "warning";
}

const scenes: Scene[] = [
  { id: "if-else", title: "IF / ELSE", icon: "⑂", description: "Decisione binaria", color: "primary" },
  { id: "for-loop", title: "FOR Loop", icon: "↻", description: "Ripetizione controllata", color: "secondary" },
  { id: "variables", title: "Variabili", icon: "□", description: "Memoria e stato", color: "accent" },
  { id: "functions", title: "Funzioni", icon: "ƒ", description: "Input → Output", color: "warning" },
];

interface SceneSelectorProps {
  currentScene: string;
  onSceneChange: (sceneId: string) => void;
}

const SceneSelector = ({ currentScene, onSceneChange }: SceneSelectorProps) => {
  const getColorClasses = (color: Scene["color"], isActive: boolean) => {
    const base = {
      primary: isActive ? "border-primary bg-primary/10 text-primary" : "border-border hover:border-primary/50",
      secondary: isActive ? "border-secondary bg-secondary/10 text-secondary" : "border-border hover:border-secondary/50",
      accent: isActive ? "border-accent bg-accent/10 text-accent" : "border-border hover:border-accent/50",
      warning: isActive ? "border-warning bg-warning/10 text-warning" : "border-border hover:border-warning/50",
    };
    return base[color];
  };

  const getIconColor = (color: Scene["color"]) => {
    const colors = {
      primary: "text-primary",
      secondary: "text-secondary",
      accent: "text-accent",
      warning: "text-warning",
    };
    return colors[color];
  };

  return (
    <div className="flex flex-wrap gap-3 justify-center">
      {scenes.map((scene, index) => {
        const isActive = currentScene === scene.id;
        return (
          <motion.button
            key={scene.id}
            onClick={() => onSceneChange(scene.id)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`flex items-center gap-3 px-5 py-3 rounded-xl border-2 transition-all duration-300 ${getColorClasses(scene.color, isActive)}`}
          >
            <span className={`text-2xl ${getIconColor(scene.color)}`}>{scene.icon}</span>
            <div className="text-left">
              <div className="font-medium text-sm">{scene.title}</div>
              <div className="text-xs text-muted-foreground">{scene.description}</div>
            </div>
          </motion.button>
        );
      })}
    </div>
  );
};

export default SceneSelector;
