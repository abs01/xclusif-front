import { useState } from "react";
import { handleSubmit } from "../services/fetches";
import { useNavigate, Link } from 'react-router-dom';
import Header from "./Header";
import Footer from "./Footer";

export default function Register() {
    const [name, setName] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [dni, setDni] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    // Preparamos el objeto de datos para el registro
    const userData = {
        name,
        lastname,
        email,
        dni,
        phone,
        password,
        password_confirmation: passwordConfirmation
    };

    return (
        <div className="min-h-screen flex flex-col bg-slate-50">
            <Header />
            <main className="flex-1 flex items-center justify-center p-6">
                <div className="w-full max-w-2xl bg-white border-4 border-gray-800 p-8 rounded-xl shadow-[10px_10px_0px_0px_rgba(31,41,55,1)]">
                    
                    <h1 className="text-3xl font-black text-gray-900 mb-2 uppercase italic">Únete a Baleartrek</h1>
                    <p className="text-gray-500 font-bold mb-6 uppercase text-xs tracking-widest">Crea tu cuenta de aventurero</p>

                    {error && (
                        <div className="mb-6 p-3 bg-red-100 border-2 border-red-600 text-red-700 font-bold rounded">
                            ⚠️ {error}
                        </div>
                    )}

                    <form onSubmit={(e) => handleSubmit(e, setError, navigate, userData)} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input 
                            type="text" placeholder="Nombre" 
                            className="p-3 border-2 border-gray-800 rounded font-bold outline-none focus:bg-emerald-50"
                            value={name} onChange={e => setName(e.target.value)} required 
                        />
                        <input 
                            type="text" placeholder="Apellidos" 
                            className="p-3 border-2 border-gray-800 rounded font-bold outline-none focus:bg-emerald-50"
                            value={lastname} onChange={e => setLastname(e.target.value)} required 
                        />
                        <input 
                            type="email" placeholder="Email" 
                            className="md:col-span-2 p-3 border-2 border-gray-800 rounded font-bold outline-none focus:bg-emerald-50"
                            value={email} onChange={e => setEmail(e.target.value)} required 
                        />
                        <input 
                            type="text" placeholder="DNI" 
                            className="p-3 border-2 border-gray-800 rounded font-bold outline-none focus:bg-emerald-50"
                            value={dni} onChange={e => setDni(e.target.value)} required 
                        />
                        <input 
                            type="tel" placeholder="Teléfono" 
                            className="p-3 border-2 border-gray-800 rounded font-bold outline-none focus:bg-emerald-50"
                            value={phone} onChange={e => setPhone(e.target.value)} required 
                        />
                        <input 
                            type="password" placeholder="Contraseña" 
                            className="p-3 border-2 border-gray-800 rounded font-bold outline-none focus:bg-emerald-50"
                            value={password} onChange={e => setPassword(e.target.value)} required 
                        />
                        <input 
                            type="password" placeholder="Confirmar Contraseña" 
                            className="p-3 border-2 border-gray-800 rounded font-bold outline-none focus:bg-emerald-50"
                            value={passwordConfirmation} onChange={e => setPasswordConfirmation(e.target.value)} required 
                        />
                        
                        <button 
                            type="submit"
                            className="md:col-span-2 mt-4 bg-emerald-400 text-black font-black py-4 border-2 border-gray-800 rounded shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all uppercase"
                        >
                            Registrarse ahora
                        </button>
                    </form>

                    <p className="mt-6 text-center font-bold text-sm text-gray-600">
                        ¿Ya tienes cuenta? <Link to="/login" className="text-emerald-600 underline">Inicia sesión</Link>
                    </p>
                </div>
            </main>
            <Footer />
        </div>
    );
}