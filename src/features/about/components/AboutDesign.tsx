import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { 
  IconMountain, 
  IconLeaf, 
  IconCampfire, 
  IconArrowRight, 
  IconMapPin 
} from "@tabler/icons-react";

export const AboutDesign = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Efecto Parallax suave para elementos decorativos
  const yBackground = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const yText = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);

  return (
    <div ref={containerRef} className="min-h-screen w-full bg-[#EBECE2] font-sans overflow-hidden">
      
      {/* --- HERO SECTION --- */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* Fondo Decorativo */}
        <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
           <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <path d="M0 100 C 20 0 50 0 100 100 Z" fill="#333D29" />
           </svg>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Texto Hero */}
          <motion.div 
            style={{ y: yText }}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <span className="text-[#582F0E] font-bold tracking-[0.3em] uppercase text-xs mb-4 block">
              Desde 2024
            </span>
            <h1 className="text-5xl md:text-7xl font-bold text-[#333D29] leading-[0.9] mb-6">
              No hacemos <br/>
              mochilas, <br/>
              <span className="italic font-serif text-[#B6AD90]">creamos compañeros.</span>
            </h1>
            <p className="text-[#656D4A] text-lg max-w-md leading-relaxed">
              Nacimos en los senderos de Galicia con una misión simple: diseñar equipamiento que respete la naturaleza tanto como tú.
            </p>
          </motion.div>

          {/* Imagen Hero con Máscara */}
          <motion.div 
            initial={{ scale: 0.8, opacity: 0, rotate: -5 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            transition={{ duration: 1, delay: 0.2, type: "spring" }}
            className="relative"
          >
            <div className="relative z-10 overflow-hidden rounded-[3rem] shadow-2xl border-4 border-white/50">
              <img 
                src="https://images.unsplash.com/photo-1504280506541-13171881ef1b?q=80&w=1000&auto=format&fit=crop" 
                alt="Hiking"
                className="w-full h-[500px] object-cover"
              />
            </div>
            {/* Elemento flotante decorativo */}
            <motion.div 
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-10 -left-10 z-20 bg-[#333D29] text-[#EBECE2] p-6 rounded-3xl shadow-xl max-w-[200px]"
            >
              <IconMapPin className="mb-2 text-[#B6AD90]" />
              <p className="text-xs font-serif italic">"El camino se hace andando, y mejor si vas ligero."</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* --- MANIFIESTO (VALORES) --- */}
      <section className="py-24 px-6 bg-white rounded-t-[3rem] relative z-20 -mt-20 shadow-[-20px_0_40px_rgba(0,0,0,0.05)]">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[#333D29] mb-4">Nuestra Filosofía</h2>
            <div className="h-1 w-20 bg-[#582F0E] mx-auto rounded-full" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Valor 1 */}
            <ValueCard 
              icon={<IconLeaf size={32} />}
              title="Sostenibilidad Radical"
              desc="Usamos materiales reciclados y procesos de bajo impacto. El bosque es nuestra oficina."
              delay={0.1}
            />
            {/* Valor 2 */}
            <ValueCard 
              icon={<IconMountain size={32} />}
              title="Durabilidad Técnica"
              desc="Diseñado para resistir tormentas, barro y años de aventuras. Compra menos, compra mejor."
              delay={0.2}
            />
            {/* Valor 3 */}
            <ValueCard 
              icon={<IconCampfire size={32} />}
              title="Comunidad Real"
              desc="No somos una corporación. Somos peregrinos creando para peregrinos."
              delay={0.3}
            />
          </div>
        </div>
      </section>

      {/* --- HISTORIA (Imagen + Texto) --- */}
      <section className="py-24 px-6 bg-[#333D29] text-[#EBECE2] rounded-[3rem] mx-4 md:mx-8 mb-24 relative overflow-hidden">
        {/* Fondo Parallax */}
        <motion.div 
          style={{ y: yBackground }}
          className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" 
        />

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <img 
              src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=1000&auto=format&fit=crop" 
              alt="Our Journey" 
              className="rounded-[2rem] border border-white/10 shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-500"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
              De una idea en <br/>
              <span className="text-[#B6AD90] italic font-serif">O Cebreiro</span>
            </h2>
            <p className="text-lg text-[#EBECE2]/80 mb-6 leading-relaxed">
              Todo empezó bajo la lluvia. Nuestra fundadora, María, se dio cuenta de que su equipamiento técnico "de marca" fallaba cuando más lo necesitaba. 
            </p>
            <p className="text-lg text-[#EBECE2]/80 mb-8 leading-relaxed">
              Decidimos volver a lo básico: materiales naturales reforzados con tecnología moderna. Sin plásticos innecesarios, sin obsolescencia programada.
            </p>
            
            {/* Estadísticas */}
            <div className="grid grid-cols-3 gap-4 border-t border-white/10 pt-8">
              <div>
                <span className="block text-3xl font-bold text-[#B6AD90]">5k+</span>
                <span className="text-xs uppercase tracking-wider opacity-60">Peregrinos</span>
              </div>
              <div>
                <span className="block text-3xl font-bold text-[#B6AD90]">100%</span>
                <span className="text-xs uppercase tracking-wider opacity-60">Eco-Friendly</span>
              </div>
              <div>
                <span className="block text-3xl font-bold text-[#B6AD90]">3</span>
                <span className="text-xs uppercase tracking-wider opacity-60">Años Garantía</span>
              </div>
            </div>
          </motion.div>
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
          <h2 className="text-4xl font-bold text-[#333D29] mb-6">¿Listo para empezar tu camino?</h2>
          <p className="text-[#656D4A] mb-10 text-lg">
            Equípate con lo esencial y deja atrás lo que pesa. La aventura te espera.
          </p>
          
          <div className="flex justify-center">
            <Link to="/tienda">
              <button className="group relative w-64 h-14 bg-[#582F0E] text-white font-bold text-sm uppercase tracking-widest rounded-full overflow-hidden shadow-xl hover:shadow-[#B6AD90]/40 transition-all active:scale-95">
                <span className="absolute inset-0 w-full h-full bg-[#7F4F24] transform scale-x-0 origin-left transition-transform duration-500 group-hover:scale-x-100 ease-out" />
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Ver Colección <IconArrowRight size={20} />
                </span>
              </button>
            </Link>
          </div>
        </motion.div>
      </section>

    </div>
  );
};

// Componente auxiliar para las tarjetas de valores
const ValueCard = ({ icon, title, desc, delay }: { icon: React.ReactNode, title: string, desc: string, delay: number }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: delay, duration: 0.5 }}
      whileHover={{ y: -10 }}
      className="bg-[#F5F5F0] p-8 rounded-[2.5rem] border border-transparent hover:border-[#B6AD90]/30 hover:shadow-lg transition-all"
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