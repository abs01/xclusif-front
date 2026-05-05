import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";

export default function Contact() {
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    try {
      const storageData = localStorage.getItem("account2");
      if (storageData) {
        const accountData = JSON.parse(storageData);
        setUserEmail(accountData?.user?.email || "");
      }
    } catch (error) {
      console.error("Error al leer el email del localStorage", error);
    }
  }, []);

  const adminMail = "admin@admin.com";
  const subject = encodeURIComponent("Contacto desde Baleartrek");
  const body = encodeURIComponent(`Hola Administrador,\n\nMi correo de cuenta es: ${userEmail}\n\nEscribe aquí tu consulta:`);
  const mailtoLink = `mailto:${adminMail}?subject=${subject}&body=${body}`;

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Header />

      <div className="lg:ml-64 xl:ml-72 lg:max-w-[600px] min-h-screen border-x border-gray-800">
        <div className="sticky top-0 lg:top-0 mt-14 lg:mt-0 bg-black/80 backdrop-blur-md border-b border-gray-800 px-4 py-3 z-10">
          <h1 className="text-xl font-black text-white">Contacto</h1>
          <p className="text-gray-500 text-xs mt-0.5">Nuestro equipo te responderá pronto</p>
        </div>

        <div className="px-4 py-6 space-y-6">
          <p className="text-gray-400 text-sm leading-relaxed">
            ¿Tienes dudas sobre las rutas o necesitas ayuda con tu cuenta? Escríbenos y te responderemos lo antes posible.
          </p>

          <div>
            <label className="block text-xs font-bold text-gray-400 mb-1.5 uppercase tracking-wide">
              Tu correo electrónico
            </label>
            <input
              type="text"
              value={userEmail || "Usuario no identificado"}
              readOnly
              className="w-full px-4 py-3 bg-transparent border border-gray-700 rounded-xl text-gray-500 text-sm font-mono cursor-not-allowed"
            />
          </div>

          <a
            href={mailtoLink}
            className="flex items-center justify-center gap-2 w-full py-3 bg-emerald-500 hover:bg-emerald-400 text-black font-black text-sm rounded-full transition-colors"
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
              <polyline points="22,6 12,13 2,6"/>
            </svg>
            Enviar correo a soporte
          </a>

          <p className="text-center text-xs text-gray-600 uppercase tracking-widest">
            * Se abrirá tu gestor de correo predeterminado
          </p>
        </div>

        <Footer />
      </div>
    </div>
  );
}