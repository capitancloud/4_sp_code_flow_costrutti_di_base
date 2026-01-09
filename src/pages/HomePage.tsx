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
  // Sorting
  {
    id: "bubble-sort",
    title: "Bubble Sort",
    description: "Elementi adiacenti confrontati e scambiati fino all'ordine",
    path: "/animations/bubble-sort",
    category: "Ordinamento",
    gradient: "from-orange-500 to-red-500",
    icon: "🫧",
  },
  // More to come...
];

const categories = [
  { id: "sorting", label: "Ordinamento", color: "text-orange-400" },
  { id: "search", label: "Ricerca", color: "text-blue-400" },
  { id: "data-structures", label: "Strutture Dati", color: "text-purple-400" },
  { id: "graphs", label: "Grafi", color: "text-green-400" },
];

const HomePage = () => {
  const groupedAnimations = categories.map(cat => ({
    ...cat,
    items: animations.filter(a => a.category === cat.label),
  })).filter(cat => cat.items.length > 0);

  return (
    <AnimationLayout title="Algoritmi Visuali" description="Esplora e comprendi gli algoritmi attraverso animazioni interattive">
      <div className="flex flex-col gap-8 sm:gap-12">
        {/* Hero cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {animations.map((animation, index) => (
            <Link key={animation.id} to={animation.path}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02, y: -5 }}
                whileTap={{ scale: 0.98 }}
                className="group glass rounded-2xl p-5 sm:p-6 cursor-pointer border border-border/50 hover:border-primary/50 transition-all"
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
                
                <span className={`text-xs font-mono ${categories.find(c => c.label === animation.category)?.color || 'text-muted-foreground'}`}>
                  {animation.category}
                </span>
                
                <h3 className="font-bold text-lg mt-1 mb-2 group-hover:text-primary transition-colors">
                  {animation.title}
                </h3>
                
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {animation.description}
                </p>

                {/* Animated bar preview */}
                <div className="flex items-end gap-1 h-8 mt-4">
                  {[4, 7, 2, 9, 5, 3, 8].map((h, i) => (
                    <motion.div
                      key={i}
                      className={`flex-1 rounded-t bg-gradient-to-t ${animation.gradient} opacity-30 group-hover:opacity-60`}
                      style={{ height: `${h * 10}%` }}
                      animate={{ 
                        height: [`${h * 10}%`, `${((h + 3) % 10) * 10}%`, `${h * 10}%`],
                      }}
                      transition={{ 
                        duration: 2, 
                        delay: i * 0.1, 
                        repeat: Infinity,
                        ease: "easeInOut" 
                      }}
                    />
                  ))}
                </div>
              </motion.div>
            </Link>
          ))}

          {/* Coming soon card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: animations.length * 0.1 }}
            className="glass rounded-2xl p-5 sm:p-6 border border-dashed border-border/50 flex flex-col items-center justify-center text-center min-h-[200px]"
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
