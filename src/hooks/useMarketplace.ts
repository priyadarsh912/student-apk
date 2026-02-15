import { useState, useEffect } from 'react';

export interface MarketItem {
    id: string;
    name: string;
    price: string;
    condition: string;
    seller: string;
    img: string;
    category: string;
    description?: string;
    date: string;
}

const INITIAL_ITEMS: MarketItem[] = [
    { id: '1', name: "MacBook Pro 2021", price: "₹45,000", condition: "Like New", seller: "Rahul M.", img: "💻", category: "Electronics", date: new Date().toISOString() },
    { id: '2', name: "Data Structures Book", price: "₹250", condition: "Good", seller: "Priya S.", img: "📚", category: "Books", date: new Date().toISOString() },
    { id: '3', name: "Desk Lamp (LED)", price: "₹350", condition: "New", seller: "Amit K.", img: "💡", category: "Electronics", date: new Date().toISOString() },
    { id: '4', name: "Study Table", price: "₹2,000", condition: "Good", seller: "Neha R.", img: "🪑", category: "Furniture", date: new Date().toISOString() },
    { id: '5', name: "Scientific Calculator", price: "₹800", condition: "Like New", seller: "Vikram P.", img: "🧮", category: "Electronics", date: new Date().toISOString() },
    { id: '6', name: "Winter Jacket (L)", price: "₹600", condition: "Good", seller: "Sneha D.", img: "🧥", category: "Clothing", date: new Date().toISOString() },
];

export function useMarketplace() {
    const [items, setItems] = useState<MarketItem[]>(() => {
        const saved = localStorage.getItem('campus-market-items');
        return saved ? JSON.parse(saved) : INITIAL_ITEMS;
    });

    useEffect(() => {
        localStorage.setItem('campus-market-items', JSON.stringify(items));
    }, [items]);

    const addItem = (item: Omit<MarketItem, 'id' | 'date' | 'seller'>) => {
        const newItem: MarketItem = {
            ...item,
            id: Math.random().toString(36).substr(2, 9),
            date: new Date().toISOString(),
            seller: "You", // In a real app, this would come from auth context
        };
        setItems(prev => [newItem, ...prev]);
    };

    const deleteItem = (id: string) => {
        setItems(prev => prev.filter(item => item.id !== id));
    };

    return { items, addItem, deleteItem };
}
