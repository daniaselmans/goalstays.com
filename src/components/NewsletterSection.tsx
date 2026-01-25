import { useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Mail, Send, Sparkles, Plane, Gift, CheckCircle2, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

const NewsletterSection = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setIsSubmitting(true);
    
    try {
      const { error } = await supabase
        .from('newsletter_subscribers')
        .insert({ email: email.trim().toLowerCase() });

      if (error) {
        if (error.code === '23505') {
          toast({
            title: "Already subscribed! 📬",
            description: "This email is already on our list.",
          });
        } else {
          throw error;
        }
      } else {
        setIsSubscribed(true);
        toast({
          title: "You're subscribed! ✈️",
          description: "Get ready for exclusive travel deals in your inbox.",
        });
      }
      
      setEmail('');
    } catch (error) {
      console.error('Newsletter subscription error:', error);
      toast({
        title: "Something went wrong",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const benefits = [
    { icon: Gift, text: "Exclusive deals up to 50% off", color: "from-pink-500 to-rose-500" },
    { icon: Plane, text: "Early access to flash sales", color: "from-blue-500 to-cyan-500" },
    { icon: Bell, text: "Price drop notifications", color: "from-amber-500 to-orange-500" },
    { icon: Sparkles, text: "Personalized recommendations", color: "from-purple-500 to-violet-500" },
  ];

  return (
    <section className="py-24 relative overflow-hidden" ref={containerRef}>
      {/* Rich gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/10" />
      
      {/* Animated mesh gradient */}
      <motion.div
        className="absolute inset-0 opacity-30"
        style={{
          background: 'radial-gradient(circle at 20% 50%, hsl(var(--primary) / 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 50%, hsl(var(--accent) / 0.15) 0%, transparent 50%)',
        }}
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />
      
      {/* Floating decorative elements */}
      <motion.div
        className="absolute top-10 left-[10%] w-32 h-32 rounded-full bg-primary/20 blur-2xl"
        animate={{
          y: [0, -30, 0],
          x: [0, 15, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-10 right-[10%] w-40 h-40 rounded-full bg-accent/20 blur-2xl"
        animate={{
          y: [0, 25, 0],
          x: [0, -20, 0],
          scale: [1.2, 1, 1.2],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gradient-to-r from-primary/5 to-accent/5 blur-3xl"
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
      />

      {/* Floating icons */}
      {[Plane, Gift, Sparkles].map((Icon, i) => (
        <motion.div
          key={i}
          className="absolute hidden lg:block"
          style={{
            left: `${15 + i * 35}%`,
            top: `${20 + (i % 2) * 50}%`,
          }}
          animate={{
            y: [0, -20, 0],
            rotate: [0, 10, -10, 0],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 5 + i,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.5,
          }}
        >
          <Icon className="w-8 h-8 text-primary/20" />
        </motion.div>
      ))}

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          {/* Card container */}
          <div className="relative bg-card/80 backdrop-blur-xl rounded-3xl p-8 md:p-12 border border-border/50 shadow-2xl overflow-hidden">
            {/* Inner glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 pointer-events-none" />
            
            <div className="relative z-10 text-center">
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
                transition={{ delay: 0.2, type: "spring" }}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-primary/20 to-accent/20 text-primary mb-8 border border-primary/20"
              >
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Mail className="w-4 h-4" />
                </motion.div>
                <span className="text-sm font-semibold">Join 50,000+ travelers</span>
              </motion.div>

              {/* Heading */}
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 }}
                className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4"
              >
                Never Miss a{' '}
                <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]">
                  Great Deal
                </span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.4 }}
                className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto"
              >
                Subscribe to our newsletter and be the first to know about exclusive discounts, 
                flash sales, and personalized travel recommendations.
              </motion.p>

              {/* Benefits */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.5 }}
                className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10"
              >
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={benefit.text}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    whileHover={{ scale: 1.05, y: -3 }}
                    className="flex flex-col items-center gap-2 p-4 rounded-xl bg-background/50 border border-border/50 hover:border-primary/30 transition-all"
                  >
                    <motion.div 
                      className={`w-10 h-10 rounded-xl bg-gradient-to-br ${benefit.color} flex items-center justify-center shadow-lg`}
                      whileHover={{ rotate: [0, -10, 10, 0] }}
                      transition={{ duration: 0.5 }}
                    >
                      <benefit.icon className="w-5 h-5 text-white" />
                    </motion.div>
                    <span className="text-xs text-muted-foreground text-center leading-tight">{benefit.text}</span>
                  </motion.div>
                ))}
              </motion.div>

              {/* Form */}
              {!isSubscribed ? (
                <motion.form
                  onSubmit={handleSubmit}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.7 }}
                  className="max-w-lg mx-auto"
                >
                  <div className="flex flex-col sm:flex-row gap-3">
                    <div className="relative flex-1">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                      <Input
                        type="email"
                        placeholder="Enter your email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="h-14 pl-12 pr-4 rounded-xl text-base bg-background/80 backdrop-blur-sm border-border/50 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                        required
                      />
                    </div>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button
                        type="submit"
                        variant="hero"
                        size="lg"
                        disabled={isSubmitting}
                        className="h-14 px-8 rounded-xl w-full sm:w-auto min-w-[160px] relative overflow-hidden group"
                      >
                        {/* Shimmer effect */}
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"
                        />
                        {isSubmitting ? (
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          >
                            <Send className="w-5 h-5" />
                          </motion.div>
                        ) : (
                          <>
                            <span>Subscribe</span>
                            <Send className="w-5 h-5 ml-2" />
                          </>
                        )}
                      </Button>
                    </motion.div>
                  </div>
                </motion.form>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center gap-4 p-6 rounded-2xl bg-primary/10 border border-primary/20"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", delay: 0.2 }}
                  >
                    <CheckCircle2 className="w-12 h-12 text-primary" />
                  </motion.div>
                  <div className="text-center">
                    <p className="font-semibold text-lg">You're all set! 🎉</p>
                    <p className="text-muted-foreground">Check your inbox for exclusive deals.</p>
                  </div>
                </motion.div>
              )}

              {/* Trust text */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ delay: 0.8 }}
                className="text-xs text-muted-foreground mt-6"
              >
                🔒 We respect your privacy. Unsubscribe anytime with one click.
              </motion.p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default NewsletterSection;
