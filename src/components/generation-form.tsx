'use client';

import { useEffect, useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { generateAndEnrichRecords, type FormState } from '@/app/actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { DISEASE_TYPES } from '@/lib/constants';
import { Loader2, TestTubeDiagonal } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';

interface GenerationFormProps {
  onFormAction: (state: FormState) => void;
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Generating...
        </>
      ) : (
        <>
          <TestTubeDiagonal className="mr-2" />
          Generate Data
        </>
      )}
    </Button>
  );
}

export default function GenerationForm({ onFormAction }: GenerationFormProps) {
  const initialState: FormState = { message: '', errors: {} };
  const [state, formAction] = useActionState(generateAndEnrichRecords, initialState);
  const { toast } = useToast();

  useEffect(() => {
    if (state.message) {
      if(state.errors) {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: state.message,
        });
      }
    }
    onFormAction(state);
  }, [state]);

  return (
    <form action={formAction} className="space-y-4 p-2 group-data-[collapsible=icon]:p-0 group-data-[collapsible=icon]:pt-2">
      <Card className="border-0 shadow-none bg-transparent group-data-[collapsible=icon]:hidden">
        <CardHeader className="p-2">
          <CardTitle>Generation Controls</CardTitle>
          <CardDescription>Select a disease and number of records to generate.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 p-2">
          <div className="space-y-2">
            <Label htmlFor="diseaseType">Disease Type</Label>
             <Select name="diseaseType" required>
              <SelectTrigger id="diseaseType" className="w-full">
                <SelectValue placeholder="Select a disease" />
              </SelectTrigger>
              <SelectContent>
                {DISEASE_TYPES.map(disease => (
                  <SelectItem key={disease} value={disease}>
                    {disease}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {state.errors?.diseaseType && (
              <p className="text-sm font-medium text-destructive">{state.errors.diseaseType[0]}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="recordCount">Number of Records (1-100)</Label>
            <Input
              id="recordCount"
              name="recordCount"
              type="number"
              placeholder="e.g., 5"
              defaultValue={3}
              min="1"
              max="100"
              required
            />
            {state.errors?.recordCount && (
              <p className="text-sm font-medium text-destructive">{state.errors.recordCount[0]}</p>
            )}
          </div>
          <SubmitButton />
        </CardContent>
      </Card>
      
      {/* Icon-only view for collapsed sidebar */}
      <div className="hidden group-data-[collapsible=icon]:flex group-data-[collapsible=icon]:justify-center">
         <Button variant="ghost" size="icon" className="h-8 w-8" onClick={(e) => { e.preventDefault(); alert("Expand sidebar to generate data."); }}>
            <TestTubeDiagonal className="h-4 w-4" />
        </Button>
      </div>

    </form>
  );
}
