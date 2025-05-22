
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type LinkedEntity = {
  id: string;
  name: string;
  relationship: string;
  policiesCount: number;
  claimsCount: number;
  activeLinks: number;
};

const LinkedEntities = () => {
  // Sample data - would be replaced with real data from API
  const linkedEntities: LinkedEntity[] = [
    {
      id: "1",
      name: "TITAN GROUP",
      relationship: "Group Owner",
      policiesCount: 8,
      claimsCount: 3,
      activeLinks: 5
    },
    {
      id: "2",
      name: "Mohammed Al Maktoum",
      relationship: "Family Member",
      policiesCount: 2,
      claimsCount: 0,
      activeLinks: 1
    },
    {
      id: "3",
      name: "Al Maktoum Trading",
      relationship: "Director",
      policiesCount: 5,
      claimsCount: 2,
      activeLinks: 3
    },
    {
      id: "4",
      name: "Fatima Al Maktoum",
      relationship: "Family Member",
      policiesCount: 1,
      claimsCount: 1,
      activeLinks: 1
    }
  ];

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Linked Entities</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {linkedEntities.map((entity) => (
            <div 
              key={entity.id}
              className="p-3 bg-background rounded-md border border-border hover:bg-accent/50 cursor-pointer transition-colors"
            >
              <div className="flex justify-between items-start">
                <p className="font-medium">{entity.name}</p>
                <Badge variant="outline">{entity.relationship}</Badge>
              </div>
              <div className="text-sm text-muted-foreground mt-2 flex gap-4">
                <div>
                  <span className="font-medium text-foreground">{entity.policiesCount}</span> policies
                </div>
                <div>
                  <span className="font-medium text-foreground">{entity.claimsCount}</span> claims
                </div>
                <div>
                  <span className="font-medium text-foreground">{entity.activeLinks}</span> active links
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default LinkedEntities;
