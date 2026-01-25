import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Smartphone, X, Download, Zap, Wifi } from 'lucide-react';
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
          <div className="relative bg-gradient-to-r from-primary to-accent rounded-2xl p-4 shadow-2xl">
            {/* Dismiss button */}
            <button
              onClick={handleDismiss}
              className="absolute top-2 right-2 p-1 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
              aria-label="Dismiss"
            >
              <X className="w-4 h-4 text-white" />
            </button>

            <div className="flex items-start gap-4">
              {/* App icon */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
                className="flex-shrink-0 w-14 h-14 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center"
              >
                <Smartphone className="w-7 h-7 text-white" />
              </motion.div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <h3 className="text-white font-bold text-lg leading-tight">
                  Get the GoalStays App
                </h3>
                <div className="flex flex-wrap gap-2 mt-1 mb-3">
                  <span className="inline-flex items-center gap-1 text-xs text-white/80">
                    <Zap className="w-3 h-3" /> Faster
                  </span>
                  <span className="inline-flex items-center gap-1 text-xs text-white/80">
                    <Wifi className="w-3 h-3" /> Works offline
                  </span>
                  <span className="inline-flex items-center gap-1 text-xs text-white/80">
                    <Download className="w-3 h-3" /> No app store
                  </span>
                </div>

                <Button
                  onClick={handleInstall}
                  size="sm"
                  className="bg-white text-primary hover:bg-white/90 font-semibold rounded-full px-6"
                >
                  Install Free
                </Button>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full blur-xl pointer-events-none" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AppInstallBanner;
