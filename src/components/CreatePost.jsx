import { useState } from "react";
import { handleSubmitPost } from "../services/fetches";
import Header from "./Header";
import Footer from "./Footer";

export default function CreatePost() {
  const [postContent, setPostContent] = useState('');
  const [postSuccess, setPostSuccess] = useState(null);

 

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Header />

      <div className="lg:ml-64 xl:ml-72 pe-50 min-h-screen border-x border-gray-800">
       
        <div className="p-4">
            {!postSuccess && postSuccess !== null && <p className="text-red-500">Error al publicar el post</p>}
          <form className="mb-4" onSubmit={(e) => handleSubmitPost(e, postContent, setPostSuccess)}>
            <textarea
                className="w-full p-2 bg-gray-900 border border-gray-800 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                placeholder="Escribe tu post..."
                value={postContent}
                onChange={(e) => setPostContent(e.target.value)}
            />
            <button
                type="submit"
                className="mt-2 px-4 py-2 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-white font-bold text-sm rounded-lg transition-all shadow-lg hover:shadow-emerald-500/50"
            >
              Publicar
            </button>
          </form>
        </div>
        <Footer />

      </div>
    </div>
  );
}