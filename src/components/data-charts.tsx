'use client';

import * as React from 'react';
import { Bar, BarChart, XAxis, YAxis, Tooltip, Legend, CartesianGrid, Pie, PieChart, Cell } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';

interface DataChartsProps {
  data: any[];
}

const COLORS = ['#4682B4', '#ADD8E6', '#87CEEB', '#6495ED', '#00BFFF', '#1E90FF', '#B0C4DE', '#B0E0E6', '#5F9EA0', '#708090'];

export function DataCharts({ data }: DataChartsProps) {

  const ageDistribution = React.useMemo(() => {
    const ageGroups = {
      '20-29': 0,
      '30-39': 0,
      '40-49': 0,
      '50-59': 0,
      '60-69': 0,
      '70-79': 0,
      '80+': 0,
    };
    data.forEach(item => {
      const age = item?.age;
      if (age >= 20 && age <= 29) ageGroups['20-29']++;
      else if (age >= 30 && age <= 39) ageGroups['30-39']++;
      else if (age >= 40 && age <= 49) ageGroups['40-49']++;
      else if (age >= 50 && age <= 59) ageGroups['50-59']++;
      else if (age >= 60 && age <= 69) ageGroups['60-69']++;
      else if (age >= 70 && age <= 79) ageGroups['70-79']++;
      else if (age >= 80) ageGroups['80+']++;
    });
    return Object.entries(ageGroups).map(([name, count]) => ({ name, count }));
  }, [data]);

  const diseaseBreakdown = React.useMemo(() => {
    const diseaseCounts: { [key: string]: number } = {};
    data.forEach(item => {
      const diagnosis = item?.diagnosis;
      if (diagnosis) {
        diseaseCounts[diagnosis] = (diseaseCounts[diagnosis] || 0) + 1;
      }
    });
    return Object.entries(diseaseCounts).map(([name, value]) => ({ name, value }));
  }, [data]);
  
  const genderBreakdown = React.useMemo(() => {
    const genderCounts: { [key: string]: number } = {};
    data.forEach(item => {
      const gender = item?.gender;
      if (gender) {
        genderCounts[gender] = (genderCounts[gender] || 0) + 1;
      }
    });
    return Object.entries(genderCounts).map(([name, value]) => ({ name, value }));
  }, [data]);

  const chartConfig = {
    count: {
      label: "Count",
      color: "hsl(var(--chart-1))",
    },
  };
  
  const pieChartConfig = {
    value: {
        label: "Records",
    },
    ...diseaseBreakdown.reduce((acc, cur) => ({...acc, [cur.name]: {label: cur.name, color: COLORS[Object.keys(acc).length % COLORS.length]}}), {}),
    ...genderBreakdown.reduce((acc, cur) => ({...acc, [cur.name]: {label: cur.name, color: COLORS[Object.keys(acc).length % COLORS.length]}}), {})
  }

  return (
    <div className="grid gap-6 sm:grid-cols-1 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Age Distribution</CardTitle>
          <CardDescription>Distribution of patient ages across the generated dataset.</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[300px] w-full">
            <BarChart data={ageDistribution} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
              <CartesianGrid vertical={false} />
              <XAxis dataKey="name" tickLine={false} tickMargin={10} axisLine={false} />
              <YAxis allowDecimals={false} tickLine={false} axisLine={false} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="count" fill="var(--color-count)" radius={4} />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Disease Breakdown</CardTitle>
          <CardDescription>Breakdown of generated records by disease type.</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={pieChartConfig} className="h-[300px] w-full">
            <PieChart>
              <ChartTooltip content={<ChartTooltipContent nameKey="name" />} />
              <Pie data={diseaseBreakdown} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
                {diseaseBreakdown.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Legend />
            </PieChart>
          </ChartContainer>
        </CardContent>
      </Card>
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>Gender Breakdown</CardTitle>
          <CardDescription>Distribution of patient genders in the dataset.</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={pieChartConfig} className="h-[300px] w-full">
            <PieChart>
              <ChartTooltip content={<ChartTooltipContent nameKey="name" />} />
              <Pie data={genderBreakdown} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={5} label>
                 {genderBreakdown.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Legend />
            </PieChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}
