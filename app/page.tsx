/* eslint-disable @next/next/no-img-element */

import Landing from "../components/home/Landing";
import Features from "../components/home/Features";
import Reviews from "../components/home/Reviews";
import Numbers from "../components/home/Numbers";
import Footer from "../components/ui/Footer";
import Navbar from "../components/ui/Navbar";


export default function Home() {

  return (
      <main>
      <Navbar />
      <Landing />
      <Features />
      <Reviews />
      <Numbers />
      <Footer />
      </main>
  );
}
