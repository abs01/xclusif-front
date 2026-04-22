import Header from "./Header";
import Footer from "./Footer";

export default function FAQ() {
  const faqs = [
    {
      question: "¿Es necesario estar federado para unirse a una excursión?",
      answer: "Sí. Registrarse en la página es un trámite necesario para asegurar la gestión de los grupos."
    },
    {
      question: "¿Qué nivel de dificultad tienen las rutas en Baleartrek?",
      answer: "Calculamos una media numérica basada en la distancia, el desnivel y el tipo de terreno de las Islas Baleares."
    },
    {
      question: "¿Puedo llevar a mi perro a las excursiones?",
      answer: "Depende de la ruta y del organizador. Muchas zonas de las Baleares son áreas protegidas (ZEPA) donde los perros deben ir atados."
    },
    {
      question: "¿Cómo funciona la reserva de plazas?",
      answer: "Una vez encuentres una excursión que te guste, solicita tu plaza directamente desde la ficha del meeting."
    },
    {
      question: "¿Qué equipamiento básico debo llevar?",
      answer: "Lo esencial: calzado con buen agarre (el terreno es muy rocoso), mínimo 1.5L de agua, protección solar y un cortavientos."
    },
    {
      question: "Como va el sistema de puntuación de cada trek?",
      answer: "El sistema de 0-5 establece la dificultad de cada trek. 0: No se sabe. 1: Relajado. 2: Fácil. 3: Media. 4: Intenso. 5: Solo expertos."
    }
  ];

  return (
    <>
     <Header />

    <div className="min-h-screen flex flex-col bg-slate-50">
      
      {/* Mantenemos max-w-7xl y px-4 igual que en Treks.jsx 
          para que el Header y el layout sean simétricos.
      */}
      <main className="flex-1 max-w-7xl mx-auto px-4 py-12 w-full">
        
        {/* Este div limita el ancho del contenido de FAQ sin afectar al main global */}
        <div className="max-w-3xl mx-auto">
          
          {/* Título de la página */}
          <div className="mb-10 text-center">
            <h2 className="text-4xl font-black text-gray-900 uppercase tracking-tight">
              Preguntas Frecuentes
            </h2>
            <p className="text-gray-600 mt-2 font-medium">
              Resuelve tus dudas antes de empezar la ruta.
            </p>
          </div>

          {/* Contenedor de FAQs */}
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div 
                key={index} 
                className="bg-white border-2 border-gray-800 p-6 rounded-lg shadow-[5px_5px_0px_0px_rgba(31,41,55,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[7px_7px_0px_0px_rgba(31,41,55,1)] transition-all"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-start">
                  <span className="mr-3 text-emerald-500">Q.</span>
                  {faq.question}
                </h3>
                <div className="pl-8 border-l-2 border-gray-100">
                  <p className="text-gray-600 leading-relaxed font-medium">
                    {faq.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </main>

      <Footer />
    </div>
    </>
   
  );
}