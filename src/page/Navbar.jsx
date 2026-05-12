import React, { useState, useEffect } from "react";
import { MdOutlineArrowOutward } from "react-icons/md";
import {
  IoChevronDownCircleOutline,
  IoChevronUpCircleOutline,
} from "react-icons/io5";
import { FiArrowUpRight } from "react-icons/fi";

// Menu data with environment-aware image paths
const menuData = {
  "Services+": {
    label: "Core Services",
    items: [
      { id: 1, title: "Search & Growth Strategy", image: `${import.meta.env.BASE_URL}sr1.webp` },
      { id: 2, title: "Digital PR", image: `${import.meta.env.BASE_URL}sr2.webp` },
      { id: 3, title: "Onsite SEO", image: `${import.meta.env.BASE_URL}sr3.webp` },
      { id: 4, title: "Social Media & Campaigns", image: `${import.meta.env.BASE_URL}sr4.webp` },
      { id: 5, title: "Content Experience", image: `${import.meta.env.BASE_URL}sr5.webp` },
      { id: 6, title: "Data & Insights", image: `${import.meta.env.BASE_URL}sr6.webp` },
      { id: 7, title: "B2B Marketing", image: `${import.meta.env.BASE_URL}sr7.webp` },
      { id: 8, title: "Social SEO/Search", image: `${import.meta.env.BASE_URL}sr8.webp` },
    ],
  },
  "Industries+": {
    label: "",
    items: [{ id: 1, title: "B2B Marketing", image: `${import.meta.env.BASE_URL}sr4.webp` }],
  },
  "International+": {
    label: "Global Reach",
    items: [
      { id: 1, title: "US Digital PR", image: `${import.meta.env.BASE_URL}in1.webp` },
      { id: 2, title: "Spain Digital PR", image: `${import.meta.env.BASE_URL}in2.webp` },
      { id: 3, title: "Germany Digital PR", image: `${import.meta.env.BASE_URL}in3.webp` },
      { id: 4, title: "Netherlands Digital PR", image: `${import.meta.env.BASE_URL}in4.webp` },
    ],
  },
  "About+": {
    label: "Our Story",
    items: [
      { id: 1, title: "About Us", image: `${import.meta.env.BASE_URL}a1.webp` },
      { id: 2, title: "Meet The Risers", image: `${import.meta.env.BASE_URL}a2.webp` },
      { id: 3, title: "Culture", image: `${import.meta.env.BASE_URL}a3.webp` },
      { id: 4, title: "Testimonials", image: `${import.meta.env.BASE_URL}a4.webp` },
    ],
  },
  "Blog And Resources+": {
    label: "Insights & Resources",
    items: [
      { id: 1, title: "Blog", image: `${import.meta.env.BASE_URL}bl1.webp` },
      { id: 2, title: "Category Leaderboard", image: `${import.meta.env.BASE_URL}bl2.webp` },
      { id: 3, title: "Multi-channel Search Reaport", image: `${import.meta.env.BASE_URL}bl3.webp` },
    ],
  },
};

