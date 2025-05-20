
import { Card, CardContent } from "@/components/ui/card";
import { ExternalLink, Github } from "lucide-react";

export function InfoSection() {
  return (
    <div className="w-full bg-muted/50 py-4">
      <Card className="max-w-5xl mx-auto border shadow-sm">
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold mb-3">About Resume Skill Extractor</h2>
          
          <p className="text-muted-foreground mb-4">
            This project is a Resume Skill Extractor application. It extracts skills from resume PDFs
            using a backend API service and presents them in a clean, searchable interface. Upload your
            resume to identify key skills that can be highlighted in your job applications.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 mt-4">
            <div>
              <h3 className="font-medium text-lg mb-2">Project Resources</h3>
              <ul className="space-y-2">
                <li>
                  <a 
                    href="https://github.com/Abhi110704/Resume-Skill-Extractor" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-primary hover:underline"
                  >
                    <Github className="h-4 w-4" />
                    <span>Project GitHub Repository</span>
                  </a>
                </li>
                <li>
                  <a 
                    href="https://resume-backend-atll.onrender.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-primary hover:underline"
                  >
                    <ExternalLink className="h-4 w-4" />
                    <span>Backend Service</span>
                  </a>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-medium text-lg mb-2">How it Works</h3>
              <ol className="list-decimal ml-5 space-y-1 text-muted-foreground">
                <li>Upload your resume PDF</li>
                <li>Click "Extract Skills" to process your file</li>
                <li>View extracted skills categorized automatically</li>
                <li>Search for specific skills using the search bar</li>
                <li>Access your extraction history anytime</li>
              </ol>
            </div>
            
            <div>
              <h3 className="font-medium text-lg mb-2">External Resume Tools</h3>
              <ul className="space-y-2">
                <li>
                  <a 
                    href="https://www.mployee.me/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-primary hover:underline"
                  >
                    <ExternalLink className="h-4 w-4" />
                    <span>Check Resume on mployee.me</span>
                  </a>
                </li>
                <li>
                  <a 
                    href="https://www.resumeworded.com/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-primary hover:underline"
                  >
                    <ExternalLink className="h-4 w-4" />
                    <span>Try ResumeWorded</span>
                  </a>
                </li>
                <li>
                  <a 
                    href="https://zety.com/resume-check" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-primary hover:underline"
                  >
                    <ExternalLink className="h-4 w-4" />
                    <span>Use Zety Resume Checker</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
