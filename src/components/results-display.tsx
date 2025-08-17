'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DataTable } from '@/components/data-table';
import { DataCharts } from '@/components/data-charts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { BrainCircuit, Info, LineChart, Table } from 'lucide-react';

interface ResultsDisplayProps {
  data: any[];
  activeTab: string;
  onTabChange: (value: string) => void;
}

function AboutTabContent() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>About NeuroGen</CardTitle>
                <CardDescription>The Engine for the Next Generation of Neurological AI</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2">
                    <h3 className="font-semibold">The Challenge: Data Scarcity in Neuroscience</h3>
                    <p className="text-muted-foreground">
                        Progress in AI-powered diagnostics for diseases like Alzheimer's, Parkinson's, and PTSD is often blocked by a major hurdle: the lack of large, high-quality, and privacy-compliant datasets. Real patient data is sensitive, rare, and difficult to access, which slows down research and development.
                    </p>
                </div>
                <div className="space-y-2">
                    <h3 className="font-semibold">Our Solution: A Synthetic Data Generation Platform</h3>
                    <p className="text-muted-foreground">
                        NeuroGen tackles this problem head-on. Instead of building a single diagnostic tool, we've created a foundational platform that generates realistic, structured, and safe synthetic data for a wide range of neurological and mental health conditions.
                    </p>
                </div>
                <div className="space-y-2">
                    <h3 className="font-semibold">How NeuroGen Empowers Detection and Research</h3>
                    <p className="text-muted-foreground">
                        By providing an unlimited stream of synthetic data, NeuroGen acts as a catalyst for innovation. Researchers and developers can use this data to:
                    </p>
                    <ul className="list-disc pl-5 text-muted-foreground space-y-1">
                        <li>Train and validate new AI models for early disease detection.</li>
                        <li>Simulate patient populations to test new treatment personalization algorithms.</li>
                        <li>Develop better tools for connecting patients and doctors without compromising privacy.</li>
                    </ul>
                </div>
            </CardContent>
        </Card>
    )
}

export default function ResultsDisplay({ data, activeTab, onTabChange }: ResultsDisplayProps) {
  const isDataAvailable = data.length > 0;
  
  const currentTab = isDataAvailable ? activeTab : 'about';

  return (
    <Tabs value={currentTab} onValueChange={onTabChange} className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="data-table" disabled={!isDataAvailable}>
          <Table className="mr-2" />
          Generated Data
        </TabsTrigger>
        <TabsTrigger value="data-insights" disabled={!isDataAvailable}>
          <LineChart className="mr-2" />
          Data Insights
        </TabsTrigger>
        <TabsTrigger value="about">
          <Info className="mr-2" />
          About
        </TabsTrigger>
      </TabsList>
      <TabsContent value="data-table">
         {isDataAvailable ? (
            <DataTable data={data} />
         ) : (
            <Card className="flex flex-col items-center justify-center text-center p-8 border-dashed h-full mt-2">
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
         )}
      </TabsContent>
      <TabsContent value="data-insights">
        <DataCharts data={data} />
      </TabsContent>
      <TabsContent value="about">
        <AboutTabContent />
      </TabsContent>
    </Tabs>
  );
}
