import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

const testimonials = [
  {
    id: 1,
    name: "Sarah Mitchell",
    location: "New York, USA",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
    rating: 5,
    text: "GoalStays saved me over $400 on my Paris trip! The price comparison feature is incredible. I found a luxury hotel at half the price I was seeing on other sites.",
    trip: "Paris, France",
    savings: "$400"
  },
  {
    id: 2,
    name: "James Chen",
    location: "Toronto, Canada",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    rating: 5,
    text: "The flight comparison tool is a game-changer. I used to spend hours checking different sites, but now I get all the best deals in one place. Highly recommend!",
    trip: "Tokyo, Japan",
    savings: "$320"
  },
  {
    id: 3,
    name: "Emma Rodriguez",
    location: "London, UK",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
    rating: 5,
    text: "I've been using GoalStays for all my business trips. The price alerts feature notified me when fares dropped, and I saved 30% on my Dubai flight!",
    trip: "Dubai, UAE",
    savings: "$580"
  },
  {
    id: 4,
    name: "Michael Thompson",
    location: "Sydney, Australia",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    rating: 4,
    text: "Great platform for comparing car rentals. Found an amazing deal on an SUV for my road trip through New Zealand. The interface is super intuitive.",
    trip: "Auckland, NZ",
    savings: "$150"
  },
  {
    id: 5,
    name: "Lisa Park",
    location: "Seoul, South Korea",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face",
    rating: 5,
    text: "The AI chatbot helped me plan my entire European adventure. It suggested the best routes and found deals I never would have discovered on my own!",
    trip: "Europe Tour",
    savings: "$720"
  },
  {
    id: 6,
    name: "David Williams",
    location: "Miami, USA",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
    rating: 5,
    text: "Finally, a travel site that actually delivers on its promises. Saved $200 on my Cancun hotel booking. Will definitely use again for future trips!",
    trip: "Cancun, Mexico",
    savings: "$200"
  }
];

const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <motion.div
          key={star}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: star * 0.1, type: "spring" }}
        >
          <Star
            className={`w-4 h-4 ${
              star <= rating
                ? 'fill-amber-400 text-amber-400'
                : 'fill-muted text-muted'
            }`}
          />
        </motion.div>
      ))}
    </div>
  );
};

