'use client';

import * as React from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from './ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Download } from 'lucide-react';
import { exportToCsv } from '@/lib/csv-export';

interface DataTableProps {
  data: any[];
}

// A new component to render the object tree in a readable format
const DetailsView = ({ data }: { data: object }) => {
  const renderValue = (key: string, value: any) => {
    if (typeof value === 'boolean') {
      return (
        <Badge variant={value ? 'secondary' : 'outline'} className={value ? "text-green-700" : "text-red-700"}>
          {value ? 'Yes' : 'No'}
        </Badge>
      );
    }
    if (key === 'doctor_notes') {
        return <p className="text-foreground whitespace-pre-wrap">{String(value)}</p>;
    }
    if (typeof value === 'object' && value !== null) {
      return <DetailsView data={value} />;
    }
    return <span className="text-foreground">{String(value)}</span>;
  };

  const entries = Object.entries(data);
  // Move doctor_notes to the end
  const notesIndex = entries.findIndex(([key]) => key === 'doctor_notes');
  let notesEntry;
  if (notesIndex > -1) {
    notesEntry = entries.splice(notesIndex, 1)[0];
    entries.push(notesEntry);
  }


  return (
    <ul className="space-y-2 pl-4">
      {entries.map(([key, value]) => {
        // Don't display patientId and diagnosis again as they are already in the main table
        if (key === 'patientId' || key === 'diagnosis' || key === 'age' || key === 'gender') return null;

        return (
          <li key={key} className="flex flex-col items-start gap-1">
            <span className="font-semibold capitalize text-muted-foreground">
              {key.replace(/([A-Z])/g, ' $1').replace(/_/g, ' ')}:
            </span>
            {renderValue(key, value)}
          </li>
        );
      })}
    </ul>
  );
};


export function DataTable({ data }: DataTableProps) {

  const handleExport = () => {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    exportToCsv(data, `neurogen-data-${timestamp}`);
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
            <CardTitle>Generated Medical Records</CardTitle>
            <CardDescription>A list of synthetic medical records. Expand each row to see details.</CardDescription>
        </div>
        <Button variant="outline" size="sm" onClick={handleExport}>
            <Download className="mr-2 h-4 w-4" />
            Download CSV
        </Button>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          {/* Header Row - Desktop only */}
          <div className="hidden md:flex items-center px-4 py-3 font-medium text-muted-foreground bg-muted/50 border-b">
            <div className="w-[25%]">Patient ID</div>
            <div className="w-[30%]">Diagnosis</div>
            <div className="w-[15%]">Age</div>
            <div className="w-[15%]">Gender</div>
            <div className="w-[15%] text-right">Details</div>
          </div>
          {/* Data Rows */}
          <Accordion type="single" collapsible className="w-full">
            {data.map((item, index) => (
              <AccordionItem value={`item-${index}`} key={item?.patientId || index}>
                 <div className="flex items-center px-4 py-2 md:py-4 flex-wrap">
                    {/* Mobile Card Layout */}
                    <div className="w-full md:w-[25%] mb-2 md:mb-0">
                        <div className="md:hidden text-xs font-medium text-muted-foreground">Patient ID</div>
                        <div className="font-medium">{item?.patientId || 'N/A'}</div>
                    </div>
                    <div className="w-full md:w-[30%] mb-2 md:mb-0">
                       <div className="md:hidden text-xs font-medium text-muted-foreground">Diagnosis</div>
                       <Badge variant="secondary">{item?.diagnosis || 'N/A'}</Badge>
                    </div>
                    <div className="w-1/2 md:w-[15%] mb-2 md:mb-0">
                         <div className="md:hidden text-xs font-medium text-muted-foreground">Age</div>
                        {item?.age || 'N/A'}
                    </div>
                    <div className="w-1/2 md:w-[15%] mb-2 md:mb-0">
                        <div className="md:hidden text-xs font-medium text-muted-foreground">Gender</div>
                        {item?.gender || 'N/A'}
                    </div>
                    {/* Shared Trigger */}
                    <div className="w-full md:w-[15%] flex justify-end">
                      <AccordionTrigger className="w-full md:w-auto mt-2 md:mt-0 justify-center">View Details</AccordionTrigger>
                    </div>
                 </div>
                <AccordionContent>
                    <div className="p-6 bg-muted/50 border-t">
                        <h4 className="font-semibold mb-4 text-base">Record Details:</h4>
                        <DetailsView data={item} />
                    </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </CardContent>
    </Card>
  );
}
