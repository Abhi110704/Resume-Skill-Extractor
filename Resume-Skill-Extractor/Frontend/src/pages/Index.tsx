
import { useState, useEffect } from "react";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Header } from "@/components/Header";
import { InfoSection } from "@/components/InfoSection";
import { ResumeExtractor } from "@/components/ResumeExtractor";
import { ExtractionHistory } from "@/components/ExtractionHistory";
import { FloatingDecorations } from "@/components/FloatingDecorations";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { History } from "lucide-react";

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

const Index = () => {
  // Remove infoVisible state as we're always showing it now
  const [historyVisible, setHistoryVisible] = useState(false);
  const [extractionHistory, setExtractionHistory] = useState<ExtractionResult[]>([]);

  // Load extraction history from localStorage on component mount
  useEffect(() => {
    const savedHistory = localStorage.getItem("extractionHistory");
    if (savedHistory) {
      try {
        setExtractionHistory(JSON.parse(savedHistory));
      } catch (error) {
        console.error("Error parsing extraction history:", error);
        // Reset if corrupted
        localStorage.removeItem("extractionHistory");
      }
    }
  }, []);

  // Save extraction history to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("extractionHistory", JSON.stringify(extractionHistory));
  }, [extractionHistory]);

  const handleExtracted = (result: ExtractionResult) => {
    setExtractionHistory(prev => [result, ...prev]);
  };

  const removeHistoryItem = (id: string) => {
    setExtractionHistory(prev => prev.filter(item => item.id !== id));
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen flex flex-col bg-background">
        <FloatingDecorations />
        
        <Header />
        
        {/* Always show InfoSection */}
        <InfoSection />
        
        <main className="flex-1 max-w-5xl w-full mx-auto px-4 py-6 md:px-6">
          <ResumeExtractor onExtracted={handleExtracted} />
          
          <div className="mt-6 text-center">
            <Button
              variant="outline"
              onClick={() => setHistoryVisible(prev => !prev)}
              className="rounded-full"
            >
              <History className="h-4 w-4 mr-2" />
              {historyVisible ? "Hide History" : "Show History"} 
              {!historyVisible && extractionHistory.length > 0 && (
                <span className="ml-2 bg-primary text-primary-foreground rounded-full px-2 py-0.5 text-xs">
                  {extractionHistory.length}
                </span>
              )}
            </Button>
          </div>
          
          {historyVisible && (
            <ExtractionHistory 
              history={extractionHistory}
              onRemoveItem={removeHistoryItem}
            />
          )}
        </main>
        
        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default Index;
