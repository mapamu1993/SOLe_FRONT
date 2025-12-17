import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { 
  IconMountain, 
  IconLeaf, 
  IconCampfire, 
  IconArrowRight, 
  IconMapPin,
  IconPlus,
  IconMinus
} from "@tabler/icons-react";
import { BRAND_THEME } from "@/config/designSystem";

// Importamos el mapa
import { CaminoMap } from "../../../components/ui/CaminoMap";

// DATOS DEL FAQ OPTIMIZADOS PARA SEO Y DUDAS REALES DEL PEREGRINO
const FAQS = [
  {
    question: "¿Vuestro equipamiento aguanta la lluvia de Galicia?",
    answer: "Nacimos bajo la lluvia gallega. Usamos algodón encerado de alta densidad y costuras selladas que han sido testadas en O Cebreiro y la entrada a Santiago. Tu ropa llegará seca, garantizado."
  },
  {
    question: "¿Hacéis envíos directos a albergues o Correos?",
    answer: "Sí. Sabemos que el Camino es impredecible. Podemos enviar tu pedido a cualquier oficina de Correos o albergue de tu próxima etapa en 24/48h para que no cargues peso extra innecesario."
  },
  {
    question: "¿Qué pasa si se rompe algo durante el Camino?",
    answer: "Nuestra garantía 'Buen Camino' te cubre. Si un producto falla en ruta, te lo reponemos en tu siguiente parada. Además, ofrecemos reparación de por vida en nuestro taller de Santiago."
  },
  {
    question: "¿Son productos sostenibles de verdad?",
    answer: "El Camino nos enseña a no dejar huella. Fabricamos en Galicia y norte de Portugal con artesanos locales, reduciendo la huella de carbono al mínimo. Sin plásticos, solo materiales que envejecen contigo."
  }
];

