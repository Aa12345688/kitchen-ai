import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface ScannedItem {
    id: string;
    name: string;
    quantity: number;
    timestamp: number;
    category?: string;
    freshness?: number; // 0-10
    expiryDays?: number; // Days until expiry
}

interface IngredientContextType {
    scannedItems: ScannedItem[];
    addItem: (item: Partial<ScannedItem>) => void;
    updateQuantity: (id: string, delta: number) => void;
    removeItem: (id: string) => void;
    clearAll: () => void;
    refreshItems: (items: ScannedItem[]) => void;
}

const IngredientContext = createContext<IngredientContextType | undefined>(undefined);

export function IngredientProvider({ children }: { children: ReactNode }) {
    const [scannedItems, setScannedItems] = useState<ScannedItem[]>([]);

    // Load from localStorage on mount
    useEffect(() => {
        const saved = localStorage.getItem("scannedIngredients");
        if (saved) {
            try {
                setScannedItems(JSON.parse(saved));
            } catch (e) {
                console.error("Failed to load saved items", e);
            }
        }
    }, []);

    // Sync to localStorage
    useEffect(() => {
        localStorage.setItem("scannedIngredients", JSON.stringify(scannedItems));
    }, [scannedItems]);

    const addItem = (item: Partial<ScannedItem>) => {
        setScannedItems(prev => {
            const existing = prev.find(i => i.name.toLowerCase() === item.name?.toLowerCase());
            if (existing) {
                return prev.map(i =>
                    i.id === existing.id
                        ? { ...i, quantity: i.quantity + (item.quantity || 1), timestamp: Date.now() }
                        : i
                );
            }
            return [...prev, {
                id: Date.now().toString(),
                name: item.name || "Unknown",
                quantity: item.quantity || 1,
                timestamp: Date.now(),
                ...item
            }];
        });
    };

    const updateQuantity = (id: string, delta: number) => {
        setScannedItems(prev =>
            prev.map(item =>
                item.id === id
                    ? { ...item, quantity: Math.max(0, item.quantity + delta) }
                    : item
            ).filter(item => item.quantity > 0)
        );
    };

    const removeItem = (id: string) => {
        setScannedItems(prev => prev.filter(item => item.id !== id));
    };

    const clearAll = () => {
        setScannedItems([]);
    };

    const refreshItems = (items: ScannedItem[]) => {
        setScannedItems(items);
    };

    return (
        <IngredientContext.Provider value={{
            scannedItems,
            addItem,
            updateQuantity,
            removeItem,
            clearAll,
            refreshItems
        }}>
            {children}
        </IngredientContext.Provider>
    );
}

export function useIngredients() {
    const context = useContext(IngredientContext);
    if (context === undefined) {
        throw new Error("useIngredients must be used within an IngredientProvider");
    }
    return context;
}
