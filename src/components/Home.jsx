import { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Posts from "./Posts";
import { fetchPosts, fetchFollowingPosts } from "../services/fetches";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("all"); // "all" or "following"

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />

      {/* Main feed column — offset for sidebar on desktop, top bar on mobile */}
      <div className="lg:ml-64 xl:ml-72 pe-50 min-h-screen border-x border-gray-800">
        {/* Feed header */}
        <div className="sticky top-0 lg:top-0 mt-14 lg:mt-0 bg-black/80 backdrop-blur-md border-b border-gray-800 px-4 py-3 z-10">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-black text-white">Inicio</h1>
            <div className="flex gap-2">
              <button
                onClick={() => setFilter("all")}
                className={`px-4 py-2 rounded-full font-bold transition-colors ${
                  filter === "all"
                    ? "bg-emerald-500 text-black"
                    : "bg-gray-800 text-white hover:bg-gray-700"
                }`}
              >
                Todos
              </button>
              <button
                onClick={() => setFilter("following")}
                className={`px-4 py-2 rounded-full font-bold transition-colors ${
                  filter === "following"
                    ? "bg-emerald-500 text-black"
                    : "bg-gray-800 text-white hover:bg-gray-700"
                }`}
              >
                Siguiendo
              </button>
            </div>
          </div>
        </div>

        <Posts fetchFunction={filter === "following" ? fetchFollowingPosts : fetchPosts} />
        <Footer />
      </div>
    </div>
  );
}

