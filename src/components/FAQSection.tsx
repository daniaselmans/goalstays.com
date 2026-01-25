import { motion } from 'framer-motion';
import { HelpCircle } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const faqs = [
  {
    question: 'How does GoalStay find the best prices?',
    answer: 'GoalStay searches over 50 booking platforms simultaneously, including Booking.com, Airbnb, Hotels.com, Skyscanner, and more. Our advanced algorithms compare prices in real-time to ensure you always see the lowest available rates for hotels, flights, and car rentals.',
  },
  {
    question: 'Is it free to use GoalStay?',
    answer: 'Yes, GoalStay is completely free for travelers! We earn a small commission from our partner booking sites when you make a reservation, so there are no hidden fees or charges to you. You pay the same price as booking directly.',
  },
  {
    question: 'How do price alerts work?',
    answer: 'Set your target price for any hotel, flight, or car rental, and we\'ll monitor prices 24/7. When prices drop to or below your target, you\'ll receive an instant notification via email or push notification so you never miss a deal.',
  },
  {
    question: 'Can I book directly through GoalStay?',
    answer: 'GoalStay is a comparison platform that redirects you to the booking site with the best price. This ensures you book directly with trusted partners like Booking.com, Expedia, or the airline/hotel itself, giving you full customer support and booking protections.',
  },
  {
    question: 'Are the prices shown final prices?',
    answer: 'We strive to show final prices including taxes and fees whenever possible. However, some booking sites may add additional charges at checkout. We recommend verifying the total before completing your booking on the partner site.',
  },
  {
    question: 'How do I cancel or modify a booking?',
    answer: 'Since bookings are made directly with our partner sites, you\'ll need to contact them directly for cancellations or modifications. Each booking confirmation email contains the partner\'s contact information and cancellation policy details.',
  },
  {
    question: 'Does GoalStay offer loyalty rewards?',
    answer: 'Yes! Create a free account to earn points on every booking you make through GoalStay. Points can be redeemed for exclusive discounts on future bookings. Plus, you\'ll maintain any existing loyalty status with hotels and airlines.',
  },
  {
    question: 'How accurate are the hotel ratings and reviews?',
    answer: 'We aggregate ratings and reviews from multiple sources including verified guest reviews from Booking.com, TripAdvisor, and Google. This gives you a comprehensive view of each property based on thousands of real traveler experiences.',
  },
];

const FAQSection = () => {
  return (
    <section className="py-20 bg-secondary/30 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-4"
          >
            <HelpCircle className="h-4 w-4" />
            <span className="text-sm font-medium">Got questions?</span>
          </motion.div>

          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Frequently Asked <span className="text-gradient">Questions</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Everything you need to know about finding the best travel deals with GoalStay.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-3xl mx-auto"
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <AccordionItem
                  value={`item-${index}`}
                  className="bg-card border border-border rounded-xl px-6 shadow-sm hover:shadow-md transition-shadow duration-300 data-[state=open]:shadow-lg data-[state=open]:border-primary/30"
                >
                  <AccordionTrigger className="text-left font-semibold text-foreground hover:text-primary transition-colors py-5 [&[data-state=open]>svg]:text-primary">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-5 leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </motion.div>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <p className="text-muted-foreground mb-2">
            Still have questions?
          </p>
          <a
            href="mailto:support@goalstay.com"
            className="text-primary font-semibold hover:underline inline-flex items-center gap-1"
          >
            Contact our support team →
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;
