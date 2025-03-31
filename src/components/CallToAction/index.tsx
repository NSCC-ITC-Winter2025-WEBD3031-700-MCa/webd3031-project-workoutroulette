import Link from "next/link";

const CallToAction = () => {
  return (
    <section className="relative z-10 overflow-hidden bg-cyan-700 py-20 lg:py-[115px]">
      <div className="container mx-auto">
        <div className="relative overflow-hidden">
          <div className="-mx-4 flex flex-wrap items-stretch">
            <div className="w-full px-4">
              <div className="mx-auto max-w-[570px] text-center">
                <h2 className="mb-2.5 text-3xl font-bold text-white md:text-[38px] md:leading-[1.44]">
                  <span></span>
                  <span className="text-3xl font-normal md:text-[40px]">
                    {" "}
                    What are you waiting for?{" "}
                  </span>
                </h2>
                <p className="mx-auto mb-6 max-w-[515px] text-base leading-[1.5] text-white">
                  Click below to begin your workout! 
                  <br></br>
                  <br></br>
                  The first step is deciding what kind of workout you'd like, then spin the wheel to get your exercises! 
                  <br></br>
                  <br></br>
                  Complete exercises to earn xp, Earn xp to level up, Share workouts with your friends
                </p>
                <Link
                  href="/workout"
                  className="inline-block rounded-md border border-transparent bg-secondary px-7 py-3 text-base font-medium text-white transition hover:bg-[#0BB489]"
                >
                  Begin
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      
    </section>
  );
};

export default CallToAction;
