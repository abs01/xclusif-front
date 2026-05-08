import { Link } from "react-router-dom";

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
            <svg viewBox="0 0 24 24" className="w-4 h-4 group-hover/btn:bg-blue-400/10 rounded-full" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
            </svg>
            <span>{post.comments.length}</span>
          </button>
          
          <button className="flex items-center gap-1.5 text-xs hover:text-pink-400 transition-colors">
            <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
            </svg>
            <span>{post.likes.length}</span>
          </button>
        </div>
      </div>
    </article>
  );
}