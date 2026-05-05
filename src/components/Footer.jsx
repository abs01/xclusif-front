import { Link } from "react-router-dom";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-gray-800 mt-auto px-4 py-6">
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-gray-500">
        <div className="flex flex-wrap gap-3">
          {[
            { label: "FAQ", path: "/FAQ" },
            { label: "Contacto", path: "/contact" },
          ].map((l) => (
            <Link key={l.label} to={l.path} className="hover:text-gray-300 transition-colors">
              {l.label}
            </Link>
          ))}
        </div>
        <div className="text-right">
          <p>© {currentYear} <span className="text-gray-300 font-semibold">Xclusif</span></p>
          <p className="mt-0.5">by <span className="text-gray-300">Antoni Xavier Bascuñana Sánchez</span></p>
        </div>
      </div>
    </footer>
  );
}