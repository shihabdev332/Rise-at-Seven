import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Assets
import nn from "../assets/nn.webp";
import n1 from "../assets/n1.webp";
import n2 from "../assets/n2.webp";
import n3 from "../assets/n3.webp";

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

const newsData = [
  { id: 1, author: "Ray Saddiq", time: "3 mins", title: "Rise at Seven Appoints Hollie Lovell as Senior Operations Lead", img: n1 },
  { id: 2, author: "Ray Saddiq", time: "2 mins", title: "Rise at Seven Exits Sheffield and Triples Manchester as new HQ", img: n2 },
  { id: 3, author: "Carrie Rose", time: "2 mins", title: "Ryan McNamara Is Now Rise at Seven's Global Operations Director", img: n3 }
];

const New = () => {
  const [activeCursor, setActiveCursor] = useState(false);
  const cursorRef = useRef(null);
  const pinnedSectionRef = useRef(null);
  const textContainerRef = useRef(null);

  // --- MOBILE SLIDER LOGIC ---
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const extendedNews = [...newsData, newsData[0]]; 

  const handleNext = () => {
    if (currentIndex >= newsData.length) return;
    setCurrentIndex((prev) => prev + 1);
    setIsTransitioning(true);
  };

  const handlePrev = () => {
    if (currentIndex <= 0) {
      setIsTransitioning(false);
      setCurrentIndex(newsData.length);
      setTimeout(() => {
        setIsTransitioning(true);
        setCurrentIndex(newsData.length - 1);
      }, 10);
    } else {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  useEffect(() => {
    if (currentIndex === newsData.length) {
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

  const displayIndex = currentIndex % newsData.length;
  const progressWidth = ((displayIndex + 1) / newsData.length) * 100;

  // --- CUSTOM CURSOR ---
  useEffect(() => {
    const xTo = gsap.quickTo(cursorRef.current, "x", { duration: 0.2, ease: "power3" });
    const yTo = gsap.quickTo(cursorRef.current, "y", { duration: 0.2, ease: "power3" });
    const moveCursor = (e) => { xTo(e.clientX); yTo(e.clientY); };
    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, []);

  // --- PINNED TEXT ANIMATION ---
  useEffect(() => {
    let ctx = gsap.context(() => {
      const heading = textContainerRef.current.querySelector('.ready-text');
      if (!heading) return;
      const textContent = heading.innerText;
      
      heading.innerHTML = textContent
        .split("")
        .map(char => `<span class="char" style="display: inline-block; white-space: pre;">${char === " " ? "&nbsp;" : char}</span>`)
        .join("");

      const chars = heading.querySelectorAll(".char");
      chars.forEach((char, i) => {
        gsap.set(char, { y: i % 2 === 0 ? -40 : 40, rotate: i % 2 === 0 ? 15 : -15 });
      });

      const getScrollAmount = () => -(textContainerRef.current.scrollWidth - window.innerWidth + window.innerWidth * 0.1);

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: pinnedSectionRef.current,
          start: "top top",
          end: "+=300%", 
          scrub: 1.5,
          pin: true,
          invalidateOnRefresh: true,
        }
      });

      tl.fromTo(textContainerRef.current, { x: "100vw" }, { x: getScrollAmount, ease: "none" }, 0)
        .to(chars, { y: 0, rotate: 0, ease: "power2.out", stagger: 0.01 }, 0); 
    });
    return () => ctx.revert();
  }, []);

  return (
    <section className="bg-[#f4eaea] overflow-hidden font-sans relative">
      <div className="py-12 md:py-24">
        
        {/* Custom Cursor */}
        <div ref={cursorRef} className="fixed top-0 left-0 pointer-events-none z-[999] hidden md:block" style={{ marginLeft: '-40px', marginTop: '-40px' }}>
          <div className={`w-20 h-20 bg-[#b0f2d8] rounded-full flex items-center justify-center transition-all duration-300 ease-out ${activeCursor ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="3"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
          </div>
        </div>

        <div className="w-[95%] md:w-[95%] max-w-[1800px] mx-auto">
          <h2 className="text-[60px] md:text-[110px] lg:text-[130px] font-bold leading-[0.95] tracking-tighter text-[#111] mb-12 md:mb-20">
            What's <img src={nn} alt="" className="inline-block w-[60px] items-center h-[60px] md:w-28 md:h-28 rounded-2xl md:rounded-[32px] object-cover align-bottom mx-1 md:mx-3" /> New
          </h2>
          
          {/* --- DESKTOP GRID VIEW --- */}
          <div className="hidden md:grid md:grid-cols-3 gap-10">
            {newsData.map((item, index) => (
              <div key={index} className="group cursor-none" onMouseEnter={() => setActiveCursor(true)} onMouseLeave={() => setActiveCursor(false)}>
                <div className="relative aspect-square overflow-hidden rounded-[40px] mb-6 bg-[#ececec]">
                  <img src={item.img} alt="" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]">
                    <div className="w-[300%] h-[300%] absolute left-1/2 -translate-x-1/2 top-0 bg-white/20 backdrop-blur-3xl rounded-[100%] border-t border-white/30" style={{ boxShadow: '0 -20px 40px rgba(0,0,0,0.03)' }} />
                  </div>
                </div>
                <div className="flex items-center gap-3 mb-2 opacity-60 text-sm font-medium">
                  <span>{item.author}</span> • <span>{item.time}</span>
                </div>
                <h3 className="text-[32px] font-bold text-[#111] leading-[1.1]">{item.title}</h3>
              </div>
            ))}
          </div>

          {/* --- MOBILE PEERING SLIDER --- */}
          <div className="block md:hidden">
            <div className="relative w-full overflow-hidden" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
              <div 
                className={`flex gap-5 ${isTransitioning ? "transition-transform duration-500 ease-out" : ""}`}
                style={{ transform: `translateX(-${currentIndex * 86}%)` }} // 86% allows peeking of next card
              >
                {extendedNews.map((item, idx) => (
                  <div key={idx} className="min-w-[82%] flex flex-col">
                    <div className="relative aspect-[4/4.5] overflow-hidden rounded-[32px] mb-6 bg-[#ececec]">
                      <img src={item.img} alt="" className="w-full h-full object-cover" />
                    </div>
                    
                    <div className="flex items-center gap-3 mb-4">
                      <div className="flex items-center gap-2 bg-white border border-gray-100 px-3 py-1.5 rounded-full text-[13px] font-bold text-[#111]">
                        <div className="w-5 h-5 rounded-full bg-gray-200 overflow-hidden">
                           <img src={item.img} alt="" className="w-full h-full object-cover" />
                        </div>
                        {item.author}
                      </div>
                      <div className="flex items-center gap-2 bg-white border border-gray-100 px-3 py-1.5 rounded-full text-[13px] font-bold text-[#111]">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                        {item.time}
                      </div>
                    </div>
                    
                    <h3 className="text-[26px] font-bold text-[#111] leading-[1.1] tracking-tight">{item.title}</h3>
                  </div>
                ))}
              </div>
            </div>

            {/* Progress Bar & Explore Button */}
            <div className="mt-12 space-y-8">
              <div className="w-full h-[2px] bg-gray-200 relative overflow-hidden rounded-full">
                <div className="absolute top-0 left-0 h-full bg-black transition-all duration-500 ease-out" style={{ width: `${progressWidth}%` }} />
              </div>
              
              <button className="w-full py-5 bg-white  border-gray-200 rounded-full font-bold text-[#111] text-[18px] flex items-center justify-center gap-2 active:bg-gray-50 transition-colors">
                Explore More Thoughts 
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Pinned Section */}
      <div ref={pinnedSectionRef} className="hidden md:flex w-full h-screen items-center overflow-hidden bg-[#f9f9f9]">
        <div ref={textContainerRef} className="will-change-transform">
          <h1 className="ready-text font-bold tracking-[-0.05em] text-[#111] whitespace-nowrap" style={{ fontFamily: 'Saans, sans-serif' }}>
            Ready to Rise at Seven?
          </h1>
        </div>
      </div>

      <style>{`
        .ready-text { font-size: 18vw; line-height: 0.8; }
        @media (max-width: 768px) { .ready-text { font-size: 80px; } }
      `}</style>
    </section>
  );
};

export default New;