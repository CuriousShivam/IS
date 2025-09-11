"use client";

import { useEffect, useRef } from "react";
import {Input} from "@heroui/input";
import {Kbd} from "@heroui/kbd";
import {SearchIcon} from "@/components/icons";

const SearchInput = () => {
    const inputRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            // Detect Ctrl + K
            if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
                e.preventDefault(); // prevent browser search
                inputRef.current?.focus();
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, []);
    return (
    <Input
        aria-label="Search"
        classNames={{
            inputWrapper: "bg-default-100",
            input: "text-sm",
        }}
        endContent={
            <Kbd className="hidden lg:inline-block" keys={["command"]}>
                K
            </Kbd>
        }
        labelPlacement="outside"
        placeholder="Search..."
        startContent={
            <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
        }
        type="search"
        ref={inputRef}
    />
);
}

export default SearchInput;