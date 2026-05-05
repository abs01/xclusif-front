import { useState, useEffect } from "react";
import CardPosts from "./CardPosts";
import { fetchPosts } from "../services/fetches";

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPosts(setPosts, setLoading, setError);
  }, []);

  return (
    <main>
      {loading && (
        <div className="flex flex-col items-center justify-center py-20 gap-4">
          <div className="w-6 h-6 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-500 text-sm font-medium">Cargando posts…</p>
        </div>
      )}

      {error && !loading && (
        <div className="m-4 p-5 border border-gray-800 rounded-2xl bg-gray-900/50 text-center">
          <p className="text-white font-bold mb-1">Inicia sesión para ver posts</p>
          <p className="text-gray-500 text-sm mb-4">{error}</p>
          <button
            onClick={() => fetchPosts(setPosts, setLoading, setError)}
            className="px-5 py-2 bg-white text-black font-bold text-sm rounded-full hover:bg-gray-200 transition-colors"
          >
            Reintentar
          </button>
        </div>
      )}

      {!loading && !error && (
        <>
          {posts.length > 0 ? (
            posts.map((post, i) => <CardPosts key={post.id || i} post={post} />)
          ) : (
            <div className="py-20 text-center text-gray-500 text-sm">
              No hay posts disponibles.
            </div>
          )}
        </>
      )}
    </main>
  );
}