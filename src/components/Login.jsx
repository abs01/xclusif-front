import { useState } from "react";
import { useNavigate, Link } from 'react-router-dom';
import { handleSubmit } from "../services/fetches";
import Header from "./Header";
import Footer from "./Footer";

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex flex-col bg-slate-50">
            <Header />

            <main className="flex-1 flex items-center justify-center p-4">
                <div className="w-full max-w-md">
                    <div className="bg-white border-4 border-gray-800 p-8 rounded-xl shadow-[8px_8px_0px_0px_rgba(31,41,55,1)]">
                        
                        {/* Encabezado del Formulario */}
                        <div className="text-center mb-8">
                            <h1 className="text-4xl font-black text-gray-900 uppercase tracking-tighter">
                                Hola de <span className="text-emerald-500">nuevo</span>
                            </h1>
                            <p className="text-gray-500 font-bold text-sm mt-2 uppercase tracking-widest">
                                Ingresa a tu cuenta de aventurero
                            </p>
                        </div>

                        {/* Manejo de Errores */}
                        {error && (
                            <div className="mb-6 p-3 bg-red-100 border-2 border-red-600 text-red-700 font-bold rounded flex items-center gap-2">
                                <span>⚠️</span> {error}
                            </div>
                        )}

                        <form 
                            onSubmit={(e) => handleSubmit(e, setError, navigate, email, password)}
                            className="space-y-6"
                        >
                            {/* Campo Email */}
                            <div>
                                <label className="block text-xs font-black uppercase text-gray-700 mb-2 ml-1">
                                    Correo Electrónico
                                </label>
                                <input 
                                    type="email" 
                                    placeholder="ejemplo@baleartrek.com" 
                                    className="w-full p-4 border-2 border-gray-800 rounded-lg font-bold placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition-all shadow-[4px_4px_0px_0px_rgba(31,41,55,0.1)] focus:shadow-none"
                                    value={email} 
                                    onChange={e => setEmail(e.target.value)} 
                                    required 
                                />
                            </div>

                            {/* Campo Password */}
                            <div>
                                <label className="block text-xs font-black uppercase text-gray-700 mb-2 ml-1">
                                    Contraseña
                                </label>
                                <input 
                                    type="password" 
                                    placeholder="••••••••" 
                                    className="w-full p-4 border-2 border-gray-800 rounded-lg font-bold placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition-all shadow-[4px_4px_0px_0px_rgba(31,41,55,0.1)] focus:shadow-none"
                                    value={password} 
                                    onChange={e => setPassword(e.target.value)} 
                                    required 
                                />
                            </div>

                            {/* Botón Submit */}
                            <button 
                                type="submit"
                                className="w-full bg-emerald-500 text-white font-black py-4 border-2 border-gray-800 rounded-lg shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all uppercase tracking-widest"
                            >
                                Iniciar Sesión
                            </button>
                        </form>

                        {/* Link a Registro */}
                        <div className="mt-8 pt-6 border-t-2 border-gray-100 text-center">
                            <p className="text-sm font-bold text-gray-500">
                                ¿Aún no tienes cuenta?{" "}
                                <Link to="/register" className="text-emerald-600 underline hover:text-emerald-700">
                                    Regístrate aquí
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}