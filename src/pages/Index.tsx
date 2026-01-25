import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import PlatformCards from '@/components/PlatformCards';
import FeaturedDeals from '@/components/FeaturedDeals';
import WhyChooseUs from '@/components/WhyChooseUs';
import TestimonialsSection from '@/components/TestimonialsSection';
import NewsletterSection from '@/components/NewsletterSection';
import FAQSection from '@/components/FAQSection';
import Footer from '@/components/Footer';
import AppInstallBanner from '@/components/AppInstallBanner';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <HeroSection />
      <PlatformCards />
      <FeaturedDeals />
      <WhyChooseUs />
      <TestimonialsSection />
      <NewsletterSection />
      <FAQSection />
      <Footer />
      <AppInstallBanner />
    </div>
  );
};

export default Index;
