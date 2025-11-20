import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Services } from "./components/Services";
import { Platforms } from "./components/Platforms";
import { Trends } from "./components/Trends";
import { Team } from "./components/Team";
import { Alliances } from "./components/Alliances";
import { Clients } from "./components/Clients";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";

export default function App() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <Hero />
        <Services />
        <Platforms />
        <Trends />
        <Team />
        <Alliances />
        <Clients />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
