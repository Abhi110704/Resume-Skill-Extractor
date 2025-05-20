
import React from 'react';
import { Badge } from "@/components/ui/badge";

// Define skill categories with their keywords
const skillCategories = {
  "Programming Languages": [
    "python", "java", "javascript", "typescript", "c", "c++", "c#", "kotlin", 
    "swift", "go", "ruby", "php", "r", "matlab", "scala", "rust"
  ],
  "Web Technologies & Frameworks": [
    "html", "css", "sass", "less", "bootstrap", "tailwind", "react", "angular", 
    "vue", "nodejs", "express", "nextjs", "flask", "django", "fastapi", "spring", 
    "laravel"
  ],
  "Databases": [
    "mysql", "postgresql", "mongodb", "sqlite", "oracle", "firebase", "redis", 
    "cassandra", "neo4j"
  ],
  "Cloud & DevOps": [
    "aws", "azure", "gcp", "heroku", "render", "netlify", "docker", "kubernetes", 
    "jenkins", "terraform", "ansible", "nginx"
  ],
  "Data Science & Machine Learning": [
    "pandas", "numpy", "scipy", "matplotlib", "seaborn", "scikit-learn", 
    "tensorflow", "keras", "pytorch", "xgboost", "lightgbm", "nlp", "opencv", 
    "machine learning", "deep learning", "data analysis", "data science", 
    "statistics", "ai"
  ],
  "Big Data & ETL": [
    "hadoop", "spark", "hive", "pig", "airflow", "kafka", "tableau", "powerbi", 
    "excel", "etl"
  ],
  "Tools & Platforms": [
    "git", "github", "gitlab", "bitbucket", "jira", "notion", "postman", 
    "vs code", "vim", "intellij"
  ],
  "Testing": [
    "selenium", "pytest", "unittest", "junit", "cypress", "mocha", "chai"
  ],
  "Soft Skills": [
    "communication", "leadership", "teamwork", "problem solving", "critical thinking", 
    "time management", "project management", "adaptability", "creativity", 
    "negotiation", "presentation", "public speaking"
  ]
};

type SkillDistributionProps = {
  skills: string[];
};

export const SkillCategorizer: React.FC<SkillDistributionProps> = ({ skills }) => {
  // Count skills by category
  const categoryCounts: Record<string, number> = {};
  const uncategorizedSkills: string[] = [];

  // Initialize categories with zero count
  Object.keys(skillCategories).forEach(category => {
    categoryCounts[category] = 0;
  });

  // Categorize each skill
  skills.forEach(skill => {
    const skillLower = skill.toLowerCase();
    let found = false;
    
    for (const [category, keywords] of Object.entries(skillCategories)) {
      if (keywords.some(keyword => skillLower.includes(keyword))) {
        categoryCounts[category]++;
        found = true;
        break;
      }
    }
    
    if (!found) {
      uncategorizedSkills.push(skill);
    }
  });

  // Filter out categories with zero count
  const nonEmptyCategories = Object.entries(categoryCounts)
    .filter(([_, count]) => count > 0)
    .sort((a, b) => b[1] - a[1]); // Sort by count in descending order

  if (nonEmptyCategories.length === 0 && uncategorizedSkills.length === 0) {
    return null;
  }

  return (
    <div className="mt-6 p-4 bg-secondary/30 rounded-lg">
      <h3 className="text-lg font-medium mb-3">Skill Distribution</h3>
      
      <div className="space-y-3">
        {nonEmptyCategories.map(([category, count]) => (
          <div key={category} className="flex justify-between items-center">
            <span className="text-sm">{category}</span>
            <div className="flex items-center gap-2">
              <div className="relative w-32 h-2 bg-secondary rounded-full overflow-hidden">
                <div 
                  className="absolute left-0 top-0 h-full bg-primary rounded-full" 
                  style={{ width: `${Math.min(100, (count / skills.length) * 100)}%` }}
                />
              </div>
              <Badge variant="secondary" className="text-xs">
                {count} ({Math.round((count / skills.length) * 100)}%)
              </Badge>
            </div>
          </div>
        ))}
        
        {uncategorizedSkills.length > 0 && (
          <div className="flex justify-between items-center">
            <span className="text-sm">Other Skills</span>
            <div className="flex items-center gap-2">
              <div className="relative w-32 h-2 bg-secondary rounded-full overflow-hidden">
                <div 
                  className="absolute left-0 top-0 h-full bg-muted rounded-full" 
                  style={{ width: `${Math.min(100, (uncategorizedSkills.length / skills.length) * 100)}%` }}
                />
              </div>
              <Badge variant="outline" className="text-xs">
                {uncategorizedSkills.length} ({Math.round((uncategorizedSkills.length / skills.length) * 100)}%)
              </Badge>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
