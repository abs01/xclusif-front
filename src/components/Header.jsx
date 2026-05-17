import { Link, useLocation } from "react-router-dom";
import {
  HiHome,
  HiQuestionMarkCircle,
  HiChatBubbleLeftRight,
  HiUser,
  HiArrowRightOnRectangle,
  HiPlus,
} from "react-icons/hi2";

export default function Header() {
  const isLoggedIn = localStorage.getItem("token2");
  const location = useLocation();

  const navItems = [
    {
      name: "Inicio",
      path: "/",
      icon: (active) => (
        <HiHome
          className={`w-6 h-6 ${active ? "fill-current" : ""}`}
        />
      ),
    },
    {
      name: "FAQ",
      path: "/FAQ",
      icon: (active) => (
        <HiQuestionMarkCircle
          className={`w-6 h-6 ${active ? "fill-current" : ""}`}
        />
      ),
    },
    {
      name: "Contacto",
      path: "/contact",
      icon: (active) => (
        <HiChatBubbleLeftRight
          className={`w-6 h-6 ${active ? "fill-current" : ""}`}
        />
      ),
    },
    ...(isLoggedIn
      ? [
          {
            name: "Mi Cuenta",
            path: "/account",
            icon: (active) => (
              <HiUser
                className={`w-6 h-6 ${active ? "fill-current" : ""}`}
              />
            ),
          },
        ]
      : []),
      {
      name: "Crear Post",
      path: "/create-post",
      icon: (active) => (
        <HiPlus
          className={`w-6 h-6 ${active ? "fill-current" : ""}`}
        />
      ),
    },
  ];

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex fixed left-0 top-0 h-full w-64 xl:w-72 flex-col justify-between px-4 border-r border-gray-800 bg-gradient-to-b from-black to-gray-950 z-50">
        <div>
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 mb-8">
            <img
              src="/logoxclusif.svg"
              alt="Xclusif"
              className="h-lg w-xs drop-shadow-lg"
            />
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
                    ${
                      active
                        ? "text-white bg-emerald-500/10 border border-emerald-500/30"
                        : "text-gray-400 hover:text-white hover:bg-gray-900/50 border border-transparent"
                    }`}
                >
                  <span
                    className={`transition-colors ${
                      active
                        ? "text-emerald-500"
                        : "text-gray-500 group-hover:text-emerald-400"
                    }`}
                  >
                    {item.icon(active)}
                  </span>

                  <span className="hidden xl:inline text-sm">
                    {item.name}
                  </span>
                </Link>
              );
            })}
          </nav>

          {/* CTA Button */}
          {!isLoggedIn ? (
            <Link
              to="/register"
              className="mt-8 flex items-center justify-center gap-2 w-full px-4 py-2.5 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-white font-bold text-sm rounded-lg transition-all shadow-lg hover:shadow-emerald-500/50"
            >
              <span className="hidden xl:inline">Registrarse</span>

              <HiPlus className="w-5 h-5 xl:hidden" />
            </Link>
          ) : null}
        </div>

        {/* Bottom user pill */}
        {isLoggedIn ? (
          <Link
            to="/account"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-900/50 transition-colors border border-gray-800 hover:border-emerald-500/50"
          >
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center text-white shrink-0">
              <HiUser className="w-5 h-5" />
            </div>

            <div className="hidden xl:block min-w-0">
              <p className="text-white font-semibold text-sm truncate">
                Mi Cuenta
              </p>
            </div>
          </Link>
        ) : (
          <Link
            to="/login"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-900/50 transition-colors text-gray-400 hover:text-white font-semibold text-sm border border-gray-800 hover:border-gray-700"
          >
            <HiArrowRightOnRectangle className="w-5 h-5 shrink-0" />

            <span className="hidden xl:inline">Sesión</span>
          </Link>
        )}
      </aside>

      {/* Mobile Top Bar */}
      <header className="lg:hidden fixed top-0 left-0 right-0 h-14 bg-black border-b border-gray-800 flex items-center justify-between px-4 z-50">
        <Link to="/">
          <img
            src="/logoxclusif.svg"
            alt="Xclusif"
            className="h-7 w-auto"
          />
        </Link>

        <div className="flex items-center gap-2">
          {!isLoggedIn ? (
            <>
              <Link
                to="/login"
                className="text-sm font-bold text-gray-400 hover:text-white px-3 py-1.5 rounded-full hover:bg-gray-900 transition-colors"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="text-sm font-bold bg-emerald-500 text-black px-4 py-1.5 rounded-full hover:bg-emerald-400 transition-colors"
              >
                Registro
              </Link>
            </>
          ) : (
            <Link
              to="/account"
              className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center"
            >
              <HiUser className="w-4 h-4 text-white" />
            </Link>
          )}
        </div>
      </header>

      {/* Mobile Bottom Nav */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 h-14 bg-black border-t border-gray-800 flex items-center justify-around px-2 z-50">
        {navItems.slice(0, 4).map((item) => {
          const active = location.pathname === item.path;

          return (
            <Link
              key={item.name}
              to={item.path}
              className={`p-2 rounded-full transition-colors ${
                active
                  ? "text-white"
                  : "text-gray-500 hover:text-white"
              }`}
            >
              {item.icon(active)}
            </Link>
          );
        })}
      </nav>
    </>
  );
}