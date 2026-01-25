import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Plane, Shield, DollarSign, Clock, Zap, Award, Globe, HeartHandshake } from 'lucide-react';

const features = [
  {
    icon: DollarSign,
    title: 'Best Price Guaranteed',
    description: 'We compare prices across all major platforms to find you the lowest rates.',
    color: 'from-emerald-500 to-green-600',
    bgColor: 'bg-emerald-500/10',
  },
  {
    icon: Shield,
    title: 'Secure Booking',
    description: 'Book directly with trusted partners for secure and protected transactions.',
    color: 'from-blue-500 to-cyan-600',
    bgColor: 'bg-blue-500/10',
  },
  {
    icon: Clock,
    title: 'Save Time',
    description: 'No more tab-hopping. Search once, see all results in one place.',
    color: 'from-purple-500 to-violet-600',
    bgColor: 'bg-purple-500/10',
  },
  {
    icon: Plane,
    title: 'Travel Perks',
    description: 'Exclusive deals and loyalty rewards when booking through our platform.',
    color: 'from-orange-500 to-amber-600',
    bgColor: 'bg-orange-500/10',
  },
];

const stats = [
  { value: '50+', label: 'Booking Sites', icon: Globe, color: 'text-blue-500' },
  { value: '10M+', label: 'Happy Travelers', icon: HeartHandshake, color: 'text-pink-500' },
  { value: '60%', label: 'Average Savings', icon: DollarSign, color: 'text-emerald-500' },
];

const WhyChooseUs = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 12,
      },
    },
  };

  return (
    <section className="py-24 bg-gradient-to-b from-background via-muted/20 to-background relative overflow-hidden" ref={containerRef}>
      {/* Animated background elements */}
      <motion.div
        className="absolute top-20 left-10 w-80 h-80 bg-primary/5 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.5, 0.3],
          x: [0, 30, 0],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.3, 0.6, 0.3],
          y: [0, -40, 0],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />
      
      {/* Grid pattern overlay */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--foreground)) 1px, transparent 0)`,
          backgroundSize: '40px 40px',
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
            transition={{ delay: 0.2, type: "spring" }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-primary/10 to-accent/10 text-primary mb-6 border border-primary/20"
          >
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            >
              <Zap className="h-4 w-4" />
            </motion.div>
            <span className="text-sm font-semibold">Why travelers love us</span>
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
            className="text-4xl md:text-5xl font-bold text-foreground mb-4"
          >
            Why{' '}
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]">
              GoalStay
            </span>
            ?
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4 }}
            className="text-muted-foreground text-lg max-w-2xl mx-auto"
          >
            The smarter way to book your perfect travel experience.
          </motion.p>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-3 gap-4 md:gap-8 max-w-3xl mx-auto mb-20"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="text-center group"
              initial={{ opacity: 0, scale: 0.5, y: 30 }}
              animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
              transition={{ delay: 0.5 + index * 0.1, type: "spring", stiffness: 100 }}
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <motion.div
                className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-card border border-border/50 flex items-center justify-center mx-auto mb-3 group-hover:border-primary/30 group-hover:shadow-lg transition-all"
                whileHover={{ rotate: [0, -5, 5, 0] }}
                transition={{ duration: 0.3 }}
              >
                <stat.icon className={`w-7 h-7 ${stat.color}`} />
              </motion.div>
              <motion.div
                className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-1"
                whileHover={{ scale: 1.05 }}
              >
                {stat.value}
              </motion.div>
              <div className="text-xs md:text-sm text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Features grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              variants={itemVariants}
              whileHover={{ y: -10, scale: 1.02 }}
              className="group relative"
            >
              <div className="bg-card rounded-2xl p-6 border border-border/50 hover:border-primary/30 transition-all duration-500 hover:shadow-2xl h-full relative overflow-hidden">
                {/* Background gradient on hover */}
                <motion.div
                  className={`absolute inset-0 ${feature.bgColor} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                />
                
                {/* Content */}
                <div className="relative z-10">
                  <motion.div
                    className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.color} mb-6 relative shadow-lg`}
                    whileHover={{ 
                      scale: 1.1,
                      rotate: [0, -10, 10, 0],
                    }}
                    transition={{ duration: 0.4 }}
                  >
                    {/* Glow effect */}
                    <motion.div
                      className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${feature.color} blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-500`}
                    />
                    <feature.icon className="h-7 w-7 text-white relative z-10" />
                  </motion.div>
                  
                  <h3 className="font-bold text-xl text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.9 }}
          className="mt-16 text-center"
        >
          <motion.div
            className="inline-flex items-center gap-2 text-muted-foreground"
            whileHover={{ scale: 1.05 }}
          >
            <Award className="w-5 h-5 text-primary" />
            <span>Rated #1 Travel Comparison Platform 2024</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
