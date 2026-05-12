import React, { useEffect, useRef, memo } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FiArrowUpRight } from "react-icons/fi";
import { GoArrowUpRight } from "react-icons/go";
import {
  FaFacebookF,
  FaXTwitter,
  FaYoutube,
  FaTiktok,
  FaInstagram,
} from "react-icons/fa6";

gsap.registerPlugin(ScrollTrigger);

// Memoized component for sliding text animation
const SlideUpTextLink = memo(({ text, href = "#" }) => (
  <a
    href={href}
    className="group relative flex flex-col overflow-hidden w-fit text-white font-medium text-[18px] md:text-[22px] h-[1.5em] hover:text-[#b1f5df] transition-colors leading-[1.5em] tracking-tighter"
  >
    <div className="flex flex-col transition-transform duration-300 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-1/2">
      <span className="h-[1.5em]">{text}</span>
      <span className="h-[1.5em]">{text}</span>
    </div>
  </a>
));

// Memoized component for social icons to prevent unnecessary re-renders
const SlideUpSocialIcon = memo(({ Icon, href = "#" }) => (
  <div className="flex items-center h-5 w-10 rounded-lg cursor-pointer bg-white hover:rounded-sm transition-all">
    <a
      href={href}
      className="group relative flex overflow-hidden w-5 h-5 rounded-full bg-white text-black items-center justify-center"
    >
      <div className="flex flex-col items-center transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]">
        <Icon className="absolute top-1/2 -translate-y-1/2" size={12} />
        <Icon className="absolute top-[200%] -translate-y-1/2" size={16} />
      </div>
    </a>
    <GoArrowUpRight className="text-black text-[14px] font-semibold" />
  </div>
));

const Footer = () => {
  const footerContentRef = useRef(null);
  const footerContainerRef = useRef(null);

  // Data for cleaner JSX structure
  const socialMediaLinks = [
    { icon: FaFacebookF, href: "#" },
    { icon: FaXTwitter, href: "#" },
    { icon: FaYoutube, href: "#" },
    { icon: FaTiktok, href: "#" },
    { icon: FaInstagram, href: "#" },
  ];

  const navigationSections = [
    {
      links: ["Services", "Work", "About", "Culture", "Meet The Risers"],
    },
    {
      links: ["Testimonials", "Blog & Resources", "Webinars", "Careers"],
    },
    {
      links: ["Sheffield", "Manchester", "London", "New York", "Contact"],
      extraStyles: "col-span-2 md:col-span-1 mt-10 md:mt-0",
    },
  ];

  useEffect(() => {
    // GSAP context for better memory management and cleanup
    let ctx = gsap.context(() => {
      gsap.fromTo(
        footerContentRef.current,
        { opacity: 0.2 },
        {
          opacity: 1,
          scrollTrigger: {
            trigger: footerContainerRef.current,
            start: "top bottom",
            end: "60% bottom",
            scrub: true,
          },
        }
      );
    }, footerContainerRef);

    return () => ctx.revert(); // Cleanup on unmount
  }, []);

  return (
    <footer ref={footerContainerRef} className="bg-white flex w-full p-[8px]">
      <div ref={footerContentRef} className="w-full bg-[#0e0d0d] rounded-[25px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mt-10 ml-5">
          {/* Newsletter Section */}
          <div className="lg:col-span-5 flex flex-col items-start pr-4 ">
            <h2 className="text-[24px] md:text-[30px] lg:[42px] font-medium mb-2 text-white tracking-tighter leading-tight">
              Stay updated with Rise news
            </h2>
            <div className="relative w-full mb-2 md:max-w-[366px] lg:max-w-[690px] h-[60px]">
              <input
                type="email"
                placeholder="Your Email Address"
                className="w-full bg-[#222222] text-white rounded-full py-4 pl-7 pr-16 outline-none focus:bg-[#282828] transition-all placeholder-gray-500 text-lg"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 w-11 h-11 bg-[#b2e3d3] text-black rounded-full flex items-center justify-center hover:rotate-90 duration-200 transition-transform">
                <FiArrowUpRight size={22} className="cursor-pointer"/>
              </button>
            </div>
            <div className="flex gap-3">
              {socialMediaLinks.map((social, index) => (
                <SlideUpSocialIcon key={index} Icon={social.icon} href={social.href} />
              ))}
            </div>
          </div>

          {/* Navigation Links */}
          <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-3  ">
            {navigationSections.map((section, idx) => (
              <div key={idx} className={`border-l border-white/10 pl-3 md:pl-3 flex flex-col gap-2 ${section.extraStyles || ""}`}>
                {section.links.map((link) => (
                  <SlideUpTextLink key={link} text={link} />
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Brand Identity Section */}
        <div className="mt-5 md:mt-5 w-full flex justify-center items-center overflow-hidden">
          <h1 className="text-[16vw] leading-none font-medium text-white select-none whitespace-nowrap tracking-tighter flex items-center">
            Rise at Seve
            <img
              src="/logo1.webp"
              alt="Logo"
              className="inline-block w-[11vw] h-[13vw] object-cover mx-[1vw] rounded-xl mt-4 md:mt-10"
            />
          </h1>
        </div>

        {/* Footer Meta Information */}
        <div className="mt-12 pt-8 border-t gap-6 pb-2 pr-2 border-white/10 flex flex-col xl:flex-row justify-between items-start xl:items-center text-[10px] text-gray-400 gap-6">
          <div className="flex flex-wrap gap-x-4 gap-y-2 uppercase tracking-widest">
            <span>© 2025 Rise at Seven Ltd.</span>
            <span className="hidden md:inline text-white/20">|</span>
            <span>Company No. 11955187</span>
            <span className="hidden md:inline text-white/20">|</span>
            <span>VAT GB 322402945</span>
          </div>
          <div className="flex flex-wrap ">
            <SlideUpTextLink text="Privacy Policy" />
            <SlideUpTextLink text="Terms & Conditions" />
            <SlideUpTextLink text="Website MadeByShape" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;