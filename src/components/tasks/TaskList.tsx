import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ArrowUpRight, CheckCircle, AlertCircle, Clock, Bot, User, Cog } from "lucide-react";
import { tasksData } from "@/data/tasksData";
import TaskItem from "./TaskItem";

interface TaskListProps {
  activeTab: string;
  searchQuery: string;
  priorityFilter: string | null;
  sourceFilter: string | null;
}

const TaskList = ({ activeTab, searchQuery, priorityFilter, sourceFilter }: TaskListProps) => {
  const [filteredTasks, setFilteredTasks] = useState(tasksData);

  // Filter tasks based on active tab, search query, and filters
  useEffect(() => {
    let filtered = [...tasksData];
    
    // Filter by tab
    if (activeTab === "my-tasks") {
      filtered = filtered.filter(task => task.assignedTo === "You");
    } else if (activeTab === "by-client") {
      // No additional filtering, will be grouped by client
    } else if (activeTab === "important") {
      filtered = filtered.filter(task => task.priority === "high");
    } else if (activeTab === "overdue") {
      filtered = filtered.filter(task => task.isOverdue);
    } else if (activeTab === "recurring") {
      filtered = filtered.filter(task => task.recurring);
    }
    
    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(
        task => 
          task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          task.client?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          task.linkedTo?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Apply priority filter
    if (priorityFilter) {
      filtered = filtered.filter(task => task.priority === priorityFilter.toLowerCase());
    }
    
    // Apply source filter
    if (sourceFilter) {
      filtered = filtered.filter(task => task.source === sourceFilter);
    }
    
    setFilteredTasks(filtered);
  }, [activeTab, searchQuery, priorityFilter, sourceFilter]);

  // Group tasks by client if needed
  const groupedByClient = activeTab === "by-client" 
    ? filteredTasks.reduce((acc, task) => {
        const client = task.client || "Unassigned";
        if (!acc[client]) {
          acc[client] = [];
        }
        acc[client].push(task);
        return acc;
      }, {} as Record<string, typeof tasksData>)
    : null;

  if (filteredTasks.length === 0) {
    return (
      <div className="text-center p-12 border rounded-md bg-muted/20">
        <h3 className="font-medium text-lg mb-2">No tasks found</h3>
        <p className="text-muted-foreground">
          Try adjusting your filters or create a new task
        </p>
      </div>
    );
  }

  // If grouped by client, render each client's tasks separately
  if (groupedByClient) {
    return (
      <div className="space-y-6">
        {Object.entries(groupedByClient).map(([client, clientTasks]) => (
          <div key={client} className="space-y-3">
            <div className="flex items-center gap-2">
              <h3 className="font-medium">{client}</h3>
              <Badge variant="outline">{clientTasks.length}</Badge>
            </div>
            <div className="space-y-2">
              {clientTasks.map(task => (
                <TaskItem key={task.id} task={task} />
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Otherwise, render as a flat list
  return (
    <div className="space-y-2">
      {filteredTasks.map(task => (
        <TaskItem key={task.id} task={task} />
      ))}
    </div>
  );
};

export default TaskList;
