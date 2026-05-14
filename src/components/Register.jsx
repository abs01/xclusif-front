import { useState } from "react";
import { handleSubmit } from "../services/fetches";
import { useNavigate, Link } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

export default function Register() {
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [dni, setDni] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const userData = { name, lastname, email, dni, phone, password, password_confirmation: passwordConfirmation };

  const inputClass = "w-full px-4 py-3 bg-transparent border border-gray-700 rounded-xl text-white placeholder-gray-600 text-sm focus:outline-none focus:border-emerald-500 transition-colors";
  const labelClass = "block text-xs font-bold text-gray-400 mb-1.5 uppercase tracking-wide";

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Header />

      <main className="flex-1 flex items-center justify-center p-4 mt-14 lg:mt-0 mb-14 lg:mb-0 py-8">
        <div className="w-full max-w-lg">
          <div className="mb-8 text-center">
            <img src="/logoxclusif.svg" alt="Xclusif" className="h-10 w-auto mx-auto mb-6" />
            <h1 className="text-3xl font-black text-white">Únete a Xclusif</h1>
            <p className="text-gray-500 mt-1 text-sm">Crea tu cuenta de Usuario</p>
          </div>

          {error && (
            <div className="mb-4 px-4 py-3 bg-red-900/40 border border-red-500/50 text-red-400 text-sm font-medium rounded-xl">
              ⚠️ {error}
            </div>
          )}

          <form
            onSubmit={(e) => handleSubmit(e, setError, navigate, userData)}
            className="space-y-4"
          >
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Nombre</label>
                <input type="text" placeholder="Nombre" className={inputClass} value={name} onChange={(e) => setName(e.target.value)} required />
              </div>
              <div>
                <label className={labelClass}>Apellidos</label>
                <input type="text" placeholder="Apellidos" className={inputClass} value={lastname} onChange={(e) => setLastname(e.target.value)} required />
              </div>
            </div>

            <div>
              <label className={labelClass}>Email</label>
              <input type="email" placeholder="ejemplo@xclusif.com" className={inputClass} value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>DNI</label>
                <input type="text" placeholder="12345678A" className={inputClass} value={dni} onChange={(e) => setDni(e.target.value)} required />
              </div>
              <div>
                <label className={labelClass}>Teléfono</label>
                <input type="tel" placeholder="+34 600 000 000" className={inputClass} value={phone} onChange={(e) => setPhone(e.target.value)} required />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Contraseña</label>
                <input type="password" placeholder="••••••••" className={inputClass} value={password} onChange={(e) => setPassword(e.target.value)} required />
              </div>
              <div>
                <label className={labelClass}>Confirmar</label>
                <input type="password" placeholder="••••••••" className={inputClass} value={passwordConfirmation} onChange={(e) => setPasswordConfirmation(e.target.value)} required />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 text-black font-black text-sm rounded-full transition-colors mt-2"
            >
              Crear cuenta
            </button>
          </form>

          <div className="mt-6 pt-5 border-t border-gray-800 text-center">
            <p className="text-sm text-gray-500">
              ¿Ya tienes cuenta?{" "}
              <Link to="/login" className="text-emerald-500 font-bold hover:underline">
                Inicia sesión
              </Link>
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}