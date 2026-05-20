import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import MarketSection from "../components/MarketSection";
import { useMarket } from "../context/useMarket";
import Footer from "../components/Footer";

export default function Home() {
  const market = useMarket();
  return (
    <div className="min-h-screen text-white">
      <Navbar />
      <Hero market={market} />

      <MarketSection market={market} />
      <Footer />
    </div>
  );
}
