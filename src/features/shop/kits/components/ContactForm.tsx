import React from "react";
import { X, Send, Calendar, Mail, User, MessageSquare } from "lucide-react";

interface ContactFormProps {
  open: boolean;
  onClose: () => void;
  kitName?: string;
}

export const ContactForm: React.FC<ContactFormProps> = ({
  open,
  onClose,
  kitName,
}) => {
  if (!open) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(
      "¡Solicitud enviada! Un asesor experto en el Camino te contactará pronto."
    );
    onClose();
  };

  const inputClass =
    "w-full pl-10 pr-4 py-2.5 border border-[#A4AC86] rounded-xl focus:ring-2 focus:ring-[#582F0E] focus:border-transparent outline-none transition-all bg-white text-[#333D29] placeholder:text-gray-400";
  const labelClass = "block text-sm font-bold text-[#333D29] mb-1.5";
  const iconClass = "absolute left-3 top-[38px] w-5 h-5 text-[#656D4A]";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm transition-opacity">
      <div className="bg-[#fdfcf5] w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden border border-[#A4AC86] transform transition-all scale-100 flex flex-col max-h-[90vh]">
        {/* Cabecera */}
        <div className="p-6 bg-[#C2C5AA]/20 border-b border-[#A4AC86] flex justify-between items-center shrink-0">
          <div>
            <h2 className="text-xl font-bold text-[#333D29] font-serif">
              Experiencia VIP a Medida
            </h2>
            <p className="text-xs text-[#656D4A] mt-1 font-medium uppercase tracking-wider">
              Solicitud para: {kitName || "Kit Premium"}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-[#656D4A] hover:text-[#582F0E] transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Formulario */}
        <div className="p-6 overflow-y-auto">
          <p className="text-[#656D4A] mb-6 text-sm">
            Para el servicio Premium, necesitamos conocer tus fechas y
            preferencias para reservar los mejores paradores y transporte
            privado.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="relative">
              <label className={labelClass}>Nombre Completo</label>
              <User className={iconClass} />
              <input
                type="text"
                required
                placeholder="Tu nombre"
                className={inputClass}
              />
            </div>

            <div className="relative">
              <label className={labelClass}>Email de Contacto</label>
              <Mail className={iconClass} />
              <input
                type="email"
                required
                placeholder="tu@email.com"
                className={inputClass}
              />
            </div>

            <div className="relative">
              <label className={labelClass}>Fechas Aproximadas</label>
              <Calendar className={iconClass} />
              <input
                type="text"
                placeholder="Ej: Mayo 2024"
                className={inputClass}
              />
            </div>

            <div className="relative">
              <label className={labelClass}>Preferencias o Necesidades</label>
              <div className="absolute left-3 top-[38px] pointer-events-none">
                <MessageSquare className="w-5 h-5 text-[#656D4A]" />
              </div>
              <textarea
                rows={3}
                placeholder="¿Alguna alergia? ¿Habitación individual?..."
                className="w-full pl-10 pr-4 py-2.5 border border-[#A4AC86] rounded-xl focus:ring-2 focus:ring-[#582F0E] focus:border-transparent outline-none transition-all bg-white text-[#333D29] placeholder:text-gray-400 resize-none"
              ></textarea>
            </div>

            <div className="pt-4 flex justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 text-[#656D4A] font-bold hover:text-[#333D29]"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="flex items-center gap-2 px-6 py-2.5 bg-[#582F0E] text-white rounded-xl font-bold hover:bg-[#7F4F24] shadow-lg transition-all active:scale-95"
              >
                <Send className="w-4 h-4" />
                Enviar Solicitud
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
