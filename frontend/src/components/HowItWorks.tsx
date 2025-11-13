import { Wallet, Link2, Send, CheckCircle2 } from "lucide-react";

const steps = [
  {
    icon: Wallet,
    title: "Create Wallet",
    description: "Set up your Lightning wallet in minutes. Safe, simple, and secure.",
    step: "01",
  },
  {
    icon: Link2,
    title: "Open Channel",
    description: "Connect to the Lightning Network and establish payment channels.",
    step: "02",
  },
  {
    icon: Send,
    title: "Send Sats",
    description: "Make instant payments with minimal fees. Fast and efficient.",
    step: "03",
  },
  {
    icon: CheckCircle2,
    title: "Done!",
    description: "Your transaction is complete in seconds. That's it!",
    step: "04",
  },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-24 bg-muted/30 relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 left-1/2 w-96 h-96 bg-lightning-purple/10 rounded-full blur-[120px] -translate-x-1/2" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl md:text-5xl font-bold">
            How It <span className="text-gradient">Works</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Get started with Lightning payments in four simple steps.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {/* Connection Line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-16 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-primary to-secondary" />
              )}

              <div className="text-center space-y-4">
                <div className="relative inline-flex">
                  <div className="h-20 w-20 rounded-2xl bg-card border-2 border-primary/50 flex items-center justify-center mx-auto glow-orange">
                    <step.icon className="h-10 w-10 text-primary" />
                  </div>
                  <div className="absolute -top-2 -right-2 h-8 w-8 rounded-full bg-primary flex items-center justify-center text-xs font-bold">
                    {step.step}
                  </div>
                </div>

                <h3 className="text-xl font-semibold">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
