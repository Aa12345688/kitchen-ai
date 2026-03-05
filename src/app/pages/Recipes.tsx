import { useNavigate } from "react-router";
import { Share2, ChefHat, Sparkles } from "lucide-react";
import { useState, useEffect } from "react";
import { PageHeader } from "../components/PageHeader";
import { useIngredients } from "../services/IngredientContext";
import { getRecommendedRecipes } from "../data/recipes";
import { llmService } from "../services/llmService";
import { RecipeCard } from "../components/recipes/RecipeCard";
import { IngredientCloud } from "../components/recipes/IngredientCloud";

export function Recipes() {
  const navigate = useNavigate();
  const { scannedItems } = useIngredients();
  const [recommendedRecipes, setRecommendedRecipes] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (scannedItems.length > 0) {
      const fetchRecipes = async () => {
        setIsLoading(true);
        try {
          const ingredientNames = scannedItems.map(i => i.name);
          const recipes = await llmService.generateRecipes({ ingredients: ingredientNames });
          setRecommendedRecipes(recipes);
        } catch (error) {
          console.error("LLM Generation failed, falling back to local algorithm", error);
          const localRecipes = getRecommendedRecipes(scannedItems);
          setRecommendedRecipes(localRecipes);
        } finally {
          setIsLoading(false);
        }
      };
      fetchRecipes();
    } else {
      setIsLoading(false);
    }
  }, [scannedItems]);

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case "vegetable": return "蔬菜";
      case "fruit": return "水果";
      case "meat": return "肉類";
      case "mixed": return "綜合";
      default: return "其他";
    }
  };

  return (
    <div className="pb-24">
      <PageHeader
        showBackButton
        title="AI 推薦食譜"
        rightAction={
          <button className="p-2.5 bg-white/5 rounded-2xl hover:bg-white/10 transition-all">
            <Share2 size={20} className="text-white" />
          </button>
        }
      />

      <div className="px-6 py-4">
        <IngredientCloud items={scannedItems} onAddMore={() => navigate("/inventory")} />

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-6 bg-white/5 rounded-[3rem] border border-white/10">
            <div className="relative w-16 h-16">
              <div className="absolute inset-0 border-4 border-[#00ff88]/20 rounded-full" />
              <div className="absolute inset-0 border-4 border-[#00ff88] border-t-transparent rounded-full animate-spin" />
              <Sparkles className="absolute inset-0 m-auto text-[#00ff88] animate-pulse" size={20} />
            </div>
            <div className="text-center">
              <h3 className="text-[#00ff88] font-black text-xs uppercase tracking-widest animate-pulse mb-1">運算中...</h3>
              <p className="text-gray-500 text-[9px] font-bold uppercase tracking-widest">正在分析口味分佈</p>
            </div>
          </div>
        ) : recommendedRecipes.length > 0 ? (
          <div className="space-y-8">
            <div className="bg-[#1a4d3d]/40 backdrop-blur-md rounded-[2.5rem] p-6 border border-[#00ff88]/20 relative overflow-hidden group shadow-2xl">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#00ff88] flex items-center justify-center flex-shrink-0 shadow-[0_8px_15px_rgba(0,255,136,0.3)]">
                  <ChefHat size={24} className="text-[#0f2e24]" strokeWidth={2.5} />
                </div>
                <div>
                  <h3 className="font-black text-xs text-white uppercase tracking-widest mb-1">AI 神經網路推薦</h3>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter leading-tight">
                    已優化 <span className="text-[#00ff88]">{recommendedRecipes.length} 個相容節點</span> <br />
                    惜食減廢協議已啟動
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-10">
              {recommendedRecipes.map((recipe) => (
                <RecipeCard
                  key={recipe.id}
                  recipe={recipe}
                  onClick={() => navigate(`/recipe/${recipe.id}`)}
                  getCategoryLabel={getCategoryLabel}
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-24 px-8 bg-white/5 rounded-[3rem] border-2 border-dashed border-white/5">
            <div className="w-20 h-20 mx-auto mb-6 bg-[#00ff88]/5 rounded-full flex items-center justify-center">
              <ChefHat size={40} className="text-[#00ff88]/20" />
            </div>
            <h4 className="text-white font-black text-sm uppercase tracking-widest mb-2">未發現相容方案</h4>
            <p className="text-gray-600 text-[9px] font-bold uppercase tracking-widest leading-relaxed mb-8 max-w-[200px] mx-auto">
              數據量不足以生成食譜。請先新增食材到冰箱。
            </p>
            <button
              onClick={() => navigate("/")}
              className="inline-flex items-center gap-3 px-8 py-4 bg-[#00ff88] text-[#0f2e24] rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-xl active:scale-95 transition-all"
            >
              返回掃描
            </button>
          </div>
        )}
      </div>
    </div>
  );
}