'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DataTable } from '@/components/data-table';
import { DataCharts } from '@/components/data-charts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { BrainCircuit, LineChart, Table } from 'lucide-react';

interface ResultsDisplayProps {
  data: any[];
}

export default function ResultsDisplay({ data }: ResultsDisplayProps) {
  if (data.length === 0) {
    return (
      <Card className="flex flex-col items-center justify-center text-center p-8 border-dashed h-full">
         <CardHeader>
            <div className="mx-auto bg-secondary p-4 rounded-full">
                <BrainCircuit className="h-12 w-12 text-primary" />
            </div>
            <CardTitle className="mt-4 text-2xl">No Data Generated Yet</CardTitle>
            <CardDescription className="mt-2 max-w-sm">
                Use the controls in the sidebar to generate synthetic medical records. The results will appear here.
            </CardDescription>
         </CardHeader>
      </Card>
    );
  }

  return (
    <Tabs defaultValue="data-table" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="data-table">
          <Table className="mr-2" />
          Generated Data
        </TabsTrigger>
        <TabsTrigger value="data-insights">
          <LineChart className="mr-2" />
          Data Insights
        </TabsTrigger>
      </TabsList>
      <TabsContent value="data-table">
        <DataTable data={data} />
      </TabsContent>
      <TabsContent value="data-insights">
        <DataCharts data={data} />
      </TabsContent>
    </Tabs>
  );
}
