import NewestServices from "./components/NewestServices";
import { ServiceRow } from "./components/ServiceRow";

export default function Home() {
  return (
   <div>
    <section className='max-w-7xl mx-auto px-4 md:px-8 mb-24'>
      <div className="max-w-3xl mx-auto text-2xl sm:text-5xl font-semibold text-center">
        <h1>Find the best Talent</h1>
        <h1 className="font-bold bg-gradient-to-r from-green-400 to-lime-600 bg-clip-text text-transparent">Photographers <span className="bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">&</span> Filmmakers</h1>
        <p className="lg:text-lg text-muted-foreground mx-auto mt-5 w-[90%] font-normal text-base">
          PhotoHUB is a dynamic freelance marketplace designed specifically for photographers and filmmakers. It connects talented visual artists with clients seeking top-tier creative services, offering a seamless platform for showcasing portfolios, securing projects, and collaborating efficiently.
        </p>
      </div>
      <ServiceRow category="newest" />
      <ServiceRow category="photographers" />
      <ServiceRow category="filmmakers" />
      <ServiceRow category="aiartists" />
    </section>
   </div>
  );
}
