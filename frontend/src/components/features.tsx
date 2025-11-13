import { Zap, Shield, Coins, Globe, Lock, TrendingUp } from "lucide-react";
import { Card } from "@/components/ui/card";

const features = [
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Transactions settle in seconds, not hours. Experience the future of payments.",
  },
  {
    icon: Coins,
    title: "Ultra Low Fees",
    description: "Pay fractions of a cent per transaction. Perfect for micro-payments and everyday use.",
  },
  {
    icon: Shield,
    title: "Secure & Private",
    description: "Built on Bitcoin's security with enhanced privacy features. Your funds, your control.",
  },
  {
    icon: Globe,
    title: "Global Reach",
    description: "Send money anywhere instantly. No borders, no banks, no intermediaries.",
  },
  {
    icon: Lock,
    title: "Self-Custody",
    description: "You own your keys, you own your Bitcoin. Complete control over your funds.",
  },
  {
    icon: TrendingUp,
    title: "Scalable",
    description: "Process millions of transactions per second. The Lightning Network scales with demand.",
  },
];

const Features = () => {
  return (
    <section id="features" className="py-24 relative">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl md:text-5xl font-bold">
            Why Choose <span className="text-gradient">Lightning</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            The Lightning Network brings Bitcoin payments into the modern age with unmatched speed and efficiency.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="p-6 bg-card/50 backdrop-blur-sm border-border hover:border-primary/50 transition-all duration-300 hover:scale-105 group"
            >
              <div className="space-y-4">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
