
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { SkillChip } from "./SkillChip";
import { SkillCategorizer } from "./SkillCategorizer";
import { Search, Upload, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type Skill = {
  name: string;
  category: string;
};

type ExtractionResult = {
  id: string;
  filename: string;
  date: string;
  skills: Skill[];
};

// Map for assigning categories to skills based on keywords
const categoryMap: Record<string, string[]> = {
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

// Function to determine the category of a skill
const determineCategory = (skill: string): string => {
  const skillLower = skill.toLowerCase();
  
  for (const [category, keywords] of Object.entries(categoryMap)) {
    if (keywords.some(keyword => skillLower.includes(keyword))) {
      return category;
    }
  }
  
  return "Other Skills";
};

export function ResumeExtractor({
  onExtracted,
}: {
  onExtracted: (result: ExtractionResult) => void;
}) {
  const [file, setFile] = useState<File | null>(null);
  const [isExtracting, setIsExtracting] = useState(false);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      
      // Only accept PDF files
      if (selectedFile.type !== 'application/pdf') {
        toast({
          title: "Invalid file type",
          description: "Please upload a PDF file",
          variant: "destructive"
        });
        return;
      }
      
      setFile(selectedFile);
      // Reset skills when a new file is selected
      setSkills([]);
    }
  };

  const extractSkills = async () => {
    if (!file) {
      toast({
        title: "No file selected",
        description: "Please select a PDF resume file first",
        variant: "destructive"
      });
      return;
    }

    setIsExtracting(true);
    
    // Create a FormData object to send the file
    const formData = new FormData();
    formData.append("file", file);
    
    // Send the request to the backend server
    try {
      console.log("Sending request to backend server...");
      
      const response = await fetch("https://resume-backend-atll.onrender.com/extract-skills", {
        method: "POST",
        body: formData,
        // Add headers to ensure proper CORS handling
        headers: {
          'Accept': 'application/json',
        },
      });
      
      console.log("Response status:", response.status);
      
      if (!response.ok) {
        throw new Error(`Server responded with ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      console.log("Response data:", data);
      
      // Check if the expected data structure is returned
      if (!data.skills) {
        throw new Error("Received invalid data format from server");
      }
      
      // Format the received skills into our application format with categorization
      // The server returns an array of strings, so we need to convert to our format
      const extractedSkills: Skill[] = Array.isArray(data.skills) 
        ? data.skills.map((skill: string) => ({
            name: skill,
            category: determineCategory(skill), // Auto-categorize each skill
          }))
        : [];
      
      console.log("Extracted skills:", extractedSkills);
      setSkills(extractedSkills);
      
      // Create extraction result for history
      const newResult: ExtractionResult = {
        id: Date.now().toString(),
        filename: file.name,
        date: new Date().toLocaleString(),
        skills: extractedSkills,
      };
      
      onExtracted(newResult);
      
      toast({
        title: "Skills extracted successfully",
        description: `Found ${extractedSkills.length} skills in your resume`,
      });
    } catch (error) {
      console.error("Error extracting skills:", error);
      toast({
        title: "Extraction failed",
        description: "Something went wrong while extracting skills. The server might be down or initializing. Please try again later.",
        variant: "destructive"
      });
    } finally {
      setIsExtracting(false);
    }
  };

  // Group skills by category
  const groupedSkills: Record<string, Skill[]> = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);

  // Filter skills based on search term
  const filteredSkills = Object.entries(groupedSkills).map(([category, skills]) => {
    return {
      category,
      skills: skills.filter(skill => 
        skill.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        category.toLowerCase().includes(searchTerm.toLowerCase())
      )
    };
  }).filter(group => group.skills.length > 0);

  // Get all skill names for the categorizer
  const allSkillNames = skills.map(skill => skill.name);

  // Function to get the appropriate CSS class for category headers
  const getCategoryClass = (category: string): string => {
    const categoryClasses: Record<string, string> = {
      "Programming Languages": "category-programming",
      "Web Technologies & Frameworks": "category-web",
      "Databases": "category-database",
      "Cloud & DevOps": "category-cloud",
      "Data Science & Machine Learning": "category-data-science",
      "Big Data & ETL": "category-big-data",
      "Tools & Platforms": "category-tools",
      "Testing": "category-testing",
      "Soft Skills": "category-soft",
      "Other Skills": "category-other"
    };
    
    return `skill-category-header ${categoryClasses[category] || "category-other"}`;
  };

  return (
    <Card className="shadow-md">
      <CardContent className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column: Upload and Controls */}
          <div className="space-y-4">
            <div className="relative border-2 border-dashed border-muted rounded-lg p-6 flex flex-col items-center justify-center">
              <FileText className="h-10 w-10 text-muted-foreground mb-2" />
              <p className="text-sm text-muted-foreground mb-4">
                {file ? file.name : "Upload your resume (PDF)"}
              </p>
              <Button
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
                className="rounded-full"
              >
                <Upload className="h-4 w-4 mr-2" />
                Select File
              </Button>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
                accept=".pdf"
              />
            </div>

            <Button 
              onClick={extractSkills} 
              className="w-full rounded-full"
              disabled={!file || isExtracting}
            >
              {isExtracting ? "Extracting..." : "Extract Skills"}
            </Button>

            {skills.length > 0 && (
              <div className="relative mt-4">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search skills..."
                  className="pl-9 rounded-full"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            )}

            {isExtracting && (
              <div className="text-center py-2">
                <div className="animate-pulse text-muted-foreground">
                  Processing your resume...
                </div>
              </div>
            )}
            
            {/* Add Skill Categorizer */}
            {skills.length > 0 && (
              <SkillCategorizer skills={allSkillNames} />
            )}
          </div>

          {/* Right Column: Skills Display */}
          <div className="min-h-[200px] bg-secondary/30 rounded-lg p-4 shadow-inner">
            {skills.length > 0 ? (
              <div className="space-y-6">
                {filteredSkills.length > 0 ? (
                  filteredSkills.map(({ category, skills }) => (
                    <div key={category} className="mb-4">
                      <h3 className={getCategoryClass(category)}>
                        {category} ({skills.length})
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {skills.map((skill) => (
                          <SkillChip
                            key={skill.name}
                            skill={skill.name}
                            category={category}
                            isHighlighted={
                              searchTerm.length > 0 && 
                              skill.name.toLowerCase().includes(searchTerm.toLowerCase())
                            }
                          />
                        ))}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    No matching skills found. Try a different search term.
                  </div>
                )}
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-muted-foreground">
                <FileText className="h-10 w-10 mb-2" />
                <p className="text-center">
                  Upload a resume and extract skills to see results here
                </p>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
