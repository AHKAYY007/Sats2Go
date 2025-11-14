import Cta from "@/components/landing/cta";
import Features from "@/components/landing/features";
import Footer from "@/components/landing/footer";
import Header from "@/components/landing/header";
import Hero from "@/components/landing/heror";
import HowItWorks from "@/components/landing/how-tworks";
import ProblemSloving from "@/components/landing/problemSloving";
import { useRouter } from "next/navigation";

const Landing = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-white">
      <Header router={router} />
     <Hero router={router}/>
      <ProblemSloving />
      <HowItWorks />
      <Features />
     <Cta  router={router}/>
      <Footer />
    </div>
  );
};

export default Landing;