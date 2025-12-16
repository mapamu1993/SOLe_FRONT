// import React, { useState } from "react";
// // CORRECCIÓN: Usamos Tabler Icons
// import { IconX, IconCheck } from "@tabler/icons-react";

// interface CustomizerFormProps {
//   open: boolean;
//   onClose: () => void;
//   basePrice: number;
//   onAddToCart: (total: number, items: string[]) => void;
// }

// const EXTRA_OPTIONS = [
//   { id: "alojamiento_premium", label: "Alojamiento en Paradores", price: 75 },
//   { id: "seguro_plus", label: "Seguro de Viaje Plus", price: 100 },
//   { id: "ruta_medida", label: "Ruta a Medida", price: 300 },
//   { id: "bastones", label: "Bastones Carbono", price: 45 },
//   { id: "guia_papel", label: "Guía Gastronómica (Física)", price: 20 },
// ];

// export const CustomizerForm: React.FC<CustomizerFormProps> = ({
//   open,
//   onClose,
//   basePrice,
//   onAddToCart,
// }) => {
//   const [selectedExtras, setSelectedExtras] = useState<string[]>([]);

//   if (!open) return null;

//   const handleToggle = (id: string) => {
//     setSelectedExtras((prev) =>
//       prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
//     );
//   };

//   const extrasTotal = EXTRA_OPTIONS.filter((opt) =>
//     selectedExtras.includes(opt.id)
//   ).reduce((sum, opt) => sum + opt.price, 0);

//   const finalPrice = basePrice + extrasTotal;

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm transition-opacity">
//       <div className="bg-[#fdfcf5] w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden border border-[#A4AC86] transform transition-all scale-100">
        
//         <div className="p-6 bg-[#C2C5AA]/20 border-b border-[#A4AC86] flex justify-between items-center">
//           <h2 className="text-xl font-bold text-[#333D29] font-serif">
//             Personaliza tu Kit
//           </h2>
//           <button
//             onClick={onClose}
//             className="text-[#656D4A] hover:text-[#582F0E] transition-colors"
//           >
//             <IconX size={24} />
//           </button>
//         </div>

//         <div className="p-6">
//           <p className="text-[#656D4A] mb-5 text-sm">
//             El kit base incluye alojamiento seleccionado y transporte. Añade
//             extras para mejorar tu experiencia:
//           </p>

//           <div className="space-y-3 mb-6">
//             {EXTRA_OPTIONS.map((option) => {
//               const isSelected = selectedExtras.includes(option.id);
//               return (
//                 <label
//                   key={option.id}
//                   className={`
//                         flex items-center justify-between p-4 border rounded-xl cursor-pointer transition-all duration-200 select-none
//                         ${
//                           isSelected
//                             ? "bg-white border-[#582F0E] shadow-sm ring-1 ring-[#582F0E]"
//                             : "bg-white border-[#A4AC86]/40 hover:border-[#582F0E]/50"
//                         }
//                     `}
//                 >
//                   <div className="flex items-center gap-3">
//                     <div
//                       className={`
//                           w-5 h-5 rounded border flex items-center justify-center transition-colors
//                           ${
//                             isSelected
//                               ? "bg-[#582F0E] border-[#582F0E]"
//                               : "border-[#A4AC86] bg-white"
//                           }
//                       `}
//                     >
//                       {isSelected && <IconCheck size={12} className="text-white" stroke={3} />}
//                     </div>
//                     <span
//                       className={`font-medium ${
//                         isSelected ? "text-[#333D29]" : "text-gray-600"
//                       }`}
//                     >
//                       {option.label}
//                     </span>
//                   </div>
//                   <span className="font-bold text-[#7F4F24]">
//                     +{option.price}€
//                   </span>

//                   <input
//                     type="checkbox"
//                     checked={isSelected}
//                     onChange={() => handleToggle(option.id)}
//                     className="hidden"
//                   />
//                 </label>
//               );
//             })}
//           </div>

//           <div className="bg-[#C2C5AA]/20 p-4 rounded-xl flex justify-between items-center border border-[#A4AC86]/20">
//             <span className="text-sm font-bold text-[#333D29] uppercase tracking-wide">
//               Total Estimado
//             </span>
//             <span className="text-2xl font-bold text-[#582F0E]">
//               {finalPrice}€
//             </span>
//           </div>
//         </div>

//         <div className="p-6 bg-white border-t border-[#A4AC86]/30 flex gap-3 justify-end">
//           <button
//             onClick={onClose}
//             className="px-5 py-2.5 text-[#656D4A] font-bold hover:text-[#333D29] transition-colors"
//           >
//             Cancelar
//           </button>
//           <button
//             onClick={() => {
//               onAddToCart(finalPrice, selectedExtras);
//               onClose();
//             }}
//             className="px-6 py-2.5 bg-[#582F0E] text-white rounded-xl font-bold hover:bg-[#7F4F24] shadow-lg transition-all active:scale-95"
//           >
//             Añadir al Carrito
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };