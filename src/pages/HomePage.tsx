import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import AnimationLayout from "@/components/layout/AnimationLayout";
import { ArrowRight } from "lucide-react";

interface AnimationCard {
  id: string;
  title: string;
  description: string;
  path: string;
  category: string;
  gradient: string;
  icon: string;
}

const animations: AnimationCard[] = [
  // Fondamenti
  {
    id: "variables",
    title: "Variabili",
    description: "Contenitori dinamici che memorizzano e modificano valori",
    path: "/animations/variables",
    category: "Fondamenti",
    gradient: "from-blue-500 to-cyan-500",
    icon: "📦",
  },
  // Selezione
  {
    id: "if-else",
    title: "IF / ELSE",
    description: "Decisione binaria con due percorsi possibili",
    path: "/animations/if-else",
    category: "Selezione",
    gradient: "from-violet-500 to-purple-500",
    icon: "🔀",
  },
  {
    id: "if-else-if",
    title: "IF / ELSE IF / ELSE",
    description: "Valutazione sequenziale a cascata di condizioni",
    path: "/animations/if-else-if",
    category: "Selezione",
    gradient: "from-purple-500 to-pink-500",
    icon: "🔃",
  },
  {
    id: "switch",
    title: "SWITCH / CASE",
    description: "Selezione multipla con percorsi paralleli",
    path: "/animations/switch",
    category: "Selezione",
    gradient: "from-pink-500 to-rose-500",
    icon: "🎛️",
  },
  // Iterazione
  {
    id: "for-loop",
    title: "FOR Loop",
    description: "Ripetizione controllata con contatore",
    path: "/animations/for-loop",
    category: "Iterazione",
    gradient: "from-green-500 to-emerald-500",
    icon: "🔁",
  },
  // Strutture Dati
  {
    id: "arrays",
    title: "Array / Liste",
    description: "Strutture lineari con inserimento e rimozione",
    path: "/animations/arrays",
    category: "Strutture Dati",
    gradient: "from-amber-500 to-orange-500",
    icon: "📊",
  },
  // Astrazione
  {
    id: "functions",
    title: "Funzioni",
    description: "Blocchi riutilizzabili con input e output",
    path: "/animations/functions",
    category: "Astrazione",
    gradient: "from-teal-500 to-cyan-500",
    icon: "⚡",
  },
  // Reattività
  {
    id: "events",
    title: "Eventi",
    description: "Trigger, listener e callback reattivi",
    path: "/animations/events",
    category: "Reattività",
    gradient: "from-rose-500 to-red-500",
    icon: "🎯",
  },
  // Ordinamento
  {
    id: "bubble-sort",
    title: "Bubble Sort",
    description: "Elementi adiacenti confrontati e scambiati",
    path: "/animations/bubble-sort",
    category: "Ordinamento",
    gradient: "from-orange-500 to-red-500",
    icon: "🫧",
  },
  // Integrazione
  {
    id: "complete-flow",
    title: "Flusso Completo",
    description: "Tutti i costrutti insieme in un algoritmo reale",
    path: "/animations/complete-flow",
    category: "Integrazione",
    gradient: "from-violet-500 to-fuchsia-500",
    icon: "🔗",
  },
];

const categories = [
  { id: "fondamenti", label: "Fondamenti", color: "text-cyan-400" },
  { id: "selezione", label: "Selezione", color: "text-purple-400" },
  { id: "iterazione", label: "Iterazione", color: "text-green-400" },
  { id: "strutture-dati", label: "Strutture Dati", color: "text-orange-400" },
  { id: "astrazione", label: "Astrazione", color: "text-teal-400" },
  { id: "reattivita", label: "Reattività", color: "text-rose-400" },
  { id: "ordinamento", label: "Ordinamento", color: "text-red-400" },
  { id: "integrazione", label: "Integrazione", color: "text-fuchsia-400" },
];

const getCategoryColor = (categoryLabel: string) => {
  return categories.find(c => c.label === categoryLabel)?.color || "text-muted-foreground";
};

const HomePage = () => {
  return (
    <AnimationLayout title="Algoritmi Visuali" description="Esplora e comprendi i concetti di programmazione attraverso animazioni interattive">
      <div className="flex flex-col gap-8 sm:gap-12">
        {/* Animation cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {animations.map((animation, index) => (
            <Link key={animation.id} to={animation.path}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.02, y: -5 }}
                whileTap={{ scale: 0.98 }}
                className="group glass rounded-2xl p-5 sm:p-6 cursor-pointer border border-border/50 hover:border-primary/50 transition-all h-full"
              >
                <div className="flex items-start justify-between mb-4">
                  <motion.div 
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${animation.gradient} flex items-center justify-center text-2xl`}
                    whileHover={{ rotate: [0, -10, 10, 0] }}
                    transition={{ duration: 0.5 }}
                  >
                    {animation.icon}
                  </motion.div>
                  <motion.div
                    className="w-8 h-8 rounded-full bg-muted flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    <ArrowRight className="w-4 h-4" />
                  </motion.div>
                </div>
                
                <span className={`text-xs font-mono ${getCategoryColor(animation.category)}`}>
                  {animation.category}
                </span>
                
                <h3 className="font-bold text-lg mt-1 mb-2 group-hover:text-primary transition-colors">
                  {animation.title}
                </h3>
                
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {animation.description}
                </p>
              </motion.div>
            </Link>
          ))}

          {/* Coming soon card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: animations.length * 0.05 }}
            className="glass rounded-2xl p-5 sm:p-6 border border-dashed border-border/50 flex flex-col items-center justify-center text-center min-h-[180px]"
          >
            <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center text-2xl mb-4">
              ✨
            </div>
            <h3 className="font-bold text-lg text-muted-foreground">Prossimamente</h3>
            <p className="text-sm text-muted-foreground/70 mt-2">
              Altre animazioni in arrivo...
            </p>
          </motion.div>
        </div>

        {/* Categories overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass rounded-2xl p-5 sm:p-6"
        >
          <h3 className="font-mono text-sm font-bold text-primary mb-4">Categorie</h3>
          <div className="flex flex-wrap gap-3">
            {categories.map((cat) => (
              <div 
                key={cat.id} 
                className={`px-4 py-2 rounded-full bg-muted/50 text-sm ${cat.color} font-mono`}
              >
                {cat.label}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </AnimationLayout>
  );
};

export default HomePage;
