import { Activity, Package } from "lucide-react";

interface DetectionSummaryProps {
    itemCount: number;
}

export function DetectionSummary({ itemCount }: DetectionSummaryProps) {
    return (
        <div className="grid grid-cols-2 gap-4 px-6 py-4">
            <div className="bg-[#1a4d3d]/30 backdrop-blur-xl border border-white/5 rounded-[2.5rem] p-6 shadow-2xl relative overflow-hidden group">
                <Activity className="absolute top-5 right-5 text-[#00ff88]/20 animate-pulse" size={20} />
                <div className="text-3xl font-black text-[#00ff88] mb-1">{itemCount}</div>
                <div className="text-[10px] font-black text-gray-500 uppercase tracking-widest opacity-60">
                    神經元節點
                </div>
            </div>

            <div className="bg-[#1a4d3d]/30 backdrop-blur-xl border border-white/5 rounded-[2.5rem] p-6 shadow-2xl relative group overflow-hidden">
                <Package className="absolute -top-4 -right-4 text-[#00ff88]/5 group-hover:text-[#00ff88]/10 transition-transform duration-500" size={80} strokeWidth={1} />
                <div className="text-3xl font-black text-white mb-1">
                    {itemCount > 0 ? "穩定" : "閒置"}
                </div>
                <div className="text-[10px] font-black text-gray-500 uppercase tracking-widest opacity-60">
                    鏈結狀態
                </div>
            </div>
        </div>
    );
}
