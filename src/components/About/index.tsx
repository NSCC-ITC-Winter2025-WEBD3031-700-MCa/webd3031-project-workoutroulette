import Image from "next/image";
import Link from "next/link";

const About = () => {
  return (
    <section
      id="about"
      className="bg-gray-1 pb-8 pt-20 dark:bg-dark-2 lg:pb-[70px] lg:pt-[120px]"
    >
      <div className="container">
        <div className="wow fadeInUp" data-wow-delay=".2s">
          <div className="-mx-4 flex flex-wrap items-center">
            {/* Text Column */}
            <div className="w-full px-4 lg:w-1/2">
              <div className="mb-12 max-w-[540px] lg:mb-0">
                <h2 className="mb-5 text-3xl font-bold leading-tight text-dark dark:text-white sm:text-[40px] sm:leading-[1.2]">
                  Meet the team behind the app.
                </h2>
                <p className="mb-10 text-base leading-relaxed text-body-color dark:text-dark-6">
                  Workout Roulette was created for what was formally known as the capstone project for NSCC programming.
                  Now apart of WEBD3031 - Integrated Project for Web Programming. Instructed by Michael Caines.
                  <br /> <br />
                  Our goal was to create an application that not only benefits fitness enthusiasts, 
                  but anyone looking to begin their workout journey who needs guidance working out in the gym, or at home.
                </p>
              </div>
            </div>

            {/* Image Column */}
            <div className="w-full px-4 lg:w-1/2">
              <div className="relative mx-auto max-w-md">
                <Image
                  src="/images/team/teamwork.jpg"
                  alt="Our Team"
                  width={500}
                  height={400}
                  className="rounded-xl shadow-lg dark:shadow-none"
                />
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
