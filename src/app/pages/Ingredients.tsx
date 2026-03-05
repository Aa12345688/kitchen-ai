import { useNavigate } from "react-router";
import { Sparkles, Trash2, Plus } from "lucide-react";
import { PageHeader } from "../components/PageHeader";
import { useIngredients } from "../services/IngredientContext";
import { DetectionRow } from "../components/ingredients/DetectionRow";
import { DetectionSummary } from "../components/ingredients/DetectionSummary";

export function Ingredients() {
  const navigate = useNavigate();
  const { scannedItems, updateQuantity, removeItem, clearAll } = useIngredients();

  return (
    <div className="pb-32">
      <PageHeader
        showBackButton
        title="辨識結果"
        rightAction={
          <button
            onClick={clearAll}
            className="p-2 sm:p-2.5 bg-red-500/10 hover:bg-red-500 hover:text-white transition-all rounded-2xl border border-red-500/10 text-red-500"
          >
            <Trash2 size={20} className="stroke-[2.5]" />
          </button>
        }
      />

      <DetectionSummary itemCount={scannedItems.length} />

      <div className="px-6 py-6">
        <h2 className="text-[11px] font-black text-white/30 uppercase tracking-[0.2em] mb-6 px-1 flex items-center gap-2">
          <div className="w-1 h-1 rounded-full bg-[#00ff88]" />
          掃描快取紀錄
        </h2>

        {scannedItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center bg-white/5 rounded-[3.5rem] border border-white/5">
            <div className="relative mb-8 group">
              <div className="absolute inset-0 bg-[#00ff88]/5 rounded-full blur-3xl group-hover:bg-[#00ff88]/10 transition-all duration-700" />
              <div className="relative w-24 h-24 bg-[#1a4d3d]/50 rounded-[2rem] border border-white/10 flex items-center justify-center shadow-2xl overflow-hidden group-hover:scale-105 transition-transform">
                <Plus size={40} className="text-[#00ff88]/20 group-hover:text-[#00ff88]/40 transition-colors" />
              </div>
            </div>
            <h3 className="text-sm font-black text-white/30 uppercase tracking-widest mb-4">目前無數據暫存</h3>
            <button
              onClick={() => navigate("/")}
              className="flex items-center gap-3 bg-[#00ff88] text-[#0f2e24] px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-xl active:scale-95 transition-all"
            >
              啟動感測器
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {scannedItems.map((item) => (
              <DetectionRow
                key={item.id}
                item={item}
                onUpdate={updateQuantity}
                onRemove={removeItem}
              />
            ))}
          </div>
        )}
      </div>

      {scannedItems.length > 0 && (
        <div className="fixed bottom-24 left-0 right-0 px-6 z-40 pointer-events-none">
          <button
            onClick={() => navigate("/recipes")}
            className="w-full max-w-lg mx-auto bg-[#00ff88] text-[#0f2e24] py-5 rounded-2xl font-black text-sm uppercase tracking-[0.2em] shadow-[0_15px_35px_rgba(0,255,136,0.3)] active:scale-95 transition-all flex items-center justify-center gap-3 relative pointer-events-auto overflow-hidden group"
          >
            <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-out" />
            <Sparkles size={20} strokeWidth={3} className="relative z-10" />
            <span className="relative z-10">執行 AI 合成</span>
          </button>
        </div>
      )}
    </div>
  );
}
