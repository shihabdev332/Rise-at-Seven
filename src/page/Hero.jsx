import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { FaGoogle, FaYoutube, FaPinterest, FaReddit } from "react-icons/fa";
import { SiOpenai, SiTiktok, SiGiphy } from "react-icons/si";
import Navbar from "./Navbar";

const Hero = () => {
  // ইমেজ রেন্ডমাইজ করার লজিক
  const [heroImage, setHeroImage] = useState("");

  // References for GSAP animations
  const topHeaderRef = useRef(null);
  const topHeaderTextRef = useRef(null);
  const navbarRef = useRef(null);
  const text1Ref = useRef(null);
  const text2Ref = useRef(null);
  const text3Ref = useRef(null);
  const centerImgRef = useRef(null);

  useEffect(() => {
    const randomNumber = Math.floor(Math.random() * 7) + 1;
    setHeroImage(`/hero${randomNumber}.webp`);

    const tl = gsap.timeline();

    // Initial states
    gsap.set(topHeaderTextRef.current, { opacity: 0 });
    gsap.set([text2Ref.current, text3Ref.current], {
      y: 40,
      scale: 0.9,
      opacity: 0,
    });
    gsap.set(centerImgRef.current, { scale: 0 });

    // Upward Curved Intro Animation
    tl.fromTo(
      topHeaderRef.current,
      {
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 9999,
        borderRadius: 0,
        margin: 0,
        display: "flex",
        clipPath: "ellipse(150% 100% at 50% 100%)",
      },
      {
        top: "8px",
        left: "8px",
        width: "calc(100vw - 16px)",
        height: "36px",
        borderRadius: "20px",
        duration: 1.2,
        ease: "power3.inOut",
        clipPath: "ellipse(200% 100% at 50% 0%)",
        onComplete: () => {
          // Keep essential layout properties after animation
          gsap.set(topHeaderRef.current, {
            clearProps: "position,top,left,width,height,zIndex,margin,clipPath",
          });
        },
      },
    );

    // Headline & Center Image Animation
    tl.to(
      [text2Ref.current, text3Ref.current],
      { y: 0, scale: 1, opacity: 1, duration: 0.6, ease: "power3.out" },
      "-=0.5",
    );

    tl.to(
      centerImgRef.current,
      { scale: 1, duration: 0.6, ease: "back.out(1.7)" },
      "<",
    );

    tl.to(topHeaderTextRef.current, { opacity: 1, duration: 0.3 }, "-=0.2");

    // Navbar Scroll logic
    const handleScroll = () => {
      if (window.scrollY > 30) {
        gsap.to(navbarRef.current, {
          position: "fixed",
          backdropFilter: "blur(16px)",
          backgroundColor: "rgba(0, 0, 0, 0.2)",
          paddingTop: "16px",
          paddingBottom: "16px",
          duration: 0.3,
        });
      } else {
        gsap.to(navbarRef.current, {
          position: "absolute",
          backdropFilter: "blur(0px)",
          backgroundColor: "transparent",
          paddingTop: "32px",
          paddingBottom: "0px",
          duration: 0.3,
        });
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="m-2 gap-2 flex flex-col">
      {/* Top Announcement Bar */}
      <div className="w-full h-[36px] relative z-30 overflow-hidden">
        <div
          ref={topHeaderRef}
          className="w-full h-full bg-[#b1f5df] text-black flex items-center justify-center rounded-xl group cursor-pointer overflow-hidden"
        >
          {/* Inner Wrapper for proper clipping and hover effect */}
          <div className="h-[36px] overflow-hidden">
            <div
              ref={topHeaderTextRef}
              className="flex flex-col transition-transform duration-[200ms] ease-[cubic-bezier(0.65,0,0.35,1)] group-hover:-translate-y-1/2 transform-gpu"
            >
              <span
                className="flex items-center justify-center h-[36px] text-[12px] lg:text-[14px] font-bold px-4"
              >
                🚨 The Category Leaderboard - Live Now
              </span>
              <span className="flex items-center justify-center h-[36px] tracking-tight text-[12px] lg:text-[14px] font-bold px-4">
                🚨 The Category Leaderboard - Live Now
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Hero Section */}
      <section className="relative h-[calc(100vh-44px)] overflow-hidden rounded-3xl bg-[#0f1b3e] flex flex-col">
        {/* Dynamic Background Image */}
        {heroImage && (
          <img
            src={heroImage}
            alt="Background"
            className="absolute inset-0 w-full h-full object-cover "
          />
        )}
        <div className="absolute inset-0 bg-black/30 backdrop-blur-[10px] z-0" />

        <Navbar navbarRef={navbarRef}/>

        <div className="relative z-20 flex-grow flex flex-col items-center justify-center text-center text-white px-4 pt-0 ">
          <div className="flex flex-col items-center mb-3">
            <p className="text-[11px] md:text-[12px] font-semibold uppercase mb-5 opacity-90">
              #1 Most Recommended <br /> Content Marketing Agency
            </p>
            <div className="flex items-center justify-center gap-2 h-[35px]">
              <img
                src="/laurem1.png"
                alt="Laurel"
                className="h-full object-contain rotate-48"
              />
              <img
                src="/b1.webp"
                alt="Award"
                className="h-[15px] md:h-[20px] object-contain"
              />
              <img
                src="/b2.webp"
                alt="Award"
                className="h-[15px] md:h-[20px] object-contain"
              />
              <img
                src="/b3.webp"
                alt="Award"
                className="h-[15px] md:h-[20px] object-contain"
              />
              <img
                src="/b4.webp"
                alt="Award"
                className="w-[50px] h-[22px] object-contain hidden lg:inline"
              />
              <img
                src="/laurem2.png"
                alt="Laurel"
                className="h-full object-contain rotate-[-48deg]"
              />
            </div>
          </div>

          <h1 className="text-[60px] md:text-[60px] lg:text-[130px] font-bold leading-[0.95] tracking-[-4px] flex flex-col items-center">
            <span ref={text1Ref} className="inline-block">
              We Create
            </span>
            <div className="flex items-center gap-4 md:gap-6 mt-2 relative flex-wrap justify-center">
              <span ref={text2Ref} className="inline-block">
                Category
              </span>
              {heroImage && (
                <img
                  ref={centerImgRef}
                  src={heroImage}
                  alt="Center Object"
                  className="h-[56px] md:h-[63px] lg:h-[113px] w-[56px] md:w-[63px] lg:w-[113px] rounded-2xl object-cover shadow-2xl relative z-10 border border-white/10"
                />
              )}
              <span ref={text3Ref} className="inline-block">
                Leaders
              </span>
            </div>
          </h1>
          <p className="mt-8 text-[18px] md:text-[24px] font-medium tracking-tight opacity-90 relative z-10">
            on every searchable platform
          </p>
        </div>

        {/* Brand Logos */}
        <div className="hidden md:hidden lg:flex absolute bottom-16 left-1/2 -translate-x-1/2 w-full flex flex-wrap justify-center items-center gap-x-5 gap-y-4 px-8 text-white opacity-90 z-20 mb-4">
          <div className="flex items-center gap-2 font-bold text-[16px] md:text-[18px] tracking-tighter">
            <FaGoogle /> Google
          </div>
          <div className="flex items-center gap-1.5 font-bold text-[14px] md:text-[16px] tracking-tighter">
            <SiOpenai /> ChatGPT
          </div>
          <div className="font-bold text-[16px] md:text-[18px] tracking-tight">
            Gemini
          </div>
          <div className="flex items-center gap-1.5 font-bold text-[16px] md:text-[18px] tracking-tight">
            <SiTiktok /> TikTok
          </div>
          <div className="flex items-center gap-1.5 font-bold text-[16px] md:text-[18px] tracking-tight">
            <FaYoutube /> YouTube
          </div>
          <div className="flex items-center gap-1.5 font-bold text-[16px] md:text-[18px] tracking-tight">
            <FaPinterest /> Pinterest
          </div>
          <div className="flex items-center gap-1.5 font-bold text-[16px] md:text-[18px] tracking-tight">
            <SiGiphy /> GIPHY
          </div>
          <div className="flex items-center gap-1.5 font-bold text-[16px] md:text-[18px] tracking-tight">
            <FaReddit /> reddit
          </div>
          <div className="font-bold text-[16px] md:text-[18px] tracking-tighter">
            amazon
          </div>
        </div>

        {/* Footer Info */}
        <div className="flex w-full items-center px-7 lg:justify-between justify-center pb-6">
          <div className="z-10 text-white hidden lg:flex text-[14px] opacity-80">
            Organic media planners creating, distributing & optimising <br />
            search-first content for SEO, Social, PR, AI and UI M-search.
          </div>
          <div className="z-10 text-white text-[12.5px] font-medium leading-relaxed text-center lg:text-right opacity-80">
            4 Global Offices serving <br /> UK, USA (New York) & EU.
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero;
