"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, AnimatePresence, useMotionValue, useSpring, useMotionTemplate } from "framer-motion";
import { 
  Phone, 
  MapPin, 
  Clock, 
  ChevronRight, 
  ChevronLeft,
  Star, 
  ShieldCheck, 
  Settings, 
  Trophy,
  Users,
  Car,
  Droplets,
  Gauge,
  Palette,
  Menu,
  X,
  ArrowUpRight,
  ImageIcon,
  ArrowRight
} from "lucide-react";

import Link from "next/link";

const B = "/wasilewski";

const REVIEWS = [
  { name: "Marcin K.", car: "BMW M4 Competition", text: "Samochód wygląda jak prosto z salonu. Prawdziwi profesjonaliści!" },
  { name: "Tomasz W.", car: "Porsche 911 Carrera", text: "Powłoka ceramiczna perfekcyjna. Polecam każdemu właścicielowi premium auta." },
  { name: "Aleksandra M.", car: "Audi RS6 Avant", text: "Korekta lakieru przeszła moje oczekiwania. Rysy jak ręką odjął." },
];

function Magnetic({ children }: { children: React.ReactElement }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { stiffness: 150, damping: 15, mass: 0.1 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = e;
    if (!ref.current) return;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    x.set(middleX * 0.08);
    y.set(middleY * 0.08);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      style={{ position: "relative", zIndex: 50, x: springX, y: springY }}
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
    >
      {children}
    </motion.div>
  );
}

function FeatureCard({ feat, i }: { feat: any, i: number }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    mouseX.set(x);
    mouseY.set(y);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -15 }}
      viewport={{ once: true }}
      transition={{ 
        duration: 0.8, 
        delay: 1.4 + i * 0.1,
        y: { type: "spring", stiffness: 200, damping: 25 } 
      }}
      onMouseMove={handleMouseMove}
      className="relative group/feat cursor-default"
    >
      <div className="glass-premium px-8 py-7 rounded-[2rem] flex items-center gap-6 relative overflow-hidden border border-white/5 group-hover/feat:border-red-600/30 transition-all duration-700 shadow-2xl group-hover/feat:shadow-red-600/20">
        
        {/* Subtle Shine Effect - Tracking Mouse */}
        <motion.div 
          className="absolute inset-0 z-0 pointer-events-none opacity-0 group-hover/feat:opacity-100 transition-opacity duration-700"
          style={{
            background: useMotionTemplate`
              radial-gradient(
                450px circle at ${mouseX}px ${mouseY}px,
                rgba(255, 255, 255, 0.08),
                transparent 60%
              )
            `
          }}
        />

        {/* Smooth Diagonal Light Sweep */}
        <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/[0.03] to-transparent -translate-x-full group-hover/feat:translate-x-full transition-transform duration-1000 ease-in-out z-0" />

        {/* Icon Box - Smooth lift & color shift */}
        <div className="w-16 h-16 rounded-2xl flex items-center justify-center bg-white/[0.03] border border-white/10 group-hover/feat:bg-red-600 group-hover/feat:border-red-600 group-hover/feat:scale-110 group-hover/feat:-translate-y-2 transition-all duration-700 relative z-10 overflow-hidden shadow-xl">
          <div className="absolute inset-0 bg-white/10 translate-y-full group-hover/feat:translate-y-0 transition-transform duration-700 ease-out" />
          <feat.icon className="w-8 h-8 text-red-600 group-hover/feat:text-white transition-colors duration-500 relative z-10" strokeWidth={1.2} />
        </div>
        
        {/* Text Content */}
        <div className="flex flex-col relative z-10 transition-transform duration-700 group-hover/feat:translate-x-2">
          <span className="text-[10px] text-gray-400 leading-relaxed uppercase tracking-[0.3em] font-black mb-1 group-hover/feat:text-red-500 transition-colors duration-500">{feat.label}</span>
          <span className="text-lg font-black tracking-widest text-white">{feat.val}</span>
        </div>

        {/* Soft Corner Glow */}
        <div className="absolute -top-4 -right-4 w-20 h-20 bg-red-600/10 blur-3xl opacity-0 group-hover/feat:opacity-100 transition-opacity duration-1000" />
      </div>
    </motion.div>
  );
}

