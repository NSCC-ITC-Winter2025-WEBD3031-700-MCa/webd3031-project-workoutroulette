import Image from "next/image";

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-white py-12">
      <div className="flex items-center justify-center mx-auto animate-fade-in-up">

        <div className="max-w-[845px] w-full px-4">
          <Image
            src="/images/hero/wrLogoLite.png"
            alt="Workout Roulette Logo"
            width={845}
            height={316}
            className="mx-auto w-full h-auto rounded-xl"
            priority
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