export const AboutDesign = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const yBackground = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const yText = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);

  return (
    <div ref={containerRef} className={`relative min-h-screen w-full bg-[${BRAND_THEME.colors.background}] font-sans overflow-hidden`}>
      
      {/* --- HERO SECTION --- */}
      <section className="relative min-h-screen flex items-center justify-center pt-24 pb-12 overflow-visible">
        <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
           <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <path d="M0 100 C 20 0 50 0 100 100 Z" fill="#333D29" />
           </svg>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* TEXTO (Izquierda) */}
          <motion.div 
            style={{ y: yText }}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* COPY SEO CAMBIADO: Autoridad Local */}
            <span className={BRAND_THEME.typography.eyebrow}>Diseñado en el Km 0</span>
            <h1 className="text-5xl md:text-7xl font-bold text-[#333D29] leading-[0.9] mb-6">
              Más que <br/>
              mochilas, <br/>
              <span className="italic font-serif text-[#B6AD90]">compañeros de ruta.</span>
            </h1>
            <p className="text-[#656D4A] text-lg max-w-md leading-relaxed mb-8">
              {/* COPY SEO CAMBIADO: Conexión emocional con el propósito del viaje */}
              Creemos que el equipamiento para el Camino de Santiago no debe ser una carga, sino una herramienta para la libertad. Ligereza, resistencia y alma gallega en cada costura.
            </p>
            
            <div className="flex items-center gap-2 text-xs font-bold text-[#582F0E] uppercase tracking-widest">
                <IconMapPin size={16} /> Fabricado en Galicia, España
            </div>
          </motion.div>

          {/* IMAGEN HERO (Derecha) */}
          <motion.div 
            initial={{ scale: 0.9, opacity: 0, rotate: 2 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            transition={{ duration: 1, delay: 0.2, type: "spring" }}
            className="relative h-[500px] md:h-[600px] w-full"
          >
            <img 
              src="https://cdn.world-discovery.com/20092/hiking-boots-on-the-waymark-stone-scaled.png" 
              alt="Botas de peregrino en el Camino de Santiago" 
              className="w-full h-full object-cover rounded-[2.5rem] shadow-2xl border-4 border-white"
            />

            {/* Tarjeta Flotante */}
            <motion.div 
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-6 -left-6 z-20 bg-[#333D29] text-[#EBECE2] p-6 rounded-3xl shadow-2xl max-w-[220px] border border-[#B6AD90]/20 hidden md:block"
            >
              <div className="flex items-center gap-2 mb-3 text-[#B6AD90]">
                 <IconMountain size={20} />
                 <span className="text-[10px] font-bold uppercase tracking-widest">Espíritu Jacobeo</span>
              </div>
              <p className="text-sm font-serif italic leading-relaxed">
                "El Camino no te da lo que quieres, te da lo que necesitas."
              </p>
            </motion.div>
          </motion.div>

        </div>
      </section>

      {/* --- MANIFIESTO (VALORES) --- */}
      <section className="py-24 px-6 bg-white rounded-t-[3rem] relative z-20 -mt-10 shadow-[-20px_0_40px_rgba(0,0,0,0.05)]">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <h2 className={BRAND_THEME.typography.headingLg}>
              Nuestros Valores <span className={BRAND_THEME.typography.highlight}>Peregrinos</span>
            </h2>
            <p className={BRAND_THEME.typography.eyebrow + " mt-2"}>
              El Manifiesto de Sol-e
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ValueCard 
              icon={<IconLeaf size={32} />}
              title="Huella Cero"
              desc="El peregrino pasa sin dejar rastro. Usamos materiales biodegradables y procesos limpios para proteger los senderos que amamos."
              delay={0.1}
            />
            <ValueCard 
              icon={<IconMountain size={32} />}
              title="Resistencia Jacobea"
              desc="Diseñado para soportar 800km de sol, lluvia y barro. Equipamiento que mejora con los kilómetros, como tú."
              delay={0.2}
            />
            <ValueCard 
              icon={<IconCampfire size={32} />}
              title="De Peregrino a Peregrino"
              desc="No somos una multinacional. Somos caminantes diseñando las soluciones que echábamos de menos en la ruta."
              delay={0.3}
            />
          </div>
        </div>
      </section>

      {/* --- HISTORIA (MAPA) --- */}
      <section className="py-24 px-6 bg-[#333D29] text-[#EBECE2] rounded-[3rem] mx-4 md:mx-8 mb-24 relative overflow-hidden">
        <motion.div 
          style={{ y: yBackground }}
          className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" 
        />
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
          
          {/* MAPA */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="h-[450px] w-full"
          >
            <div className="w-full h-full rounded-[2rem] overflow-hidden shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-500 border-4 border-white/10 relative z-10">
                <CaminoMap />
            </div>
          </motion.div>

          {/* TEXTO DE LA HISTORIA */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
              Inspirado en <br/>
              <span className="text-[#B6AD90] italic font-serif">O Cebreiro</span>
            </h2>
            <p className="text-lg text-[#EBECE2]/80 mb-6 leading-relaxed">
              {/* COPY SEO CAMBIADO: Historia de origen real */}
              Todo empezó en una etapa tormentosa subiendo a O Cebreiro. Nuestra fundadora se dio cuenta de que el equipo técnico "moderno" fallaba cuando la montaña se ponía dura.
            </p>
            <p className="text-lg text-[#EBECE2]/80 mb-8 leading-relaxed">
              Decidimos volver a la esencia: materiales naturales que respiran, diseños funcionales sin adornos inútiles y una durabilidad capaz de llegar a Finisterre y volver.
            </p>
            
            <div className="grid grid-cols-3 gap-4 border-t border-white/10 pt-8">
              <div>
                <span className="block text-3xl font-bold text-[#B6AD90]">5k+</span>
                <span className="text-xs uppercase tracking-wider opacity-60">Peregrinos</span>
              </div>
              <div>
                <span className="block text-3xl font-bold text-[#B6AD90]">100%</span>
                <span className="text-xs uppercase tracking-wider opacity-60">Hecho en Galicia</span>
              </div>
              <div>
                <span className="block text-3xl font-bold text-[#B6AD90]">∞</span>
                <span className="text-xs uppercase tracking-wider opacity-60">Garantía Vitalicia</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- SECCIÓN FAQ --- */}
      <section id="faq" className="py-20 px-6 max-w-4xl mx-auto scroll-mt-32">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className={BRAND_THEME.typography.headingLg}>
            Dudas del <span className={BRAND_THEME.typography.highlight}>Caminante</span>
          </h2>
          <p className={BRAND_THEME.typography.eyebrow + " mt-2"}>
            Respondemos antes de que salgas
          </p>
        </motion.div>

        <div className="space-y-4">
          {FAQS.map((faq, idx) => (
            <FAQItem key={idx} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      </section>

      {/* --- CTA FINAL --- */}
      <section className="py-20 px-6 text-center">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <h2 className={BRAND_THEME.typography.headingLg + " mb-6"}>¿Tu Credencial está lista?</h2>
          <p className="text-[#656D4A] mb-10 text-lg">
            No dejes que una mala mochila arruine tu experiencia. Equípate con lo que realmente necesitas.
          </p>
          
          <div className="flex justify-center">
            <Link to="/tienda">
              <button className={`group relative w-64 h-14 bg-[#582F0E] text-white font-bold text-sm uppercase tracking-widest overflow-hidden shadow-xl hover:shadow-[#B6AD90]/40 transition-all active:scale-95 ${BRAND_THEME.layout.borderRadius.button}`}>
                <span className="absolute inset-0 w-full h-full bg-[#7F4F24] transform scale-x-0 origin-left transition-transform duration-500 group-hover:scale-x-100 ease-out" />
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Ver Colección<IconArrowRight size={20} />
                </span>
              </button>
            </Link>
          </div>
        </motion.div>
      </section>

    </div>
  );
};

// COMPONENTES AUXILIARES

const ValueCard = ({ icon, title, desc, delay }: { icon: React.ReactNode, title: string, desc: string, delay: number }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: delay, duration: 0.5 }}
      whileHover={{ y: -10 }}
      className={`bg-[#F5F5F0] p-8 border border-transparent hover:border-[#B6AD90]/30 hover:shadow-lg transition-all ${BRAND_THEME.layout.borderRadius.card}`}
    >
      <div className="w-14 h-14 rounded-full bg-[#333D29] text-[#B6AD90] flex items-center justify-center mb-6 shadow-md">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-[#333D29] mb-3">{title}</h3>
      <p className="text-[#656D4A] text-sm leading-relaxed">
        {desc}
      </p>
    </motion.div>
  );
}

const FAQItem = ({ question, answer }: { question: string, answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`border transition-all duration-300 overflow-hidden rounded-[1.5rem] ${isOpen ? "bg-white border-[#582F0E] shadow-lg" : "bg-white border-transparent hover:border-[#B6AD90]/50 shadow-sm"}`}
    >
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-6 text-left"
      >
        <span className={`text-lg font-bold font-serif transition-colors ${isOpen ? "text-[#582F0E]" : "text-[#333D29]"}`}>
          {question}
        </span>
        <span className={`flex items-center justify-center w-8 h-8 rounded-full transition-colors ${isOpen ? "bg-[#582F0E] text-white" : "bg-[#F5F5F0] text-[#333D29]"}`}>
          {isOpen ? <IconMinus size={18} /> : <IconPlus size={18} />}
        </span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="px-6 pb-6 pt-0 text-[#656D4A] leading-relaxed">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};