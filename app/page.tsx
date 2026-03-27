/* eslint-disable @next/next/no-img-element */

import Landing from "../components/home/Landing";
import Features from "../components/home/Features";
import Reviews from "../components/home/Reviews";
import Numbers from "../components/home/Numbers";
import Footer from "../components/home/Footer";


export default function Home() {

  return (
      <main>
      <Landing />
      <Features />
      <Reviews />
      <Numbers />
      <Footer />
      </main>
  );
}
