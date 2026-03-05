import { useNavigate } from "react-router";
import { BookOpen, Sparkles } from "lucide-react";
import { PageHeader } from "../components/PageHeader";

export function Saved() {
  const navigate = useNavigate();

  return (
    <div className="pb-24">
      <PageHeader showBackButton title="Saved" />

      <div className="flex flex-col items-center justify-center px-8 py-24 text-center">
        <div className="relative mb-10 group">
          <div className="absolute inset-0 bg-[#00ff88]/10 rounded-full blur-3xl group-hover:bg-[#00ff88]/20 transition-all duration-700" />
          <div className="relative w-28 h-28 bg-white/5 rounded-[2.5rem] border border-white/10 flex items-center justify-center shadow-2xl overflow-hidden">
            <BookOpen size={48} className="text-[#00ff88]/20 group-hover:scale-110 transition-transform duration-500" strokeWidth={1} />
          </div>
        </div>

        <h2 className="text-sm font-black text-white uppercase tracking-widest mb-4 opacity-50">Archive Empty</h2>
        <p className="text-gray-500 text-[9px] font-bold uppercase tracking-widest leading-loose mb-10 max-w-[200px]">
          No culinary protocols have been <br />stored in your local database yet.
        </p>

        <button
          onClick={() => navigate("/")}
          className="group flex items-center gap-3 bg-[#00ff88] text-[#0f2e24] px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-[0_15px_30px_rgba(0,255,136,0.3)] active:scale-95 transition-all"
        >
          <Sparkles size={16} className="group-hover:rotate-12 transition-transform" strokeWidth={3} />
          <span>Execute Scanner</span>
        </button>
      </div>
    </div>
  );
}
