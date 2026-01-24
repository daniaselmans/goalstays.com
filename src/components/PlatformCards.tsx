import { motion } from 'framer-motion';
import { ExternalLink, Star, TrendingUp } from 'lucide-react';
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
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut' as const,
      },
    },
  };

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
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
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {platforms.map((platform) => (
            <motion.div key={platform.name} variants={cardVariants}>
              <Card className="group h-full hover:shadow-lg hover:-translate-y-1 cursor-pointer border-2 hover:border-primary/50">
                <CardContent className="p-6 flex flex-col h-full">
                  {/* Logo area */}
                  <div className={`${platform.color} rounded-lg p-4 mb-4 flex items-center justify-center h-20`}>
                    <img
                      src={platform.logo}
                      alt={`${platform.name} logo`}
                      className="h-8 w-auto brightness-0 invert"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        e.currentTarget.parentElement!.innerHTML = `<span class="text-white font-bold text-lg">${platform.name}</span>`;
                      }}
                    />
                  </div>

                  {/* Info */}
                  <h3 className="font-bold text-lg text-foreground mb-2">
                    {platform.name}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4 flex-grow">
                    {platform.description}
                  </p>

                  {/* Stats */}
                  <div className="flex items-center justify-between text-sm mb-4">
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <TrendingUp className="h-4 w-4" />
                      <span>{platform.stats}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-accent text-accent" />
                      <span className="font-medium text-foreground">{platform.rating}</span>
                    </div>
                  </div>

                  {/* CTA */}
                  <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    View Deals
                  </Button>
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
