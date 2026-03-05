import { useNavigate } from "react-router";
import { Camera, Sparkles, X, Plus, Minus, Package } from "lucide-react";
import { useState } from "react";
import { PageHeader } from "../components/PageHeader";
import { useIngredients } from "../services/IngredientContext";
import { formatRelativeTime } from "../services/timeUtils";
import { useCamera } from "../hooks/useCamera";
import { CameraView } from "../components/scanner/CameraView";

export function Scanner() {
  const navigate = useNavigate();
  const { scannedItems, addItem, updateQuantity, removeItem, clearAll } = useIngredients();
  const { videoRef } = useCamera();

  const [isScanning, setIsScanning] = useState(false);
  const [showList, setShowList] = useState(false);
  const [showFrames, setShowFrames] = useState(false);

  const handleScan = () => {
    setIsScanning(true);
    setShowFrames(false);
    setTimeout(() => {
      const detectedItems = [
        { name: "番茄", quantity: 3 },
        { name: "菠菜", quantity: 2 },
      ];
      detectedItems.forEach(item => addItem(item));
      setIsScanning(false);
      setShowFrames(true);
      setShowList(true);
    }, 2000);
  };

  return (
    <div className="pb-24">
      <PageHeader title="廚房 AI 掃描" />

      <div className="flex flex-col items-center justify-center px-6 py-4">
        <CameraView
          videoRef={videoRef}
          isScanning={isScanning}
          showFrames={showFrames}
        />

        <p className="text-center text-gray-400 text-xs mt-8 px-10 leading-relaxed uppercase tracking-widest font-medium opacity-60">
          將鏡頭對準食材<br />AI 將自動辨識並建議食譜
        </p>

        <div className="w-full max-w-sm mt-8 space-y-3 px-2">
          <button
            onClick={handleScan}
            disabled={isScanning}
            className="w-full bg-[#00ff88] text-[#0f2e24] py-4 rounded-2xl font-black text-lg tracking-tight flex items-center justify-center gap-3 hover:bg-[#00dd77] transition-all active:scale-[0.98] shadow-[0_8px_20px_rgba(0,255,136,0.3)] disabled:opacity-50"
          >
            <Camera size={24} strokeWidth={3} />
            {isScanning ? "辨識中..." : "開始掃描食材"}
          </button>

          {scannedItems.length > 0 && (
            <button
              onClick={() => navigate("/ingredients")}
              className="w-full bg-[#1a4d3d] text-[#00ff88] py-4 rounded-2xl font-black text-lg tracking-tight flex items-center justify-center gap-3 border-2 border-[#1a4d3d] hover:border-[#00ff88] transition-all active:scale-[0.98] shadow-xl"
            >
              <Sparkles size={24} strokeWidth={2} />
              生成 AI 食譜
            </button>
          )}
        </div>

        {scannedItems.length > 0 && (
          <div className="w-full max-w-sm mt-8">
            <div className="bg-[#1a4d3d]/50 backdrop-blur-xl rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl">
              <div className="flex items-center justify-between px-6 py-5 bg-white/5 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#00ff88] shadow-[0_0_8px_#00ff88]" />
                  <h3 className="font-black text-xs tracking-widest text-white uppercase">已掃描 ({scannedItems.length})</h3>
                </div>
                <div className="flex items-center gap-3">
                  <button onClick={() => navigate("/inventory")} className="text-[10px] text-[#00ff88] hover:text-white font-bold uppercase tracking-tight flex items-center gap-1.5">
                    <Package size={14} /> 管理
                  </button>
                  <button onClick={() => setShowList(!showList)} className="text-[10px] text-gray-400 hover:text-white font-bold uppercase tracking-tight">
                    {showList ? "隱藏" : "顯示"}
                  </button>
                </div>
              </div>

              {showList && (
                <div className="max-h-60 overflow-y-auto px-2 py-2">
                  {scannedItems.map(item => (
                    <div key={item.id} className="flex items-center justify-between px-4 py-4 rounded-2xl mb-1 hover:bg-white/5 transition-colors group">
                      <div className="flex-1">
                        <p className="font-bold text-white text-sm">{item.name}</p>
                        <p className="text-[10px] text-gray-500 uppercase font-bold mt-0.5">辨識時間 {formatRelativeTime(item.timestamp)}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center bg-[#0f2e24] rounded-full p-1 border border-white/10">
                          <button onClick={() => updateQuantity(item.id, -1)} className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-[#00ff88] hover:text-[#0f2e24] transition-all text-gray-400">
                            <Minus size={14} strokeWidth={3} />
                          </button>
                          <span className="w-8 text-center font-black text-[#00ff88] text-sm">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, 1)} className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-[#00ff88] hover:text-[#0f2e24] transition-all text-gray-400">
                            <Plus size={14} strokeWidth={3} />
                          </button>
                        </div>
                        <button onClick={() => removeItem(item.id)} className="w-8 h-8 rounded-full bg-red-500/10 text-red-500 border border-red-500/20 flex items-center justify-center hover:bg-red-500 hover:text-white transition-all">
                          <X size={14} strokeWidth={3} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {showList && (
                <div className="px-6 py-4 bg-white/5 border-t border-white/10 flex gap-3">
                  <button onClick={clearAll} className="flex-1 py-3 rounded-xl bg-red-500/10 text-red-500 text-[10px] font-black tracking-widest uppercase hover:bg-red-500 hover:text-white transition-all">清空清單</button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}