const TestimonialCard = ({ testimonial, index }: { testimonial: typeof testimonials[0]; index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, rotateX: -15 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1, type: "spring", stiffness: 100 }}
      whileHover={{ y: -8, scale: 1.02, transition: { duration: 0.3 } }}
      className="group relative h-full"
    >
      <div className="relative bg-card rounded-2xl p-6 border border-border/50 hover:border-primary/40 hover:shadow-2xl transition-all duration-500 h-full flex flex-col overflow-hidden">
        {/* Gradient overlay on hover */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        />
        
        {/* Quote icon with animation */}
        <motion.div 
          className="absolute top-4 right-4"
          initial={{ rotate: 0 }}
          whileHover={{ rotate: 12, scale: 1.1 }}
        >
          <Quote className="w-12 h-12 text-primary/10 group-hover:text-primary/20 transition-colors duration-300" />
        </motion.div>

        {/* Rating and savings */}
        <div className="flex items-center justify-between mb-4 relative z-10">
          <StarRating rating={testimonial.rating} />
          <motion.div 
            className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold"
            whileHover={{ scale: 1.05 }}
          >
            Saved {testimonial.savings}
          </motion.div>
        </div>

        {/* Testimonial text */}
        <p className="text-muted-foreground leading-relaxed text-sm flex-grow relative z-10">
          "{testimonial.text}"
        </p>

        {/* Trip badge */}
        <motion.div 
          className="mt-4 inline-flex items-center px-3 py-1.5 rounded-full bg-gradient-to-r from-primary/10 to-accent/10 text-primary text-xs font-medium self-start"
          whileHover={{ scale: 1.05, x: 3 }}
        >
          ✈️ {testimonial.trip}
        </motion.div>

        {/* Author */}
        <div className="mt-4 flex items-center gap-3 pt-4 border-t border-border/50 relative z-10">
          <motion.div whileHover={{ scale: 1.1 }} transition={{ type: "spring" }}>
            <Avatar className="h-12 w-12 ring-2 ring-primary/20 group-hover:ring-primary/40 transition-all">
              <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
              <AvatarFallback className="bg-primary/10 text-primary font-bold">
                {testimonial.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
          </motion.div>
          <div>
            <p className="font-semibold text-sm group-hover:text-primary transition-colors">{testimonial.name}</p>
            <p className="text-xs text-muted-foreground">{testimonial.location}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const TestimonialsSection = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 3;
  const totalPages = Math.ceil(testimonials.length / itemsPerPage);

  const visibleTestimonials = testimonials.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  return (
    <section className="py-24 bg-gradient-to-b from-muted/30 via-background to-muted/30 relative overflow-hidden" ref={containerRef}>
      {/* Animated background elements */}
      <motion.div
        className="absolute top-20 left-10 w-80 h-80 bg-primary/5 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
          x: [0, 20, 0],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.3, 0.5, 0.3],
          y: [0, -30, 0],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
            transition={{ delay: 0.2, type: "spring" }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-primary/10 to-accent/10 text-primary mb-6 border border-primary/20"
          >
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
              <Star className="w-4 h-4 fill-current" />
            </motion.div>
            <span className="text-sm font-semibold">Trusted by 50,000+ travelers</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
          >
            What Our{' '}
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]">
              Travelers Say
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            Join thousands of happy travelers who have saved money and discovered amazing deals.
          </motion.p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
          className="flex flex-wrap justify-center gap-12 mb-16"
        >
          {[
            { value: "4.9", label: "Average Rating", icon: "⭐" },
            { value: "50K+", label: "Happy Travelers", icon: "✈️" },
            { value: "$2M+", label: "Saved by Users", icon: "💰" },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.5, y: 30 }}
              animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
              transition={{ delay: 0.6 + index * 0.1, type: "spring", stiffness: 100 }}
              whileHover={{ scale: 1.1, y: -5 }}
              className="text-center group cursor-default"
            >
              <motion.div 
                className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-2"
                whileHover={{ scale: 1.05 }}
              >
                {stat.value}
              </motion.div>
              <div className="text-sm text-muted-foreground flex items-center gap-1 justify-center">
                <span>{stat.icon}</span>
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Testimonials grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {visibleTestimonials.map((testimonial, index) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} index={index} />
          ))}
        </div>

        {/* Pagination */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="flex justify-center items-center gap-4"
        >
          <Button
            variant="outline"
            size="icon"
            onClick={() => setCurrentPage(p => Math.max(0, p - 1))}
            disabled={currentPage === 0}
            className="rounded-full"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <div className="flex gap-2">
            {Array.from({ length: totalPages }).map((_, i) => (
              <motion.button
                key={i}
                onClick={() => setCurrentPage(i)}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  i === currentPage ? 'bg-primary w-8' : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                }`}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              />
            ))}
          </div>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setCurrentPage(p => Math.min(totalPages - 1, p + 1))}
            disabled={currentPage === totalPages - 1}
            className="rounded-full"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </motion.div>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.9 }}
          className="mt-16 text-center"
        >
          <p className="text-sm text-muted-foreground mb-6">Featured in</p>
          <div className="flex flex-wrap justify-center items-center gap-10">
            {['TechCrunch', 'Forbes Travel', 'Lonely Planet', 'Travel + Leisure'].map((brand, index) => (
              <motion.span 
                key={brand} 
                className="text-xl font-bold text-muted-foreground/40 hover:text-muted-foreground/70 transition-colors cursor-default"
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 1 + index * 0.1 }}
                whileHover={{ scale: 1.05, y: -2 }}
              >
                {brand}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
