import Breadcrumb from "@/components/Common/Breadcrumb";
import Pricing from "@/components/Pricing";
import { Metadata } from "next";
//Removed faq
export const metadata: Metadata = {
  title:
    "Pricing Page | Workout Roulette - randomized workouts with NextJS",
  description: "This is pricing page description",
};

const PricingPage = () => {
  return (
    <>
      <Breadcrumb pageName="Pricing Page" />
      <Pricing />
      {/* <Faq /> */}
    </>
  );
};

export default PricingPage;
