import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Smartphone, X, Download, Zap, Wifi, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const AppInstallBanner = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if already dismissed in this session
    const dismissed = sessionStorage.getItem('app-banner-dismissed');
    if (dismissed) {
      setIsDismissed(true);
      return;
    }

    // Check if running as installed PWA
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
    if (isStandalone) {
      return;
    }

    // Show banner after a short delay
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    setIsDismissed(true);
    sessionStorage.setItem('app-banner-dismissed', 'true');
  };

  const handleInstall = () => {
    navigate('/install');
  };

  if (isDismissed) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4 md:hidden"
        >
          <div className="relative overflow-hidden rounded-2xl shadow-2xl">
            {/* Gradient background */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_100%] animate-gradient" />
            
            {/* Overlay pattern */}
            <div 
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
                backgroundSize: '16px 16px',
              }}
            />

            {/* Content */}
            <div className="relative p-4">
              {/* Dismiss button */}
              <motion.button
                onClick={handleDismiss}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="absolute top-2 right-2 p-1.5 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
                aria-label="Dismiss"
              >
                <X className="w-4 h-4 text-white" />
              </motion.button>

              <div className="flex items-start gap-4">
                {/* App icon */}
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  className="flex-shrink-0 w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center relative"
                >
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <Smartphone className="w-8 h-8 text-white" />
                  </motion.div>
                  {/* Notification badge */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.5, type: "spring" }}
                    className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-white flex items-center justify-center"
                  >
                    <Star className="w-3 h-3 text-primary fill-current" />
                  </motion.div>
                </motion.div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <motion.h3 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-white font-bold text-lg leading-tight"
                  >
                    Get the GoalStays App
                  </motion.h3>
                  
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="flex flex-wrap gap-3 mt-2 mb-3"
                  >
                    {[
                      { icon: Zap, text: "Faster" },
                      { icon: Wifi, text: "Offline" },
                      { icon: Download, text: "Free" },
                    ].map((item, i) => (
                      <motion.span 
                        key={item.text}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 + i * 0.1 }}
                        className="inline-flex items-center gap-1 text-xs text-white/90 bg-white/10 px-2 py-1 rounded-full"
                      >
                        <item.icon className="w-3 h-3" />
                        {item.text}
                      </motion.span>
                    ))}
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      onClick={handleInstall}
                      size="sm"
                      className="bg-white text-primary hover:bg-white/90 font-bold rounded-full px-6 shadow-lg"
                    >
                      Install Now
                    </Button>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AppInstallBanner;
