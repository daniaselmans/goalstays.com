import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ExternalLink, Star, TrendingUp, CheckCircle2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const platforms = [
  {
    name: 'Booking.com',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/b/be/Booking.com_logo.svg',
    description: 'World\'s leading accommodation platform',
    color: 'bg-[#003580]',
    stats: '28M+ listings',
    rating: 4.7,
  },
  {
    name: 'Hotels.com',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/5/5a/Hotels.com_logo.svg',
    description: 'Earn free nights with rewards',
    color: 'bg-[#d32f2f]',
    stats: '500K+ properties',
    rating: 4.5,
  },
  {
    name: 'Airbnb',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/6/69/Airbnb_Logo_B%C3%A9lo.svg',
    description: 'Unique stays and experiences',
    color: 'bg-[#FF5A5F]',
    stats: '7M+ listings',
    rating: 4.8,
  },
  {
    name: 'Trivago',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/0/09/Trivago.svg',
    description: 'Compare hotel prices instantly',
    color: 'bg-[#007faf]',
    stats: '5M+ hotels',
    rating: 4.4,
  },
];

const PlatformCards = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40, rotateX: -10 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 15,
      },
    },
  };

  return (
    <section className="py-20 bg-background relative overflow-hidden" ref={containerRef}>
      {/* Decorative grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
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
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-4"
          >
            <CheckCircle2 className="h-4 w-4" />
            <span className="text-sm font-medium">Trusted by millions</span>
          </motion.div>

          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Compare <span className="text-gradient">Top Platforms</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            We search all major booking sites at once, so you don't have to.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {platforms.map((platform, index) => (
            <motion.div 
              key={platform.name} 
              variants={cardVariants}
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Card className="group h-full cursor-pointer border-2 border-transparent hover:border-primary/30 transition-all duration-300 relative overflow-hidden">
                {/* Shimmer effect on hover */}
                <motion.div
                  className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"
                  style={{
                    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)',
                  }}
                />

                <CardContent className="p-6 flex flex-col h-full relative z-10">
                  {/* Logo area */}
                  <motion.div 
                    className={`${platform.color} rounded-xl p-4 mb-4 flex items-center justify-center h-20 relative overflow-hidden`}
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {/* Animated shine */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                      initial={{ x: '-100%' }}
                      whileHover={{ x: '200%' }}
                      transition={{ duration: 0.8 }}
                    />
                    <img
                      src={platform.logo}
                      alt={`${platform.name} logo`}
                      className="h-8 w-auto brightness-0 invert relative z-10"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        e.currentTarget.parentElement!.innerHTML = `<span class="text-white font-bold text-lg">${platform.name}</span>`;
                      }}
                    />
                  </motion.div>

                  {/* Info */}
                  <h3 className="font-bold text-lg text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                    {platform.name}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4 flex-grow">
                    {platform.description}
                  </p>

                  {/* Stats */}
                  <div className="flex items-center justify-between text-sm mb-4">
                    <motion.div 
                      className="flex items-center gap-1 text-muted-foreground"
                      whileHover={{ x: 3 }}
                    >
                      <TrendingUp className="h-4 w-4" />
                      <span>{platform.stats}</span>
                    </motion.div>
                    <div className="flex items-center gap-1">
                      <motion.div
                        animate={{ rotate: [0, 10, -10, 0] }}
                        transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                      >
                        <Star className="h-4 w-4 fill-accent text-accent" />
                      </motion.div>
                      <span className="font-medium text-foreground">{platform.rating}</span>
                    </div>
                  </div>

                  {/* CTA */}
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button 
                      variant="outline" 
                      className="w-full group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-all duration-300"
                    >
                      <ExternalLink className="h-4 w-4 mr-2 group-hover:rotate-12 transition-transform" />
                      View Deals
                    </Button>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default PlatformCards;
