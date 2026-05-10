import { Link } from "react-router-dom";
import { GoComment } from "react-icons/go";
import { FaRegHeart } from "react-icons/fa6";
export default function CardPosts({ post }) {
  return (
    <article className="flex gap-4 px-4 py-4 border-b border-gray-800 hover:bg-gray-900/40 transition-colors cursor-pointer group">
      {/* Avatar */}
      <div className="shrink-0">
        <script>console.log(post)</script>
        <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center text-sm font-bold text-gray-300">
          {String(post.user.name || "?").charAt(0).toUpperCase()}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5 mb-0.5 flex-wrap">
          <span className="font-bold text-white text-sm hover:underline">{post.user.name}</span>
          <span className="text-gray-600 text-sm">·</span>
          <span className="text-gray-500 text-xs">{new Date(post.created_at).toLocaleString()}</span>          
        </div>

        <p className="text-gray-100 text-sm leading-relaxed break-words">{post.content}</p>

        <div className="flex items-center gap-6 mt-2 text-gray-500">
          <button className="flex items-center gap-1.5 text-xs hover:text-blue-400 transition-colors group/btn">
            <GoComment className="w-4 h-4" />
            <span>{post.comments.length}</span>
          </button>
          
          <button className="flex items-center gap-1.5 text-xs hover:text-pink-400 transition-colors">
            <FaRegHeart className="w-4 h-4" />
            <span>{post.likes.length}</span>
          </button>
        </div>
      </div>
    </article>
  );
}