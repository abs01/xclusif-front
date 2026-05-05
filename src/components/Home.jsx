import { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Posts from "./Posts";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />

      {/* Main feed column — offset for sidebar on desktop, top bar on mobile */}
      <div className="lg:ml-64 xl:ml-72 lg:max-w-[600px] min-h-screen border-x border-gray-800">
        {/* Feed header */}
        <div className="sticky top-0 lg:top-0 mt-14 lg:mt-0 bg-black/80 backdrop-blur-md border-b border-gray-800 px-4 py-3 z-10">
          <h1 className="text-xl font-black text-white">Inicio</h1>
        </div>

        <Posts />
        <Footer />
      </div>
    </div>
  );
}

