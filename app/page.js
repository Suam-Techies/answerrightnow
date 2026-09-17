import SiteNav from "./components/SiteNav";
import { Experts, Hero, HowItWorks, PhotoBand, Showcase, SiteFooter } from "./components/HomeSections";

export default function Home() {
  return (
    <>
      <SiteNav />
      <Hero />
      <Showcase />
      <PhotoBand />
      <HowItWorks />
      <Experts />
      <SiteFooter />
    </>
  );
}
