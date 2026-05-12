"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Lenis from "@studio-freight/lenis";
import { ChevronLeft, Phone, ArrowRight, MapPin, Clock, ChevronRight, Settings, X } from "lucide-react";

interface PageProps {
  params: Promise<{ slug: string }>;
}
export async function generateStaticParams() {
    return [
      { slug: 'korekta-lakieru' },
      { slug: 'powloki-ceramiczne' },
      { slug: 'serwis-premium' },
      { slug: 'detailing-wnetrza' },
      { slug: 'folie-ochronne' },
        ];
}



const PROJECT_DATA: Record<string, any> = {
  "korekta-lakieru": {
    superTitle: "GALERIA SZTUKI",
    title1: "SZTUKA W",
    title2: "RUCHU",
    heading1: "GŁĘBIA",
    heading2: "LAKIERU",
    desc: "Korekta lakieru to proces wymagający niesamowitej cierpliwości. Każda rysa to dla nas skaza na idealnym obrazie, którą bezwzględnie usuwamy.",
    heroImage: "/hero.png",
    wideImage: "/gallery_bg.png",
    wideWord: "PERFEKCJA",
    smallImage: "/about.png",
    tallImage: "/gallery_ceramic.png"
  },
  "powloki-ceramiczne": {
    superTitle: "OCHRONA PREMIUM",
    title1: "TARCZA ZE",
    title2: "SZKŁA",
    heading1: "ZBROJA",
    heading2: "CERAMIKI",
    desc: "Wieloletnia ochrona przed mikrozarysowaniami i agresywną chemią. Twój lakier zyskuje niesamowity połysk i właściwości hydrofobowe.",
    heroImage: "/gallery_ceramic.png",
    wideImage: "/hero.png",
    wideWord: "BLASK",
    smallImage: "/gallery_interior.png",
    tallImage: "/gallery_bg.png"
  },
  "serwis-premium": {
    superTitle: "PRECYZJA INŻYNIERII",
    title1: "MOC",
    title2: "MASZYNY",
    heading1: "SERWIS",
    heading2: "KLASY VIP",
    desc: "Najwyższy standard obsługi mechanicznej. Oddając nam swój wóz, zyskujesz pewność, że zajmą się nim eksperci od samochodów luksusowych i sportowych.",
    heroImage: "/hero.png",
    wideImage: "/gallery_bg.png",
    wideWord: "MOC",
    smallImage: "/gallery_ceramic.png",
    tallImage: "/gallery_interior.png"
  },
  "detailing-wnetrza": {
    superTitle: "LUKSUS WNĘTRZA",
    title1: "STREFA",
    title2: "KOMFORTU",
    heading1: "CZYSTOŚĆ",
    heading2: "ABSOLUTNA",
    desc: "Pielęgnacja skór, pranie ekstrakcyjne, ozonowanie. Każdy detal kabiny zostaje odświeżony i zabezpieczony dedykowanymi kosmetykami premium.",
    heroImage: "/gallery_interior.png",
    wideImage: "/about.png",
    wideWord: "DETAL",
    smallImage: "/hero.png",
    tallImage: "/gallery_bg.png"
  },
  "folie-ochronne": {
    superTitle: "ZABEZPIECZENIE PPF",
    title1: "NIEWIDZIALNA",
    title2: "ZBROJA",
    heading1: "TARCZA",
    heading2: "OCHRONNA",
    desc: "Folie poliuretanowe to jedyny skuteczny sposób na odpryski od kamieni. Regenerują się pod wpływem ciepła i chronią najdroższe elementy.",
    heroImage: "/about.png",
    wideImage: "/hero.png",
    wideWord: "OCHRONA",
    smallImage: "/gallery_bg.png",
    tallImage: "/gallery_ceramic.png"
  }
};

export function generateStaticParams() {
    return [
      { slug: 'korekta-lakieru' },
      { slug: 'powloki-ceramiczne' },
      { slug: 'serwis-premium' },
      { slug: 'detailing-wnetrza' },
      { slug: 'folie-ochronne' }
        ];
}


