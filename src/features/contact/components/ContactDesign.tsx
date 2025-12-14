import { Link } from "react-router-dom";

export const ContactDesign = () => {
  return (
    // FONDO GENERAL (Beige verdoso)
    <div className="flex min-h-screen w-full items-center justify-center bg-[#C2C5AA] p-4 font-sans">
      {/* TARJETA PRINCIPAL */}
      <div className="mx-auto w-full max-w-2xl rounded-2xl bg-white p-8 shadow-2xl border border-[#A4AC86] text-center">
        {/* Cabecera */}
        <div className="mb-10">
          <h2 className="text-3xl font-bold text-[#333D29] md:text-4xl">
            Conecta con Nosotros
          </h2>
          <p className="mt-4 text-[#656D4A] text-lg">
            Estamos aquí para escucharte. Elige el canal que prefieras.
          </p>
        </div>

        {/* GRID DE CONTACTO PRINCIPAL */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* EMAIL */}
          <a
            href="mailto:info@elcamino.com"
            className="group flex flex-col items-center justify-center rounded-xl border-2 border-[#EBECE2] p-6 transition-all hover:border-[#582F0E] hover:bg-[#F5F5F0]"
          >
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#EBECE2] text-[#582F0E] transition-colors group-hover:bg-[#582F0E] group-hover:text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-7 w-7"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
            <h3 className="font-bold text-[#333D29]">Correo Electrónico</h3>
            <p className="mt-1 text-sm text-[#656D4A]">info@elcamino.com</p>
          </a>

          {/* WHATSAPP */}
          <a
            href="https://wa.me/34600000000"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col items-center justify-center rounded-xl border-2 border-[#EBECE2] p-6 transition-all hover:border-[#582F0E] hover:bg-[#F5F5F0]"
          >
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#EBECE2] text-[#582F0E] transition-colors group-hover:bg-[#582F0E] group-hover:text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-7 w-7"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
            </div>
            <h3 className="font-bold text-[#333D29]">WhatsApp</h3>
            <p className="mt-1 text-sm text-[#656D4A]">+34 600 000 000</p>
          </a>
        </div>

        {/* REDES SOCIALES */}
        <div className="mt-10 border-t border-[#EBECE2] pt-8">
          <h3 className="mb-6 font-bold text-[#333D29]">Síguenos en Redes</h3>
          <div className="flex justify-center gap-8 items-center">
            {/* Instagram */}
            <a
              href="#"
              aria-label="Instagram"
              className="transform text-[#656D4A] transition-transform hover:scale-110 hover:text-[#582F0E]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>

            {/* Facebook */}
            <a
              href="#"
              aria-label="Facebook"
              className="transform text-[#656D4A] transition-transform hover:scale-110 hover:text-[#582F0E]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
              </svg>
            </a>

            {/* X (Twitter) - NUEVO LOGO */}
            <a
              href="#"
              aria-label="X (Twitter)"
              className="transform text-[#656D4A] transition-transform hover:scale-110 hover:text-[#582F0E]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-7 w-7"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
          </div>
        </div>

        {/* BOTÓN VOLVER */}
        <div className="mt-10">
          <Link
            to="/"
            className="text-sm font-bold text-[#7F4F24] hover:underline"
          >
            &larr; Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  );
};
