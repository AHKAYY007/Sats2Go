import { Button } from "@/components/ui/button";
import { Zap, ArrowRight } from "lucide-react";
import heroImage from "@/assets/hero-lightning.jpg";
import Image from "next/image";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src={heroImage}
          alt="Lightning Network visualization with electric bolts and digital circuits"
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/80 to-background" />
      </div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-lightning-cyan/20 rounded-full blur-[120px] animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-lightning-orange/20 rounded-full blur-[120px] animate-float" style={{ animationDelay: "1s" }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-card/50 backdrop-blur-sm animate-lightning-pulse">
            <Zap className="h-4 w-4 text-lightning-cyan" />
            <span className="text-sm font-medium">Lightning Fast Payments</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl font-bold leading-tight">
            Send Bitcoin at the
            <span className="text-gradient block mt-2">Speed of Light</span>
          </h1>

          {/* Subheading */}
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
            sats2go powers instant, low-fee Bitcoin transactions with the Lightning Network. 
            Send and receive sats in seconds, anywhere in the world.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Button variant="ghost" size="lg" className="group">
              Get Started Now
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="outline" size="lg" className="bg-card/50 backdrop-blur-sm border-border hover:bg-card">
              Learn More
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 pt-12 max-w-2xl mx-auto">
            <div className="space-y-2">
              <div className="text-3xl md:text-4xl font-bold text-gradient">~1s</div>
              <div className="text-sm text-muted-foreground">Transaction Time</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl md:text-4xl font-bold text-gradient">$0.01</div>
              <div className="text-sm text-muted-foreground">Average Fee</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl md:text-4xl font-bold text-gradient">24/7</div>
              <div className="text-sm text-muted-foreground">Always Available</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
