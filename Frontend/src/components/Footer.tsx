
import React from 'react';

export function Footer() {
  return (
    <footer className="mt-auto py-4 px-4 border-t border-border">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row justify-between items-center">
        <p className="text-sm text-muted-foreground mb-2 sm:mb-0">
          &copy; {2025} Resume Skill Extractor
        </p>
        
        <div className="flex items-center gap-2">
          <p className="text-sm text-muted-foreground">
            Created by 
            <a 
              href="https://github.com/Abhi110704" 
              target="_blank" 
              rel="noopener noreferrer"
              className="mx-1 text-primary hover:underline"
            >
              Abhiyanshu Anand
            </a>
            ,
            <a 
              href="https://github.com/Sanskar2301" 
              target="_blank" 
              rel="noopener noreferrer"
              className="mx-1 text-primary hover:underline"
            >
              Sanskar Singh
            </a>
            ,
            <a 
              href="https://github.com/abhishek-si-ngh" 
              target="_blank" 
              rel="noopener noreferrer"
              className="mx-1 text-primary hover:underline"
            >
              Abhishek Singh
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
