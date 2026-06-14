import { fetchPublicity } from "../services/fetches";
import { useState, useEffect } from "react";


export default function Publicidad() { 
     const [publicity, setPublicity] = useState("");
      const [loading, setLoading] = useState(true);
      const [error, setError] = useState(null);
      useEffect(() => {
        fetchPublicity(setPublicity, setLoading, setError);
      }, []);
    if (loading) return (
    <div className="bg-gray-800 text-white p-4 rounded-lg text-center animate-pulse">
        <h2 className="text-xl font-bold mb-2">Espacio de Publicidad</h2>
        <div className="h-4 bg-gray-600 rounded w-3/4 mx-auto"></div>
    </div>
);

    return (
        //file_path
        //content
        //publicity_url
        //company_name
        publicity ? <div>
            <h2 className="text-xl font-bold mb-2">Espacio de Publicidad</h2>
            <p className="text-sm mb-2">{publicity.content}</p>
            <a href={publicity.publicity_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                {publicity.company_name}
            </a>
            {publicity.file_path && (
                <img
                    src={"http://127.0.0.1:8000/images/" + publicity.file_path}
                    alt={publicity.company_name}
                    className="mt-2 max-w-full h-auto"
                />
            )}
        </div> :<div className="bg-gray-800 text-white p-4 rounded-lg text-center">
            <h2 className="text-xl font-bold mb-2">Espacio de Publicidad</h2>
            <p className="text-sm">COMPRA ESTO</p>
            <button className="mt-3 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded">Contáctanos</button>
        </div>

        
        
    );  
    
}