import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { HelpCircle, MessageCircle, ArrowRight } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';

const faqs = [
  {
    question: 'How does GoalStay find the best prices?',
    answer: 'GoalStay searches over 50 booking platforms simultaneously, including Booking.com, Airbnb, Hotels.com, Skyscanner, and more. Our advanced algorithms compare prices in real-time to ensure you always see the lowest available rates for hotels, flights, and car rentals.',
    icon: '🔍',
  },
  {
    question: 'Is it free to use GoalStay?',
    answer: 'Yes, GoalStay is completely free for travelers! We earn a small commission from our partner booking sites when you make a reservation, so there are no hidden fees or charges to you. You pay the same price as booking directly.',
    icon: '💸',
  },
  {
    question: 'How do price alerts work?',
    answer: 'Set your target price for any hotel, flight, or car rental, and we\'ll monitor prices 24/7. When prices drop to or below your target, you\'ll receive an instant notification via email or push notification so you never miss a deal.',
    icon: '🔔',
  },
  {
    question: 'Can I book directly through GoalStay?',
    answer: 'GoalStay is a comparison platform that redirects you to the booking site with the best price. This ensures you book directly with trusted partners like Booking.com, Expedia, or the airline/hotel itself, giving you full customer support and booking protections.',
    icon: '🎯',
  },
  {
    question: 'Are the prices shown final prices?',
    answer: 'We strive to show final prices including taxes and fees whenever possible. However, some booking sites may add additional charges at checkout. We recommend verifying the total before completing your booking on the partner site.',
    icon: '💰',
  },
  {
    question: 'How do I cancel or modify a booking?',
    answer: 'Since bookings are made directly with our partner sites, you\'ll need to contact them directly for cancellations or modifications. Each booking confirmation email contains the partner\'s contact information and cancellation policy details.',
    icon: '🔄',
  },
  {
    question: 'Does GoalStay offer loyalty rewards?',
    answer: 'Yes! Create a free account to earn points on every booking you make through GoalStay. Points can be redeemed for exclusive discounts on future bookings. Plus, you\'ll maintain any existing loyalty status with hotels and airlines.',
    icon: '⭐',
  },
  {
    question: 'How accurate are the hotel ratings and reviews?',
    answer: 'We aggregate ratings and reviews from multiple sources including verified guest reviews from Booking.com, TripAdvisor, and Google. This gives you a comprehensive view of each property based on thousands of real traveler experiences.',
    icon: '📊',
  },
];

const FAQSection = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section className="py-24 bg-gradient-to-b from-secondary/30 via-background to-secondary/30 relative overflow-hidden" ref={containerRef}>
      {/* Background decorations */}
      <motion.div 
        className="absolute top-20 right-10 w-80 h-80 bg-primary/5 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div 
        className="absolute bottom-20 left-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl"
        animate={{
          scale: [1.1, 1, 1.1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-14"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
            transition={{ delay: 0.2, type: "spring" }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-primary/10 to-accent/10 text-primary mb-6 border border-primary/20"
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <HelpCircle className="h-4 w-4" />
            </motion.div>
            <span className="text-sm font-semibold">Got questions?</span>
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
            className="text-4xl md:text-5xl font-bold text-foreground mb-4"
          >
            Frequently Asked{' '}
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]">
              Questions
            </span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4 }}
            className="text-muted-foreground text-lg max-w-2xl mx-auto"
          >
            Everything you need to know about finding the best travel deals with GoalStay.
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="max-w-3xl mx-auto"
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.07 }}
              >
                <AccordionItem
                  value={`item-${index}`}
                  className="bg-card border border-border/50 rounded-2xl px-6 shadow-sm hover:shadow-lg transition-all duration-300 data-[state=open]:shadow-xl data-[state=open]:border-primary/30 overflow-hidden group"
                >
                  <AccordionTrigger className="text-left font-semibold text-foreground hover:text-primary transition-colors py-5 [&[data-state=open]>svg]:text-primary gap-4">
                    <div className="flex items-center gap-4">
                      <motion.span 
                        className="text-2xl"
                        whileHover={{ scale: 1.2, rotate: [0, -10, 10, 0] }}
                        transition={{ duration: 0.3 }}
                      >
                        {faq.icon}
                      </motion.span>
                      <span className="text-left">{faq.question}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-5 pl-14 leading-relaxed">
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {faq.answer}
                    </motion.div>
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </motion.div>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16"
        >
          <div className="max-w-2xl mx-auto bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 rounded-2xl p-8 border border-primary/20 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={isInView ? { scale: 1 } : {}}
              transition={{ delay: 0.9, type: "spring" }}
              className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center mx-auto mb-4"
            >
              <MessageCircle className="w-8 h-8 text-white" />
            </motion.div>
            <h3 className="text-xl font-bold mb-2">Still have questions?</h3>
            <p className="text-muted-foreground mb-6">
              Our support team is here to help you 24/7. Get in touch and we'll respond as soon as possible.
            </p>
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button variant="hero" size="lg" className="rounded-full px-8 group">
                Contact Support
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;
