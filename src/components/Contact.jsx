import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";

export default function Contact() {
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    try {
      const storageData = localStorage.getItem('account2');
      if (storageData) {
        const accountData = JSON.parse(storageData);
        // Accedemos a accountData.user.email según tu estructura
        setUserEmail(accountData?.user?.email || "");
      }
    } catch (error) {
      console.error("Error al leer el email del localStorage", error);
    }
  }, []);

  const adminMail = "admin@admin.com";
  
  // Codificamos los componentes para que el link sea seguro
  const subject = encodeURIComponent("Contacto desde Baleartrek");
  const body = encodeURIComponent(`Hola Administrador,\n\nMi correo de cuenta es: ${userEmail}\n\nEscribe aquí tu consulta:`);
  
  // El link mailto correcto
  const mailtoLink = `mailto:${adminMail}?subject=${subject}&body=${body}`;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />
      
      <main className="flex-1 max-w-2xl mx-auto mt-10 p-4 w-full">
        <div className="bg-white border-2 border-gray-800 rounded-lg p-8 shadow-[6px_6px_0px_0px_rgba(31,41,55,1)]">
          <h1 className="text-3xl font-black text-gray-900 mb-6 uppercase tracking-tight">
            Contacto
          </h1>
          
          <p className="text-gray-600 mb-8 font-medium">
            ¿Tienes alguna duda sobre las rutas o necesitas ayuda con tu cuenta? 
            Nuestro equipo de administración te responderá lo antes posible.
          </p>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">
                Tu correo electrónico:
              </label>
              <input 
                type="text" 
                value={userEmail || "Usuario no identificado"} 
                readOnly 
                className="w-full p-3 bg-gray-100 border-2 border-gray-800 rounded text-gray-500 cursor-not-allowed font-mono text-sm"
              />
            </div>

            <a 
              href={mailtoLink}
              className="inline-block w-full text-center bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-4 px-6 border-2 border-gray-800 rounded shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-1 active:translate-y-1 transition-all"
            >
              ENVIAR CORREO A SOPORTE
            </a>

            <p className="text-[10px] text-center text-gray-400 mt-4 uppercase font-bold tracking-widest">
              * Se abrirá tu gestor de correo predeterminado.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}