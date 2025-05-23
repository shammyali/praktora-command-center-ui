
import { useState } from "react";
import { Check, Clock, Search, Star } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { DocumentType, DocumentStatus, DocumentSource, SavedSearch } from "@/types/documentTypes";
import { Card, CardContent } from "../ui/card";
import { savedSearches } from "@/data/documentsData";

interface DocumentFilterProps {
  onFilterChange: (filters: any) => void;
}

const DocumentFilterSidebar = ({ onFilterChange }: DocumentFilterProps) => {
  const [activeSearch, setActiveSearch] = useState<string | null>(null);
  const [searchText, setSearchText] = useState("");
  const [selectedTypes, setSelectedTypes] = useState<DocumentType[]>([]);
  const [selectedStatuses, setSelectedStatuses] = useState<DocumentStatus[]>([]);
  const [selectedSources, setSelectedSources] = useState<DocumentSource[]>([]);

  const documentTypes: { value: DocumentType; label: string; count: number }[] = [
    { value: "Policy Schedule", label: "Policy Schedule", count: 105 },
    { value: "Invoice", label: "Invoice", count: 87 },
    { value: "Emirates ID", label: "Emirates ID", count: 42 },
    { value: "Endorsement", label: "Endorsement", count: 38 },
    { value: "Statement of Account", label: "Statement of Account", count: 31 },
    { value: "Quote", label: "Quote", count: 55 },
    { value: "Wordings", label: "Wordings", count: 18 },
    { value: "Passport Copy", label: "Passport Copy", count: 24 },
    { value: "Trade License", label: "Trade License", count: 15 },
    { value: "Proposal", label: "Proposal", count: 7 }
  ];

  const documentStatuses: { value: DocumentStatus; label: string }[] = [
    { value: "Linked", label: "Linked" },
    { value: "Unlinked", label: "Unlinked" },
    { value: "Expired", label: "Expired" },
    { value: "Duplicate", label: "Duplicate" },
    { value: "Suggested", label: "Needs Review" }
  ];

  const documentSources: { value: DocumentSource; label: string; icon: React.ElementType }[] = [
    { value: "Email", label: "Email", icon: Clock },
    { value: "WhatsApp", label: "WhatsApp", icon: Clock },
    { value: "Telegram", label: "Telegram", icon: Clock },
    { value: "Upload", label: "Manual Upload", icon: Clock },
    { value: "PraktoraCore", label: "PraktoraCore", icon: Clock }
  ];

  const handleTypeChange = (checked: boolean, type: DocumentType) => {
    if (checked) {
      setSelectedTypes([...selectedTypes, type]);
    } else {
      setSelectedTypes(selectedTypes.filter(t => t !== type));
    }
  };

  const handleStatusChange = (checked: boolean, status: DocumentStatus) => {
    if (checked) {
      setSelectedStatuses([...selectedStatuses, status]);
    } else {
      setSelectedStatuses(selectedStatuses.filter(s => s !== status));
    }
  };

  const handleSourceChange = (checked: boolean, source: DocumentSource) => {
    if (checked) {
      setSelectedSources([...selectedSources, source]);
    } else {
      setSelectedSources(selectedSources.filter(s => s !== source));
    }
  };

  const applyFilters = () => {
    const filters = {
      searchText,
      types: selectedTypes,
      statuses: selectedStatuses,
      sources: selectedSources
    };
    onFilterChange(filters);
  };

  const clearFilters = () => {
    setSearchText("");
    setSelectedTypes([]);
    setSelectedStatuses([]);
    setSelectedSources([]);
    setActiveSearch(null);
    onFilterChange({});
  };

  const applySavedSearch = (search: SavedSearch) => {
    setActiveSearch(search.id);
    
    if (search.query.types) {
      setSelectedTypes(search.query.types);
    }
    
    if (search.query.status) {
      setSelectedStatuses(search.query.status);
    }
    
    if (search.query.sources) {
      setSelectedSources(search.query.sources);
    }
    
    if (search.query.searchText) {
      setSearchText(search.query.searchText);
    }
    
    onFilterChange({
      searchText: search.query.searchText || "",
      types: search.query.types || [],
      statuses: search.query.status || [],
      sources: search.query.sources || [],
      client: search.query.client,
      workflow: search.query.workflow,
      taggedBy: search.query.taggedBy,
      dateRange: search.query.dateRange
    });
  };

  return (
    <div className="w-64 h-full bg-white border-r overflow-y-auto p-4">
      <div className="space-y-4">
        <div>
          <h4 className="font-medium mb-2">Search Documents</h4>
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search all documents..."
              className="pl-8"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>
        </div>

        <div className="flex justify-between">
          <Button size="sm" onClick={applyFilters} className="bg-praktora-burgundy hover:bg-praktora-burgundy/90">
            Apply Filters
          </Button>
          <Button size="sm" variant="outline" onClick={clearFilters}>
            Clear
          </Button>
        </div>

        <Separator />

        <div>
          <h4 className="font-medium mb-2">Saved Searches</h4>
          <div className="space-y-2">
            {savedSearches.map((search) => (
              <Button
                key={search.id}
                variant={activeSearch === search.id ? "secondary" : "outline"}
                size="sm"
                className="w-full justify-start text-left"
                onClick={() => applySavedSearch(search)}
              >
                <Star className="h-4 w-4 mr-2" />
                {search.name}
              </Button>
            ))}
          </div>
        </div>

        <Separator />

        <div>
          <h4 className="font-medium mb-2">Document Type</h4>
          <div className="space-y-2">
            {documentTypes.map((type) => (
              <div key={type.value} className="flex items-center space-x-2">
                <Checkbox
                  id={`type-${type.value}`}
                  checked={selectedTypes.includes(type.value)}
                  onCheckedChange={(checked) => handleTypeChange(checked as boolean, type.value)}
                />
                <Label
                  htmlFor={`type-${type.value}`}
                  className="flex-1 text-sm font-normal cursor-pointer"
                >
                  {type.label}
                </Label>
                <span className="text-xs text-muted-foreground">{type.count}</span>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        <div>
          <h4 className="font-medium mb-2">Status</h4>
          <div className="space-y-2">
            {documentStatuses.map((status) => (
              <div key={status.value} className="flex items-center space-x-2">
                <Checkbox
                  id={`status-${status.value}`}
                  checked={selectedStatuses.includes(status.value)}
                  onCheckedChange={(checked) => handleStatusChange(checked as boolean, status.value)}
                />
                <Label
                  htmlFor={`status-${status.value}`}
                  className="flex-1 text-sm font-normal cursor-pointer"
                >
                  {status.label}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        <div>
          <h4 className="font-medium mb-2">Source</h4>
          <div className="space-y-2">
            {documentSources.map((source) => (
              <div key={source.value} className="flex items-center space-x-2">
                <Checkbox
                  id={`source-${source.value}`}
                  checked={selectedSources.includes(source.value)}
                  onCheckedChange={(checked) => handleSourceChange(checked as boolean, source.value)}
                />
                <Label
                  htmlFor={`source-${source.value}`}
                  className="flex-1 text-sm font-normal cursor-pointer"
                >
                  {source.label}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        <div>
          <h4 className="font-medium mb-2">Date Added</h4>
          <div className="space-y-2">
            <RadioGroup defaultValue="all">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="all" id="date-all" />
                <Label htmlFor="date-all" className="cursor-pointer">All time</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="today" id="date-today" />
                <Label htmlFor="date-today" className="cursor-pointer">Today</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="week" id="date-week" />
                <Label htmlFor="date-week" className="cursor-pointer">This week</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="month" id="date-month" />
                <Label htmlFor="date-month" className="cursor-pointer">This month</Label>
              </div>
            </RadioGroup>
          </div>
        </div>

        <Separator />

        <div>
          <h4 className="font-medium mb-2">Tagged By</h4>
          <div className="space-y-2">
            <RadioGroup defaultValue="all">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="all" id="tagged-all" />
                <Label htmlFor="tagged-all" className="cursor-pointer">All</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="agent" id="tagged-agent" />
                <Label htmlFor="tagged-agent" className="cursor-pointer">Agent</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="ai" id="tagged-ai" />
                <Label htmlFor="tagged-ai" className="cursor-pointer">P²RA AI</Label>
              </div>
            </RadioGroup>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentFilterSidebar;
