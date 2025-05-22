
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface Agent {
  id: string;
  name: string;
  quotesToday: number;
  closures: number;
  pendingTasks: number;
  status: 'online' | 'busy' | 'away' | 'offline';
}

const agents: Agent[] = [
  { id: '1', name: 'Mohammed Al Qasim', quotesToday: 7, closures: 2, pendingTasks: 3, status: 'online' },
  { id: '2', name: 'Aisha Mahmoud', quotesToday: 5, closures: 3, pendingTasks: 1, status: 'busy' },
  { id: '3', name: 'Rajesh Kumar', quotesToday: 4, closures: 1, pendingTasks: 5, status: 'online' },
  { id: '4', name: 'Fatima Hassan', quotesToday: 3, closures: 2, pendingTasks: 2, status: 'away' },
  { id: '5', name: 'Ali Qamar', quotesToday: 2, closures: 0, pendingTasks: 7, status: 'offline' },
];

const getStatusDot = (status: Agent['status']) => {
  switch (status) {
    case 'online':
      return "bg-green-500";
    case 'busy':
      return "bg-amber-500";
    case 'away':
      return "bg-blue-500";
    case 'offline':
      return "bg-gray-400";
    default:
      return "bg-gray-400";
  }
};

const AgentLeaderboard = () => {
  return (
    <Card className="border shadow-sm h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold">Agent Leaderboard</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[180px]">Agent</TableHead>
              <TableHead className="text-right">Quotes</TableHead>
              <TableHead className="text-right">Closures</TableHead>
              <TableHead className="text-right">Tasks</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {agents.map((agent) => (
              <TableRow key={agent.id}>
                <TableCell className="font-medium">
                  <div className="flex items-center">
                    <span className={cn(
                      "h-2 w-2 rounded-full mr-2",
                      getStatusDot(agent.status)
                    )}></span>
                    {agent.name}
                  </div>
                </TableCell>
                <TableCell className="text-right">{agent.quotesToday}</TableCell>
                <TableCell className="text-right">{agent.closures}</TableCell>
                <TableCell className="text-right">{agent.pendingTasks}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default AgentLeaderboard;
