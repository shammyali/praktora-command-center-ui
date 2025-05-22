
import { useState } from "react";
import { conditionFields } from "@/data/automationsData";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, ChevronsRight } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

interface AutomationsConditionPanelProps {
  conditions: any[];
  onConditionsChange: (conditions: any[]) => void;
}

const ConditionRow = ({ condition, index, onUpdate, onRemove }: any) => {
  const field = conditionFields.find(f => f.id === condition.field);
  
  return (
    <div className="flex items-center gap-2 mb-2">
      <Select 
        value={condition.field} 
        onValueChange={(value) => onUpdate(index, { ...condition, field: value })}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select field" />
        </SelectTrigger>
        <SelectContent>
          {conditionFields.map(field => (
            <SelectItem key={field.id} value={field.id}>{field.name}</SelectItem>
          ))}
        </SelectContent>
      </Select>
      
      <Select 
        value={condition.operator} 
        onValueChange={(value: any) => onUpdate(index, { ...condition, operator: value })}
      >
        <SelectTrigger className="w-[150px]">
          <SelectValue placeholder="Operator" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="equals">Equals</SelectItem>
          <SelectItem value="not_equals">Not Equals</SelectItem>
          <SelectItem value="greater_than">Greater Than</SelectItem>
          <SelectItem value="less_than">Less Than</SelectItem>
          <SelectItem value="contains">Contains</SelectItem>
          <SelectItem value="not_contains">Not Contains</SelectItem>
        </SelectContent>
      </Select>
      
      {field?.type === "select" ? (
        <Select 
          value={condition.value as string} 
          onValueChange={(value) => onUpdate(index, { ...condition, value })}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select value" />
          </SelectTrigger>
          <SelectContent>
            {field.options?.map(option => (
              <SelectItem key={option} value={option}>{option}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      ) : field?.type === "boolean" ? (
        <div className="flex items-center space-x-2">
          <Checkbox
            id={`condition-value-${index}`}
            checked={condition.value as boolean}
            onCheckedChange={(checked) => 
              onUpdate(index, { ...condition, value: checked })
            }
          />
          <label
            htmlFor={`condition-value-${index}`}
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            True
          </label>
        </div>
      ) : (
        <Input 
          type={field?.type === "number" ? "number" : "text"}
          placeholder="Value"
          className="w-[180px]"
          value={condition.value as string}
          onChange={(e) => onUpdate(index, { 
            ...condition, 
            value: field?.type === "number" ? Number(e.target.value) : e.target.value 
          })}
        />
      )}
      
      <Button variant="ghost" size="icon" onClick={() => onRemove(index)} className="text-red-500">
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
};

const AutomationsConditionPanel = ({ conditions, onConditionsChange }: AutomationsConditionPanelProps) => {
  const addCondition = () => {
    onConditionsChange([
      ...conditions,
      {
        id: `cond_${Date.now()}`,
        field: conditionFields[0].id,
        operator: "equals",
        value: conditionFields[0].type === "boolean" ? false : ""
      }
    ]);
  };
  
  const updateCondition = (index: number, updatedCondition: any) => {
    const newConditions = [...conditions];
    newConditions[index] = updatedCondition;
    onConditionsChange(newConditions);
  };
  
  const removeCondition = (index: number) => {
    const newConditions = conditions.filter((_, i) => i !== index);
    onConditionsChange(newConditions);
  };

  return (
    <div className="w-1/3 border-r p-4 overflow-y-auto">
      <h3 className="text-lg font-medium mb-3">Conditions</h3>
      <p className="text-sm text-muted-foreground mb-4">
        Add filters to determine when this automation should run (optional)
      </p>
      
      <div className="space-y-3">
        {conditions.length === 0 ? (
          <div className="flex flex-col items-center justify-center border border-dashed rounded-md p-8 text-center">
            <ChevronsRight className="h-10 w-10 text-muted-foreground mb-2" />
            <p className="text-sm text-muted-foreground mb-2">No conditions added yet</p>
            <p className="text-xs text-muted-foreground mb-4">
              Without conditions, this automation will run for every trigger event
            </p>
            <Button onClick={addCondition} variant="outline" size="sm" className="mt-2">
              <Plus className="h-4 w-4 mr-2" /> Add First Condition
            </Button>
          </div>
        ) : (
          <>
            <div className="space-y-4">
              <div>
                {conditions.map((condition, index) => (
                  <ConditionRow
                    key={condition.id || index}
                    condition={condition}
                    index={index}
                    onUpdate={updateCondition}
                    onRemove={removeCondition}
                  />
                ))}
              </div>
            </div>
            
            <Button onClick={addCondition} variant="outline" size="sm" className="w-full mt-4">
              <Plus className="h-4 w-4 mr-2" /> Add Another Condition
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default AutomationsConditionPanel;
