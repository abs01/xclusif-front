import { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";

const faqs = [
  { question: "¿Cómo creo una cuenta en Xclusif?", answer: "Haz clic en 'Registrarse', completa el formulario con tus datos personales y confirma tu correo electrónico. ¡Listo! Ya puedes comenzar a compartir con la comunidad." },
  { question: "¿Mis posts son privados?", answer: "Por defecto, todos los posts son públicos y visibles para cualquier usuario de Xclusif." },
  { question: "¿Cómo protejo mi cuenta?", answer: "Usa una contraseña fuerte, no compartas tu contraseña con nadie." },
];

function FAQItem({ faq, index }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="border-b border-gray-800 px-4 py-4 hover:bg-gray-900/40 transition-colors cursor-pointer"
      onClick={() => setOpen(!open)}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3 flex-1">
          <span className="text-emerald-500 font-black text-sm mt-0.5 shrink-0">Q{index + 1}</span>
          <p className="text-white font-bold text-sm leading-snug">{faq.question}</p>
        </div>
        <svg
          viewBox="0 0 24 24"
          className={`w-4 h-4 text-gray-500 shrink-0 transition-transform mt-0.5 ${open ? "rotate-180" : ""}`}
          fill="none" stroke="currentColor" strokeWidth="2"
        >
          <path d="M6 9l6 6 6-6"/>
        </svg>
      </div>
      {open && (
        <p className="mt-3 ml-7 text-gray-400 text-sm leading-relaxed">{faq.answer}</p>
      )}
    </div>
  );
}

export default function FAQ() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Header />

      <div className="lg:ml-64 xl:ml-72 pe-50 min-h-screen border-x border-gray-800">
        <div className="sticky top-0 lg:top-0 mt-14 lg:mt-0 bg-black/80 backdrop-blur-md border-b border-gray-800 px-4 py-3 z-10">
          <h1 className="text-xl font-black text-white">Preguntas Frecuentes</h1>
          <p className="text-gray-500 text-xs mt-0.5">Resuelve tus dudas sobre Xclusif</p>
        </div>

        <div>
          {faqs.map((faq, i) => (
            <FAQItem key={i} faq={faq} index={i} />
          ))}
        </div>

        <Footer />
      </div>
    </div>
  );
}