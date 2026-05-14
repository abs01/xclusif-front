import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { handleSubmit } from "../services/fetches";
import Header from "./Header";
import Footer from "./Footer";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Header />

      <main className="flex-1 flex items-center justify-center p-4 mt-14 lg:mt-0 mb-14 lg:mb-0">
        <div className="w-full max-w-sm">
          <div className="mb-8 text-center">
            <img src="/logoxclusif.svg" alt="Xclusif" className="h-10 w-auto mx-auto mb-6" />
            <h1 className="text-3xl font-black text-white">Bienvenido de nuevo</h1>
            <p className="text-gray-500 mt-1 text-sm">Ingresa a tu cuenta</p>
          </div>

          {error && (
            <div className="mb-4 px-4 py-3 bg-red-900/40 border border-red-500/50 text-red-400 text-sm font-medium rounded-xl flex items-center gap-2">
              <span>⚠️</span> {error}
            </div>
          )}

          <form
            onSubmit={(e) => handleSubmit(e, setError, navigate, email, password)}
            className="space-y-4"
          >
            <div>
              <label className="block text-xs font-bold text-gray-400 mb-1.5 uppercase tracking-wide">
                Correo Electrónico
              </label>
              <input
                type="email"
                placeholder="ejemplo@xclusif.com"
                className="w-full px-4 py-3 bg-transparent border border-gray-700 rounded-xl text-white placeholder-gray-600 text-sm focus:outline-none focus:border-emerald-500 transition-colors"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-400 mb-1.5 uppercase tracking-wide">
                Contraseña
              </label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full px-4 py-3 bg-transparent border border-gray-700 rounded-xl text-white placeholder-gray-600 text-sm focus:outline-none focus:border-emerald-500 transition-colors"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-white hover:bg-gray-100 text-black font-black text-sm rounded-full transition-colors mt-2"
            >
              Iniciar Sesión
            </button>
          </form>

          <div className="mt-6 pt-5 border-t border-gray-800 text-center">
            <p className="text-sm text-gray-500">
              ¿No tienes cuenta?{" "}
              <Link to="/register" className="text-emerald-500 font-bold hover:underline">
                Regístrate
              </Link>
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}