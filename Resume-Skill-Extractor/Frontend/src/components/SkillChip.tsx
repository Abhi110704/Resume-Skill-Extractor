
import React from 'react';
import { cn } from '@/lib/utils';

type SkillChipProps = {
  skill: string;
  category?: string;
  isHighlighted?: boolean;
  onClick?: () => void;
};

// Function to get color based on category
const getCategoryColor = (category: string = "General") => {
  const categoryColors: Record<string, string> = {
    "Programming Languages": "bg-blue-100 text-blue-800 border-blue-200 hover:bg-blue-200",
    "Web Technologies & Frameworks": "bg-purple-100 text-purple-800 border-purple-200 hover:bg-purple-200",
    "Databases": "bg-green-100 text-green-800 border-green-200 hover:bg-green-200",
    "Cloud & DevOps": "bg-orange-100 text-orange-800 border-orange-200 hover:bg-orange-200",
    "Data Science & Machine Learning": "bg-red-100 text-red-800 border-red-200 hover:bg-red-200",
    "Big Data & ETL": "bg-yellow-100 text-yellow-800 border-yellow-200 hover:bg-yellow-200",
    "Tools & Platforms": "bg-indigo-100 text-indigo-800 border-indigo-200 hover:bg-indigo-200",
    "Testing": "bg-pink-100 text-pink-800 border-pink-200 hover:bg-pink-200",
    "Soft Skills": "bg-teal-100 text-teal-800 border-teal-200 hover:bg-teal-200",
    "General": "bg-gray-100 text-gray-800 border-gray-200 hover:bg-gray-200",
    "Other Skills": "bg-gray-100 text-gray-800 border-gray-200 hover:bg-gray-200"
  };
  
  return categoryColors[category] || categoryColors["General"];
};

export function SkillChip({ skill, category, isHighlighted, onClick }: SkillChipProps) {
  return (
    <div 
      className={cn(
        "inline-flex items-center px-3 py-2 m-1 rounded-lg text-sm font-medium transition-colors shadow-sm",
        getCategoryColor(category),
        isHighlighted && "ring-2 ring-offset-1 ring-primary",
        onClick && "cursor-pointer"
      )}
      onClick={onClick}
    >
      <span className="font-semibold">{skill}</span>
      {category && <span className="ml-2 text-xs px-1.5 py-0.5 rounded-md bg-white/40">{category}</span>}
    </div>
  );
}
