
import { ThemeToggle } from "./ThemeToggle";
import { Github } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-md border-b border-border py-3 px-4 md:px-6">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        <h1 className="text-xl md:text-2xl font-bold text-foreground">
          Resume Skill Extractor
        </h1>
        
        <div className="flex items-center gap-2 sm:gap-4">
          <div className="hidden md:flex items-center gap-2">
            <a 
              href="https://github.com/abhishek-si-ngh" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
            >
              <Github className="h-4 w-4" />
              <span className="text-xs">Abhishek</span>
            </a>
            
            <a 
              href="https://github.com/Abhi110704" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
            >
              <Github className="h-4 w-4" />
              <span className="text-xs">Abhiyanshu</span>
            </a>
            
            <a 
              href="https://github.com/Sanskar2301" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
            >
              <Github className="h-4 w-4" />
              <span className="text-xs">Sanskar</span>
            </a>
          </div>
          
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
