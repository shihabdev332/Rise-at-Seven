import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { GoArrowUpRight } from "react-icons/go";

// Image Imports
import ssImg from "../assets/ss.webp";
import s1 from "../assets/s1.webp";
import s2 from "../assets/s2.webp";
import s3 from "../assets/s3.webp";
import s4 from "../assets/s4.webp";
import s5 from "../assets/s5.webp";
import s6 from "../assets/s6.webp";
import s7 from "../assets/s7.webp";
import s8 from "../assets/s8.webp";

const services = [
  { title: "Digital PR", img: s1 },
  { title: "Organic Social & Content", img: s2 },
  { title: "Search & Growth Strategy", img: s3 },
  { title: "Content Experience", img: s4 },
  { title: "Data & Insights", img: s5 },
  { title: "Onsite SEO", img: s6 },
];

const Service = () => {
  const marqueeRef = useRef(null);
  const cursorRef = useRef(null);
  const [isHoveringMarquee, setIsHoveringMarquee] = useState(false);

  useEffect(() => {
    // Smooth Marquee Animation: Right to Left
    const marquee = marqueeRef.current;
    const animation = gsap.fromTo(
      marquee,
      { x: 0 },
      {
        x: "-50%",
        ease: "none",
        duration: 30,
        repeat: -1,
      },
    );

    // Custom cursor logic
    const handleMouseMove = (e) => {
      if (cursorRef.current) {
        gsap.to(cursorRef.current, {
          x: e.clientX,
          y: e.clientY,
          duration: 0.2,
          ease: "power2.out",
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      animation.kill();
    };
  }, []);

  return (
    <section className="relative w-full bg-[#f4f4f4] text-[#111212] py-16 md:py-24 overflow-hidden font-sans">
      {/* Custom Cursor */}
      <div
        ref={cursorRef}
        className={`fixed top-0 left-0 pointer-events-none z-50 flex items-center justify-center transform -translate-x-1/2 -translate-y-1/2 transition-opacity duration-300 ${
          isHoveringMarquee ? "opacity-100 scale-100" : "opacity-0 scale-50"
        }`}
      >
        <div className="bg-[#a5f3d4] h-30px text-black font-bold text-[25px] px-8 py-4 rounded-full uppercase tracking-tight flex">
          SEND US YOUR BRIEF <GoArrowUpRight />
        </div>
      </div>

      <div className="mx-auto px-6 md:px-12">
        {/* Header Section */}
        <div className="flex justify-between items-end pb-12 mb-12 border-b border-gray-300">
          <h2 className="text-[50px] md:text-[100px] lg:text-[120px] font-medium tracking-tight leading-[0.9] flex items-center flex-wrap gap-3 md:gap-4 text-[#111212]">
            Our
            <img
              src={ssImg}
              alt="Team"
              className="w-14 h-14 md:w-24 md:h-24 rounded-2xl md:rounded-3xl object-cover"
            />
            Services
          </h2>

          <button className="hidden md:block group relative h-[50px] px-8 rounded-full overflow-hidden bg-white shadow-sm transition-shadow hover:shadow-md">
            <div className="relative flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-full">
              <span className="h-[50px] flex items-center text-[15px] font-bold  tracking-tight">
                View All Services{" "}
                <GoArrowUpRight  className="text-[16px]  font-bold" strokeWidth={1.2}/>
              </span>
              <span className="h-[50px] flex items-center text-[15px] font-bold  tracking-tight absolute top-full">
                View All Services{" "}
                <GoArrowUpRight className="text-[16px] font-bold" strokeWidth={1.2}/>
              </span>
            </div>
          </button>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 md:gap-y-12">
          {services.map((service, index) => (
            <div
              key={index}
              className="group relative cursor-pointer transition-all duration-300"
            >
              {/* Desktop Hover Background */}
              <div className="hidden md:block absolute inset-y-0 inset-x-0 z-0 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out transform scale-95 group-hover:scale-100 overflow-hidden rounded-full pointer-events-none">
                <img
                  src={service.img}
                  alt={service.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/30"></div>
              </div>

              {/* Content Wrapper */}
              <div className="relative z-10 flex items-center justify-start pointer-events-none pb-4 border-b border-gray-300 md:w-[85%]">
                <div className="md:hidden flex-shrink-0 mr-4">
                  <img
                    src={service.img}
                    alt={service.title}
                    className="w-14 h-14 rounded-xl object-cover"
                  />
                </div>

                <div className="hidden md:flex w-0 opacity-0 group-hover:w-12 group-hover:opacity-100 transition-all duration-500 ease-in-out overflow-hidden items-center">
                  <GoArrowUpRight className="text-white" size={36} strokeWidth={1.2}/>
                </div>

                <h3 className="text-[28px] md:text-[36px] xl:text-[60px] font-medium tracking-tight transition-all duration-300 md:group-hover:text-white md:group-hover:translate-x-2">
                  {service.title}
                </h3>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile View All Button */}
        <div className="md:hidden mt-10 flex justify-center">
          <button className="h-[50px] px-8 rounded-full bg-white shadow-sm text-[16px] font-bold flex items-center justify-center tracking-tight w-full ">
            View All Services <GoArrowUpRight />
          </button>
        </div>
      </div>

      {/* Marquee Section - Fixed Overlapping */}
      <div
        className="w-full mt-24 md:mt-40 cursor-none border-b border-gray-200 pb-12 overflow-hidden"
        onMouseEnter={() => setIsHoveringMarquee(true)}
        onMouseLeave={() => setIsHoveringMarquee(false)}
      >
        <div ref={marqueeRef} className="flex whitespace-nowrap w-max">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex items-center flex-nowrap shrink-0">
              <span className="text-[70px] md:text-[160px] font-bold tracking-tighter text-[#111212] px-6 md:px-12">
                Chasing Consumers
              </span>
              <img
                src={s7}
                className="w-20 h-28 md:w-64 md:h-80 object-cover rounded-[25px] md:rounded-[50px] mx-6 md:mx-12 border border-gray-200 shrink-0"
                alt="slide"
              />
              <span className="text-[70px] md:text-[160px] font-bold tracking-tighter text-[#111212] px-6 md:px-12">
                Not Algorithms
              </span>
              <img
                src={s8}
                className="w-20 h-28 md:w-64 md:h-80 object-cover rounded-[25px] md:rounded-[50px] mx-6 md:mx-12 border border-gray-400 shrink-0"
                alt="slide"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Service;
