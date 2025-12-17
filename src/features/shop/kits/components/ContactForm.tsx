import React, { useState } from "react";
import {
  IconX,
  IconSend,
  IconCalendar,
  IconMail,
  IconUser,
  IconMessageCircle,
} from "@tabler/icons-react";
import { useSendKitRequestMutation } from "../hooks/useKitsMutation";

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
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    dates: "",
    message: "",
  });

  const { mutate, isPending } = useSendKitRequestMutation();

  if (!open) return null;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate(
      {
        kitName: kitName || "Kit Premium",
        name: formData.name,
        email: formData.email,
        message: `Fechas: ${formData.dates}\nPreferencias: ${formData.message}`,
      },
      {
        onSuccess: () => {
          setFormData({ name: "", email: "", dates: "", message: "" });
          onClose();
        },
      }
    );
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
            <IconX size={24} />
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
              <IconUser className={iconClass} />
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                type="text"
                required
                placeholder="Tu nombre"
                className={inputClass}
              />
            </div>

            <div className="relative">
              <label className={labelClass}>Email de Contacto</label>
              <IconMail className={iconClass} />
              <input
                name="email"
                value={formData.email}
                onChange={handleChange}
                type="email"
                required
                placeholder="tu@email.com"
                className={inputClass}
              />
            </div>

            <div className="relative">
              <label className={labelClass}>Fechas Aproximadas</label>
              <IconCalendar className={iconClass} />
              <input
                name="dates"
                value={formData.dates}
                onChange={handleChange}
                type="text"
                placeholder="Ej: Mayo 2024"
                className={inputClass}
              />
            </div>

            <div className="relative">
              <label className={labelClass}>Preferencias o Necesidades</label>
              <div className="absolute left-3 top-[38px] pointer-events-none">
                <IconMessageCircle className="w-5 h-5 text-[#656D4A]" />
              </div>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
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
                disabled={isPending}
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={isPending}
                className={`flex items-center gap-2 px-6 py-2.5 bg-[#582F0E] text-white rounded-xl font-bold hover:bg-[#7F4F24] shadow-lg transition-all active:scale-95 ${
                  isPending ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                <IconSend size={16} />
                {isPending ? "Enviando..." : "Enviar Solicitud"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