function GalleryGrid() {
  const items = [
    {
      src: `${B}/gallery_bg.webp`,
      cat: "DETAILING",
      title: "Korekta Lakieru",
      num: "01",
      slug: "korekta-lakieru",
      cls: "col-span-2 md:col-span-7 h-[220px] sm:h-[300px] md:h-[480px]",
    },
    {
      src: `${B}/gallery_ceramic.webp`,
      cat: "CERAMIKA",
      title: "Powłoki Ceramiczne",
      num: "02",
      slug: "powloki-ceramiczne",
      cls: "col-span-2 md:col-span-5 h-[220px] sm:h-[300px] md:h-[480px]",
    },
    {
      src: `${B}/hero.webp`,
      cat: "MECHANIKA",
      title: "Serwis Premium",
      num: "03",
      slug: "serwis-premium",
      cls: "col-span-1 md:col-span-4 h-[220px] sm:h-[260px] md:h-[380px]",
    },
    {
      src: `${B}/gallery_interior.webp`,
      cat: "WNĘTRZE",
      title: "Detailing Wnętrza",
      num: "04",
      slug: "detailing-wnetrza",
      cls: "col-span-1 md:col-span-4 h-[220px] sm:h-[260px] md:h-[380px]",
    },
    {
      src: `${B}/about.webp`,
      cat: "PPF",
      title: "Folie Ochronne",
      num: "05",
      slug: "folie-ochronne",
      cls: "col-span-2 md:col-span-4 h-[220px] sm:h-[260px] md:h-[380px]",
    },
  ];
  return (
    <div className="grid grid-cols-2 md:grid-cols-12 gap-[3px] group/gallery">
      {items.map((item, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: i * 0.1, ease: [0.23, 1, 0.32, 1] }}
          className={`${item.cls} transition-opacity duration-500 group-hover/gallery:opacity-40 hover:!opacity-100`}
        >
          <Link href={`/realizacje/${item.slug}`} className="relative overflow-hidden group cursor-pointer block w-full h-full">
            {/* Image */}
            <Image
              src={item.src}
              alt={item.title}
              fill
              className="object-cover brightness-110 saturate-125 transition-transform duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 50vw"
            />

            {/* Permanent dark gradient - only bottom */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

            {/* Ghost number — top right */}
            <span
              className="absolute top-4 right-5 text-white font-black tracking-tighter select-none pointer-events-none mix-blend-overlay"
              style={{ fontSize: "clamp(64px, 9vw, 130px)", opacity: 0.25 }}
              aria-hidden
            >
              {item.num}
            </span>

            {/* Red left border — grows on hover */}
            <div className="absolute left-0 top-0 w-[2px] h-0 bg-[#b71c1c] group-hover:h-full transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]" />

            {/* Overlay — slides up from bottom on hover */}
            <div className="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] bg-gradient-to-t from-black via-black/80 to-transparent pt-12 pb-6 px-6">
              <p className="text-[#b71c1c] font-black text-[9px] uppercase tracking-[0.5em] mb-2">{item.cat}</p>
              <h3 className="text-white font-black text-2xl uppercase tracking-tight leading-tight">{item.title}</h3>
              <div className="mt-4">
                <span className="inline-flex items-center gap-2 bg-[#b71c1c] text-white px-5 py-2.5 rounded-full text-[9px] font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-colors">
                  Zobacz projekt <ArrowUpRight className="w-3 h-3" />
                </span>
              </div>
            </div>

            {/* Default label — always visible, hides on hover */}
            <div className="absolute bottom-5 left-5 md:bottom-6 md:left-6 group-hover:opacity-0 transition-opacity duration-300">
              <span className="text-[#ff4d4d] md:text-[#b71c1c] font-black text-[11px] md:text-[9px] uppercase tracking-[0.4em] drop-shadow-lg">{item.cat}</span>
            </div>

            {/* Central Animated Icon indicating interactivity */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none z-20">
              <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-[#b71c1c]/90 backdrop-blur flex items-center justify-center translate-y-8 group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] shadow-[0_0_30px_rgba(183,28,28,0.5)]">
                <ArrowUpRight className="w-5 h-5 md:w-7 md:h-7 text-white" />
              </div>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}

function InteractiveCarsGallery({ onContactClick }: { onContactClick?: () => void }) {
  const [activeCar, setActiveCar] = useState(0);
  const [activePhoto, setActivePhoto] = useState(0);
  const thumbsRef = useRef<HTMLDivElement>(null);

  const CARS = [
    {
      id: "bmw",
      name: "BMW M4 Competition",
      year: "2023",
      tag: "CERAMIKA 5-LETNIA",
      category: "Powłoka Ceramiczna",
      desc: "Wieloetapowa korekta lakieru z aplikacją 5-letniej powłoki ceramicznej na lakier, felgi oraz plastiki zewnętrzne. Auto zyskało niesamowitą głębię i szklistość lustrzanego odbicia.",
      services: ["Korekta lakieru II-stopniowa", "Powłoka ceramiczna 5Y", "Zabezpieczenie felg", "Impregnat szyb"],
      photos: [`${B}/hero.webp`, `${B}/gallery_bg.webp`, `${B}/gallery_ceramic.webp`],
      beforeImg: `${B}/gallery_ceramic.webp`,
      afterImg: `${B}/hero.webp`,
    },
    {
      id: "porsche",
      name: "Porsche 911 GT3",
      year: "2022",
      tag: "PPF FULL FRONT",
      category: "Folia Ochronna PPF",
      desc: "Zabezpieczenie całego frontu, lamp, lusterek oraz newralgicznych punktów lakieru folią PPF. Kompleksowy detailing wnętrza wraz z bezinwazyjną impregnacją skór Alcantara.",
      services: ["PPF Full Front", "PPF Lusterka + Lampy", "Detailing wnętrza", "Impregnacja Alcantara"],
      photos: [`${B}/gallery_bg.webp`, `${B}/hero.webp`, `${B}/about.webp`],
      beforeImg: `${B}/about.webp`,
      afterImg: `${B}/gallery_bg.webp`,
    },
    {
      id: "mercedes",
      name: "Mercedes G-Class",
      year: "2021",
      tag: "DETAILING WNĘTRZA",
      category: "Detailing Premium",
      desc: "Pranie ekstrakcyjne całego wnętrza, ozonowanie systemu wentylacji oraz wieloetapowa regeneracja luksusowej skórzanej tapicerki i drewnianych dekorów kokpitu.",
      services: ["Pranie ekstrakcyjne", "Ozonowanie wnętrza", "Regeneracja skóry", "Renowacja dekorów"],
      photos: [`${B}/gallery_interior.webp`, `${B}/gallery_bg.webp`, `${B}/hero.webp`],
      beforeImg: `${B}/gallery_interior.webp`,
      afterImg: `${B}/gallery_interior.webp`,
    },
    {
      id: "audi",
      name: "Audi RS6 Avant",
      year: "2023",
      tag: "KOREKTA + DETAILING",
      category: "Korekta Lakieru",
      desc: "Trzyetapowa korekta lakieru z usunięciem 95% zarysowań i pająków. Finalnie aplikacja rocznej powłoki ceramicznej oraz kompleksowy detailing wnętrza i bagażnika.",
      services: ["Korekta III-stopniowa", "Usuwanie zarysowań", "Powłoka ceramiczna 1Y", "Detailing full"],
      photos: [`${B}/gallery_ceramic.webp`, `${B}/gallery_interior.webp`, `${B}/gallery_bg.webp`],
      beforeImg: `${B}/gallery_ceramic.webp`,
      afterImg: `${B}/gallery_interior.webp`,
    },
    {
      id: "lamborghini",
      name: "Lamborghini Huracán",
      year: "2022",
      tag: "PPF FULL BODY",
      category: "Folia PPF Full Body",
      desc: "Prestiżowe zabezpieczenie całej karoserii folią PPF najwyższej klasy z efektem self-healing. Projekt realizowany przez ponad 5 dni pracy z najwyższą precyzją.",
      services: ["PPF Full Body", "Self-healing PPF", "Montaż bez krawędziowy", "Certyfikat gwarancji"],
      photos: [`${B}/hero.webp`, `${B}/gallery_bg.webp`, `${B}/about.webp`],
      beforeImg: `${B}/about.webp`,
      afterImg: `${B}/hero.webp`,
    },
    {
      id: "tesla",
      name: "Tesla Model S Plaid",
      year: "2024",
      tag: "POWŁOKA + FOLIA",
      category: "Pakiet Kompleksowy",
      desc: "Kompleksowy pakiet ochrony — PPF na newralgicznych punktach, powłoka ceramiczna na pozostałym lakierze oraz specjalistyczne zabezpieczenie matrycy i ekranu dotykowego.",
      services: ["PPF punktowy", "Ceramika na lakier", "Ochrona ekranów", "Zabezpieczenie ładowarki"],
      photos: [`${B}/gallery_interior.webp`, `${B}/hero.webp`, `${B}/gallery_ceramic.webp`],
      beforeImg: `${B}/gallery_interior.webp`,
      afterImg: `${B}/gallery_ceramic.webp`,
    },
  ];

  const car = CARS[activeCar];

  const scrollThumbs = (dir: "left" | "right") => {
    if (thumbsRef.current) {
      thumbsRef.current.scrollBy({ left: dir === "right" ? 260 : -260, behavior: "smooth" });
    }
  };

  const prevPhoto = () => setActivePhoto(p => (p - 1 + car.photos.length) % car.photos.length);
  const nextPhoto = () => setActivePhoto(p => (p + 1) % car.photos.length);

  // Reset photo index when switching cars
  const selectCar = (idx: number) => { setActiveCar(idx); setActivePhoto(0); };

  return (
    <div className="w-full flex flex-col gap-6 md:gap-10 pb-16">

      {/* ── Thumbnails row with arrows ── */}
      <div className="relative px-6 md:px-12 lg:px-24">
        {/* Left arrow */}
        <button
          onClick={() => scrollThumbs("left")}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-black/80 border border-white/10 backdrop-blur flex items-center justify-center hover:border-[#b71c1c] hover:bg-[#b71c1c]/20 transition-all duration-300 md:left-4"
        >
          <ChevronLeft className="w-5 h-5 text-white" />
        </button>

        {/* Scrollable strip */}
        <div
          ref={thumbsRef}
          className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth px-8 py-10"
          style={{ scrollbarWidth: "none" }}
        >
          {CARS.map((c, idx) => (
            <button
              key={c.id}
              onClick={() => selectCar(idx)}
              className={`relative shrink-0 w-[220px] md:w-[260px] aspect-[3/2] rounded-2xl border-2 transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] group/thumb ${activeCar === idx ? "border-transparent shadow-[0_0_24px_rgba(183,28,28,0.5)] scale-[1.04] z-10" : "border-white/10 opacity-60 hover:opacity-100 hover:border-white/30 hover:scale-[1.02]"}`}
            >
              <div className="absolute inset-0 rounded-2xl overflow-hidden">
                <Image src={c.photos[0]} alt={c.name} fill className="object-cover transition-transform duration-700 group-hover/thumb:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
              </div>
              {/* Active glow ring */}
              {activeCar === idx && (
                <motion.div layoutId="glowRing" className="absolute inset-[-2px] rounded-2xl border-2 border-[#b71c1c] shadow-[inset_0_0_20px_rgba(183,28,28,0.2)] pointer-events-none" />
              )}
              <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
                <p className="text-[#b71c1c] text-[8px] font-bold uppercase tracking-[0.35em] mb-0.5">{c.tag}</p>
                <p className="text-white font-bold text-xs uppercase tracking-wider leading-tight">{c.name}</p>
                <p className="text-white/40 text-[9px] mt-0.5">{c.year}</p>
              </div>
              {/* Number badge */}
              <div className="absolute top-3 right-3 w-7 h-7 rounded-full bg-black/60 backdrop-blur flex items-center justify-center border border-white/10">
                <span className="text-white/60 text-[9px] font-bold">{String(idx + 1).padStart(2, "0")}</span>
              </div>
            </button>
          ))}
        </div>

        {/* Right arrow */}
        <button
          onClick={() => scrollThumbs("right")}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-black/80 border border-white/10 backdrop-blur flex items-center justify-center hover:border-[#b71c1c] hover:bg-[#b71c1c]/20 transition-all duration-300 md:right-4"
        >
          <ChevronRight className="w-5 h-5 text-white" />
        </button>
      </div>

      {/* ── Main panel ── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeCar}
          initial={{ opacity: 0, y: 50, scale: 0.92, rotateX: 2, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -40, scale: 0.95, filter: "blur(10px)" }}
          transition={{ 
            type: "spring",
            stiffness: 120,
            damping: 20,
            mass: 0.8,
            duration: 0.7
          }}
          className="mx-6 md:mx-12 lg:mx-24 bg-white/[0.04] border border-white/10 rounded-[36px] md:rounded-[48px] overflow-hidden shadow-2xl backdrop-blur-md preserve-3d"
        >
          <div className="flex flex-col xl:flex-row">

            {/* ── Left info panel ── */}
            <div className="xl:w-[380px] shrink-0 p-8 md:p-10 xl:p-12 flex flex-col justify-between border-b xl:border-b-0 xl:border-r border-white/10">
              <div>
                {/* Category pill */}
                <div className="inline-flex items-center gap-2 bg-[#b71c1c]/15 border border-[#b71c1c]/30 px-4 py-1.5 rounded-full mb-8">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#b71c1c] animate-pulse" />
                  <span className="text-[#b71c1c] text-[9px] font-bold uppercase tracking-[0.4em]">{car.category}</span>
                </div>

                {/* Title */}
                <h3 className="text-2xl md:text-4xl font-black uppercase tracking-tighter text-white leading-[1.1] mb-3">{car.name}</h3>
                <p className="text-white/30 text-xs font-medium tracking-widest uppercase mb-8">{car.year}</p>

                {/* Divider */}
                <div className="w-full h-[1px] bg-gradient-to-r from-[#b71c1c]/60 to-transparent mb-8" />

                {/* Description */}
                <p className="text-gray-300 leading-relaxed text-sm md:text-base font-light mb-10 leading-[1.8]">{car.desc}</p>

                {/* Services list */}
                <div className="space-y-3 mb-10">
                  {car.services.map((s, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-4 h-[1px] bg-[#b71c1c] shrink-0" />
                      <span className="text-white/70 text-xs font-medium uppercase tracking-widest">{s}</span>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <button 
                  onClick={onContactClick}
                  className="group/cta inline-flex items-center gap-4 bg-white/5 hover:bg-[#b71c1c] border border-white/10 hover:border-[#b71c1c] px-6 py-4 rounded-2xl transition-all duration-500 w-full justify-center shadow-xl"
                >
                  <span className="text-white font-black text-[10px] uppercase tracking-[0.3em]">Chcę taki efekt</span>
                  <ArrowRight className="w-4 h-4 text-[#b71c1c] group-hover/cta:text-white group-hover/cta:translate-x-1 transition-all duration-500" />
                </button>
              </div>

              {/* Car counter */}
              <div className="flex items-baseline gap-3 mt-10 pt-8 border-t border-white/10">
                <span className="text-white font-black text-4xl tracking-tighter">{String(activeCar + 1).padStart(2, "0")}</span>
                <span className="text-white/20 font-light">/</span>
                <span className="text-white/30 font-bold text-sm">{String(CARS.length).padStart(2, "0")}</span>
                <div className="ml-auto flex gap-2">
                  <button onClick={() => selectCar((activeCar - 1 + CARS.length) % CARS.length)} className="w-10 h-10 rounded-full border border-white/10 hover:border-[#b71c1c] hover:bg-[#b71c1c] flex items-center justify-center transition-all duration-300 group/nav">
                    <ChevronLeft className="w-4 h-4 text-white" />
                  </button>
                  <button onClick={() => selectCar((activeCar + 1) % CARS.length)} className="w-10 h-10 rounded-full border border-white/10 hover:border-[#b71c1c] hover:bg-[#b71c1c] flex items-center justify-center transition-all duration-300">
                    <ChevronRight className="w-4 h-4 text-white" />
                  </button>
                </div>
              </div>
            </div>

            {/* ── Right content: photo gallery + before/after ── */}
            <div className="flex-1 flex flex-col">

              {/* Multi-photo viewer */}
              <div className="relative aspect-video xl:aspect-[16/8] overflow-hidden bg-black">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`${activeCar}-${activePhoto}`}
                    initial={{ opacity: 0, x: 80, scale: 1.05 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: -80, scale: 1.05 }}
                    transition={{ 
                      type: "spring",
                      stiffness: 180,
                      damping: 24,
                      mass: 0.6
                    }}
                    className="absolute inset-0"
                  >
                    <Image src={car.photos[activePhoto]} alt={`${car.name} zdjęcie ${activePhoto + 1}`} fill className="object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
                  </motion.div>
                </AnimatePresence>

                {/* Photo nav arrows */}
                {car.photos.length > 1 && (
                  <>
                    <button
                      onClick={prevPhoto}
                      className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 md:w-14 md:h-14 rounded-full bg-black/60 border border-white/20 backdrop-blur-md flex items-center justify-center hover:border-[#b71c1c] hover:bg-[#b71c1c] transition-all duration-300 group/p"
                    >
                      <ChevronLeft className="w-4 h-4 md:w-5 md:h-5 text-white" />
                    </button>
                    <button
                      onClick={nextPhoto}
                      className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 md:w-14 md:h-14 rounded-full bg-black/60 border border-white/20 backdrop-blur-md flex items-center justify-center hover:border-[#b71c1c] hover:bg-[#b71c1c] transition-all duration-300"
                    >
                      <ChevronRight className="w-4 h-4 md:w-5 md:h-5 text-white" />
                    </button>
                  </>
                )}

                {/* Photo dots */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                  {car.photos.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActivePhoto(i)}
                      className={`transition-all duration-400 rounded-full ${i === activePhoto ? "w-8 h-2 bg-[#b71c1c]" : "w-2 h-2 bg-white/30 hover:bg-white/60"}`}
                    />
                  ))}
                </div>

                {/* Photo count badge */}
                <div className="absolute top-4 right-4 bg-black/60 backdrop-blur px-3 py-1.5 rounded-full border border-white/10 z-20">
                  <span className="text-white text-[10px] font-bold tracking-wider">{activePhoto + 1}/{car.photos.length} ZDJĘĆ</span>
                </div>
              </div>

              {/* Before / After slider */}
              <div className="p-6 md:p-8 border-t border-white/10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-6 h-[1px] bg-[#b71c1c]" />
                  <p className="text-[#b71c1c] text-[9px] font-bold uppercase tracking-[0.4em]">Slider Przed / Po</p>
                </div>
                <SimpleBeforeAfter beforeImg={car.beforeImg} afterImg={car.afterImg} />
              </div>
            </div>

          </div>
        </motion.div>
      </AnimatePresence>

    </div>
  );
}

function SimpleBeforeAfter({ beforeImg, afterImg }: { beforeImg: string, afterImg: string }) {
  const [pos, setPos] = useState(50);
  return (
    <div className="relative w-full aspect-[21/9] md:aspect-[21/7] xl:aspect-[21/6] rounded-2xl md:rounded-3xl overflow-hidden border border-white/10 bg-black shadow-2xl cursor-ew-resize">
      <input type="range" min="0" max="100" step="0.1" value={pos} onChange={e => setPos(parseFloat(e.target.value))} className="absolute inset-0 w-full h-full opacity-0 z-30 m-0 p-0 cursor-ew-resize" />
      {/* After image (right side) */}
      <Image src={afterImg} alt="Po" fill className="object-cover pointer-events-none" />
      <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 z-10">
        <span className="text-[10px] font-bold uppercase tracking-widest text-white">Po</span>
      </div>

      {/* Before image (left side, clipped) */}
      <div className="absolute inset-0 z-10 pointer-events-none" style={{ clipPath: `polygon(0 0, ${pos}% 0, ${pos}% 100%, 0 100%)` }}>
        <Image src={beforeImg} alt="Przed" fill className="object-cover grayscale-[50%] contrast-75 brightness-70 pointer-events-none" />
        <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
          <span className="text-[10px] font-bold uppercase tracking-widest text-white/50">Przed</span>
        </div>
      </div>

      {/* Divider line + handle */}
      <div className="absolute top-0 bottom-0 w-[2px] bg-[#b71c1c] z-20 pointer-events-none shadow-[0_0_16px_rgba(183,28,28,0.9)]" style={{ left: `${pos}%` }}>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-[#b71c1c] rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(183,28,28,0.7)] border-2 border-white/20">
          <ChevronLeft className="w-3.5 h-3.5 text-white" /><ChevronRight className="w-3.5 h-3.5 text-white -ml-1" />
        </div>
      </div>
    </div>
  );
}

const StatsRow = ({ stat, i }: { stat: any, i: number }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: i * 0.05, ease: [0.23, 1, 0.32, 1] }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="border-b md:border-t md:border-b-0 border-white/5 cursor-default relative overflow-hidden"
    >
      {/* Layer 1: Base (Transparent) */}
      <div className="absolute inset-0 bg-transparent z-0" />

      {/* Layer 2: Red Slide (GPU Accelerated scaleX) */}
      <motion.div 
        initial={{ scaleX: 0, originX: 0 }}
        animate={{ scaleX: isHovered ? 1 : 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0 bg-[#b71c1c] z-10 will-change-transform"
      />
      
      {/* Layer 3: Scanning Light Effect */}
      <motion.div 
        animate={{ x: isHovered ? "200%" : "-100%" }}
        transition={{ duration: 1.2, ease: "linear", repeat: isHovered ? Infinity : 0 }}
        className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 z-15 pointer-events-none" 
      />

      {/* Layer 4: Content */}
      <div className="relative z-20 h-full max-w-[1440px] mx-auto px-6 md:px-12 lg:px-24 flex flex-col md:flex-row md:items-center justify-between pointer-events-none">
        <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-12 py-4 md:py-6">
          {/* Parallax Number */}
          <motion.div 
            animate={{ 
              x: isHovered ? -8 : 0,
              scale: isHovered ? 1.03 : 1
            }}
            transition={{ duration: 0.4 }}
            className="text-[40px] sm:text-[56px] md:text-[100px] lg:text-[130px] font-black text-white tracking-tighter leading-none will-change-transform"
          >
            {stat.num}
          </motion.div>
          
          {/* Sliding Content */}
          <motion.div 
            animate={{ x: isHovered ? 15 : 0 }}
            transition={{ duration: 0.4 }}
            className="block mt-1 sm:mt-0"
          >
            <p className="text-white font-black uppercase tracking-[0.1em] text-sm md:text-3xl leading-tight">
              {stat.label}
            </p>
            <p className="text-gray-300 leading-relaxed text-[10px] md:text-sm font-medium mt-1 transition-colors duration-300" style={{ color: isHovered ? 'white' : 'rgba(209,213,219,1)' }}>
              {stat.sub}
            </p>
          </motion.div>
        </div>

        {/* Index & Line Animation */}
        <div className="hidden md:flex items-center gap-4 shrink-0">
          <motion.span 
            animate={{ opacity: isHovered ? 0.5 : 0.1 }}
            className="hidden lg:block font-black text-xs tracking-widest text-white"
          >
            {stat.idx}
          </motion.span>
          <motion.div 
            animate={{ width: isHovered ? 80 : 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="hidden md:block h-[1px] bg-white/30" 
          />
        </div>
      </div>
    </motion.div>
  );
};

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [activeReview, setActiveReview] = useState(0);
  const [contactModalOpen, setContactModalOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const target = document.querySelector(id);
    if (target) {
      const offset = 100;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = target.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setMobileMenuOpen(false);
    }
  };

  useEffect(() => {
    const t = setInterval(() => setActiveReview(p => (p + 1) % REVIEWS.length), 6000);
    return () => clearInterval(t);
  }, []);

  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);

  useEffect(() => {
    let rafId: number;

    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      const sections = ['realizations', 'services', 'about', 'contact'];
      let current = '';
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element && window.scrollY >= element.offsetTop - 300) {
          current = section;
        }
      }
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white selection:bg-[#b71c1c] selection:text-white font-sans">
      
      {/* Modern Floating Centered Navbar */}
      <motion.nav 
        initial={{ y: -100, opacity: 0, scale: 0.8 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1], delay: 0.2 }}
        className="fixed top-0 left-0 right-0 z-[100] flex justify-center pt-4 md:pt-8 transition-all duration-500"
      >
        <div className={`flex items-center gap-6 md:gap-10 px-8 md:px-12 py-4 md:py-5 rounded-full transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] ${
          scrolled
            ? 'bg-black/70 backdrop-blur-3xl border border-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.6)] scale-95 md:scale-100'
            : 'bg-white/[0.04] backdrop-blur-xl border border-white/10 scale-105 md:scale-100'
        }`}>
          {/* Logo */}
          <Magnetic>
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 1 }}
              className="flex items-center cursor-pointer group"
            >
              <Image
                src={`${B}/logo.webp`}
                alt="AGA-MAX"
                width={140}
                height={35}
                className="h-8 md:h-9 w-auto object-contain brightness-0 invert opacity-90 group-hover:opacity-100 transition-all duration-500"
                priority
              />
            </motion.div>
          </Magnetic>
          
          <div className="w-[1px] h-6 bg-white/10 hidden md:block" />

          {/* Main Links */}
          <div className="hidden md:flex items-center gap-10 text-[11px] font-black uppercase tracking-[0.35em] text-gray-400">
            {[
              { name: 'Realizacje', href: '#realizations' },
              { name: 'Usługi', href: '#services' },
              { name: 'O nas', href: '#about' },
              { name: 'Kontakt', href: '#contact' }
            ].map((item, i) => (
              <Magnetic key={item.name}>
                <motion.button 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 1.2 + i * 0.1 }}
                  onClick={() => scrollToSection(item.href)}
                  className={`relative py-2 group transition-all duration-300 ${activeSection === item.href.substring(1) ? 'text-white' : 'hover:text-white'}`}
                >
                  <span className="text-[11px] font-black uppercase tracking-[0.35em]">{item.name}</span>
                  {/* Refined Active Indicator */}
                  <motion.span 
                    initial={false}
                    animate={activeSection === item.href.substring(1) ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                    className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-[#b71c1c] rounded-full shadow-[0_0_10px_#b71c1c]"
                  />
                  {/* Hover Line */}
                  <span className={`absolute -bottom-1 left-0 w-full h-[2px] bg-[#b71c1c] origin-left rounded-full transition-transform duration-500 ${activeSection === item.href.substring(1) ? 'scale-x-0' : 'scale-x-0 group-hover:scale-x-100'}`} />
                </motion.button>
              </Magnetic>
            ))}
          </div>

          <div className="w-[1px] h-6 bg-white/10 hidden md:block" />

          {/* Action Button */}
          <Magnetic>
            <motion.button 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 1.6 }}
              onClick={() => setContactModalOpen(true)}
              className="flex items-center gap-3 bg-[#b71c1c] hover:bg-[#8b1115] px-6 py-3 md:px-8 md:py-4 rounded-full transition-all duration-300 shadow-xl shadow-[#b71c1c]/20 group/btn overflow-hidden relative"
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500" />
              <Phone className="w-4 h-4 text-white relative z-10" />
              <span className="text-[10px] md:text-xs font-black uppercase tracking-widest text-white relative z-10 hidden sm:inline">Umów wizytę</span>
            </motion.button>
          </Magnetic>
          
          {/* Mobile Menu Toggle */}
          <motion.button 
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 1.8 }}
            className="md:hidden w-10 h-10 flex items-center justify-center relative bg-white/5 rounded-full border border-white/10"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <div className="flex flex-col gap-1.5 items-center justify-center">
              <motion.span animate={mobileMenuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }} className="w-6 h-[1.5px] bg-white" />
              <motion.span animate={mobileMenuOpen ? { opacity: 0 } : { opacity: 1 }} className="w-6 h-[1.5px] bg-white" />
              <motion.span animate={mobileMenuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }} className="w-6 h-[1.5px] bg-white" />
            </div>
          </motion.button>
        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.9 }}
              className="md:hidden absolute top-full left-1/2 -translate-x-1/2 mt-6 w-[calc(100%-48px)] max-w-sm bg-[#0a0a0a]/98 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] p-10 shadow-2xl z-[110]"
            >
              <div className="flex flex-col gap-8 text-center">
                {[
                  { name: 'Realizacje', href: '#realizations' },
                  { name: 'Usługi', href: '#services' },
                  { name: 'O nas', href: '#about' },
                  { name: 'Kontakt', href: '#contact' }
                ].map((item) => (
                  <button 
                    key={item.name}
                    onClick={() => scrollToSection(item.href)}
                    className="text-2xl font-black uppercase tracking-widest text-white hover:text-red-600 transition-colors"
                  >
                    {item.name}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Hero Section */}
      <section id="hero" className="relative min-h-[100svh] flex items-center pt-20 bg-[#0a0a0a] overflow-hidden perspective-3d">
        {/* Red vertical accent line */}
        <div className="absolute left-0 top-0 w-[2px] h-full bg-gradient-to-b from-transparent via-[#b71c1c]/50 to-transparent pointer-events-none z-20" />
        {/* Background Image Parallax */}
        <motion.div 
          style={{ y: y1 }}
          className="absolute top-0 right-0 w-full md:w-[70%] h-[120%] z-0 overflow-hidden max-md:[clip-path:none] md:[clip-path:polygon(15%_0,100%_0,100%_100%,0%_100%)] will-change-transform"
        >
          <Image 
            src={`${B}/hero.webp`} 
            alt="Hero BMW" 
            fill 
            sizes="(max-width: 768px) 100vw, 70vw"
            className="object-cover opacity-70 scale-105 will-change-transform"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/30 to-transparent"></div>
        </motion.div>

        {/* Hero Content */}
        <div className="relative z-10 px-6 md:px-12 lg:px-24 max-w-7xl w-full flex flex-col justify-center h-full preserve-3d">
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
            className="max-w-5xl mt-4 md:mt-10"
          >
            <h1 className="text-[38px] sm:text-6xl md:text-[80px] lg:text-[96px] xl:text-[110px] font-black mb-6 leading-[0.9] tracking-tighter text-white drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
              PRECYZJA<br />
              <span className="text-[#b71c1c] italic drop-shadow-[0_0_20px_rgba(183,28,28,0.4)]">BEZ KOMPROMISÓW</span>
            </h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-gray-300 leading-relaxed text-base md:text-lg max-w-md mb-8 leading-relaxed font-medium"
            >
              Ekskluzywny detailing i zaawansowana technologia, która przywraca Twojemu autu salonowy blask.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="w-max mb-10 md:mb-16"
            >
              <Magnetic>
                <motion.button 
                  whileHover={{ scale: 1.05, backgroundColor: "#8b1115", x: 10 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-[#b71c1c] rounded-full text-white font-black uppercase tracking-[0.3em] text-[10px] md:text-xs px-8 py-4 md:px-12 md:py-6 flex items-center gap-6 md:gap-8 transition-all shadow-[0_20px_40px_rgba(183,28,28,0.3)] hover:shadow-[0_0_50px_rgba(183,28,28,0.6)] group/btn relative overflow-hidden"
                >
                  <span className="relative z-10">ODKRYJ NASZĄ PASJĘ</span>
                  <ChevronRight className="w-4 h-4 md:w-5 md:h-5 group-hover/btn:translate-x-2 transition-transform relative z-10" />
                  <div className="absolute inset-0 bg-white/10 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500 ease-out z-0" />
                </motion.button>
              </Magnetic>
            </motion.div>
          </motion.div>

          {/* Hero Features - Antigravity Glass Capsules */}
          <motion.div 
            initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1, delay: 1.2, ease: "easeOut" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 pb-10 w-full"
          >
            {[
              { icon: Settings, label: "Doświadczenie", val: "12+ LAT" },
              { icon: ShieldCheck, label: "Gwarancja", val: "PREMIUM" },
              { icon: Clock, label: "Szybka", val: "REALIZACJA" }
            ].map((feat, i) => (
              <FeatureCard key={i} feat={feat} i={i} />
            ))}
          </motion.div>
        </div>
      </section>

      <div className="red-divider" />

      {/* Stats Section - Topographic Strips */}
      <section className="relative bg-[#0a0a0a] overflow-hidden">
        <div className="vertical-waves absolute inset-0 pointer-events-none z-0" />
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-24 pt-16 md:pt-24 pb-6 relative z-10">
          <div className="flex items-center gap-4">
            <div className="w-12 h-[1px] bg-[#b71c1c]" />
            <p className="text-[#b71c1c] font-black text-xs uppercase tracking-[0.4em]">NASZA TOŻSAMOŚĆ</p>
            <div className="flex-1 h-[1px] bg-white/5" />
          </div>
        </div>
        <div className="flex flex-col">
          {[
            { num: "12+", label: "Lat Doświadczenia", sub: "W branży detailingu i zabezpieczeń", idx: "01" },
            { num: "150+", label: "Projektów Premium", sub: "Zrealizowanych z precyzją chirurga", idx: "02" },
            { num: "980+", label: "Zadowolonych Klientów", sub: "Którzy regularnie do nas wracają", idx: "03" },
            { num: "98%", label: "Satysfakcji", sub: "Potwierdzonej przez każdego klienta", idx: "04" }
          ].map((stat, i) => (
            <StatsRow key={i} stat={stat} i={i} />
          ))}
        </div>
        <div className="hidden md:block border-t border-white/5" />
      </section>


      {/* Gallery Section — Cinematic Horizontal Scroll */}
      <section id="realizations" className="relative bg-[#0a0a0a] overflow-hidden">
        {/* Section header & Toggle */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
          className="px-6 md:px-12 lg:px-24 pt-16 md:pt-28 pb-10 md:pb-16 relative z-10"
        >
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-[1px] bg-[#b71c1c]" />
                <p className="text-[#b71c1c] font-black text-xs uppercase tracking-[0.4em]">EFEKTY NASZEJ PRACY</p>
                <div className="flex-1 lg:hidden h-[1px] bg-white/5" />
              </div>
              <h2 className="text-[40px] sm:text-[72px] md:text-[100px] lg:text-[110px] xl:text-[130px] 2xl:text-[150px] font-black uppercase tracking-tighter text-white leading-[0.85] break-words">
                NASZE<br />
                <span className="text-[#b71c1c] italic">REALIZACJE</span>
              </h2>
            </div>
          </div>
          
          <div className="flex items-center gap-3 mt-8">
            <p className="text-gray-300 leading-relaxed text-sm font-medium max-w-sm">
              Przesuwaj lub scrolluj aby zobaczyć nasze projekty.
            </p>
            <div className="flex items-center text-[#b71c1c] animate-pulse">
              <ChevronRight className="w-4 h-4 -mr-2" />
              <ChevronRight className="w-4 h-4 -mr-2" />
              <ChevronRight className="w-4 h-4" />
            </div>
          </div>
        </motion.div>

        {/* Gallery Content */}
        <div className="relative z-10">
          <InteractiveCarsGallery onContactClick={() => setContactModalOpen(true)} />
        </div>
      </section>


      <div className="red-ticker" />

      {/* Services Section - Premium Glass Capsules */}
      <section id="services" className="relative px-6 md:px-12 lg:px-24 py-24 bg-[#080808] overflow-hidden">
        <div className="vertical-waves absolute inset-0 pointer-events-none z-0" />
        {/* Topo + decorative elements */}
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#b71c1c]/40 to-transparent"></div>
        <div className="absolute right-0 top-0 w-[2px] h-full bg-gradient-to-b from-transparent via-[#b71c1c]/30 to-transparent pointer-events-none" />
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-32 relative z-10"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-12 h-[1px] bg-[#b71c1c]"></div>
            <p className="text-[#b71c1c] font-black text-xs uppercase tracking-[0.4em]">KOMPLEKSOWA OPIEKA</p>
            <div className="w-12 h-[1px] bg-[#b71c1c]"></div>
          </div>
          <h2 className="text-[36px] sm:text-5xl md:text-8xl font-black uppercase tracking-tighter text-white leading-none break-words">NASZA OFERTA</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-[1400px] mx-auto perspective-3d">
          {[
            { icon: Droplets, title: "Detailing", desc: "Przywracamy fabryczny stan wnętrza i nadwozia z chirurgiczną precyzją." },
            { icon: Palette, title: "Polerowanie", desc: "Wieloetapowa korekta lakieru usuwająca 99% zarysowań i defektów." },
            { icon: ShieldCheck, title: "Ochrona", desc: "Najtwardsze powłoki ceramiczne i grafenowe z gwarancją do 5 lat." },
            { icon: Settings, title: "Regeneracja", desc: "Przywracamy blask felgom i elementom ozdobnym Twojego pojazdu." },
            { icon: Gauge, title: "Moc & Tuning", desc: "Bezpieczna optymalizacja oprogramowania dla lepszych osiągów." },
            { icon: Car, title: "Folie PPF", desc: "Niewidzialna tarcza chroniąca Twój lakier przed kamieniami i chemią." }
          ].map((service, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 50, rotateX: 10 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
              whileHover={{ y: -15, rotateY: 5, scale: 1.02 }}
              className="glass-premium p-8 md:p-12 rounded-[40px] group cursor-pointer relative overflow-hidden preserve-3d shadow-[0_20px_50px_rgba(0,0,0,0.3)]"
            >
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                <service.icon className="w-24 h-24 text-white" />
              </div>
              <div className="w-16 h-16 rounded-2xl bg-[#b71c1c]/10 flex items-center justify-center mb-8 group-hover:bg-[#b71c1c] transition-all duration-500">
                <service.icon className="w-8 h-8 text-[#b71c1c] group-hover:text-white transition-colors" strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-black uppercase tracking-[0.1em] mb-4 text-white group-hover:text-[#b71c1c] transition-colors">{service.title}</h3>
              <p className="text-gray-300 leading-relaxed text-sm leading-relaxed font-medium group-hover:text-gray-300 transition-colors">{service.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <div className="red-divider" />

      {/* About Section - Diagonal Split */}
      <section id="about" className="relative bg-[#0a0a0a] overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">

          {/* Left — Content */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
            className="relative z-10 flex flex-col justify-center px-6 md:px-12 lg:px-20 py-24 lg:py-32"
          >
            {/* Year badge */}
            <div className="flex items-center gap-4 mb-10">
              <div className="glass-premium px-5 py-2 rounded-full">
                <span className="text-[#b71c1c] font-black text-xs uppercase tracking-[0.4em]">Od 2012</span>
              </div>
              <div className="w-12 h-[1px] bg-[#b71c1c]" />
              <span className="text-gray-600 text-[10px] font-black uppercase tracking-widest">NASZA HISTORIA</span>
            </div>

            <h2 className="text-[42px] sm:text-[56px] md:text-[80px] lg:text-[96px] font-black uppercase tracking-tighter text-white leading-[0.88] mb-10 break-words">
              PASJA,<br/>
              KTÓRA<br/>
              <span className="text-[#b71c1c] italic">NAPĘDZA.</span>
            </h2>

            {/* Red accent line */}
            <div className="flex items-center gap-4 mb-8">
              <div className="w-24 h-[2px] bg-[#b71c1c]" />
            </div>

            <p className="text-gray-300 leading-relaxed text-lg leading-relaxed font-medium max-w-lg mb-12">
              W AGA MAX wierzymy, że każdy samochód ma swoją duszę. Naszym zadaniem jest ją wydobyć i chronić.
              Nie jesteśmy zwykłym warsztatem — jesteśmy kuratorami motoryzacyjnej doskonałości.
            </p>

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-0 border border-white/5 rounded-2xl overflow-hidden">
              {[
                { val: "100%", label: "Dbałości" },
                { val: "24/7", label: "Wsparcie" },
                { val: "5★", label: "Ocena" },
              ].map((s, i) => (
                <div key={i} className={`py-6 text-center ${i < 2 ? "border-r border-white/5" : ""} group cursor-default hover:bg-[#b71c1c]/10 transition-colors duration-300`}>
                  <p className="text-3xl font-black text-white tracking-tighter group-hover:text-[#b71c1c] transition-colors duration-400">{s.val}</p>
                  <p className="text-[9px] text-gray-600 uppercase tracking-widest font-bold mt-1">{s.label}</p>
                </div>
              ))}
            </div>

            {/* CTA */}
            <motion.a
              href="#contact"
              whileHover={{ x: 8 }}
              transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
              className="mt-10 flex items-center gap-4 group self-start"
            >
              <div className="w-12 h-12 rounded-full bg-[#b71c1c] flex items-center justify-center group-hover:bg-[#8b1115] transition-colors">
                <ChevronRight className="w-5 h-5 text-white" />
              </div>
              <span className="text-white font-black text-xs uppercase tracking-[0.3em]">UMÓW WIZYTĘ</span>
            </motion.a>
          </motion.div>

          {/* Right — Full-height image with diagonal clip */}
          <motion.div
            initial={{ opacity: 0, scale: 1.05 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.23, 1, 0.32, 1] }}
            className="relative hidden lg:block"
          >
            {/* Diagonal clip matching gallery motif */}
            <div className="absolute inset-0 [clip-path:polygon(8%_0,100%_0,100%_100%,0%_100%)]">
              <Image
                src={`${B}/about.webp`}
                alt="AGA MAX Warsztat"
                fill
                sizes="50vw"
                className="object-cover"
                priority
              />
              {/* Overlays */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-transparent to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/50 to-transparent" />
              <div className="absolute inset-0 bg-[#b71c1c]/5" />
            </div>

            {/* Floating cert badge */}
            <div className="absolute bottom-10 right-10 glass-premium rounded-2xl px-6 py-4 border border-[#b71c1c]/20 z-10">
              <p className="text-white font-black text-sm uppercase tracking-widest">AGA MAX</p>
              <p className="text-[#b71c1c] text-[10px] font-bold tracking-widest mt-1">CERTYFIKOWANY SERWIS</p>
            </div>

            {/* Red diagonal accent bar — perfectly aligned with clip-path */}
            <div 
              className="absolute inset-0 bg-gradient-to-b from-transparent via-[#b71c1c]/60 to-transparent pointer-events-none z-10"
              style={{ clipPath: 'polygon(8% 0, calc(8% + 2px) 0, 2px 100%, 0% 100%)' }}
            />
          </motion.div>

        </div>
      </section>

      {/* Reviews Section - Interactive Spotlight */}
      <section className="relative py-16 md:py-36 bg-[#080808] overflow-hidden">
        <div className="vertical-waves absolute inset-0 pointer-events-none z-0" />

        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-24">
          {/* Label */}
          <div className="flex items-center gap-4 mb-16">
            <div className="w-12 h-[1px] bg-[#b71c1c]" />
            <p className="text-[#b71c1c] font-black text-xs uppercase tracking-[0.4em]">ZAUFALI NAM</p>
          </div>
          {/* Main review spotlight */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeReview}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
              className="mb-16"
            >
              <div className="flex gap-2 mb-8">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star key={j} className="w-5 h-5 text-[#b71c1c] fill-[#b71c1c]" />
                ))}
              </div>
              <div className="relative mb-10">
                <span className="absolute -top-6 -left-2 text-[100px] text-[#b71c1c]/15 font-serif italic leading-none select-none pointer-events-none">&ldquo;</span>
                <p className="text-white text-[22px] sm:text-3xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight leading-[1.05] relative z-10 max-w-5xl">
                  {REVIEWS[activeReview].text}
                </p>
              </div>
              <div className="flex items-center gap-6">
                <div className="w-16 h-[2px] bg-[#b71c1c]" />
                <div>
                  <p className="text-white font-black text-lg tracking-widest">{REVIEWS[activeReview].name}</p>
                  <p className="text-gray-300 leading-relaxed text-xs uppercase tracking-[0.3em] font-bold mt-1">{REVIEWS[activeReview].car}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
          {/* Controls */}
          <div className="flex items-center justify-between">
            <div className="flex gap-3">
              <button
                onClick={() => setActiveReview(p => (p - 1 + REVIEWS.length) % REVIEWS.length)}
                className="w-14 h-14 rounded-full border border-white/10 hover:border-[#b71c1c] hover:bg-[#b71c1c] flex items-center justify-center transition-all duration-400 group"
              >
                <ChevronRight className="w-5 h-5 text-white rotate-180" />
              </button>
              <button
                onClick={() => setActiveReview(p => (p + 1) % REVIEWS.length)}
                className="w-14 h-14 rounded-full border border-white/10 hover:border-[#b71c1c] hover:bg-[#b71c1c] flex items-center justify-center transition-all duration-400"
              >
                <ChevronRight className="w-5 h-5 text-white" />
              </button>
            </div>
            <div className="flex items-baseline gap-3">
              <span className="text-white font-black text-3xl tracking-tighter">{String(activeReview + 1).padStart(2, "0")}</span>
              <span className="text-white/20">/</span>
              <span className="text-gray-600">{String(REVIEWS.length).padStart(2, "0")}</span>
            </div>
            <div className="flex gap-3 items-center">
              {REVIEWS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveReview(i)}
                  className={`h-[2px] transition-all duration-500 ${i === activeReview ? "bg-[#b71c1c] w-10" : "bg-white/20 w-4 hover:w-6"}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="red-divider" />

      {/* Contact Section */}
      <section id="contact" className="relative py-40 px-6 md:px-12 lg:px-24 bg-[#080808] overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#b71c1c]/40 to-transparent" />
        <div className="absolute left-0 top-0 w-[2px] h-full bg-gradient-to-b from-transparent via-[#b71c1c]/30 to-transparent pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-[1px] bg-[#b71c1c]"></div>
              <p className="text-[#b71c1c] font-black text-xs uppercase tracking-[0.4em]">DOŁĄCZ DO ELITY</p>
            </div>
            <h2 className="text-[36px] sm:text-5xl md:text-8xl font-black uppercase tracking-tighter text-white leading-[0.9] mb-12 break-words">
              ZACZNIJMY<br />ROZMAWIAĆ.
            </h2>
            
            <div className="space-y-12">
              {[
                { icon: MapPin, label: "Adres", val: "ul. Morwowa 34", sub: "11-041 Olsztyn", href: "https://www.google.com/maps/dir/?api=1&destination=AGA+MAX+Wasilewscy+Morwowa+34+11-041+Olsztyn" },
                { icon: Phone, label: "Telefon", val: "+48 796 550 514", sub: "Umów wizytę teraz" },
                { icon: Clock, label: "Godziny", val: "Pn - Pt: 09:00 - 18:00", sub: "Sobota: 09:00 - 15:00" }
              ].map((item, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.2 }}
                  className="flex gap-8 items-center group cursor-pointer"
                  onClick={() => {
                    if (item.href) window.open(item.href, '_blank');
                    else setContactModalOpen(true);
                  }}
                >
                  <div className="w-16 h-16 glass-premium rounded-2xl flex items-center justify-center group-hover:bg-[#b71c1c] transition-all duration-500 shadow-xl shrink-0">
                    <item.icon className="w-7 h-7 text-[#b71c1c] group-hover:text-white transition-colors" />
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-300 text-[10px] uppercase font-black tracking-[0.3em] mb-2">{item.label}</p>
                    <p className="text-xl md:text-2xl font-black text-white leading-tight group-hover:text-[#b71c1c] transition-colors">{item.val}</p>
                    <p className="text-white/60 text-sm font-medium mt-1 mb-4">{item.sub}</p>
                    {item.label === "Telefon" && (
                      <a href={`tel:${item.val.replace(/\s/g, '')}`} className="sm:hidden inline-flex items-center gap-2 bg-[#b71c1c] text-white px-6 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-lg active:scale-95 transition-transform">
                        <Phone className="w-3.5 h-3.5" />
                        Zadzwoń do nas
                      </a>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* RIGHT — Embedded Map */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
            className="relative rounded-[30px] overflow-hidden border border-[#b71c1c]/20 shadow-[0_0_80px_rgba(183,28,28,0.12)]"
            style={{ height: '560px' }}
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2360.7788481358!2d20.4439!3d53.7661!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46e2792610b88523%3A0xe7f9b8c0!2sMorwowa+34%2C+11-041+Olsztyn!5e0!3m2!1spl!2spl!4v1715000000000!5m2!1spl!2spl"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="AGA MAX Lokalizacja"
            />
            {/* Red top border line */}
            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#b71c1c]/60 to-transparent" />
            {/* Info badge */}
            {/* Direction button */}
            <a
              href="https://www.google.com/maps/dir/?api=1&destination=AGA+MAX+Wasilewscy+Morwowa+34+11-041+Olsztyn"
              target="_blank"
              rel="noopener noreferrer"
              className="absolute bottom-6 right-6 bg-[#b71c1c] hover:bg-white hover:text-black transition-all duration-300 text-white font-black text-[9px] uppercase tracking-[0.3em] px-6 py-4 rounded-full flex items-center gap-2 shadow-[0_10px_30px_rgba(183,28,28,0.4)]"
            >
              NAWIGUJ <ChevronRight className="w-3 h-3" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* Footer - Minimal Premium */}
      <footer className="py-20 border-t border-white/5 bg-[#0a0a0a] overflow-hidden">
        <div className="px-6 md:px-12 lg:px-24 flex flex-col md:flex-row justify-between items-center gap-12 max-w-7xl mx-auto">
          <div className="flex flex-col items-center md:items-start gap-3">
             <Image
               src={`${B}/logo.webp`}
               alt="AGA-MAX Wasilewscy"
               width={160}
               height={40}
               className="h-9 w-auto object-contain brightness-0 invert opacity-80 hover:opacity-100 transition-opacity duration-300"
             />
             <p className="text-gray-600 text-[10px] font-black uppercase tracking-[0.3em]">Wasilewscy &copy; 2026</p>
          </div>

          <div className="flex items-center gap-12 text-[10px] font-black uppercase tracking-[0.3em] text-gray-500">
             <a href="#" className="hover:text-[#b71c1c] transition-colors">Facebook</a>
             <a href="#" className="hover:text-[#b71c1c] transition-colors">Instagram</a>
             <a href="#" className="hover:text-[#b71c1c] transition-colors">TikTok</a>
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
