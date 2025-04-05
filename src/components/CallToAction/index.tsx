import Link from "next/link";

const CallToAction = () => {
  return (
    <section className="relative z-10 overflow-hidden bg-background dark:bg-background-dark py-20 lg:py-[100px] transition-colors duration-300">
      <div className="container mx-auto px-4">
      <div className="text-center max-w-2xl mx-auto animate-fade-in-up">
          <h2 className="text-3xl md:text-4xl font-bold text-primary dark:text-white mb-4">
            Hit the gym
          </h2>
          <p className="text-base md:text-lg text-muted dark:text-gray-300 leading-relaxed mb-8">
            Click below to begin your workout!
            <br />
            <br />
            Decide the kind of workout you'd like, spin the wheel to get your
            exercises.
            <br />
            <br />
            Complete exercises to earn XP. Level up. Share your wins with friends.
          </p>

          <Link
            href="/workout"
            className="inline-block rounded-md bg-secondary px-6 py-3 text-white text-base font-medium shadow-md hover:bg-[#0BB489] transition duration-300"
          >
            Begin
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
