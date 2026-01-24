import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import PlatformCards from '@/components/PlatformCards';
import FeaturedDeals from '@/components/FeaturedDeals';
import WhyChooseUs from '@/components/WhyChooseUs';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <HeroSection />
      <PlatformCards />
      <FeaturedDeals />
      <WhyChooseUs />
      <Footer />
    </div>
  );
};

export default Index;
