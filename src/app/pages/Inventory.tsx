import { useNavigate } from "react-router";
import { Search, Plus, Package, Calendar, Minus, X } from "lucide-react";
import { useState } from "react";
import { PageHeader } from "../components/PageHeader";
import { useIngredients } from "../services/IngredientContext";
import { InventoryStats } from "../components/inventory/InventoryStats";
import { AddEntryForm } from "../components/inventory/AddEntryForm";

const categories = ["全部", "蔬菜", "水果", "乳製品", "肉類", "五穀", "其他"];

export function Inventory() {
  const navigate = useNavigate();
  const { scannedItems, addItem, updateQuantity, removeItem } = useIngredients();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("全部");
  const [showAddForm, setShowAddForm] = useState(false);

  // Filter logic
  const filteredItems = scannedItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "全部" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const totalUnits = scannedItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="pb-24">
      <PageHeader
        showBackButton
        title="食材清單"
        rightAction={
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="p-1.5 bg-[#00ff88] rounded-xl shadow-[0_0_15px_rgba(0,255,136,0.3)] active:scale-90 transition-all"
          >
            <Plus size={20} className="text-[#0f2e24] stroke-[3]" />
          </button>
        }
      />

      <div className="bg-[#0f2e24] sticky top-[64px] z-20 pb-4">
        <div className="px-6 py-4">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 group-focus-within:text-[#00ff88] transition-colors" size={18} />
            <input
              type="text"
              placeholder="搜尋食材..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-2xl focus:outline-none focus:border-[#00ff88] transition-all text-sm font-bold placeholder:text-gray-600 shadow-inner"
            />
          </div>
        </div>

        <div className="px-6 overflow-x-auto no-scrollbar">
          <div className="flex gap-2 min-w-max pb-2">
            {categories.map(c => (
              <button
                key={c}
                onClick={() => setSelectedCategory(c)}
                className={`px-5 py-2 rounded-xl text-[10px] font-black tracking-widest uppercase transition-all border ${selectedCategory === c
                  ? "bg-[#00ff88] text-[#0f2e24] border-[#00ff88] shadow-[0_0_15px_rgba(0,255,136,0.3)]"
                  : "bg-white/5 text-gray-500 hover:text-white border-white/10"
                  }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </div>

      <InventoryStats
        totalItems={totalUnits}
        freshItems={scannedItems.length}
      />

      {showAddForm && (
        <AddEntryForm
          onAdd={addItem}
          onDismiss={() => setShowAddForm(false)}
          categories={categories}
        />
      )}

      <div className="px-6 py-4">
        <h3 className="font-black text-xs tracking-widest uppercase text-white/30 mb-4 px-2">存貨紀錄 ({filteredItems.length})</h3>

        {filteredItems.length === 0 ? (
          <div className="text-center py-20 bg-white/5 rounded-[3rem] border border-white/5">
            <Package size={48} className="mx-auto mb-4 text-[#00ff88]/10" />
            <h3 className="text-xs font-black text-white/20 uppercase tracking-widest">目前沒有資料</h3>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredItems.map(item => (
              <div key={item.id} className="bg-[#1a4d3d]/30 backdrop-blur-xl rounded-2xl p-4 border border-white/5 hover:border-[#00ff88]/20 transition-all group">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#0f2e24] border border-white/5 flex items-center justify-center group-hover:scale-105 transition-transform shadow-inner">
                    <Package size={20} className="text-[#00ff88]" strokeWidth={2} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-black text-white text-sm tracking-tight mb-1 uppercase truncate group-hover:text-[#00ff88] transition-colors">{item.name}</h4>
                    <div className="flex items-center gap-3">
                      <span className="text-[8px] font-black uppercase tracking-widest text-[#00ff88] bg-[#00ff88]/10 px-2 py-0.5 rounded-md border border-[#00ff88]/20">{item.category || "其他"}</span>
                      <span className="flex items-center gap-1.5 text-[8px] font-bold text-gray-500 uppercase tracking-tight">
                        <Calendar size={10} className="opacity-50" />
                        {new Date(item.timestamp).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center bg-[#0f2e24]/80 rounded-full p-1 border border-white/10 shadow-inner">
                      <button onClick={() => updateQuantity(item.id, -1)} className="w-7 h-7 flex items-center justify-center hover:bg-[#00ff88] hover:text-[#0f2e24] rounded-full transition-all text-gray-500"><Minus size={12} strokeWidth={3} /></button>
                      <span className="w-8 text-center font-black text-white text-xs">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, 1)} className="w-7 h-7 flex items-center justify-center hover:bg-[#00ff88] hover:text-[#0f2e24] rounded-full transition-all text-gray-500"><Plus size={12} strokeWidth={3} /></button>
                    </div>
                    <button onClick={() => removeItem(item.id)} className="w-8 h-8 rounded-full bg-red-500/10 text-red-500 border border-red-500/10 flex items-center justify-center hover:bg-red-500 hover:text-white transition-all shadow-lg"><X size={14} strokeWidth={3} /></button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
