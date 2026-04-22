export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t-4 border-gray-800 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          
          {/* Logo / Branding en el Footer */}
          <div className="flex flex-col items-center md:items-start">
            <div className="flex items-center">
              <div className="bg-gray-900 border-2 border-gray-800 p-1 rounded shadow-[2px_2px_0px_0px_rgba(16,185,129,1)]">

              </div>
              <span className="ml-2 font-black text-xl tracking-tighter text-gray-900">

              </span>
            </div>
            <p className="text-[10px] font-bold text-gray-400 mt-2 uppercase tracking-widest">

            </p>
          </div>

          {/* Copyright y Autoría */}
          <div className="text-center md:text-right">
            <p className="text-sm font-bold text-gray-800">
              © {currentYear} Xclusif
            </p>
            <p className="text-xs font-medium text-gray-500 mt-1">
              Desarrollado por <span className="text-gray-900 font-bold border-b-2 border-emerald-400">Antoni Xavier Bascuñana Sánchez</span>
            </p>
          </div>

        </div>

        {/* Línea decorativa final */}
        <div className="mt-8 pt-4 border-t border-gray-100 flex justify-center gap-4">
          <div className="h-1 w-8 bg-emerald-500 rounded-full"></div>
          <div className="h-1 w-8 bg-gray-800 rounded-full"></div>
          <div className="h-1 w-8 bg-emerald-500 rounded-full"></div>
        </div>
      </div>
    </footer>
  );
}