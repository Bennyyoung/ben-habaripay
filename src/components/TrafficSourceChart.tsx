import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts';

const data = [
  { month: 'March 1', value: 150 },
  { month: 'March 2', value: 300 },
  { month: 'March 3', value: 200 },
  { month: 'March 4', value: 400 },
  { month: 'March 5', value: 350 },
  { month: 'March 6', value: 450 },
  { month: 'March 7', value: 280 },
];

export function TrafficSourceChart() {
  return (
    <Card className="border border-gray-200">
      <CardHeader>
        <CardTitle>Traffic Source</CardTitle>
      </CardHeader>
      <CardContent>
        <div style={{ width: '100%', height: 300 }}>
          <ResponsiveContainer>
            <BarChart data={data} barCategoryGap="20%">
              <XAxis 
                dataKey="month" 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12 }}
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12 }}
                domain={[0, 500]}
                tickCount={6}
              />
              <Bar 
                dataKey="value" 
                fill="#22c55e"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}