export default function Realizacje({ params }: PageProps) {
  const [data, setData] = useState<any>(null);
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [showContact, setShowContact] = useState(false);

  useEffect(() => {
    params.then((resolvedParams) => {
      const slug = resolvedParams.slug;
      const projectData = PROJECT_DATA[slug] || PROJECT_DATA["korekta-lakieru"]; // Fallback
      setData(projectData);
    });

    let rafId: number;
    let lenis: Lenis | null = null;
    
    if (typeof window !== "undefined") {
      lenis = new Lenis({
        duration: 1.5,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: "vertical",
        gestureOrientation: "vertical",
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 2,
        infinite: false,
      });

      function raf(time: number) {
        lenis?.raf(time);
        rafId = requestAnimationFrame(raf);
      }
      rafId = requestAnimationFrame(raf);
    }

    return () => {
      cancelAnimationFrame(rafId);
      lenis?.destroy();
    };
  }, [params]);

  if (!data) return <div className="min-h-screen bg-[#0a0a0a]" />; // Loading state

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white selection:bg-[#b71c1c] selection:text-white font-sans relative">
      
      {/* Background Topographic Waves */}
      <div className="vertical-waves absolute inset-0 pointer-events-none z-0 opacity-40" />
      
      {/* Navbar - Restructured */}
      <nav className="fixed top-0 left-0 right-0 z-50 pointer-events-none">
        <div className="mx-5 sm:mx-8 lg:mx-16 mt-6 md:mt-4 flex justify-between items-start pointer-events-auto">
          {/* Left Side: Wróć and Breadcrumbs */}
          <div className="flex flex-col gap-3">
            <Link href="/">
              <motion.div
                whileHover={{ scale: 1.05, x: -5 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-3 text-white/80 hover:text-white transition-colors cursor-pointer group bg-black/50 backdrop-blur-xl px-5 py-2.5 rounded-full border border-white/10 shadow-lg inline-flex w-fit"
              >
                <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                <span className="font-black text-xs uppercase tracking-widest">Wróć do Galerii</span>
              </motion.div>
            </Link>
            <div className="hidden md:block pl-4">
              <p className="text-gray-300 leading-relaxed text-[9px] font-bold uppercase tracking-widest drop-shadow-md">
                Home / Realizacje / <span className="text-white">{data.superTitle}</span>
              </p>
            </div>
          </div>
          
          {/* Right Side: Logo & Contact */}
          <div className="flex items-center gap-4 bg-black/50 backdrop-blur-xl px-2 py-2 rounded-full border border-white/10 shadow-lg">
            <Link href="/">
              <motion.div 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center cursor-pointer ml-2 px-2"
              >
                <Image
                  src="/logo.png"
                  alt="AGA-MAX Wasilewscy"
                  width={130}
                  height={32}
                  className="h-7 w-auto object-contain brightness-0 invert hover:brightness-125 transition-all duration-300"
                />
              </motion.div>
            </Link>
            <button onClick={() => setContactModalOpen(true)}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 bg-[#b71c1c] text-white px-5 py-2.5 rounded-full hover:bg-[#8b1115] transition-colors cursor-pointer shadow-[0_0_20px_rgba(183,28,28,0.3)]"
              >
                <Phone className="w-4 h-4" />
                <span className="font-bold text-xs uppercase tracking-widest hidden sm:block">Kontakt</span>
              </motion.div>
            </button>
          </div>
        </div>
      </nav>

      {/* Split Screen Layout */}
      <div className="relative z-10 max-w-[1600px] mx-auto px-6 md:px-12 pt-32 md:pt-40 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* LEFT COLUMN - Sticky Info (35-40%) */}
          <div className="lg:col-span-5 relative">
            <div className="sticky top-32 bg-white/5 border border-white/10 backdrop-blur-xl rounded-[40px] p-8 md:p-12 shadow-2xl">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-8 h-[2px] bg-[#b71c1c]" />
                <span className="text-[#b71c1c] font-bold text-xs md:text-sm uppercase tracking-[0.3em]">{data.superTitle}</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter leading-[1.1] font-display mb-10 break-words hyphens-auto">
                {data.heading1} <br className="hidden lg:block" /> {data.heading2}
              </h1>
              
              <h2 className="text-lg font-bold tracking-tight font-display mb-4 uppercase text-white/60">O Projekcie</h2>
              <p className="text-gray-300 leading-relaxed text-base md:text-lg font-light mb-12">
                {data.desc}
              </p>

              <div className="grid grid-cols-2 gap-4 mb-12">
                <div className="bg-black/40 rounded-3xl p-5 border border-white/5">
                  <Settings className="w-6 h-6 text-[#b71c1c] mb-4" />
                  <p className="text-white/40 text-[10px] uppercase tracking-widest mb-1 font-bold">Zabieg</p>
                  <p className="font-semibold text-sm text-white">{data.heading1}</p>
                </div>
                <div className="bg-black/40 rounded-3xl p-5 border border-white/5">
                  <Clock className="w-6 h-6 text-[#b71c1c] mb-4" />
                  <p className="text-white/40 text-[10px] uppercase tracking-widest mb-1 font-bold">Czas trwania</p>
                  <p className="font-semibold text-sm text-white">2 - 4 Dni</p>
                </div>
              </div>

              {!showContact ? (
                <button 
                  onClick={() => setShowContact(true)}
                  className="w-full bg-[#b71c1c] text-white py-5 px-6 rounded-2xl font-black uppercase tracking-widest text-[11px] hover:bg-white hover:text-black transition-colors duration-300 flex items-center justify-between group shadow-[0_10px_30px_rgba(183,28,28,0.3)]"
                >
                  <span className="text-left leading-relaxed">Chcę taki efekt dla swojego auta</span>
                  <Phone className="w-4 h-4 shrink-0 group-hover:rotate-12 transition-transform" />
                </button>
              ) : (
                <div className="w-full bg-white/5 border border-white/10 p-6 md:p-8 rounded-2xl shadow-xl transition-all animate-in fade-in zoom-in duration-300">
                  <p className="text-white/40 text-[10px] uppercase tracking-widest mb-2 md:mb-4 font-bold">Zadzwoń do nas</p>
                  <p className="text-white font-black text-3xl md:text-4xl tracking-tighter mb-6 md:mb-0">+48 729 443 658</p>
                  
                  {/* Mobile Call Button */}
                  <a href="tel:+48729443658" className="md:hidden w-full bg-white text-black py-4 rounded-xl font-bold uppercase tracking-widest text-[11px] flex items-center justify-center gap-2 hover:bg-[#b71c1c] hover:text-white transition-colors">
                    <Phone className="w-4 h-4" /> Połącz teraz
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT COLUMN - Scrolling Gallery (60-65%) */}
          <div className="lg:col-span-7 flex flex-col gap-8 md:gap-12 pt-8 lg:pt-0">
             {/* Before After */}
             <div className="mb-4">
               <h3 className="text-white/40 text-[10px] font-bold tracking-[0.3em] mb-6 uppercase">Korekta Lakieru — Przed i Po</h3>
               <BeforeAfterSlider beforeImg={data.heroImage} afterImg={data.heroImage} />
             </div>

             <ParallaxImage src={data.wideImage} alt="Detail" className="w-full aspect-[4/3] rounded-[32px] bg-white/5 border border-white/10 shadow-2xl" />
             <ParallaxImage src={data.smallImage} alt="Detail" className="w-full aspect-[4/3] rounded-[32px] bg-white/5 border border-white/10 shadow-2xl" />
             <ParallaxImage src={data.tallImage} alt="Detail" className="w-full aspect-video md:aspect-[21/9] rounded-[32px] bg-white/5 border border-white/10 shadow-2xl" />
             
             <div className="grid grid-cols-2 gap-6 md:gap-8">
                <ParallaxImage src="/gallery_bg.png" alt="More" className="w-full aspect-square rounded-[32px] bg-white/5 border border-white/10 shadow-xl" />
                <ParallaxImage src="/hero.png" alt="More" className="w-full aspect-square rounded-[32px] bg-white/5 border border-white/10 shadow-xl" />
             </div>
          </div>
        </div>
        
        {/* Next/Prev Navigation */}
        <div className="mt-40 pt-16 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-12">
           <Link href="/realizacje/korekta-lakieru" className="group flex items-center gap-6 text-gray-300 hover:text-white transition-colors w-full sm:w-auto">
              <div className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-white/5 transition-colors shrink-0">
                <ChevronLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform text-[#b71c1c]" />
              </div>
              <div>
                 <p className="text-[10px] uppercase tracking-[0.3em] font-bold mb-1 text-white/40">Poprzedni projekt</p>
                 <p className="text-xl md:text-2xl font-black">Porsche 911</p>
              </div>
           </Link>
           <Link href="/realizacje/detailing-wnetrza" className="group flex items-center justify-end gap-6 text-gray-300 hover:text-white transition-colors w-full sm:w-auto text-right">
              <div>
                 <p className="text-[10px] uppercase tracking-[0.3em] font-bold mb-1 text-white/40">Następny projekt</p>
                 <p className="text-xl md:text-2xl font-black">Mercedes G-Class</p>
              </div>
              <div className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-white/5 transition-colors shrink-0">
                <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform text-[#b71c1c]" />
              </div>
           </Link>
        </div>
      </div>

      {/* Massive Call To Action */}
      <section className="relative z-10 w-full bg-[#b71c1c] text-white py-24 md:py-32 px-6 md:px-12 flex flex-col items-center justify-center text-center overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20 mix-blend-overlay" />
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative z-10 max-w-4xl mx-auto"
        >
          <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter font-display mb-6">
            Zainwestuj w <br /> Swój Samochód
          </h2>
          <p className="text-white/80 text-lg md:text-xl font-light max-w-2xl mx-auto mb-12">
            Zarezerwuj termin i dołącz do grona zadowolonych klientów, którzy zaufali naszemu 12-letniemu doświadczeniu. Detailing i serwis klasy VIP.
          </p>
          <Link href="/kontakt">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-3 bg-white text-[#b71c1c] px-8 py-4 rounded-full font-bold text-sm uppercase tracking-widest hover:shadow-[0_0_40px_rgba(255,255,255,0.4)] transition-all cursor-pointer group"
            >
              Darmowa Wycena
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.div>
          </Link>
        </motion.div>
      </section>

      {/* Professional Footer */}
      <footer className="relative z-10 bg-[#050505] pt-24 pb-12 px-6 md:px-12 lg:px-24 border-t border-white/5">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          
          <div>
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-6">
              <span className="text-black font-black text-2xl tracking-tighter">AM</span>
            </div>
            <p className="text-gray-500 font-light leading-relaxed">
              Ekskluzywne studio auto detailingu i zaawansowany serwis mechaniczny. Pasja do motoryzacji przełożona na perfekcję wykonania.
            </p>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-sm">Usługi Premium</h4>
            <ul className="space-y-4 text-gray-500 font-light">
              <li className="hover:text-white transition-colors cursor-pointer">Korekta Lakieru</li>
              <li className="hover:text-white transition-colors cursor-pointer">Powłoki Ceramiczne</li>
              <li className="hover:text-white transition-colors cursor-pointer">Folie Ochronne PPF</li>
              <li className="hover:text-white transition-colors cursor-pointer">Serwis Mechaniczny</li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-sm">Kontakt</h4>
            <ul className="space-y-4 text-gray-500 font-light">
              <li className="flex items-center gap-3"><Phone className="w-4 h-4 text-[#b71c1c]" /> +48 123 456 789</li>
              <li className="flex items-start gap-3"><MapPin className="w-4 h-4 text-[#b71c1c] shrink-0 mt-1" /> ul. Przykładowa 12<br/>00-000 Warszawa</li>
              <li className="flex items-center gap-3"><Clock className="w-4 h-4 text-[#b71c1c]" /> Pn-Pt: 08:00 - 18:00</li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-sm">Pracownia</h4>
            <ul className="space-y-4 text-gray-500 font-light">
              <li className="hover:text-white transition-colors cursor-pointer">Galeria Detailingowa</li>
              <li className="hover:text-white transition-colors cursor-pointer">Certyfikaty i Szkolenia</li>
            </ul>
          </div>
        </div>

        <div className="max-w-[1440px] mx-auto border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/30 text-sm">© 2026 AGA MAX Wasilewscy. Wszelkie prawa zastrzeżone.</p>
          <div className="flex gap-6 text-white/30 text-sm">
            <span className="hover:text-white transition-colors cursor-pointer">Polityka Prywatności</span>
            <span className="hover:text-white transition-colors cursor-pointer">Regulamin</span>
          </div>
        </div>
      </footer>

      {/* Premium Contact Modal */}
      <AnimatePresence>
        {contactModalOpen && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setContactModalOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-lg glass-premium rounded-[40px] p-10 md:p-12 overflow-hidden shadow-[0_0_100px_rgba(183,28,28,0.2)]"
            >
              {/* Background Accent */}
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#b71c1c]/20 rounded-full blur-[80px]" />
              
              <div className="relative z-10 flex flex-col items-center text-center">
                <button 
                  onClick={() => setContactModalOpen(false)}
                  className="absolute -top-4 -right-4 w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 transition-colors"
                >
                  <X className="w-5 h-5 text-white/40" />
                </button>

                <div className="w-20 h-20 bg-[#b71c1c] rounded-[24px] flex items-center justify-center mb-8 shadow-[0_0_40px_rgba(183,28,28,0.4)]">
                  <Phone className="w-10 h-10 text-white" />
                </div>

                <p className="text-[#b71c1c] font-black text-xs uppercase tracking-[0.4em] mb-4">SKONTAKTUJ SIĘ Z NAMI</p>
                <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter leading-none mb-10">UMÓW SWOJE AUTO</h2>
                
                <div className="w-full space-y-4 mb-10">
                  <div className="glass-premium p-6 rounded-3xl border border-white/10 group hover:border-[#b71c1c]/40 transition-colors">
                    <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest mb-1">NUMER TELEFONU</p>
                    <p className="text-2xl md:text-4xl font-black text-white tracking-tighter">+48 796 550 514</p>
                  </div>
                  
                  <div className="flex gap-4">
                    <a 
                      href="tel:+48796550514" 
                      className="flex-1 bg-[#b71c1c] hover:bg-[#8b1115] text-white py-5 rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-xl active:scale-95 flex items-center justify-center gap-3"
                    >
                      <Phone className="w-4 h-4" /> ZADZWOŃ TERAZ
                    </a>
                  </div>
                </div>

                <p className="text-white/30 text-[10px] font-medium uppercase tracking-widest leading-relaxed">
                  Zadzwoń do nas lub napisz. Jesteśmy do Twojej dyspozycji w godzinach otwarcia serwisu.
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
}

// ----------------------------------------------------------------------
// COMPONENTS
// ----------------------------------------------------------------------

function BeforeAfterSlider({ beforeImg, afterImg }: { beforeImg: string, afterImg: string }) {
  const [sliderPos, setSliderPos] = useState(50);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    // Initial twitch microinteraction to show interactivity
    const timer1 = setTimeout(() => setSliderPos(53), 600);
    const timer2 = setTimeout(() => setSliderPos(47), 900);
    const timer3 = setTimeout(() => setSliderPos(50), 1200);
    return () => { clearTimeout(timer1); clearTimeout(timer2); clearTimeout(timer3); };
  }, []);

  return (
    <div 
      className="relative w-full aspect-video md:aspect-[21/9] rounded-[32px] overflow-hidden group border border-white/10 bg-[#050505] shadow-2xl"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Invisible Range Input for Native Dragging */}
      <input
        type="range"
        min="0"
        max="100"
        step="0.1"
        value={sliderPos}
        onChange={(e) => setSliderPos(parseFloat(e.target.value))}
        className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-30 m-0 p-0"
        aria-label="Porównanie przed i po"
      />
      {/* After Image (Background) - Perfect Gloss */}
      <Image src={afterImg} alt="Efekt po" fill className="object-cover pointer-events-none" />
      <div className="absolute top-6 right-6 bg-black/60 backdrop-blur-xl border border-white/10 px-5 py-2 rounded-full z-0 pointer-events-none shadow-lg">
        <span className="text-white font-black text-[10px] tracking-widest uppercase">Po</span>
      </div>
      
      {/* Before Image (Foreground) - Simulated Damage */}
      <div 
        className="absolute inset-0 z-10 bg-black pointer-events-none"
        style={{ clipPath: `polygon(0 0, ${sliderPos}% 0, ${sliderPos}% 100%, 0 100%)` }}
      >
        <Image 
          src={beforeImg} 
          alt="Przed" 
          fill 
          className="object-cover grayscale-[40%] contrast-75 brightness-75 blur-[1px]" 
        />
        <div className="absolute top-6 left-6 bg-black/60 backdrop-blur-xl border border-white/10 px-5 py-2 rounded-full pointer-events-none shadow-lg">
          <span className="text-white/60 font-black text-[10px] tracking-widest uppercase">Przed</span>
        </div>
      </div>
      
      {/* Slider Line & Handle */}
      <div 
        className="absolute top-0 bottom-0 w-[2px] bg-[#b71c1c] shadow-[0_0_20px_rgba(183,28,28,0.8)] z-20 pointer-events-none"
        style={{ left: `${sliderPos}%` }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 md:w-14 md:h-14 bg-[#b71c1c] rounded-full flex items-center justify-center shadow-2xl transition-transform group-hover:scale-110">
          <ChevronLeft className="w-5 h-5 text-white" />
          <ChevronRight className="w-5 h-5 text-white -ml-1" />
        </div>
      </div>
    </div>
  );
}

function ParallaxImage({ src, alt, className }: { src: string, alt: string, className?: string }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  // Slow parallax vertical movement
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`relative overflow-hidden group ${className}`}
    >
      <motion.div ref={ref} style={{ y }} className="absolute inset-[-15%] w-[130%] h-[130%]">
        <Image 
          src={src} 
          alt={alt} 
          fill 
          className="object-cover transition-transform duration-[1500ms] ease-out group-hover:scale-110" 
        />
      </motion.div>
    </motion.div>
  );
}
