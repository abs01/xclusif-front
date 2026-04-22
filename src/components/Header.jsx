import { Link } from "react-router-dom";

export default function Header() {
  const isLoggedIn = localStorage.getItem("token2");

  return (
    <header className="bg-white border-b-4 border-gray-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          
          {/* Izquierda: Logo y Nav */}
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center group">
              <h1>Prueba</h1>
            </Link>

            <nav className="hidden lg:flex items-center gap-1">
              {[
                { name: "FAQ", path: "/FAQ" },
                { name: "Contacto", path: "/contact" },
              ].map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className="px-3 py-2 text-sm font-bold text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 rounded-md transition-colors"
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Derecha: Auth */}
          <div className="flex items-center gap-3">
            {!isLoggedIn ? (
              <>
                <Link 
                  to="/login" 
                  className="px-4 py-2 text-sm font-bold text-gray-700 hover:bg-gray-100 rounded-md transition-all"
                >
                  Login
                </Link>
                <Link 
                  to="/register" 
                  className="px-4 py-2 text-sm font-bold bg-emerald-500 text-white border-2 border-gray-800 rounded shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
                >
                  Register
                </Link>
              </>
            ) : (
              <Link 
                to="/account" 
                className="flex items-center gap-2 px-4 py-2 text-sm font-bold bg-white border-2 border-gray-800 rounded shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
              >
                <span className="hidden sm:inline">Mi Cuenta</span>
                <div className="w-6 h-6 bg-gray-200 rounded-full border border-gray-800 flex items-center justify-center text-[10px]">
                  👤
                </div>
              </Link>
            )}
          </div>

        </div>
      </div>
    </header>
  );
}