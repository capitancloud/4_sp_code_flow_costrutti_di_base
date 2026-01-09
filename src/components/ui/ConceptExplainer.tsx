import { motion } from "framer-motion";
import { Lightbulb, BookOpen, Code2, Zap } from "lucide-react";

interface ConceptExplainerProps {
  title: string;
  description: string;
  codeExample?: string;
  keyPoints?: string[];
  variant?: "default" | "compact";
}

const ConceptExplainer = ({ 
  title, 
  description, 
  codeExample, 
  keyPoints,
  variant = "default"
}: ConceptExplainerProps) => {
  if (variant === "compact") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="glass rounded-2xl p-4 sm:p-5"
      >
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-lg bg-primary/10 text-primary">
            <Lightbulb className="w-4 h-4" />
          </div>
          <div className="flex-1">
            <h3 className="font-mono text-sm font-bold text-primary mb-1">{title}</h3>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              {description}
            </p>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="glass rounded-2xl p-4 sm:p-6 space-y-4"
    >
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-xl bg-primary/10 text-primary">
          <BookOpen className="w-5 h-5" />
        </div>
        <h3 className="font-mono text-sm sm:text-base font-bold text-primary">{title}</h3>
      </div>

      {/* Description */}
      <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
        {description}
      </p>

      {/* Code Example */}
      {codeExample && (
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Code2 className="w-3 h-3" />
            <span>Esempio</span>
          </div>
          <pre className="bg-background/50 rounded-xl p-3 sm:p-4 font-mono text-xs sm:text-sm overflow-x-auto border border-border/50">
            <code className="text-foreground whitespace-pre-wrap">{codeExample}</code>
          </pre>
        </div>
      )}

      {/* Key Points */}
      {keyPoints && keyPoints.length > 0 && (
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Zap className="w-3 h-3" />
            <span>Punti chiave</span>
          </div>
          <ul className="grid gap-2">
            {keyPoints.map((point, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className="flex items-start gap-2 text-xs sm:text-sm"
              >
                <span className="w-5 h-5 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs font-mono flex-shrink-0 mt-0.5">
                  {index + 1}
                </span>
                <span className="text-muted-foreground">{point}</span>
              </motion.li>
            ))}
          </ul>
        </div>
      )}
    </motion.div>
  );
};

export default ConceptExplainer;
