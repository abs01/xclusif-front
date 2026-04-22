import { useState } from "react";
import { logout, update } from "../services/fetches";
import Header from "./Header";
import Footer from "./Footer";
import { handleUpdate } from "../services/fetches";
import { handleChange } from "../services/fetches";
import { disableAccount } from "../services/fetches";
export default function Account() {
    const accountData = JSON.parse(localStorage.getItem('account2')) || {};
    const user = accountData.user || {};

    const [formData, setFormData] = useState({
        name: user.name || '',
        lastname: user.lastname || '',
        email: user.email || '',
        dni: user.dni || '',
        phone: user.phone || '',
        password: '',
        password_confirmation: ''
    });

    const [status, setStatus] = useState(null);

    const confirmDelete = (e) => {
        e.preventDefault();
        const confirmacion = window.confirm(
            "⚠️ ¿Estás COMPLETAMENTE seguro? Esta acción es irreversible y perderás todos tus datos en Baleartrek."
        );
        if (confirmacion) {
            disableAccount(e);
        }
    };
    return (
        <div className="min-h-screen flex flex-col bg-slate-50">
            <Header />

            <main className="flex-1 max-w-4xl mx-auto px-4 py-12 w-full">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    
                    {/* Columna Izquierda: Información de Perfil */}
                    <div className="md:col-span-1">
                        <div className="bg-white border-2 border-gray-800 p-6 rounded-lg shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                            <div className="w-20 h-20 bg-emerald-100 border-2 border-gray-800 rounded-full flex items-center justify-center text-3xl mb-4 mx-auto md:mx-0">
                                👤
                            </div>
                            <h2 className="text-xl font-black text-gray-900 uppercase tracking-tight">Mi Perfil</h2>
                            <p className="text-sm font-bold text-emerald-600 mb-4 tracking-widest uppercase">{user.role || 'Senderista'}</p>
                            
                            <div className="space-y-2 border-t-2 border-gray-100 pt-4">
                                <p className="text-xs font-bold text-gray-400 uppercase">Nombre Completo</p>
                                <p className="font-bold text-gray-800">{user.name} {user.lastname}</p>
                                
                                <p className="text-xs font-bold text-gray-400 uppercase mt-2">DNI</p>
                                <p className="font-mono text-sm">{user.dni}</p>
                            </div>

                            <button 
                                onClick={logout}
                                className="w-full mt-8 bg-red-100 text-red-600 font-bold py-2 border-2 border-red-600 rounded shadow-[3px_3px_0px_0px_rgba(220,38,38,1)] active:shadow-none active:translate-x-1 active:translate-y-1 transition-all"
                            >
                                Cerrar Sesión
                            </button>
                        </div>
                    </div>

                    {/* Columna Derecha: Formulario de Actualización */}
                    <div className="md:col-span-2">
                        <div className="bg-white border-2 border-gray-800 p-8 rounded-lg shadow-[6px_6px_0px_0px_rgba(31,41,55,1)]">
                            <h1 className="text-2xl font-black text-gray-900 mb-6 uppercase">Actualizar Datos</h1>
                            
                            <form onSubmit={(e) => handleUpdate(e, formData, setStatus, update)} className="space-y-6">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="flex flex-col gap-2">
                                        <label className="text-xs font-black uppercase text-gray-700">Nombre</label>
                                        <input
                                            className="p-3 border-2 border-gray-800 rounded font-medium focus:ring-2 focus:ring-emerald-400 outline-none"
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={(e) => handleChange(e, setFormData, formData)}
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label className="text-xs font-black uppercase text-gray-700">Apellidos</label>
                                        <input
                                            className="p-3 border-2 border-gray-800 rounded font-medium focus:ring-2 focus:ring-emerald-400 outline-none"
                                            type="text"
                                            name="lastname"
                                            value={formData.lastname}
                                            onChange={(e) => handleChange(e, setFormData, formData)}
                                        />
                                    </div>
                                </div>

                                <div className="flex flex-col gap-2">
                                    <label className="text-xs font-black uppercase text-gray-700">Email</label>
                                    <input
                                        className="p-3 border-2 border-gray-800 rounded font-medium outline-none"
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={(e) => handleChange(e, setFormData, formData)}
                                    />
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="flex flex-col gap-2">
                                        <label className="text-xs font-black uppercase text-gray-700">DNI</label>
                                        <input
                                            className="p-3 border-2 border-gray-800 rounded font-medium outline-none"
                                            type="text"
                                            name="dni"
                                            value={formData.dni}
                                            onChange={(e) => handleChange(e, setFormData, formData)}
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label className="text-xs font-black uppercase text-gray-700">Teléfono</label>
                                        <input
                                            className="p-3 border-2 border-gray-800 rounded font-medium outline-none"
                                            type="text"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={(e) => handleChange(e, setFormData, formData)}
                                        />
                                    </div>
                                </div>

                                <div className="pt-4 border-t-2 border-gray-800">
                                    <p className="text-[10px] font-bold text-gray-400 uppercase mb-4 tracking-widest">Cambiar Contraseña (opcional)</p>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <input
                                            placeholder="Nueva contraseña"
                                            className="p-3 border-2 border-gray-800 rounded font-medium outline-none"
                                            type="password"
                                            name="password"
                                            value={formData.password}
                                            onChange={(e) => handleChange(e, setFormData, formData)}
                                        />
                                        <input
                                            placeholder="Confirmar contraseña"
                                            className="p-3 border-2 border-gray-800 rounded font-medium outline-none"
                                            type="password"
                                            name="password_confirmation"
                                            value={formData.password_confirmation}
                                            onChange={(e) => handleChange(e, setFormData, formData)}
                                        />
                                    </div>
                                </div>

                                {status === 'success' && (
                                    <div className="p-3 bg-emerald-100 border-2 border-emerald-500 text-emerald-700 font-bold rounded">
                                        ✅ Perfil actualizado correctamente
                                    </div>
                                )}
                                {status === 'error' && (
                                    <div className="p-3 bg-red-100 border-2 border-red-500 text-red-700 font-bold rounded">
                                        ❌ Error al actualizar. Revisa los datos.
                                    </div>
                                )}

                                <button 
                                    type="submit"
                                    className="w-full bg-emerald-500 text-black font-black py-4 border-2 border-gray-800 rounded shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all uppercase tracking-widest"
                                >
                                    Guardar Cambios
                                </button>
                            </form>

                           <div className="mt-12 pt-8 border-t-4 border-red-100">
                                <h3 className="text-red-600 font-black uppercase text-sm mb-4">Zona de Peligro</h3>
                                <button 
                                    onClick={confirmDelete}
                                    className="w-full bg-red-600 text-black font-black py-4 border-2 border-gray-800 rounded shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-red-700 hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all uppercase tracking-widest"
                                >
                                    Borrar Cuenta Definitivamente
                                </button>
                            </div>

                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}