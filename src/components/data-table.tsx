'use client';

import * as React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
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
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[150px]">Patient ID</TableHead>
                  <TableHead>Diagnosis</TableHead>
                  <TableHead>Age</TableHead>
                  <TableHead>Gender</TableHead>
                  <TableHead className="w-[100px] text-right">Details</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <Accordion type="single" collapsible className="w-full">
                  {data.map((item, index) => (
                    <AccordionItem value={`item-${index}`} key={item?.patientId || index}>
                      <TableRow>
                          <TableCell className="font-medium">{item?.patientId || 'N/A'}</TableCell>
                          <TableCell>
                              <Badge variant="secondary">{item?.diagnosis || 'N/A'}</Badge>
                          </TableCell>
                          <TableCell>{item?.age || 'N/A'}</TableCell>
                          <TableCell>{item?.gender || 'N/A'}</TableCell>
                          <TableCell className="text-right">
                              <AccordionTrigger>View</AccordionTrigger>
                          </TableCell>
                      </TableRow>
                      <TableRow>
                          <TableCell colSpan={5} className="p-0">
                              <AccordionContent>
                                  <div className="p-6 bg-muted/50">
                                      <h4 className="font-semibold mb-4 text-base">Record Details:</h4>
                                      <DetailsView data={item} />
                                  </div>
                              </AccordionContent>
                          </TableCell>
                      </TableRow>
                    </AccordionItem>
                  ))}
                </Accordion>
              </TableBody>
            </Table>
        </div>
      </CardContent>
    </Card>
  );
}
