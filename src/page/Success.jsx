import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Success = () => {
  const marqueeRef = useRef(null);
  const timeline = useRef(null);

  // ইমেজ পাথগুলোতে BASE_URL যোগ করা হয়েছে
  const logos = [
    `${import.meta.env.BASE_URL}s1.png`,
    `${import.meta.env.BASE_URL}s8.png`,
    `${import.meta.env.BASE_URL}s3.png`,
    `${import.meta.env.BASE_URL}s4.png`,
    `${import.meta.env.BASE_URL}s5.png`,
    `${import.meta.env.BASE_URL}s6.png`,
    `${import.meta.env.BASE_URL}s1.png`,
    `${import.meta.env.BASE_URL}s8.png`,
    `${import.meta.env.BASE_URL}s9.png`,
    `${import.meta.env.BASE_URL}s10.png`,
  ];

  useEffect(() => {
    timeline.current = gsap.to(marqueeRef.current, {
      xPercent: -50,
      repeat: -1,
      duration: 60,
      ease: "none",
    });

    ScrollTrigger.create({
      onUpdate: (self) => {
        const vel = self.getVelocity();
        if (vel > 0) {
          gsap.to(timeline.current, { timeScale: 3, duration: 0.4, overwrite: true });
        } else if (vel < 0) {
          gsap.to(timeline.current, { timeScale: -3, duration: 0.4, overwrite: true });
        }
        gsap.to(timeline.current, { timeScale: 1, duration: 1.2, delay: 0.1, ease: "power2.out" });
      },
    });

    return () => {
      if (timeline.current) timeline.current.kill();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  const SlidingButton = ({ text, isPrimary = false }) => (
    <button
      className={`group relative overflow-hidden px-10 py-4 rounded-full border border-black/10 transition-all duration-300 w-full md:w-auto flex justify-center items-center ${
        isPrimary ? "bg-white shadow-sm" : "bg-transparent border-none"
      }`}
    >
      <div className="relative flex flex-col items-center h-[24px] overflow-hidden">
        <span className="text-[16px] font-bold text-black transition-all duration-200 ease-out group-hover:-translate-y-[150%]">
          {text} <span className="ml-1 inline-block rotate-[-45deg] scale-110">→</span>
        </span>
        <span className="absolute text-[16px] font-bold text-black translate-y-[150%] transition-all duration-200 ease-out group-hover:translate-y-0">
          {text} <span className="ml-1 inline-block rotate-[-45deg] scale-110">→</span>
        </span>
      </div>
    </button>
  );

  return (
    <section className="w-full bg-[#f6f6f4] py-[60px] md:py-[120px] overflow-hidden">
      {/* লোগো বার */}
      <div className="w-full flex flex-col md:flex-row items-start md:items-center mb-[80px] md:mb-[110px] relative px-6 md:px-20">
        <div className="shrink-0 z-30 bg-[#f6f6f4] pr-10 mb-6 md:mb-0">
          <h4 className="text-[13px] md:text-[14px] font-bold text-black tracking-tight opacity-80">
            The agency behind...
          </h4>
        </div>
        <div className="flex-1 overflow-hidden relative w-full">
          <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 z-20 bg-gradient-to-r from-[#f6f6f4] to-transparent pointer-events-none"></div>
          <div ref={marqueeRef} className="flex items-center gap-30 md:gap-32 w-max">
            {logos.concat(logos).map((src, index) => (
              <img key={index} src={src} alt="Brand" className="h-[32px] md:h-[65px] w-auto object-contain grayscale transition-opacity duration-300" />
            ))}
          </div>
          <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 z-20 bg-gradient-to-l from-[#f6f6f4] to-transparent pointer-events-none"></div>
        </div>
      </div>

      {/* মেইন কন্টেন্ট গ্রিড */}
      <div className="max-w-[2040px] mx-auto px-6 md:px-20 grid grid-cols-1 md:grid-cols-12 gap-y-10 md:gap-x-16 items-start">
        
        {/* ১. হেডলাইন */}
        <div className="order-1 md:order-2 md:col-span-7">
          <div className="flex items-center relative">
            <h1 className="text-[49px] md:text-[60px] lg:text-[75px] xl:text-[90px] font-medium tracking-tight leading-[1.1] md:leading-[1.05]">
              Driving Demand & <br />
              <span className="flex items-center gap-2 ">
                Discovery{" "}
                <img
                  src={`${import.meta.env.BASE_URL}success.webp`}
                  alt="Success Icon"
                  className="h-[48px] w-[48px] md:h-[68px] md:w-[67.8px] lg:h-[81px] lg:w-[81px] rounded-xl object-cover"
                />
              </span>
            </h1>
          </div>
        </div>

        {/* 2nd section */}
        <div className="order-2 md:order-1 md:col-span-5 md:row-span-2 md:pt-4">
          <p className="text-[18px] lg:text-[24px] leading-[1.3] font-medium text-black max-w-[480px] tracking-tighter">
            A global team of search-first content marketers engineering semantic
            relevancy & category signals for both the internet and people
          </p>
        </div>

        {/* ৩. বাটন কন্টেইনার */}
        <div className="order-3 md:order-3 md:col-span-7 flex flex-col md:flex-row gap-4 w-full ">
          <SlidingButton text="Our Story" isPrimary={true} />
          <SlidingButton text="Our Services" isPrimary={false} />
        </div>

      </div>
    </section>
  );
};

export default Success;
