'use server';

import { z } from 'zod';
import { enrichMedicalRecord } from '@/ai/flows/enrich-medical-records';
import { createSyntheticRecord } from '@/lib/synthetic-data';
import { revalidatePath } from 'next/cache';

const formSchema = z.object({
  diseaseType: z.string().min(1, 'Please select a disease type.'),
  recordCount: z.coerce.number().int().min(1, 'Please enter a number between 1 and 10.').max(10, 'Please enter a number between 1 and 10.'),
});

export type FormState = {
  message: string;
  data?: any[];
  errors?: {
    diseaseType?: string[];
    recordCount?: string[];
  };
};

export async function generateAndEnrichRecords(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const validatedFields = formSchema.safeParse({
    diseaseType: formData.get('diseaseType'),
    recordCount: formData.get('recordCount'),
  });

  if (!validatedFields.success) {
    return {
      message: 'Validation failed. Please check your inputs.',
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { diseaseType, recordCount } = validatedFields.data;
  const enrichedData = [];

  try {
    for (let i = 0; i < recordCount; i++) {
      const syntheticRecord = createSyntheticRecord(diseaseType, Date.now() + i);
      const enrichedRecord = await enrichMedicalRecord({
        record: syntheticRecord,
        diseaseType,
      });
      enrichedData.push(enrichedRecord);
    }
    
    revalidatePath('/');
    return {
      message: 'Successfully generated and enriched records.',
      data: enrichedData,
    };
  } catch (error) {
    console.error('Error enriching medical records:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
    return {
      message: `An error occurred while enriching records: ${errorMessage}`,
    };
  }
}
