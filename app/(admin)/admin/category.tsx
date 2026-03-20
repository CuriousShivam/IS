'use client';

import React, { useEffect, useState } from "react";
import { Select, SelectItem } from "@heroui/react";
import { getCategoriesAction } from "@/app/(admin)/admin/actions";

interface Category {
    id: string;
    name: string;
}

interface CategorySelectProps {
    selectedId: string;
    onCategoryChange: (id: string) => void;
}

export default function CategorySelect({ selectedId, onCategoryChange }: CategorySelectProps) {
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

    return (
        <Select
            label="Blog Category"
            variant="bordered"
            placeholder="Select a category"
            selectedKeys={selectedId ? new Set([selectedId]) : new Set([])}
            isLoading={isLoading}
            onSelectionChange={(keys) => {
                const currentId = Array.from(keys)[0] as string;
                onCategoryChange(currentId);
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