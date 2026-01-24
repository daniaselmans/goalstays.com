import { motion } from 'framer-motion';
import { Plane, Shield, DollarSign, Clock } from 'lucide-react';

const features = [
  {
    icon: DollarSign,
    title: 'Best Price Guaranteed',
    description: 'We compare prices across all major platforms to find you the lowest rates.',
  },
  {
    icon: Shield,
    title: 'Secure Booking',
    description: 'Book directly with trusted partners for secure and protected transactions.',
  },
  {
    icon: Clock,
    title: 'Save Time',
    description: 'No more tab-hopping. Search once, see all results in one place.',
  },
  {
    icon: Plane,
    title: 'Travel Perks',
    description: 'Exclusive deals and loyalty rewards when booking through our platform.',
  },
];

const WhyChooseUs = () => {
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
            Why <span className="text-gradient">StayHub</span>?
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            The smarter way to book your perfect accommodation.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center group"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl hero-gradient mb-6 group-hover:shadow-glow transition-shadow duration-300">
                <feature.icon className="h-8 w-8 text-primary-foreground" />
              </div>
              <h3 className="font-bold text-xl text-foreground mb-3">
                {feature.title}
              </h3>
              <p className="text-muted-foreground">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
