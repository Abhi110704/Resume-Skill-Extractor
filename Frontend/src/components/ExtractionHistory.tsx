
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SkillChip } from "./SkillChip";
import { Trash2, Clock, FileText } from "lucide-react";
import { format } from "date-fns";

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

type ExtractionHistoryProps = {
  history: ExtractionResult[];
  onRemoveItem: (id: string) => void;
};

export function ExtractionHistory({ history, onRemoveItem }: ExtractionHistoryProps) {
  if (history.length === 0) {
    return (
      <Card className="mt-6">
        <CardContent className="pt-6 text-center text-muted-foreground">
          <Clock className="h-10 w-10 mx-auto mb-2" />
          <p>No extraction history yet</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4 mt-6">
      <h2 className="text-xl font-semibold">Extraction History</h2>
      
      {history.map((item) => (
        <Card key={item.id} className="overflow-hidden">
          <CardHeader className="bg-muted/30 pb-3">
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <CardTitle className="flex items-center gap-2 text-base font-medium">
                  <FileText className="h-4 w-4" />
                  {item.filename}
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  {item.date}
                </p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="text-muted-foreground hover:text-destructive rounded-full"
                onClick={() => onRemoveItem(item.id)}
              >
                <Trash2 className="h-4 w-4" />
                <span className="sr-only">Delete</span>
              </Button>
            </div>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="flex flex-wrap">
              {item.skills.map((skill) => (
                <SkillChip key={skill.name} skill={skill.name} />
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
