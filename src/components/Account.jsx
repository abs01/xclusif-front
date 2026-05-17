import { useState } from "react";
import { logout, handleUpdate, handleChange, disableAccount } from "../services/fetches";
import Header from "./Header";
import Footer from "./Footer";

export default function Account() {
  const accountData = JSON.parse(localStorage.getItem("account2")) || {};
  const user = accountData.user || {};
  const [formData, setFormData] = useState({
    name: user.name || "",
    lastname: user.lastname || "",
    email: user.email || "",
    dni: user.dni || "",
    phone: user.phone || "",
    password: "",
    tier_id: user.tier_id || 1,
    password_confirmation: "",
    
  });

  const [status, setStatus] = useState(null);

  const confirmDelete = (e) => {
    e.preventDefault();
    if (window.confirm("⚠️ ¿Estás COMPLETAMENTE seguro? Esta acción es irreversible.")) {
      disableAccount(e);
    }
  };
   
const confirmFree = (e) => {
  e.preventDefault();

  if (
    window.confirm(
      "⚠️ ¿Estás COMPLETAMENTE seguro? Esta acción es irreversible y cambiará tu tier al gratuito. Empezarás a ver publicidad en la plataforma."
    )
  ) {
    setFormData((prev) => ({
      ...prev,
      tier_id: 1,
    }));

    console.log("Nuevo tier:", 1);
  }
};

const confirmGold = (e) => {
  e.preventDefault();

  if (
    window.confirm(
      "⚠️ ¿Estás COMPLETAMENTE seguro? Esta acción es irreversible y cambiará tu tier al oro."
    )
  ) {
    setFormData((prev) => ({
      ...prev,
      tier_id: 2,
    }));

    console.log("Nuevo tier:", 2);
  }
};

const confirmDiamond = (e) => {
  e.preventDefault();

  if (
    window.confirm(
      "⚠️ ¿Estás COMPLETAMENTE seguro? Esta acción es irreversible y cambiará tu tier al diamante."
    )
  ) {
    setFormData((prev) => ({
      ...prev,
      tier_id: 3,
    }));

    console.log("Nuevo tier:", 3);
  }
};
  const inputClass = "w-full px-4 py-3 bg-transparent border border-gray-700 rounded-xl text-white placeholder-gray-600 text-sm focus:outline-none focus:border-emerald-500 transition-colors";
  const labelClass = "block text-xs font-bold text-gray-400 mb-1.5 uppercase tracking-wide";

  return (
    console.log(user),
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Header />

      <div className="lg:ml-64 xl:ml-72 pe-50 min-h-screen border-x border-gray-800">
        {/* Page Header */}
        <div className="sticky top-0 lg:top-0 mt-14 lg:mt-0 bg-black/80 backdrop-blur-md border-b border-gray-800 px-4 py-3 z-10 flex items-center gap-4">
          <button onClick={() => window.history.back()} className="p-2 rounded-full hover:bg-gray-900 transition-colors">
            <svg viewBox="0 0 24 24" className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
          </button>
          <div>
            <h1 className="text-xl font-black text-white leading-none">Mi Cuenta</h1>
            <p className="text-gray-500 text-xs mt-0.5">{user.name} {user.lastname}</p>
          </div>
        </div>

        {/* Profile Banner */}
        <div className="relative">
          <div className="h-32 bg-gradient-to-r from-emerald-900/60 to-gray-900" />
          <div className="px-4 pb-4">
            <div className="relative -mt-10 flex items-end justify-between mb-4">
              <div className="w-20 h-20 rounded-full bg-gray-700 border-4 border-black flex items-center justify-center text-3xl">👤</div>
              <button
                onClick={logout}
                className="px-5 py-2 border border-gray-600 text-white text-sm font-bold rounded-full hover:bg-gray-900 transition-colors"
              >
                Cerrar sesión
              </button>
            </div>
            <h2 className="text-xl font-black text-white">{user.name} {user.lastname}</h2>
            <p className="text-gray-500 text-sm">@xclusif · <span className="text-emerald-500">{user.role || "Sin rol"}</span></p>
            <p className="text-gray-500 text-sm mt-1 font-mono">{user.dni}</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-800 px-4 pb-0">
          <div className="flex">
            <span className="py-3 px-4 text-sm font-bold text-white border-b-2 border-emerald-500">Editar perfil</span>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={(e) => handleUpdate(e, formData, setStatus)} className="px-4 py-6 space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Nombre</label>
              <input className={inputClass} type="text" name="name" value={formData.name} onChange={(e) => handleChange(e, setFormData, formData)} />
            </div>
            <div>
              <label className={labelClass}>Apellidos</label>
              <input className={inputClass} type="text" name="lastname" value={formData.lastname} onChange={(e) => handleChange(e, setFormData, formData)} />
            </div>
          </div>

          <div>
            <label className={labelClass}>Email</label>
            <input className={inputClass} type="email" name="email" value={formData.email} onChange={(e) => handleChange(e, setFormData, formData)} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>DNI</label>
              <input className={inputClass} type="text" name="dni" value={formData.dni} onChange={(e) => handleChange(e, setFormData, formData)} />
            </div>
            <div>
              <label className={labelClass}>Teléfono</label>
              <input className={inputClass} type="text" name="phone" value={formData.phone} onChange={(e) => handleChange(e, setFormData, formData)} />
            </div>
          </div>

          <div className="pt-4 border-t border-gray-800">
            <p className="text-xs text-gray-500 uppercase font-bold tracking-widest mb-4">Cambiar contraseña (opcional)</p>
            <div className="grid grid-cols-2 gap-4">
              <input className={inputClass} placeholder="Nueva contraseña" type="password" name="password" value={formData.password} onChange={(e) => handleChange(e, setFormData, formData)} />
              <input className={inputClass} placeholder="Confirmar" type="password" name="password_confirmation" value={formData.password_confirmation} onChange={(e) => handleChange(e, setFormData, formData)} />
            </div>
          </div>

          {status === "success" && (
            <div className="px-4 py-3 bg-emerald-900/40 border border-emerald-500/50 text-emerald-400 text-sm font-medium rounded-xl">
              ✅ Perfil actualizado correctamente
            </div>
          )}
          {status === "error" && (
            <div className="px-4 py-3 bg-red-900/40 border border-red-500/50 text-red-400 text-sm font-medium rounded-xl">
              ❌ Error al actualizar. Revisa los datos.
            </div>
          )}
           <div className="px-4 pb-8 border-t border-gray-800 pt-6">
          <p className="text-yellow-500 text-xs font-bold uppercase tracking-widest mb-3">Tiers</p>
          <button
            onClick={confirmFree}
            className="w-full mt-4 py-3 bg-transparent border border-gray-600 text-gray-500 hover:bg-gray-600/10 font-bold text-sm rounded-full transition-colors"
          >
            Cambiar a tier gratuito
          </button>
          <button
            onClick={confirmGold}
            className="w-full mt-4 py-3 bg-transparent border border-gray-600 text-gray-500 hover:bg-gray-600/10 font-bold text-sm rounded-full transition-colors"
          >
            Cambiar a oro
          </button>
          <button
            onClick={confirmDiamond}
            className="w-full mt-4 py-3 bg-transparent border border-gray-600 text-gray-500 hover:bg-gray-600/10 font-bold text-sm rounded-full transition-colors"
          >
            Cambiar a diamante
          </button>
        </div>
          <button
            type="submit"
            className="w-full py-3 bg-white hover:bg-gray-100 text-black font-black text-sm rounded-full transition-colors"
          >
            Guardar cambios
          </button>
        </form>

       
        {/* Danger Zone */}
        <div className="px-4 pb-8 border-t border-gray-800 pt-6">
          <p className="text-red-500 text-xs font-bold uppercase tracking-widest mb-3">Zona de peligro</p>
          <button
            onClick={confirmDelete}
            className="w-full py-3 bg-transparent border border-red-600 text-red-500 hover:bg-red-600/10 font-bold text-sm rounded-full transition-colors"
          >
            Borrar cuenta definitivamente
          </button>
        </div>

        <Footer />
      </div>
    </div>
  );
}