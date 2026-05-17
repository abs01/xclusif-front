import { useState } from "react";
import { handleSubmitComment } from "../services/fetches";
export default function Comment({postId}) {
  const [commentText, setCommentText] = useState('');
  const [commentSuccess, setCommentSuccess] = useState(null);

  const handleCommentSubmit = (e) => {
    handleSubmitComment(e, postId, commentText, setCommentSuccess);
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">

      <div className="lg:ml-64 xl:ml-72 pe-50 min-h-screen border-x border-gray-800">
       
        <div className="p-4">
          {!commentSuccess && commentSuccess !== null && <p className="text-red-500">Error al publicar el comentario</p>}
          {commentSuccess !== null && (
            <p className={commentSuccess ? "text-green-500" : "text-red-500"}>
              {commentSuccess ? "Comentario publicado con éxito" : "Error al publicar el comentario"}
            </p>
          )}
          <form className="mb-4" onSubmit={handleCommentSubmit}>
            <textarea
                className="w-full p-2 bg-gray-900 border border-gray-800 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                placeholder="Escribe tu comentario..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
            />
            <button
                type="submit"
                className="mt-2 px-4 py-2 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-white font-bold text-sm rounded-lg transition-all shadow-lg hover:shadow-emerald-500/50"
            >
              Publicar
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}