import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';

const data = [
  { month: 'March 1', acquisition: 200, cost: 150 },
  { month: 'March 2', acquisition: 300, cost: 280 },
  { month: 'March 3', acquisition: 450, cost: 420 },
  { month: 'March 4', acquisition: 280, cost: 350 },
  { month: 'March 5', acquisition: 520, cost: 480 },
  { month: 'March 6', acquisition: 680, cost: 650 },
  { month: 'March 7', acquisition: 480, cost: 520 },
];

export function AcquisitionChart() {
  return (
    <Card className="border border-gray-200">
      <CardHeader>
        <CardTitle>Acquisition vs Cost</CardTitle>
      </CardHeader>
      <CardContent>
        <div style={{ width: '100%', height: 300 }}>
          <ResponsiveContainer>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
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
              />
              <Line 
                type="monotone" 
                dataKey="acquisition" 
                stroke="#22c55e" 
                strokeWidth={3}
                dot={false}
                fill="rgba(34, 197, 94, 0.1)"
              />
              <Line 
                type="monotone" 
                dataKey="cost" 
                stroke="#3b82f6" 
                strokeWidth={3}
                dot={false}
                fill="rgba(59, 130, 246, 0.1)"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}