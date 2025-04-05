import About from "@/components/About";
import HomeBlogSection from "@/components/Blog/HomeBlogSection";
import CallToAction from "@/components/CallToAction";
import Clients from "@/components/Clients";
import ScrollUp from "@/components/Common/ScrollUp";
import Contact from "@/components/Contact";
import Faq from "@/components/Faq";
import Features from "@/components/Features";
import Hero from "@/components/Hero";
import Pricing from "@/components/Pricing";
import Team from "@/components/Team";
import Testimonials from "@/components/Testimonials";
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
      {/* <Features /> */}
      {/* <About /> */}
      <CallToAction />
      <Pricing />
      {/* <Testimonials /> */}
      {/* <Faq /> */}
      {/* <Team /> */}
      {/* <HomeBlogSection posts={posts} /> */}
      {/* <Contact /> */}
    </main>
  );
}
