
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FileTextIcon, PlusCircleIcon, TrashIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const TemplateSettings = () => {
  const [activeTab, setActiveTab] = useState("quotes");
  const [versionControl, setVersionControl] = useState(true);
  const [languageStyle, setLanguageStyle] = useState("formal");
  const [variables, setVariables] = useState([
    { id: 1, name: "ClientName", description: "Client's full name" },
    { id: 2, name: "Agent", description: "Agent's name" },
    { id: 3, name: "ExpiryDate", description: "Policy expiration date" },
    { id: 4, name: "QuoteAmount", description: "Total quote amount" },
    { id: 5, name: "PolicyNumber", description: "Policy reference number" },
  ]);
  
  const [newVariable, setNewVariable] = useState({ name: "", description: "" });
  
  const handleAddVariable = () => {
    if (newVariable.name && newVariable.description) {
      setVariables([...variables, { 
        id: variables.length + 1, 
        name: newVariable.name, 
        description: newVariable.description 
      }]);
      setNewVariable({ name: "", description: "" });
    }
  };
  
  const handleDeleteVariable = (id: number) => {
    setVariables(variables.filter(v => v.id !== id));
  };
  
  const handleSave = () => {
    // Save settings logic
    console.log({
      versionControl,
      languageStyle,
      variables
    });
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <FileTextIcon className="h-6 w-6 text-praktora-burgundy" />
          <CardTitle>Templates & Documents</CardTitle>
        </div>
        <CardDescription>Manage communication templates and document settings</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-medium">Template Categories</h3>
              <p className="text-sm text-muted-foreground">Select a category to manage templates</p>
            </div>
            <Button className="bg-praktora-burgundy hover:bg-praktora-burgundy/90">
              <PlusCircleIcon className="h-4 w-4 mr-2" />
              Upload New Template
            </Button>
          </div>
          
          <Tabs defaultValue="quotes" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-5">
              <TabsTrigger value="quotes">Quotes</TabsTrigger>
              <TabsTrigger value="invoices">Invoices</TabsTrigger>
              <TabsTrigger value="reminders">Reminders</TabsTrigger>
              <TabsTrigger value="claims">Claims</TabsTrigger>
              <TabsTrigger value="welcome">Welcome</TabsTrigger>
            </TabsList>
            
            <TabsContent value={activeTab} className="border rounded-md mt-4 p-4">
              <div className="flex justify-between items-center mb-4">
                <h4 className="font-medium capitalize">{activeTab} Templates</h4>
                <Badge variant="outline">3 templates</Badge>
              </div>
              
              <div className="space-y-6">
                <div>
                  <Label htmlFor="default-template" className="text-sm">Default {activeTab} template by class</Label>
                  <div className="grid grid-cols-2 gap-4 mt-2">
                    <Select defaultValue="motor">
                      <SelectTrigger>
                        <SelectValue placeholder="Select insurance class" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="motor">Motor Insurance</SelectItem>
                        <SelectItem value="medical">Group Medical</SelectItem>
                        <SelectItem value="property">Property</SelectItem>
                        <SelectItem value="yacht">Yacht</SelectItem>
                      </SelectContent>
                    </Select>
                    
                    <Select defaultValue="standard">
                      <SelectTrigger>
                        <SelectValue placeholder="Select template" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="standard">Standard Template</SelectItem>
                        <SelectItem value="premium">Premium Client Template</SelectItem>
                        <SelectItem value="brief">Brief Template</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <p className="text-sm italic text-muted-foreground">
                  Preview and edit templates by uploading or selecting them above
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
        
        <div className="space-y-4">
          <h3 className="text-base font-medium">Variable Management</h3>
          <p className="text-sm text-muted-foreground">Define variables that can be used in your templates</p>
          
          <div className="flex gap-4 items-end mb-4">
            <div className="flex-1">
              <Label htmlFor="var-name" className="text-sm">Variable Name</Label>
              <Input 
                id="var-name"
                value={newVariable.name}
                onChange={(e) => setNewVariable({...newVariable, name: e.target.value})}
                placeholder="e.g., ClientName"
              />
            </div>
            
            <div className="flex-1">
              <Label htmlFor="var-desc" className="text-sm">Description</Label>
              <Input 
                id="var-desc"
                value={newVariable.description}
                onChange={(e) => setNewVariable({...newVariable, description: e.target.value})}
                placeholder="e.g., Client's full name"
              />
            </div>
            
            <Button 
              onClick={handleAddVariable}
              disabled={!newVariable.name || !newVariable.description}
              className="bg-praktora-burgundy hover:bg-praktora-burgundy/90"
            >
              Add Variable
            </Button>
          </div>
          
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Variable</TableHead>
                <TableHead>Description</TableHead>
                <TableHead className="w-24">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {variables.map((variable) => (
                <TableRow key={variable.id}>
                  <TableCell><code>{'{{' + variable.name + '}}'}</code></TableCell>
                  <TableCell>{variable.description}</TableCell>
                  <TableCell>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleDeleteVariable(variable.id)}
                    >
                      <TrashIcon className="h-4 w-4 text-red-500" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        
        <div className="grid grid-cols-2 gap-6">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="version-control" className="text-base font-medium">Version Control</Label>
              <p className="text-sm text-muted-foreground">Keep track of template changes over time</p>
            </div>
            <Switch 
              id="version-control" 
              checked={versionControl} 
              onCheckedChange={setVersionControl}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="language-style" className="text-base font-medium">Language Style</Label>
              <p className="text-sm text-muted-foreground">Tone of voice for communications</p>
            </div>
            <Select
              value={languageStyle}
              onValueChange={setLanguageStyle}
            >
              <SelectTrigger className="w-36">
                <SelectValue placeholder="Select style" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="formal">Formal</SelectItem>
                <SelectItem value="friendly">Friendly</SelectItem>
                <SelectItem value="short">Short-form</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <Button 
            onClick={handleSave}
            className="bg-praktora-burgundy hover:bg-praktora-burgundy/90"
          >
            Save Template Settings
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default TemplateSettings;
