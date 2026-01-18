import { useNavigate } from "react-router-dom";
  

const Hero = () => {
  const navigate  = useNavigate()
  return (
    <section className="relative flex flex-col items-center text-white text-sm overflow-hidden bg-[#0f172a]">
      {/* Background gradient */}
      <svg
        className="absolute -z-10 w-screen -mt-40 md:mt-0"
        width="1440"
        height="676"
        viewBox="0 0 1440 676"
        fill="none"
      >
        <rect
          x="-92"
          y="-948"
          width="1624"
          height="1624"
          rx="812"
          fill="url(#a)"
        />
        <defs>
          <radialGradient
            id="a"
            cx="0"
            cy="0"
            r="1"
            gradientUnits="userSpaceOnUse"
            gradientTransform="rotate(90 428 292)scale(812)"
          >
            <stop offset="0.6" stopColor="#372AAC" stopOpacity="0.4" />
            <stop offset="1" stopColor="#372AAC" />
          </radialGradient>
        </defs>
      </svg>

      {/* Badge */}
      <div className="flex items-center mt-32 gap-2 border border-slate-600 text-slate-200 rounded-full px-4 py-2">
        <div className="size-2.5 bg-green-500 rounded-full"></div>
        <span>Book trusted local services</span>
      </div>

      {/* Heading */}
      <h1 className="text-center text-5xl md:text-6xl leading-tight mt-6 font-semibold max-w-2xl">
        Find & book local services easily
      </h1>

      {/* Subtitle */}
      <p className="text-center text-base max-w-lg mt-4 text-slate-300">
        Discover nearby professionals, book instantly, and manage
        your services in one place.
      </p>

      {/* Buttons */}
      <div className="flex items-center gap-4 mt-10">
        <a
          href="/register"
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 transition text-white rounded-lg px-7 h-11"
        >
          Get started →
        </a>

        <button onClick={()=> navigate("/services")} className="border border-slate-500 text-slate-200 hover:bg-white/10 transition rounded-lg px-8 h-11">
          Browse services
        </button>
      </div>

      {/* Image */}
      <img
        src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/hero/hero-section-showcase-2.png"
        className="w-full rounded-[15px] max-w-4xl mt-16 mb-20"
        alt="Hero showcase"
      />
    </section>
  );
};

export default Hero;
