import About from "@/components/About";
import CallToAction from "@/components/CallToAction";
import ScrollUp from "@/components/Common/ScrollUp";
import Hero from "@/components/Hero";
import Pricing from "@/components/Pricing";
import Team from "@/components/Team";
import { getAllPosts } from "@/utils/markdown";
import { type Metadata } from "next"; // Use `type` before Metadata

export const metadata: Metadata = {
  title: "Workout Roulette | Where Every Spin is a Win",
  description: "A fun, randomized workout generator for all fitness levels. Choose your type, spin, and get moving!",
};

export default function Home() {
  const posts = getAllPosts(["title", "date", "excerpt", "coverImage", "slug"]);

  return (
    <main>
      <ScrollUp />   
      <Hero />
      <CallToAction />     
      <Pricing />
      <About />
    </main>
  );
}
