import { Button } from "@/components/ui/button";
import { ArrowRight, Zap } from "lucide-react";

const CTA = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] gradient-primary opacity-20 blur-[100px] animate-glow" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8 p-12 rounded-3xl border border-border/50 bg-card/30 backdrop-blur-sm">
          <div className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10">
            <Zap className="h-4 w-4 text-primary animate-lightning-pulse" />
            <span className="text-sm font-medium text-primary">Start Your Lightning Journey</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold">
            Ready to experience
            <span className="text-gradient block mt-2">Lightning speed?</span>
          </h2>

          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Join thousands of users who are already enjoying instant Bitcoin transactions with minimal fees.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Button variant="ghost" size="lg" className="group">
              Create Your Wallet
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="outline" size="lg" className="bg-card/50 backdrop-blur-sm border-border hover:bg-card">
              View Documentation
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
