import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Download, Smartphone, Share, Plus, Check, ArrowRight, Plane } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

const InstallApp = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    // Check if already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
    }

    // Check if iOS
    const isIOSDevice = /iPad|iPhone|iPod/.test(navigator.userAgent);
    setIsIOS(isIOSDevice);

    // Listen for install prompt
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === 'accepted') {
      setIsInstalled(true);
    }
    setDeferredPrompt(null);
  };

  const steps = isIOS
    ? [
        { icon: Share, text: 'Tap the Share button in Safari' },
        { icon: Plus, text: 'Scroll down and tap "Add to Home Screen"' },
        { icon: Check, text: 'Tap "Add" to install GoalStays' },
      ]
    : [
        { icon: Download, text: 'Click the install button below' },
        { icon: Check, text: 'Confirm the installation' },
        { icon: Smartphone, text: 'Open GoalStays from your home screen' },
      ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-lg hero-gradient flex items-center justify-center">
                <Plane className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="text-lg font-bold text-foreground">GoalStays</span>
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto text-center"
        >
          {/* Icon */}
          <div className="mb-8">
            <img
              src="/icon-512.png"
              alt="GoalStays App Icon"
              className="w-24 h-24 mx-auto rounded-2xl shadow-lg"
            />
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {isInstalled ? 'GoalStays is Installed!' : 'Install GoalStays'}
          </h1>
          <p className="text-lg text-muted-foreground mb-10">
            {isInstalled
              ? 'You can now access GoalStays directly from your home screen.'
              : 'Add GoalStays to your home screen for the best experience. Works offline!'}
          </p>

          {isInstalled ? (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4 }}
            >
              <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary/10 text-primary mb-8">
                <Check className="h-5 w-5" />
                <span className="font-medium">Already installed</span>
              </div>
              <div>
                <Link to="/">
                  <Button variant="hero" size="xl">
                    Open GoalStays
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </motion.div>
          ) : (
            <>
              {/* Install Steps */}
              <Card className="mb-8">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-foreground mb-6">
                    {isIOS ? 'How to install on iPhone/iPad:' : 'How to install:'}
                  </h3>
                  <div className="space-y-4">
                    {steps.map((step, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                        className="flex items-center gap-4 text-left"
                      >
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                          <step.icon className="h-5 w-5 text-primary" />
                        </div>
                        <span className="text-foreground">{step.text}</span>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Install Button (Android/Desktop) */}
              {!isIOS && deferredPrompt && (
                <Button variant="hero" size="xl" onClick={handleInstallClick}>
                  <Download className="mr-2 h-5 w-5" />
                  Install GoalStays
                </Button>
              )}

              {/* Fallback for desktop without prompt */}
              {!isIOS && !deferredPrompt && (
                <p className="text-sm text-muted-foreground">
                  Use your browser menu to install this app, or visit on mobile for the best experience.
                </p>
              )}
            </>
          )}

          {/* Features */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: 'Works Offline', desc: 'Access your saved searches anytime' },
              { title: 'Fast & Smooth', desc: 'Native app-like performance' },
              { title: 'No App Store', desc: 'Install directly from browser' },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                className="p-4 rounded-xl bg-secondary/50"
              >
                <h4 className="font-semibold text-foreground mb-1">{feature.title}</h4>
                <p className="text-sm text-muted-foreground">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default InstallApp;
