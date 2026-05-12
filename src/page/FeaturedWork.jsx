import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Import images
import b1 from "../assets/b1.webp";
import b2 from "../assets/b2.webp";
import b3 from "../assets/b3.webp";
import b4 from "../assets/b4.webp";
import b5 from "../assets/b5.webp";
import b6 from "../assets/b6.webp";
import b7 from "../assets/b7.webp";
import b8 from "../assets/b8.webp";
import b9 from "../assets/b9.webp";
import b10 from "../assets/b10.webp";
import b11 from "../assets/b11.webp";
import { BsGraphUpArrow } from "react-icons/bs";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: 1,
    title: "SIXT",
    years: "[2023-2025]",
    img: b1,
    overlay: "An extra 1M clicks regionally through SEO",
    bg: "#c27943",
    badge: "Car rental",
  },
  {
    id: 2,
    title: "Dojo - B2B",
    years: "[2021-2025]",
    img: b2,
    overlay: "A B2B success story for Dojo card machines",
    bg: "#f7cdba",
    badge: "Card Machines",
  },
  {
    id: 3,
    title: "Magnet Trade",
    years: "[2023-2024]",
    img: b3,
    overlay: "Kitchens for professionals",
    bg: "#e8e8e8",
    badge: "Trade",
  },
  {
    id: 4,
    title: "Leading E Sim",
    years: "[2023-2025]",
    img: b4,
    overlay: "Global connectivity solutions",
    bg: "#2a52be",
    badge: "Esims",
  },
  {
    id: 5,
    title: "Brand globally",
    years: "[2024]",
    img: b5,
    overlay: "Expanding brand reach",
    bg: "#A3EDD9",
    badge: "Global",
  },
  {
    id: 6,
    title: "JD Sports",
    years: "[2025]",
    img: b6,
    overlay: "Retail excellence in sports",
    bg: "#e5e5e5",
    badge: "Trainers",
  },
  {
    id: 7,
    title: "Parkdean Resorts",
    years: "[2019-2025]",
    img: b7,
    overlay: "Holiday experiences reinvented",
    bg: "#f4d0a6",
    badge: "Easter Breaks",
  },
  {
    id: 8,
    title: "Pooky",
    years: "[2025]",
    img: b8,
    overlay: "Driving demand for Pooky Rechargeable Lights",
    bg: "#3bb4c1",
    badge: "Rechargeable Lights",
  },
  {
    id: 9,
    title: "Revolution Beauty",
    years: "[2022-2025]",
    img: b9,
    overlay: "Beauty innovation globally",
    bg: "#e8a9ab",
    badge: "Beauty Dupes",
  },
  {
    id: 10,
    title: "Lloyds Pharmacy",
    years: "[2022-2023]",
    img: b10,
    overlay: "Driving category leadership for STI tests",
    bg: "#56d3f9",
    badge: "STI tests",
  },
  {
    id: 11,
    title: "PrettyLittleThing",
    years: "[2021-2023]",
    img: b11,
    overlay: 'Driving discovery for everything "outfits" for PLT',
    bg: "#fbcfe8",
    badge: "Fashion",
  },
];