const Navbar = ({ navbarRef }) => {
  const [hoveredKey, setHoveredKey] = useState(null);
  const [activeImage, setActiveImage] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [expandedMobileMenus, setExpandedMobileMenus] = useState({
    "About+": true,
  });
  const [iconActive, setIconActive] = useState(false);

  // Scroll visibility and floating logic
  const [isVisible, setIsVisible] = useState(true);
  const [isFloating, setIsFloating] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY <= 50) {
        setIsVisible(true);
        setIsFloating(false);
      } else if (currentScrollY > lastScrollY) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
        setIsFloating(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Handle body scroll and icon animation when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
      const timer = setTimeout(() => setIconActive(true), 10);
      return () => clearTimeout(timer);
    } else {
      document.body.style.overflow = "auto";
      setIconActive(false);
    }
  }, [isMobileMenuOpen]);

  const handleMouseEnter = (key) => {
    if (menuData[key]) {
      setHoveredKey(key);
      setActiveImage(menuData[key].items[0].image);
    } else {
      setHoveredKey(null);
    }
  };

  const toggleMobileSubMenu = (key) => {
    setExpandedMobileMenus((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <>
      {/* Background Overlay */}
      <div
        className={`fixed inset-0 bg-black/15 backdrop-blur-md z-40 opacity-40 transition-all duration-500 ease-out pointer-events-none ${
          hoveredKey ? "opacity-100" : "opacity-0"
        }`}
      />

      <nav
        ref={navbarRef}
        className={`z-50 transition-all duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] transform-gpu
          ${
            isFloating
              ? "fixed top-2 left-0 right-0 mx-2 w-[calc(100%-16px)] bg-white rounded-[100px] py-3 shadow-xl"
              : "absolute top-0 left-0 w-full mt-[-14px] py-6"
          }
          ${isVisible ? "translate-y-0" : "-translate-y-full opacity-0"}
        `}
        onMouseLeave={() => setHoveredKey(null)}
      >
        <div
          className={`w-full flex items-center justify-between px-4 md:px-8 lg:px-10 transition-colors duration-300 ${isFloating ? "text-black" : "text-white"} relative`}
        >
          <h1 className="text-[28px] flex-shrink-0 cursor-pointer flex items-center font-bold">
            Rise at Seve{" "}
            <img
              src={isFloating ? `${import.meta.env.BASE_URL}logo2.webp` : `${import.meta.env.BASE_URL}logo1.webp`}
              alt="Logo"
              className="h-[24px] mt-1"
            />
          </h1>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1 text-[16px] font-medium tracking-tight">
            {[
              "Services+", "Industries+", "International+", "About+", "Work", "Careers", "Blog And Resources+", "Webinar",
            ].map((item) => (
              <div
                key={item}
                className={`cursor-pointer px-5 py-2.5 rounded-full transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] transform-gpu 
                  ${isFloating ? "hover:bg-black hover:text-white" : "hover:bg-white hover:text-black"} 
                  ${item === "Blog And Resources+" || item === "Webinar" ? "hidden xl:block" : ""}`}
                onMouseEnter={() => handleMouseEnter(item)}
              >
                {item === "Work" ? (
                  <div className="flex items-center gap-1">
                    Work{" "}
                    <span className="bg-[#b1f5df] text-black text-[10px] font-bold px-1.5 py-0.5 rounded-full ml-1">
                      22
                    </span>
                  </div>
                ) : (
                  item
                )}
              </div>
            ))}
          </div>

          {/* Megamenu Container */}
          <div
            className={`absolute top-[100%] left-1/2 -translate-x-1/2 bg-white rounded-[32px] p-10 flex gap-16 shadow-2xl z-50 text-black transition-all duration-300 ease-[cubic-bezier(0.19,1,0.22,1)] transform-gpu ${
              hoveredKey
                ? "opacity-100 scale-100 visible translate-y-4"
                : "opacity-0 scale-95 invisible -translate-y-4"
            } w-max`}
          >
            {hoveredKey && menuData[hoveredKey] && (
              <>
                <div className="flex flex-col">
                  <span className="text-[11px] font-bold text-gray-400 mb-8 uppercase">
                    {menuData[hoveredKey].label}
                  </span>
                  <div className="grid grid-cols-2 gap-x-16 gap-y-5 font-bold text-[20px] tracking-tight">
                    {menuData[hoveredKey].items.map((item) => (
                      <div
                        key={item.id}
                        onMouseEnter={() => setActiveImage(item.image)}
                        className="group relative cursor-pointer overflow-hidden h-[28px]"
                      >
                        <div className="flex flex-col transition-transform duration-[200ms] ease-[cubic-bezier(0.65,0,0.35,1)] group-hover:-translate-y-1/2 transform-gpu">
                          <span className="block text-black">{item.title}</span>
                          <span className="block text-black">{item.title}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="relative w-[340px] h-[240px] rounded-[24px] overflow-hidden shrink-0 shadow-xl bg-gray-50 transition-all duration-500">
                  <img
                    src={activeImage}
                    alt="Preview"
                    className="w-full h-full object-cover transition-opacity duration-300"
                  />
                  {hoveredKey === "Services+" && (
                    <div className="absolute inset-0 flex items-end justify-center pb-6">
                      <button className="bg-black text-white px-6 py-2.5 rounded-full text-[13px] font-bold overflow-hidden group/viewall transition-all duration-300 transform-gpu hover:scale-105">
                        <div className="flex flex-col transition-transform duration-[400ms] ease-[cubic-bezier(0.65,0,0.35,1)] group-hover/viewall:-translate-y-1/2">
                          <span className="flex items-center gap-1 h-[20px]">
                            View All <MdOutlineArrowOutward />
                          </span>
                          <span className="flex items-center gap-1 h-[20px]">
                            View All <MdOutlineArrowOutward />
                          </span>
                        </div>
                      </button>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>

          <div className="hidden lg:block flex-shrink-0">
            <button
              className={`h-[48px] px-8 rounded-full font-bold shadow-lg overflow-hidden group/btn transform-gpu active:scale-95 transition-all
              ${isFloating ? "bg-black text-white" : "bg-white text-black"}`}
            >
              <div className="flex flex-col transition-transform duration-[200ms] ease-[cubic-bezier(0.65,0,0.35,1)] group-hover/btn:-translate-y-1/2 cursor-pointer">
                <span className="flex items-center gap-2 h-[48px] text-[14px]">
                  Get In Touch <MdOutlineArrowOutward className="text-[20px]" />
                </span>
                <span className="flex items-center gap-2 h-[48px] text-[14px]">
                  Get In Touch <MdOutlineArrowOutward className="text-[20px]" />
                </span>
              </div>
            </button>
          </div>

          {/* Mobile Menu Trigger */}
          <div className="lg:hidden flex items-center pr-2">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="w-6 h-4 flex items-center justify-center relative focus:outline-none"
            >
              <div className="relative w-full h-full">
                <div
                  className={`absolute w-full h-[1.5px] transition-all duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] ${isFloating ? "bg-black" : "bg-white"} ${isMobileMenuOpen ? "top-1/2 -translate-y-1/2 rotate-45" : "top-0 rotate-0"}`}
                />
                <div
                  className={`absolute w-full h-[1.5px] transition-all duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] ${isFloating ? "bg-black" : "bg-white"} ${isMobileMenuOpen ? "bottom-1/2 translate-y-1/2 -rotate-45" : "bottom-0 rotate-0"}`}
                />
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-2 animate-in fade-in duration-200">
          <div
            className="absolute inset-0 bg-black/20 backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="relative bg-[#1a1a1a]/50 backdrop-blur-[2px] flex flex-col font-sans text-white h-full w-full rounded-[32px] overflow-hidden shadow-2xl border border-white/10 transition-all duration-300">
            <div className="flex justify-between items-center px-7 border-b border-white/20 py-6 flex-shrink-0 pl-3 pr-5">
              <h1 className="text-[20px] font-medium flex-shrink-0 cursor-pointer flex items-center">
                Rise at Seve{" "}
                <img
                  src={isFloating ? `${import.meta.env.BASE_URL}logo2.webp` : `${import.meta.env.BASE_URL}logo1.webp`}
                  alt="Logo"
                  className="h-[21px] mt-1"
                />
              </h1>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-6 h-4 flex items-center justify-center relative focus:outline-none"
              >
                <div className="relative w-full h-full">
                  <div
                    className={`absolute w-full h-[1.5px] bg-white transition-all duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] ${iconActive ? "top-1/2 -translate-y-1/2 rotate-45" : "top-0 rotate-0"}`}
                  />
                  <div
                    className={`absolute w-full h-[1.5px] bg-white transition-all duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] ${iconActive ? "bottom-1/2 translate-y-1/2 -rotate-45" : "bottom-0 rotate-0"}`}
                  />
                </div>
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-3 pb-36 pt-2 scrollbar-hide">
              {[
                "Services+", "Industries+", "International+", "About+", "Work", "Careers", "Blog And Resources+", "Webinar",
              ].map((item) => (
                <div key={item} className="mb-2 border-b border-white/20">
                  {menuData[item] ? (
                    <div>
                      <button
                        onClick={() => toggleMobileSubMenu(item)}
                        className="w-full flex justify-between items-center font-medium text-[30px] tracking-tighter text-white"
                      >
                        {item.replace("+", "")}
                        {expandedMobileMenus[item] ? (
                          <IoChevronUpCircleOutline className="w-8 h-8 text-white" />
                        ) : (
                          <IoChevronDownCircleOutline className="w-8 h-8 text-white" />
                        )}
                      </button>
                      <div
                        className={`overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.19,1,0.22,1)] ${expandedMobileMenus[item] ? "max-h-[500px] mt-3 mb-2 opacity-100" : "max-h-0 opacity-0"}`}
                      >
                        <div className="flex flex-col gap-1 pl-1">
                          {menuData[item].items.map((sub) => (
                            <a
                              key={sub.id}
                              href="#"
                              className="text-[22px] font-medium tracking-tight text-white transition-colors"
                            >
                              {sub.title}
                            </a>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <a
                      href="#"
                      className="block font-medium text-[30px] tracking-tighter leading-none text-white"
                    >
                      {item}
                    </a>
                  )}
                </div>
              ))}
            </div>
            <div className="absolute bottom-6 left-6 right-6">
              <button className="w-full bg-white text-black py-4 rounded-full font-bold text-[16px] tracking-tight flex justify-center items-center gap-2 shadow-xl hover:bg-gray-100 transition-colors active:scale-[0.98]">
                Get In Touch <FiArrowUpRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
