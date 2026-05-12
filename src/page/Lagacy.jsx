import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// ইমেজ ইমপোর্ট
import l1 from "../assets/l1.webp";
import l2 from "../assets/l2.webp";
import l3 from "../assets/l3.webp";

gsap.registerPlugin(ScrollTrigger);

const cardsData = [
  {
    id: 1,
    title: "Pioneers",
    desc1: "We're dedicated to creating the industry narrative that others follow 3 years from now. We paved the path for creative SEO, multi-channel search with Digital PR, and Social Search and we will continue to do it.",
    desc2: "We're on a mission to be the first search-first agency to win a Cannes Lion disrupting the status quo.",
    bgColor: "bg-[#0a0a0a]",
    textColor: "text-white",
    imgUrl: l1,
  },
  {
    id: 2,
    title: "Award Winning",
    desc1: "A roll top bath full of 79 awards. Voted The Drum's best agency outside of London. We are official judges for industry awards including Global Search Awards and Global Content Marketing Awards.",
    desc2: "",
    bgColor: "bg-[#b0f2d8]",
    textColor: "text-[#111212]",
    imgUrl: l2,
  },
  {
    id: 3,
    title: "Speed",
    desc1: "People ask us why we are called Rise at Seven? Ever heard the saying Early Bird catches the worm? Google is moving fast, but humans are moving faster. We chase consumers, not algorithms. We've created a service which takes ideas to result within 60 minutes.",
    desc2: "",
    bgColor: "bg-white",
    textColor: "text-[#111212]",
    imgUrl: l3,
  },
];

const Legacy = () => {
  const desktopContainerRef = useRef(null);
  const cardsRef = useRef([]);
  
  // Mobile Slider State
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);
  
  const extendedCards = [...cardsData, cardsData[0]];

  // --- DESKTOP GSAP ANIMATION (FIXED: BOTH GO LEFT) ---
  useEffect(() => {
    let mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: desktopContainerRef.current,
          start: "top top",
          end: "+=300%", 
          scrub: 1.5,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // প্রথম কার্ড বামে যাবে
      tl.to(cardsRef.current[0], {
        y: -1000,
        x: -1200, // বামে
        rotation: -30,
        scale: 0.7,
        opacity: 0,
        ease: "power1.inOut",
      })
      // দ্বিতীয় কার্ডও এখন বামে যাবে
      .to(cardsRef.current[1], {
        y: -1000,
        x: -1200, // বামে (আপনার রিকোয়েস্ট অনুযায়ী)
        rotation: -25,
        scale: 0.7,
        opacity: 0,
        ease: "power1.inOut",
      }, "-=0.3"); 

      return () => {
        if (ScrollTrigger.getById("desktopTrigger")) {
          ScrollTrigger.getById("desktopTrigger").kill();
        }
      };
    });

    return () => mm.revert();
  }, []);

  // --- MOBILE SLIDER LOGIC ---
  const handleNext = () => {
    if (currentIndex >= cardsData.length) return;
    setCurrentIndex((prev) => prev + 1);
    setIsTransitioning(true);
  };

  const handlePrev = () => {
    if (currentIndex <= 0) {
      setIsTransitioning(false);
      setCurrentIndex(cardsData.length);
      setTimeout(() => {
        setIsTransitioning(true);
        setCurrentIndex(cardsData.length - 1);
      }, 10);
    } else {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  useEffect(() => {
    if (currentIndex === cardsData.length) {
      const timer = setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex(0);
      }, 500); 
      return () => clearTimeout(timer);
    }
  }, [currentIndex]);

  const touchStartX = useRef(null);
  const onTouchStart = (e) => (touchStartX.current = e.targetTouches[0].clientX);
  const onTouchEnd = (e) => {
    const touchEndX = e.changedTouches[0].clientX;
    if (touchStartX.current - touchEndX > 50) handleNext();
    if (touchStartX.current - touchEndX < -50) handlePrev();
  };

  const displayIndex = currentIndex % cardsData.length;
  const progressWidth = ((displayIndex + 1) / cardsData.length) * 100;

  return (
    <section className="relative w-full bg-[#f4f4f4] overflow-hidden">
      
      {/* --- DESKTOP VERSION --- */}
      <div 
        ref={desktopContainerRef} 
        className="hidden md:flex flex-col items-center justify-center h-screen w-full relative"
      >
        <h2 className="absolute top-12 text-[20px] font-semibold tracking-tight text-gray-800">
          Legacy In The Making
        </h2>

        <div className="relative w-[500px] h-[550px] mt-12">
          {cardsData.map((card, index) => (
            <div
              key={card.id}
              ref={(el) => (cardsRef.current[index] = el)}
              className={`absolute inset-0 p-12 rounded-[45px] flex flex-col items-center text-center shadow-2xl ${card.bgColor} ${card.textColor} will-change-transform`}
              style={{ zIndex: cardsData.length - index }}
            >
              <div className="w-full h-[280px] rounded-3xl overflow-hidden mb-8">
                <img src={card.imgUrl} alt={card.title} className="w-full h-full object-cover" />
              </div>
              <h3 className="text-[48px] font-bold leading-tight mb-4">{card.title}</h3>
              <p className="text-[16px] leading-relaxed opacity-80">{card.desc1}</p>
              {card.desc2 && <p className="text-[16px] mt-4 leading-relaxed opacity-80">{card.desc2}</p>}
            </div>
          ))}
        </div>
      </div>

      {/* --- MOBILE VERSION (Updated Image Specs) --- */}
      <div className="flex md:hidden flex-col items-center w-full pt-16 pb-12 px-6">
        <h2 className="text-[16px] font-medium tracking-wide mb-10 text-gray-700">
          Legacy In The Making
        </h2>

        <div 
          className="relative w-full max-w-[420px] overflow-hidden rounded-[35px]"
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          <div 
            className={`flex ${isTransitioning ? "transition-transform duration-500 ease-out" : ""}`}
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {extendedCards.map((card, idx) => (
              <div 
                key={idx} 
                className={`min-w-full p-6 flex flex-col items-center text-center ${card.bgColor} ${card.textColor}`}
                style={{ minHeight: '580px' }}
              >
                {/* Pixel Perfect Image Container for Mobile (Based on image_d367f4.jpg) */}
                <div className="w-full aspect-[4/3] rounded-[15px] overflow-hidden mb-8 shadow-lg">
                  <img src={card.imgUrl} alt={card.title} className="w-full h-full object-cover" />
                </div>
                
                <h3 className="text-[36px] font-bold mb-4 tracking-tight">{card.title}</h3>
                <p className="text-[15px] leading-[1.6] font-medium px-2 opacity-90">{card.desc1}</p>
                {card.desc2 && <p className="text-[15px] mt-4 leading-[1.6] opacity-90">{card.desc2}</p>}
              </div>
            ))}
          </div>
        </div>

        <div className="w-[80%] max-w-[300px] h-[2px] bg-gray-300 mt-12 relative overflow-hidden rounded-full">
          <div 
            className="absolute top-0 left-0 h-full bg-black transition-all duration-500 ease-out"
            style={{ width: `${progressWidth}%` }}
          />
        </div>
      </div>

    </section>
  );
};

export default Legacy;