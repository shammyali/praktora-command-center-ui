
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { documentAnalytics } from "@/data/documentsData";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const DocumentAnalyticsPanel = () => {
  // Prepare data for source distribution pie chart
  const sourceData = Object.entries(documentAnalytics.documentsBySource).map(
    ([name, value]) => ({
      name,
      value,
    })
  );

  // Prepare data for type distribution pie chart
  const typeData = Object.entries(documentAnalytics.documentsByType)
    .map(([name, value]) => ({
      name,
      value,
    }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 5);

  // Colors for charts
  const COLORS = [
    "#8884d8",
    "#83a6ed",
    "#8dd1e1",
    "#82ca9d",
    "#a4de6c",
    "#d0ed57",
  ];

  return (
    <div className="w-[320px] border-l h-full overflow-y-auto bg-white">
      <div className="p-4 border-b">
        <h2 className="font-semibold text-lg">Document Analytics</h2>
        <p className="text-sm text-gray-500">Real-time document insights</p>
      </div>

      <div className="p-4 space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Documents</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {documentAnalytics.totalDocumentsThisMonth}
              </div>
              <p className="text-xs text-muted-foreground">This month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Linked</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {documentAnalytics.linkedPercentage}%
              </div>
              <p className="text-xs text-muted-foreground">Of total docs</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Upload Trend</CardTitle>
          </CardHeader>
          <CardContent className="pt-2">
            <div className="h-[150px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={documentAnalytics.uploadTrend.slice(-14)}
                  margin={{
                    top: 5,
                    right: 5,
                    left: 0,
                    bottom: 5,
                  }}
                >
                  <XAxis
                    dataKey="date"
                    tickFormatter={(value) => {
                      const date = new Date(value);
                      return `${date.getDate()}/${date.getMonth() + 1}`;
                    }}
                    tick={{ fontSize: 10 }}
                  />
                  <YAxis tick={{ fontSize: 10 }} width={20} />
                  <Tooltip
                    formatter={(value, name) => [value, "Documents"]}
                    labelFormatter={(label) => {
                      const date = new Date(label);
                      return date.toLocaleDateString();
                    }}
                  />
                  <Bar
                    dataKey="count"
                    fill="#9C2D55"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Documents by Source
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-2">
            <div className="h-[180px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={sourceData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) =>
                      `${name} ${(percent * 100).toFixed(0)}%`
                    }
                    outerRadius={60}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {sourceData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Document Types (Top 5)
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-2">
              {typeData.map((type, index) => (
                <div key={index} className="flex items-center">
                  <div
                    className="w-3 h-3 rounded-full mr-2"
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  ></div>
                  <div className="text-xs flex-1 truncate" title={type.name}>
                    {type.name}
                  </div>
                  <div className="text-xs font-medium">{type.value}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">P²RA AI Impact</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-1">
                <div className="text-xs">Auto-tagged</div>
                <div className="text-xs font-medium">
                  {documentAnalytics.autoTaggedPercentage}%
                </div>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-1.5">
                <div
                  className="bg-blue-600 h-1.5 rounded-full"
                  style={{
                    width: `${documentAnalytics.autoTaggedPercentage}%`,
                  }}
                ></div>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <div className="text-xs">OCR Processed</div>
                <div className="text-xs font-medium">
                  {documentAnalytics.ocrProcessedPercentage}%
                </div>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-1.5">
                <div
                  className="bg-green-600 h-1.5 rounded-full"
                  style={{
                    width: `${documentAnalytics.ocrProcessedPercentage}%`,
                  }}
                ></div>
              </div>
            </div>

            <div className="pt-2">
              <div className="flex justify-between items-center text-xs">
                <div>Expired Documents</div>
                <div className="font-medium text-red-600">
                  {documentAnalytics.expiredDocuments}
                </div>
              </div>
              <div className="flex justify-between items-center text-xs mt-1">
                <div>High-Value Invoices</div>
                <div className="font-medium">
                  {documentAnalytics.highValueInvoices}
                </div>
              </div>
              <div className="flex justify-between items-center text-xs mt-1">
                <div>Most Common Type</div>
                <div className="font-medium">
                  {documentAnalytics.mostCommonType}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DocumentAnalyticsPanel;
