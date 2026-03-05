import { useNavigate, useParams } from "react-router";
import { Share2, Clock, ChefHat, Users, Sparkles } from "lucide-react";
import { useState } from "react";
import { PageHeader } from "../components/PageHeader";
import { recipeDatabase } from "../data/recipes";
import { RecipeHero } from "../components/recipes/RecipeHero";
import { IngredientChecklist } from "../components/recipes/IngredientChecklist";
import { CookingProtocol } from "../components/recipes/CookingProtocol";

export function RecipeDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  let recipe = recipeDatabase.find(r => r.id === id);

  // Fallback for mock IDs from LLM service per demo requirements
  if (!recipe && id?.startsWith('mock-')) {
    recipe = {
      id: id,
      name: id === 'mock-veg-1' ? "高纖維綠色能源沙拉" : "AI 神經網路合成食譜",
      image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
      time: "15 分鐘",
      difficulty: "簡單",
      category: "vegetable",
      requiredIngredients: ["番茄", "菠菜"],
      optionalIngredients: ["義大利香醋", "葵花籽"],
      wasteReduction: "90%",
      description: "針對零浪費消費動態生成的烹飪協議。"
    } as any;
  }

  if (!recipe) {
    return (
      <div className="pb-24">
        <PageHeader showBackButton title="未找到" />
        <div className="flex flex-col items-center justify-center py-20 px-8 text-center">
          <ChefHat size={64} className="text-white/10 mb-6" />
          <h2 className="text-lg font-black text-white uppercase tracking-widest mb-4">找不到相關食譜</h2>
          <button onClick={() => navigate("/recipes")} className="px-8 py-4 bg-[#00ff88] text-[#0f2e24] rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl active:scale-95 transition-all">
            返回食譜列表
          </button>
        </div>
      </div>
    );
  }

  const allIngredients = [...recipe.requiredIngredients, ...recipe.optionalIngredients];
  const [checkedIngredients, setCheckedIngredients] = useState<boolean[]>(new Array(allIngredients.length).fill(false));

  const toggleIngredient = (index: number) => {
    const newChecked = [...checkedIngredients];
    newChecked[index] = !newChecked[index];
    setCheckedIngredients(newChecked);
  };

  const steps = [
    { title: "初始化", description: "準備數據庫中紀錄的所有必要食材。" },
    { title: "執行", description: "遵循標準烹飪程序以獲得最佳成品。" },
    { title: "完成", description: "確認內部溫度並進行擺盤食用。" },
  ];

  const progress = Math.round((checkedIngredients.filter(Boolean).length / allIngredients.length) * 100);

  return (
    <div className="pb-32">
      <PageHeader
        showBackButton
        title="烹飪指南"
        rightAction={<button className="p-2.5 bg-white/5 rounded-2xl hover:bg-white/10 transition-all"><Share2 size={20} className="text-white" /></button>}
      />

      <RecipeHero image={recipe.image} name={recipe.name} />

      <div className="px-6 py-8">
        <div className="grid grid-cols-3 gap-3 mb-10">
          {[
            { icon: Clock, label: "時間", value: recipe.time },
            { icon: ChefHat, label: "難度", value: recipe.difficulty.toUpperCase() },
            { icon: Users, label: "份量", value: "2-3 人份" }
          ].map((stat, i) => (
            <div key={i} className="bg-white/5 rounded-2xl p-4 border border-white/5 text-center">
              <stat.icon className="w-4 h-4 mx-auto mb-2 text-[#00ff88]" />
              <div className="text-[8px] font-black text-white/40 uppercase tracking-widest mb-1">{stat.label}</div>
              <div className="text-xs font-black text-white">{stat.value}</div>
            </div>
          ))}
        </div>

        <IngredientChecklist
          ingredients={allIngredients}
          checkedItems={checkedIngredients}
          onToggle={toggleIngredient}
          progress={progress}
        />

        <CookingProtocol steps={steps} />

        <button
          onClick={() => navigate("/")}
          className="w-full bg-[#00ff88] text-[#0f2e24] py-5 rounded-2xl font-black text-sm uppercase tracking-[0.2em] shadow-[0_10px_30px_rgba(0,255,136,0.3)] active:scale-95 transition-all flex items-center justify-center gap-3"
        >
          <Sparkles size={20} strokeWidth={3} />
          完成並存檔
        </button>
      </div>
    </div>
  );
}