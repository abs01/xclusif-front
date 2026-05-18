import { useState } from "react";
import { handleSubmitPost } from "../services/fetches";
import Header from "./Header";
import Footer from "./Footer";

export default function CreatePost() {
  const [postContent, setPostContent] = useState('');
  const [postSuccess, setPostSuccess] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImageFile(file);
    setPreview(URL.createObjectURL(file));
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Header />

      <div className="lg:ml-64 xl:ml-72 pe-50 min-h-screen border-x border-gray-800">
        <div className="p-4">
          {postSuccess && (
            <p className={postSuccess.includes('éxito') ? 'text-emerald-500' : 'text-red-500'}>
              {postSuccess}
            </p>
          )}
          <form className="mb-4" onSubmit={(e) => handleSubmitPost(e, postContent, imageFile, setPostSuccess)}>
            <textarea
              className="w-full p-2 bg-gray-900 border border-gray-800 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              placeholder="Escribe tu post..."
              value={postContent}
              onChange={(e) => setPostContent(e.target.value)}
            />

            <input
              type="file"
              accept="image/jpeg,image/jpg,image/bmp,image/png"
              onChange={handleImageChange}
              className="mt-2 text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-emerald-500 file:text-white hover:file:bg-emerald-600"
            />

            {/* Preview de la imagen */}
            {preview && (
              <div className="mt-2 relative w-fit">
                <img src={preview} alt="Preview" className="max-h-48 rounded-lg border border-gray-700" />
                <button
                  type="button"
                  onClick={() => { setImageFile(null); setPreview(null); }}
                  className="absolute top-1 right-1 bg-black/70 text-white rounded-full w-6 h-6 text-xs hover:bg-red-600"
                >
                  ✕
                </button>
              </div>
            )}

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