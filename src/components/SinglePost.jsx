import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchPostById } from "../services/fetches";
import { GoComment } from "react-icons/go";
import { FaRegHeart } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa6";
import { likePost } from "../services/fetches";
import { checkUser } from "../services/fetches";
import Header from "./Header";
import Footer from "./Footer";
import Comment from "./Comment";
import { handleDeleteComment } from "../services/fetches";
import { FaTrash } from "react-icons/fa";
import {  RiUserUnfollowFill, RiUserFollowFill } from "react-icons/ri";
import { followUser } from "../services/fetches";
export default function SinglePost() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
    const [follow, setFollow] = useState(false);

  const [likes, setLikes] = useState(false);
  const [likesLength, setLikesLength] = useState(0);
  const [commentsLength, setCommentsLength] = useState(0);

  const [usersCache, setUsersCache] = useState([]);
   const accountData = JSON.parse(localStorage.getItem("account2")) || {};

  useEffect(() => {
    if (id) {
      fetchPostById(id, setPost, setLoading, setError);
    }
  }, [id]);
useEffect(() => {
  if (commentsLength != post?.comments?.length) {
    fetchPostById(id, setPost, setLoading, setError);
  }
}, [commentsLength]);

  useEffect(() => {
    if (post) {
      setLikesLength(post.likes.length);
      setCommentsLength(post.comments.length);
      setLikes(post.likes.some(like => like.user_id === JSON.parse(localStorage.getItem('account2'))?.user?.id));
    }
  }, [post]);

  useEffect(() => {    
    if (!post?.comments?.length) return;
    
    const newCache = new Array(post.comments.length).fill(null);
    const loadingUsers = new Set();
    
    post.comments.forEach((comment, index) => {
      if (!loadingUsers.has(comment.user_id)) {
        loadingUsers.add(comment.user_id);
        
        checkUser(comment.user_id).then(userData => {
          setUsersCache(prev => {
            const updated = [...prev];
            post.comments.forEach((c, i) => {
              if (c.user_id === comment.user_id) {
                updated[i] = userData;
              }
            });
            return updated;
          });
        });
      }
    });
    
    setUsersCache(newCache);
  }, [post?.comments?.length]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4 bg-black">
        <div className="w-6 h-6 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-gray-500 text-sm font-medium">Cargando post…</p>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-white font-bold mb-4">{error || "Post no encontrado"}</p>
          <Link 
            to="/" 
            className="px-5 py-2 bg-white text-black font-bold text-sm rounded-full hover:bg-gray-200 transition-colors inline-block"
          >
            Volver a posts
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-2xl mx-auto border-l border-r border-gray-800">
        {/* Header con botón volver */}
              <Header />
        

        {/* Post completo */}
        <article className="border-b border-gray-800 p-4">
          {/* Encabezado del post */}
          <div className="flex gap-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-gray-700 flex items-center justify-center text-lg font-bold text-gray-300 shrink-0">
              {String(post.user.name || "?").charAt(0).toUpperCase()}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="font-bold text-white">{post.user.name}</span>
                <span className="text-gray-500">@{post.user.email?.split('@')[0]}</span>
              </div>
              <p className="text-gray-500 text-sm">{new Date(post.created_at).toLocaleString()}</p>
            </div>

             <button className="flex items-center gap-2 hover:text-blue-400 transition-colors group flex-1 justify-center py-2">
              {follow ? (
                <RiUserUnfollowFill
                  className="w-4 h-4 text-red-400" 
                  onClick={() => { 
                    setFollow(false);
                    followUser(false, post.user.id);
                  }} 
                />
              ) : (
                <RiUserFollowFill 
                  className="w-4 h-4 text-blue-400" 
                  onClick={() => { 
                    setFollow(true);
                    followUser(true, post.user.id);
                  }} 
                
                  
                />
              )}
              <span className="text-sm">Seguir</span>
            </button>
          </div>

          {/* Contenido del post */}
          <p className="text-xl leading-relaxed mb-4 break-words">{post.content}</p>
          {/* Imagen del post */}
          {post.media && (
            <img src={"http://127.0.0.1:8000/images/"+post.media.file_path} alt="Imagen del post" className="w-full h-auto rounded-lg mb-4" />
          )}

          {/* Estadísticas */}
          <div className="flex gap-6 py-4 border-t border-gray-800 text-gray-500 text-sm mb-4">
            <div className="hover:text-blue-400 cursor-pointer">
              <span className="font-bold text-white">{commentsLength}</span> comentarios
            </div>
            <div className="hover:text-pink-400 cursor-pointer">
              <span className="font-bold text-white">{likesLength}</span> me gusta
            </div>
          </div>

          {/* Botones de interacción */}
          <div className="flex items-center gap-6 py-3 border-y border-gray-800 text-gray-500">
            <button className="flex items-center gap-2 hover:text-blue-400 transition-colors group flex-1 justify-center py-2">
              <GoComment className="w-4 h-4" />
              <span className="text-sm">Comentar</span>
            </button>
            <button className="flex items-center gap-2 hover:text-pink-400 transition-colors group flex-1 justify-center py-2">
              {likes ? (
                <FaHeart 
                  className="w-4 h-4 text-pink-400" 
                  onClick={() => { 
                    setLikes(false); 
                    likePost(false, post.id, post.likes[post.likes.length - 1]?.id); 
                    setLikesLength(likesLength - 1); 
                  }} 
                />
              ) : (
                <FaRegHeart 
                  className="w-4 h-4" 
                  onClick={() => { 
                    setLikes(true); 
                    likePost(true, post.id); 
                    setLikesLength(likesLength + 1); 
                  }} 
                />
              )}
              <span className="text-sm">Me gusta</span>
            </button>
          </div>
        </article>

        {/* Lista de comentarios */}
        <div>
          {
            post.comments.map((comment, index) => {
              const user = usersCache[index] || null;
              return (
                <article key={comment.id} className="flex gap-3 px-4 py-4 border-b border-gray-800 hover:bg-gray-900/40 transition-colors">
                  <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center text-sm font-bold text-gray-300 shrink-0">
                    {String(user?.name || "?").charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white text-sm">{user?.name || "Cargando..."}</span>
                      <span className="text-gray-500 text-sm">@{user?.email?.split('@')[0] || "..."}</span>
                      <span className="text-gray-600 text-sm">·</span>
                      <span className="text-gray-500 text-xs">{new Date(comment.created_at).toLocaleString()}</span>
                    </div>
                    <p className="text-gray-100 text-sm leading-relaxed break-words mt-2">{comment.content}</p>
                  </div>
                  {accountData.user?.id === comment.user_id && (
                    <button className="text-red-500 text-xs hover:text-red-700 transition-colors" onClick={(e) => {
                      if (window.confirm('¿Estás seguro de que quieres eliminar este comentario?')) {
                        handleDeleteComment(e, comment.id);
                        setCommentsLength(commentsLength - 1);
                      }
                    }}>
                      <FaTrash className="w-4 h-4" />
                    </button>
                  )}
                 
                </article>
              );
            })
          
          }
        </div>

        
      </div>
          <Comment postId={post.id} commentsLength={commentsLength} setCommentLength={setCommentsLength} />

      <Footer />
    </div>
  );
}
