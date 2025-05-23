
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useState, useEffect } from "react";

type LinkedEntity = {
  id: string;
  name: string;
  relationship: string;
  policiesCount: number;
  claimsCount: number;
  activeLinks: number;
};

interface LinkedEntitiesProps {
  customerId: string;
}

const LinkedEntities = ({ customerId }: LinkedEntitiesProps) => {
  const [linkedEntities, setLinkedEntities] = useState<LinkedEntity[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Load linked entities when customerId changes
  useEffect(() => {
    const fetchLinkedEntities = async () => {
      setIsLoading(true);
      try {
        // In a real implementation, this would be an API call
        // For now, use mock data
        await new Promise(resolve => setTimeout(resolve, 300));
        
        // Mock data based on customerId
        // In a real app, you'd fetch this from your API
        const mockEntities: Record<string, LinkedEntity[]> = {
          "1": [
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
          ],
          "2": [
            {
              id: "1",
              name: "TITAN GROUP",
              relationship: "Group Member",
              policiesCount: 2,
              claimsCount: 0,
              activeLinks: 2
            },
            {
              id: "5",
              name: "Ahmed Al Maktoum",
              relationship: "Family Member",
              policiesCount: 3,
              claimsCount: 1,
              activeLinks: 2
            }
          ],
          "3": [],
          "4": [
            {
              id: "1",
              name: "Ahmed Al Maktoum",
              relationship: "Director",
              policiesCount: 8,
              claimsCount: 3,
              activeLinks: 5
            },
            {
              id: "2",
              name: "Mohammed Al Maktoum",
              relationship: "Director",
              policiesCount: 2,
              claimsCount: 0,
              activeLinks: 1
            }
          ]
        };
        
        // Set linked entities based on customerId
        setLinkedEntities(mockEntities[customerId] || []);
      } catch (error) {
        console.error("Error fetching linked entities:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (customerId) {
      fetchLinkedEntities();
    }
  }, [customerId]);

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Linked Entities</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="text-center p-4">Loading linked entities...</div>
        ) : linkedEntities.length > 0 ? (
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
        ) : (
          <div className="text-center p-4 text-muted-foreground">
            No linked entities found for this customer.
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default LinkedEntities;
