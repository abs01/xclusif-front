import { Link, useLocation } from "react-router-dom";

export default function Header() {
  const isLoggedIn = localStorage.getItem("token2");
  const location = useLocation();

  const navItems = [
    { name: "Inicio", path: "/", icon: (active) => (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill={active ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
        <path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z"/>
        <path d="M9 21V12h6v9"/>
      </svg>
    )},
    { name: "FAQ", path: "/FAQ", icon: (active) => (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill={active ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10"/>
        <path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3M12 17h.01"/>
      </svg>
    )},
    { name: "Contacto", path: "/contact", icon: (active) => (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill={active ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
      </svg>
    )},
    ...(isLoggedIn ? [{ name: "Mi Cuenta", path: "/account", icon: (active) => (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill={active ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
        <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
        <circle cx="12" cy="7" r="4"/>
      </svg>
    )}] : []),
  ];

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex fixed left-0 top-0 h-full w-64 xl:w-72 flex-col justify-between py-6 px-4 border-r border-gray-800 bg-gradient-to-b from-black to-gray-950 z-50">
        <div>
          {/* Logo */}
          <Link to="/" className="flex items-center px-4 py-3 mb-8 group">
            <img src="/booleanlogo.svg" alt="Xclusif" className="h-9 w-auto drop-shadow-lg" />
          </Link>

          {/* Nav */}
          <nav className="flex flex-col gap-2">
            {navItems.map((item) => {
              const active = location.pathname === item.path;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`flex items-center gap-4 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all group
                    ${active ? "text-white bg-emerald-500/10 border border-emerald-500/30" : "text-gray-400 hover:text-white hover:bg-gray-900/50 border border-transparent"}`}
                >
                  <span className={`transition-colors ${active ? "text-emerald-500" : "text-gray-500 group-hover:text-emerald-400"}`}>
                    {item.icon(active)}
                  </span>
                  <span className="hidden xl:inline text-sm">{item.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* CTA Button */}
          {!isLoggedIn ? (
            <Link
              to="/register"
              className="mt-8 flex items-center justify-center w-full px-4 py-2.5 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-white font-bold text-sm rounded-lg transition-all shadow-lg hover:shadow-emerald-500/50"
            >
              <span className="hidden xl:inline">Registrarse</span>
              <svg viewBox="0 0 24 24" className="w-5 h-5 xl:hidden" fill="currentColor"><path d="M12 4v16m8-8H4"/></svg>
            </Link>
          ) : null}
        </div>

        {/* Bottom user pill */}
        {isLoggedIn ? (
          <Link to="/account" className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-900/50 transition-colors border border-gray-800 hover:border-emerald-500/50">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center text-white text-sm font-bold shrink-0">👤</div>
            <div className="hidden xl:block min-w-0">
              <p className="text-white font-semibold text-sm truncate">Mi Cuenta</p>
            </div>
          </Link>
        ) : (
          <Link to="/login" className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-900/50 transition-colors text-gray-400 hover:text-white font-semibold text-sm border border-gray-800 hover:border-gray-700">
            <svg viewBox="0 0 24 24" className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 3h4a2 2 0 012 2v14a2 2 0 01-2 2h-4M10 17l5-5-5-5M15 12H3"/></svg>
            <span className="hidden xl:inline">Sesión</span>
          </Link>
        )}
      </aside>

      {/* Mobile Top Bar */}
      <header className="lg:hidden fixed top-0 left-0 right-0 h-14 bg-black border-b border-gray-800 flex items-center justify-between px-4 z-50">
        <Link to="/">
          <img src="/logoxclusif.svg" alt="Xclusif" className="h-7 w-auto" />
        </Link>
        <div className="flex items-center gap-2">
          {!isLoggedIn ? (
            <>
              <Link to="/login" className="text-sm font-bold text-gray-400 hover:text-white px-3 py-1.5 rounded-full hover:bg-gray-900 transition-colors">Login</Link>
              <Link to="/register" className="text-sm font-bold bg-emerald-500 text-black px-4 py-1.5 rounded-full hover:bg-emerald-400 transition-colors">Registro</Link>
            </>
          ) : (
            <Link to="/account" className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-sm">👤</Link>
          )}
        </div>
      </header>

      {/* Mobile Bottom Nav */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 h-14 bg-black border-t border-gray-800 flex items-center justify-around px-2 z-50">
        {navItems.slice(0, 4).map((item) => {
          const active = location.pathname === item.path;
          return (
            <Link key={item.name} to={item.path} className={`p-2 rounded-full transition-colors ${active ? "text-white" : "text-gray-500 hover:text-white"}`}>
              {item.icon(active)}
            </Link>
          );
        })}
      </nav>
    </>
  );
}