const FeaturedWork = () => {
  const wrapperRef = useRef(null);
  const containerRef = useRef(null);
  const leftTextRef = useRef(null);
  const rightImagesRef = useRef(null);
  const cursorRef = useRef(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const cursor = cursorRef.current;
      gsap.set(cursor, { xPercent: -50, yPercent: -50 });

      const xTo = gsap.quickTo(cursor, "x", { duration: 0.15, ease: "power3" });
      const yTo = gsap.quickTo(cursor, "y", { duration: 0.15, ease: "power3" });

      window.addEventListener("mousemove", (e) => {
        xTo(e.clientX);
        yTo(e.clientY);
      });

      let mm = gsap.matchMedia();
      mm.add("(min-width: 768px)", () => {
        const imagesHeight =
          rightImagesRef.current.scrollHeight - window.innerHeight;
        const textHeight =
          leftTextRef.current.scrollHeight - window.innerHeight / 1.2;

        gsap
          .timeline({
            scrollTrigger: {
              trigger: wrapperRef.current,
              start: "top top",
              end: `+=${imagesHeight * 1.3}`,
              pin: true,
              scrub: 1,
              onUpdate: (self) => {
                const currentIndex = Math.min(
                  Math.floor(self.progress * projects.length),
                  projects.length - 1,
                );
                setActiveIndex(currentIndex);
              },
            },
          })
          .to(rightImagesRef.current, { y: -imagesHeight, ease: "none" }, 0)
          .to(leftTextRef.current, { y: -textHeight, ease: "none" }, 0);
      });
    }, wrapperRef);

    return () => ctx.revert();
  }, []);

  const showCursor = () =>
    gsap.to(cursorRef.current, {
      scale: 1,
      opacity: 1,
      duration: 0.3,
      ease: "back.out(1.5)",
    });
  const hideCursor = () =>
    gsap.to(cursorRef.current, {
      scale: 0,
      opacity: 0,
      duration: 0.2,
      ease: "power2.in",
    });

  return (
    <div className="bg-white font-sans select-none w-full">
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-[100px] h-[100px] bg-[#A3EDD9] rounded-full z-[100] pointer-events-none flex items-center justify-center scale-0 opacity-0 mix-blend-normal shadow-lg"
      >
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#000"
          strokeWidth="2.5"
          strokeLinecap="square"
          strokeLinejoin="miter"
        >
          <line x1="7" y1="17" x2="17" y2="7"></line>
          <polyline points="7 7 17 7 17 17"></polyline>
        </svg>
      </div>

      <section
        ref={wrapperRef}
        className="hidden md:flex flex-col h-screen w-full px-6 py-6 lg:px-10 lg:py-8"
      >
        <div
          ref={containerRef}
          className="bg-[#111212] rounded-[48px] h-full w-full mx-auto px-12 lg:px-24 pt-20 relative overflow-hidden flex"
        >
          <div className="w-[50%] h-full relative z-10">
            <p className="text-[13px] lg:text-[18px]  tracking-[0.15em] font-medium opacity-80 mb-14 text-white">
              Featured Work
            </p>

            <div
              className="mt-8 h-full overflow-hidden"
              style={{
                maskImage:
                  "linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)",
              }}
            >
              <div
                ref={leftTextRef}
                className="flex flex-col gap-2 pb-96 pt-32"
              >
                {projects.map((project, index) => {
                 
                  const isHovered = hoveredIndex === index;
                  const isActive =
                    activeIndex === index && hoveredIndex === null;

                  return (
                    <div
                      key={project.id}
                      className="flex items-start cursor-pointer group"
                      onMouseEnter={() => setHoveredIndex(index)}
                      onMouseLeave={() => setHoveredIndex(null)}
                    >
                      <h2
                        className={`text-[60px] lg:text-[90px] leading-[1] font-medium tracking-[-0.03em] transition-all duration-500 ease-out flex items-start gap-4 transform text-white
                          ${isHovered ? "translate-x-6" : "translate-x-0"} 
                          `}
                      >
                        {project.title}
                        <span className="text-[12px] xl:text-[14px] font-mono mt-3 font-normal tracking-normal opacity-80">
                          {project.years}
                        </span>
                      </h2>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="w-[50%] h-full overflow-hidden relative flex justify-end pr-4">
            <div
              ref={rightImagesRef}
              className="flex flex-col gap-[120px] absolute top-0 right-10 pb-60 pt-10"
            >
              {projects.map((project, index) => {
                const isHoveredImage = hoveredIndex === index;
                return (
                  <div
                    key={project.id}
                    className="relative w-full max-w-[1000px] h-full max-h-[900px] rounded-[24px] overflow-hidden group cursor-none"
                    onMouseEnter={() => {
                      setHoveredIndex(index);
                      showCursor();
                    }}
                    onMouseLeave={() => {
                      setHoveredIndex(null);
                      hideCursor();
                    }}
                  >
                    <div
                      className={`absolute top-6 right-6 z-20 bg-white/10 backdrop-blur-md border border-white/20 text-white text-[13px] font-medium px-4 py-2 rounded-full transition-opacity duration-300 flex items-center gap-2 ${isHoveredImage ? "opacity-0" : "opacity-100"}`}
                    >
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <circle cx="11" cy="11" r="8"></circle>
                        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                      </svg>
                      {project.badge}
                    </div>

                    <img
                      src={project.img}
                      alt={project.title}
                      className={`w-full h-full max-w-[1000px] max-h-[900px] object-cover transition-transform duration-[1.2s] ease-out ${isHoveredImage ? "scale-110" : "scale-100"}`}
                    />

                    <div
                      className={`absolute inset-0 flex flex-col justify-center p-16 transform transition-transform duration-[500ms] ease-[cubic-bezier(0.25,1,0.5,1)] ${isHoveredImage ? "translate-y-0" : "translate-y-full"}`}
                      style={{ backgroundColor: project.bg, color: "#000" }}
                    >
                      <h3 className="text-[64px] font-bold leading-[1.05] tracking-tight">
                        {project.overlay}
                      </h3>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="md:hidden w-full px-4 py-6 bg-white">
        <div className="bg-[#000000] rounded-[32px] w-full flex flex-col px-4 pt-10 pb-20 gap-8">
          <p className="text-[17px] tracking-[0.15em] font-medium text-white mb-2 px-2">
            Featured Work
          </p>
          {projects.map((project) => (
            <div key={project.id} className="flex flex-col items-center">
              <div className="relative w-full h-[290px] sm:h-[400px] rounded-[24px] overflow-hidden group">
                <img
                  src={project.img}
                  alt={project.title}
                  className="w-[360] h-full object-cover"
                />
                <div className="absolute inset-x-0 bottom-0 h-3/5 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none" />
                <div className="absolute top-5 right-5 z-20 bg-white/10 backdrop-blur-md border border-white/20 text-white text-[12px] font-medium px-3.5 py-1.5 ded-full flex items-center gap-1.5">
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <BsGraphUpArrow  className="text-white"/>
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                  </svg>
                  {project.badge}<BsGraphUpArrow  className="text-white text-md "/>
                </div>
                <div className="absolute bottom-6 left-6 pr-6 z-20 flex flex-col items-start">
                  <span className="text-[13px] font-mono text-white/60 mb-1.5">
                    {project.years}
                  </span>
                  <h3 className="text-[36px] font-semibold text-white tracking-tight leading-none">
                    {project.title}
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default FeaturedWork;
