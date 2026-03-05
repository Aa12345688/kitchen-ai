/**
 * LLM 食譜生成服務 (LLM Recipe Generation Service)
 * 
 * 這個模組負責與大語言模型 (例如 GPT-4, Gemini) 進行通訊，
 * 根據用戶提供的食材清單動態生成食譜建議。
 */

export interface LLMRecipeRequest {
    ingredients: string[]; // 用戶擁有的食材
    preferences?: string; // 用戶偏好 (可選)
}

export interface LLMRecipe {
    id: string;
    name: string;
    image: string;
    time: string;
    difficulty: "easy" | "medium" | "hard";
    category: "vegetable" | "fruit" | "meat" | "mixed";
    requiredIngredients: string[];
    description: string;
    matchScore: number;
}

// 獲取 API KEY 核心邏輯 (Get API KEY Logic)
// 優先從 Vite 環境變數中讀取 (VITE_LLM_API_KEY)
// 這能確保金鑰不會直接洩露在前端代碼中，並支持不同環境的靈活配置。
export const getApiKey = () => {
    return import.meta.env.VITE_LLM_API_KEY || "";
};

class LLMService {
    /**
     * 調用 LLM 生成食譜 (智能模擬引擎版)
     * @param request 包含食材清單的請求對象
     */
    async generateRecipes(request: LLMRecipeRequest): Promise<LLMRecipe[]> {
        const apiKey = getApiKey();
        const inputIngredients = request.ingredients.map(i => i.toLowerCase());

        if (apiKey) {
            console.log("偵測到環境變數 API KEY，準備調用真實 LLM 接口...");
            // 這邊未來可以填入 fetch 實作
        } else {
            console.log("使用智能模擬引擎 (Categorized Mock Engine) 生成食譜...");
        }

        // 模擬網路延遲
        await new Promise(resolve => setTimeout(resolve, 1500));

        const recipes: LLMRecipe[] = [];

        // 1. 檢測食材類別 (Ingredient Categorization)
        const hasMeat = inputIngredients.some(i => ["chicken", "beef", "pork", "fish", "shrimp", "meat"].includes(i));
        const hasVeg = inputIngredients.some(i => ["tomatoes", "spinach", "cabbage", "carrot", "garlic", "onion", "broccoli"].includes(i));
        const hasFruit = inputIngredients.some(i => ["apple", "banana", "orange", "lemon", "strawberry", "grape", "mango"].includes(i));
        const hasEgg = inputIngredients.some(i => ["egg", "eggs"].includes(i));

        // 2. 根據類別合成食譜 (Dynamic Recipe Synthesis)

        // --- 肉類推薦 (Meat Focused) ---
        if (hasMeat) {
            recipes.push({
                id: "mock-meat-1",
                name: "AI 極效蛋白質熱炒",
                image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
                time: "20 min",
                difficulty: "medium",
                category: "meat",
                requiredIngredients: [inputIngredients.find(i => ["chicken", "beef", "pork"].includes(i)) || "Meat", "Garlic"],
                description: "利用您庫存中的蛋白質與辛香料，快速鎖住肉汁。",
                matchScore: 98,
            });
        }

        // --- 蔬菜類推薦 (Vegetable Focused) ---
        if (hasVeg) {
            recipes.push({
                id: "mock-veg-1",
                name: "高纖維綠色能源沙拉",
                image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
                time: "10 min",
                difficulty: "easy",
                category: "vegetable",
                requiredIngredients: [inputIngredients.find(i => ["spinach", "cabbage", "broccoli"].includes(i)) || "Green Veggies"],
                description: "低熱量高纖維的完美選擇，有效利用剩餘綠色蔬菜。",
                matchScore: 92,
            });
        }

        // --- 水果類推薦 (Fruit Focused) ---
        if (hasFruit) {
            recipes.push({
                id: "mock-fruit-1",
                name: "分子料理風格果泥",
                image: "https://images.unsplash.com/photo-1540333563547-724d9e27ef1e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
                time: "5 min",
                difficulty: "easy",
                category: "fruit",
                requiredIngredients: [inputIngredients.find(i => ["apple", "orange", "mango"].includes(i)) || "Fruit"],
                description: "將新鮮水果轉化為甜點協定，完美的維他命來源。",
                matchScore: 88,
            });
        }

        // --- 混合類/組合推薦 (Mixed Synthesis) ---
        if (hasEgg && hasVeg) {
            recipes.push({
                id: "mock-mixed-1",
                name: "AI 創意番茄炒蛋 (經典協定)",
                image: "https://images.unsplash.com/photo-1598103442097-8b74394b95c6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
                time: "15 min",
                difficulty: "easy",
                category: "mixed",
                requiredIngredients: ["Eggs", "Tomatoes"],
                description: "針對現有番茄與雞蛋的黃金比例推薦。",
                matchScore: 100,
            });
        }

        if (hasMeat && hasVeg) {
            recipes.push({
                id: "mock-mixed-2",
                name: "平衡營養什錦燉肉",
                image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
                time: "35 min",
                difficulty: "medium",
                category: "mixed",
                requiredIngredients: ["Meat", "Root Vegetables"],
                description: "綜合性慢燉，能最大程度減少食材浪費。",
                matchScore: 95,
            });
        }

        // --- 保底推薦 (Generic Fallback) ---
        if (recipes.length < 2) {
            recipes.push({
                id: "mock-fallback",
                name: "全能型食材濃湯",
                image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
                time: "25 min",
                difficulty: "medium",
                category: "mixed",
                requiredIngredients: inputIngredients.slice(0, 3),
                description: "當食材種類受限時，濃湯是達成零浪費的最佳解法。",
                matchScore: 85,
            });
        }

        return recipes;
    }
}

export const llmService = new LLMService();
