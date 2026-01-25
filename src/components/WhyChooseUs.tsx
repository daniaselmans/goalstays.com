import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Plane, Shield, DollarSign, Clock, Zap, Award } from 'lucide-react';

const features = [
  {
    icon: DollarSign,
    title: 'Best Price Guaranteed',
    description: 'We compare prices across all major platforms to find you the lowest rates.',
    color: 'from-green-500 to-emerald-600',
  },
  {
    icon: Shield,
    title: 'Secure Booking',
    description: 'Book directly with trusted partners for secure and protected transactions.',
    color: 'from-blue-500 to-cyan-600',
  },
  {
    icon: Clock,
    title: 'Save Time',
    description: 'No more tab-hopping. Search once, see all results in one place.',
    color: 'from-purple-500 to-violet-600',
  },
  {
    icon: Plane,
    title: 'Travel Perks',
    description: 'Exclusive deals and loyalty rewards when booking through our platform.',
    color: 'from-orange-500 to-amber-600',
  },
];

const stats = [
  { value: '50+', label: 'Booking Sites', icon: Zap },
  { value: '10M+', label: 'Happy Travelers', icon: Award },
  { value: '60%', label: 'Average Savings', icon: DollarSign },
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
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
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
    <section className="py-20 bg-background relative overflow-hidden" ref={containerRef}>
      {/* Animated background elements */}
      <motion.div
        className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Why <span className="text-gradient">GoalStay</span>?
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            The smarter way to book your perfect accommodation.
          </p>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-3 gap-4 md:gap-8 max-w-2xl mx-auto mb-16"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="text-center"
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + index * 0.1, type: "spring" }}
            >
              <motion.div
                className="text-3xl md:text-4xl font-bold text-gradient mb-1"
                whileHover={{ scale: 1.1 }}
              >
                {stat.value}
              </motion.div>
              <div className="text-xs md:text-sm text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className="text-center group"
            >
              <motion.div
                className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} mb-6 relative`}
                whileHover={{ 
                  scale: 1.1,
                  rotate: [0, -5, 5, 0],
                }}
                transition={{ duration: 0.3 }}
              >
                {/* Glow effect */}
                <motion.div
                  className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${feature.color} blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-500`}
                />
                <feature.icon className="h-8 w-8 text-white relative z-10" />
              </motion.div>
              
              <h3 className="font-bold text-xl text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
