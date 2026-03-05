import { useNavigate } from "react-router";
import { User, Settings, HelpCircle, LogOut, ChevronRight, Sparkles } from "lucide-react";
import { PageHeader } from "../components/PageHeader";

export function Profile() {
  const navigate = useNavigate();

  const menuItems = [
    { icon: Settings, label: "Settings", onClick: () => { } },
    { icon: HelpCircle, label: "Help & Support", onClick: () => { } },
    { icon: LogOut, label: "Log Out", onClick: () => { } },
  ];

  return (
    <div className="pb-24">
      <PageHeader showBackButton title="Profile" />

      <div className="px-6 py-8">
        {/* User Info */}
        <div className="flex flex-col items-center mb-10 group">
          <div className="relative mb-6">
            <div className="absolute inset-0 bg-[#00ff88]/10 rounded-full blur-2xl group-hover:bg-[#00ff88]/20 transition-all duration-700" />
            <div className="relative w-28 h-28 rounded-full bg-[#1a4d3d] border-4 border-[#00ff88]/20 flex items-center justify-center shadow-2xl overflow-hidden">
              <User size={48} className="text-[#00ff88]" strokeWidth={1} />
            </div>
            <div className="absolute bottom-1 right-1 w-7 h-7 bg-[#00ff88] rounded-xl flex items-center justify-center shadow-lg border-2 border-[#0f2e24]">
              <div className="w-1.5 h-1.5 rounded-full bg-[#0f2e24] animate-pulse" />
            </div>
          </div>
          <h2 className="text-lg font-black text-white uppercase tracking-tight mb-2 group-hover:text-[#00ff88] transition-colors">AI Chef Protocol</h2>
          <p className="text-[9px] text-gray-500 font-black uppercase tracking-widest">System Status: Optimized</p>
        </div>

        {/* Stats Dashboard */}
        <div className="grid grid-cols-3 gap-3 mb-10">
          <div className="text-center p-5 bg-[#1a4d3d]/30 border border-white/5 rounded-[2rem] shadow-xl backdrop-blur-sm">
            <div className="text-xl font-black text-[#00ff88] mb-1">12</div>
            <div className="text-[7px] font-black text-white/40 uppercase tracking-widest">Recipes</div>
          </div>
          <div className="text-center p-5 bg-[#1a4d3d]/30 border border-white/5 rounded-[2rem] shadow-xl backdrop-blur-sm">
            <div className="text-xl font-black text-[#00ff88] mb-1">45%</div>
            <div className="text-[7px] font-black text-white/40 uppercase tracking-widest leading-tight">Waste Saved</div>
          </div>
          <div className="text-center p-5 bg-[#1a4d3d]/30 border border-white/5 rounded-[2rem] shadow-xl backdrop-blur-sm">
            <div className="text-xl font-black text-[#00ff88] mb-1">8</div>
            <div className="text-[7px] font-black text-white/40 uppercase tracking-widest">Days Active</div>
          </div>
        </div>

        {/* Menu Selection */}
        <div className="space-y-2 mb-10">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <button
                key={index}
                onClick={item.onClick}
                className="w-full flex items-center gap-4 p-4 bg-white/5 rounded-[1.5rem] border border-white/5 hover:border-[#00ff88]/20 transition-all group active:scale-[0.98]"
              >
                <div className="w-9 h-9 rounded-xl bg-[#0f2e24] flex items-center justify-center border border-white/10 group-hover:border-[#00ff88]/40 transition-colors">
                  <Icon size={18} className="text-gray-400 group-hover:text-[#00ff88] transition-colors" />
                </div>
                <span className="flex-1 text-left text-[10px] font-black text-white uppercase tracking-widest group-hover:text-[#00ff88] transition-colors">
                  {item.label}
                </span>
                <ChevronRight size={16} className="text-gray-600 group-hover:text-[#00ff88] transition-all transform group-hover:translate-x-1" />
              </button>
            );
          })}
        </div>

        {/* System Protocols */}
        <div className="bg-[#1a4d3d]/20 rounded-[2.5rem] p-8 border border-[#00ff88]/20 relative overflow-hidden shadow-2xl">
          <div className="flex items-center gap-3 mb-6 relative">
            <div className="w-9 h-9 rounded-xl bg-[#00ff88]/10 flex items-center justify-center border border-[#00ff88]/30">
              <Sparkles size={18} className="text-[#00ff88]" strokeWidth={2.5} />
            </div>
            <div>
              <h3 className="font-black text-xs text-white uppercase tracking-widest">Infrastructure</h3>
              <div className="text-[8px] font-bold text-[#00ff88]/60 uppercase tracking-widest">AI Core Optimized</div>
            </div>
          </div>

          <div className="flex items-center gap-4 py-4 px-6 bg-[#0f2e24] rounded-2xl border border-white/5 shadow-inner">
            <div className="w-2 h-2 rounded-full bg-[#00ff88] shadow-[0_0_10px_#00ff88] animate-pulse" />
            <div className="flex-1">
              <p className="text-[9px] font-black text-white uppercase tracking-widest">Neural Link: ACTIVE</p>
              <p className="text-[7px] font-bold text-gray-600 uppercase tracking-tight">Backend Configured Service</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
