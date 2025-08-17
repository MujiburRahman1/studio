'use client';

import { useState } from 'react';
import type { FormState } from '@/app/actions';
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarInset,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import GenerationForm from '@/components/generation-form';
import ResultsDisplay from '@/components/results-display';
import { BrainCircuit } from 'lucide-react';

export default function Dashboard() {
  const [allGeneratedData, setAllGeneratedData] = useState<any[]>([]);

  const handleFormAction = (state: FormState) => {
    if (state.data) {
      // Prepend new data to the existing data
      setAllGeneratedData(prevData => [...state.data, ...prevData]);
    }
  };

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full flex-col">
        <div className="flex flex-1 overflow-hidden">
          <Sidebar
            variant="sidebar"
            collapsible="icon"
            className="border-r"
          >
            <SidebarHeader className="items-center justify-between">
              <div className="flex items-center gap-2">
                <BrainCircuit className="text-primary size-7" />
                <h1 className="font-semibold text-xl text-primary whitespace-nowrap group-data-[collapsible=icon]:hidden">
                  NeuroGen
                </h1>
              </div>
              <SidebarTrigger className="group-data-[collapsible=icon]:hidden" />
            </SidebarHeader>
            <SidebarContent>
              <GenerationForm onFormAction={handleFormAction} />
            </SidebarContent>
          </Sidebar>

          <SidebarInset className="flex flex-col">
            <header className="flex h-16 items-center justify-between border-b px-4 md:px-6 shrink-0">
               <h2 className="text-2xl font-semibold text-foreground">Synthetic Data Dashboard</h2>
               <SidebarTrigger className="md:hidden"/>
            </header>
            <main className="flex-1 overflow-y-auto p-4 md:p-6">
              <ResultsDisplay data={allGeneratedData} />
            </main>
          </SidebarInset>
        </div>
      </div>
    </SidebarProvider>
  );
}
