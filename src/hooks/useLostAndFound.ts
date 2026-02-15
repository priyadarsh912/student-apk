import { useState, useEffect } from 'react';

export interface LostFoundItem {
    id: string;
    title: string;
    location: string;
    time: string;
    status: "ACTIVE" | "FOUND" | "UNCLAIMED" | "CLAIMED";
    img: string; // Emoji
    reporter: string;
    type: "LOST" | "FOUND";
    date: string;
}

const INITIAL_ITEMS: LostFoundItem[] = [
    { id: '1', title: "Blue Backpack", location: "Library, 2nd Floor", time: "2 hours ago", status: "ACTIVE", img: "🎒", reporter: "Rahul M.", type: "LOST", date: new Date().toISOString() },
    { id: '2', title: "iPhone 14 (Black)", location: "Cafeteria B", time: "5 hours ago", status: "ACTIVE", img: "📱", reporter: "Priya S.", type: "LOST", date: new Date().toISOString() },
    { id: '3', title: "Student ID Card", location: "Lecture Hall 3", time: "1 day ago", status: "FOUND", img: "💳", reporter: "Amit K.", type: "LOST", date: new Date().toISOString() },
    { id: '4', title: "Silver Watch", location: "Gym Area", time: "2 days ago", status: "ACTIVE", img: "⌚", reporter: "Sneha D.", type: "LOST", date: new Date().toISOString() },
    { id: '5', title: "Water Bottle (Green)", location: "Parking Lot A", time: "1 hour ago", status: "UNCLAIMED", img: "🍶", reporter: "Vikram P.", type: "FOUND", date: new Date().toISOString() },
    { id: '6', title: "Earbuds Case", location: "Bus Stop 2", time: "3 hours ago", status: "UNCLAIMED", img: "🎧", reporter: "Neha R.", type: "FOUND", date: new Date().toISOString() },
];

export function useLostAndFound() {
    const [items, setItems] = useState<LostFoundItem[]>(() => {
        const saved = localStorage.getItem('lost-found-items');
        return saved ? JSON.parse(saved) : INITIAL_ITEMS;
    });

    useEffect(() => {
        localStorage.setItem('lost-found-items', JSON.stringify(items));
    }, [items]);

    const addItem = (item: Omit<LostFoundItem, 'id' | 'date' | 'reporter' | 'status'>) => {
        const newItem: LostFoundItem = {
            ...item,
            id: Math.random().toString(36).substr(2, 9),
            date: new Date().toISOString(),
            reporter: "You",
            status: item.type === "LOST" ? "ACTIVE" : "UNCLAIMED",
        };
        setItems(prev => [newItem, ...prev]);
    };

    const markAsFound = (id: string) => {
        setItems(prev => prev.map(item =>
            item.id === id ? { ...item, status: "FOUND" } : item
        ));
    };

    const markAsClaimed = (id: string) => {
        setItems(prev => prev.map(item =>
            item.id === id ? { ...item, status: "CLAIMED" } : item
        ));
    };

    const deleteItem = (id: string) => {
        setItems(prev => prev.filter(item => item.id !== id));
    };

    return { items, addItem, markAsFound, markAsClaimed, deleteItem };
}
