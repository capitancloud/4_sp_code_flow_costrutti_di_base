import { ReactNode } from "react";
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import LogoutButton from "@/components/LogoutButton";

interface AnimationLayoutProps {
  children: ReactNode;
  title: string;
  description?: string;
}

// Floating particles component
const FloatingParticles = () => {
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const particleCount = isMobile ? 10 : 20;
  
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {[...Array(particleCount)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            background: i % 3 === 0 
              ? 'hsl(var(--primary) / 0.3)' 
              : i % 3 === 1 
                ? 'hsl(var(--secondary) / 0.2)'
                : 'hsl(var(--accent) / 0.2)',
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
};

const AnimationLayout = ({ children, title, description }: AnimationLayoutProps) => {
  const location = useLocation();
  const isHome = location.pathname === "/";

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
              {!isHome && (
                <Link to="/">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-10 h-10 rounded-xl flex items-center justify-center glass hover:bg-primary/10 transition-colors"
                  >
                    <ArrowLeft className="w-5 h-5" />
                  </motion.button>
                </Link>
              )}
              
              <Link to="/" className="flex items-center gap-2 sm:gap-4">
                <motion.div 
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl flex items-center justify-center relative overflow-hidden"
                  style={{ background: 'var(--gradient-primary)' }}
                  whileHover={{ scale: 1.05, rotate: 5 }}
                  animate={{ 
                    boxShadow: [
                      '0 0 20px hsl(var(--primary) / 0.3)',
                      '0 0 40px hsl(var(--primary) / 0.5)',
                      '0 0 20px hsl(var(--primary) / 0.3)',
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
              </Link>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-4"
            >
              <div className="text-xs sm:text-sm text-muted-foreground hidden md:flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
                Programmazione visuale interattiva
              </div>
              <LogoutButton />
            </motion.div>
          </div>
        </div>
      </header>

      {/* Page Title */}
      <div className="container mx-auto px-3 sm:px-4 pt-6 sm:pt-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-6 sm:mb-8"
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-gradient-primary mb-2">{title}</h2>
          {description && (
            <p className="text-sm sm:text-base text-muted-foreground max-w-xl mx-auto">{description}</p>
          )}
        </motion.div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-2 sm:px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ 
            duration: 0.4, 
            type: "spring", 
            stiffness: 100,
            damping: 20 
          }}
          className="max-w-4xl mx-auto"
        >
          {children}
        </motion.div>
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

export default AnimationLayout;
