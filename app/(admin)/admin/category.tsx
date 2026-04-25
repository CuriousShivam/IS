'use client';

import React, { useEffect, useState } from "react";
import { Select, SelectItem } from "@heroui/react";
import { getCategoriesAction } from "@/app/(admin)/admin/actions";

interface Category {
    id: string;
    name: string;
}

interface CategorySelectProps {
    selectedId: any;
    action: (id: string) => void; //HandleCategoryFunction
}

export default function CategorySelect({ selectedId, action }: CategorySelectProps) {
    const [categories, setCategories] = useState<Category[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function loadData() {
            setIsLoading(true);
            const result = await getCategoriesAction();
            if (result.success) {
                setCategories(result.data);
            }
            setIsLoading(false);
        }
        loadData();
    }, []);

    // Helper to safely extract the string ID for HeroUI's Set
    const getSafeKey = () => {
        if (!selectedId) return new Set([]);
        const id = typeof selectedId === 'object' ? selectedId.id : selectedId;
        return id ? new Set([String(id)]) : new Set([]);
    };

    return (
        <Select
            label="Blog Category"
            variant="bordered"
            placeholder="Select a category"
            // ✅ FIX: Use the helper to pass a Set of strings, not objects
            selectedKeys={getSafeKey()}
            isLoading={isLoading}
            onSelectionChange={(keys) => {
                const currentId = Array.from(keys)[0] as string;
                action(currentId);
            }}
        >
            {categories.map((category) => (
                <SelectItem key={category.id} textValue={category.name}>
                    {category.name}
                </SelectItem>
            ))}
        </Select>
    );
}