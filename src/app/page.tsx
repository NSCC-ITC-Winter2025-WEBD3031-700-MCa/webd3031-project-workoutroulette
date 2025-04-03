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
  title: "Workout Roulette - randomized workouts with NextJS",
  description: "This app is designed for fitness beginners, and experts who seek a more randomized format of workout. Decide what you want to exercise, get random exercises in that category!",
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
