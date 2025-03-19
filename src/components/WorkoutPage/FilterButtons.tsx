"use client";
import { useState } from "react";

interface FilterButtonProps {
  options: string[];
  selected: string[];
  setSelected: (selected: string[]) => void;
  label: string;
}

const FilterButton = ({ options, selected, setSelected, label }: FilterButtonProps) => {
  const toggleSelection = (option: string) => {
    setSelected(
      selected.includes(option)
        ? selected.filter((item) => item !== option)
        : [...selected, option]
    );
  };

  return (
    <div className="mb-4">
      <h3 className="text-lg font-semibold text-dark dark:text-white mb-2">{label}</h3>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => (
          <button
            key={option}
            onClick={() => toggleSelection(option)}
            className={`px-4 py-2 rounded-md ${
              selected.includes(option)
                ? "bg-primary text-white"
                : "bg-gray-200 dark:bg-dark-4 text-dark dark:text-white"
            } transition duration-300`}
          >
            {option.replace("_", " ")}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FilterButton;
