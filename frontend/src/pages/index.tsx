import Header from "@/components/header";
import Features from "@/components/features";
import Footer from "@/components/footer";
import CTA from "@/components/cta";
import HowItWorks from "@/components/HowItWorks";
import Hero from "@/components/hero";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <Features />
      <HowItWorks />
      <CTA />
      <Footer />
    </div>
  );
};

export default Index;
