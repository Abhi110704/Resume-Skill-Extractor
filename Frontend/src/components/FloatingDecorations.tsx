
import { FileText, Code, Database, Search } from "lucide-react";

export function FloatingDecorations() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-[-1]">
      <FileText className="floating-icon top-[20%] left-[10%] w-12 h-12" style={{ animationDelay: "0s" }} />
      <Code className="floating-icon top-[30%] right-[15%] w-10 h-10" style={{ animationDelay: "1.5s" }} />
      <Database className="floating-icon bottom-[25%] left-[20%] w-8 h-8" style={{ animationDelay: "0.7s" }} />
      <Search className="floating-icon bottom-[15%] right-[10%] w-14 h-14" style={{ animationDelay: "2.1s" }} />
    </div>
  );
}
