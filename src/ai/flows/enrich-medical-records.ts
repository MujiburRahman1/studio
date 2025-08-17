'use server';

/**
 * @fileOverview This file defines a Genkit flow to enrich synthetic medical records with realistic narrative descriptions using the GPT-5 API.
 *
 * - enrichMedicalRecord - A function that takes a synthetic medical record as input and returns an enriched record with narrative descriptions.
 * - EnrichMedicalRecordInput - The input type for the enrichMedicalRecord function.
 * - EnrichMedicalRecordOutput - The return type for the enrichMedicalRecord function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const EnrichMedicalRecordInputSchema = z.object({
  record: z.record(z.any()).describe('A synthetic medical record in JSON format.'),
  diseaseType: z.string().describe('The type of disease the medical record pertains to.'),
});
export type EnrichMedicalRecordInput = z.infer<typeof EnrichMedicalRecordInputSchema>;

const EnrichedRecordSchema = z.record(z.any()).describe('The enriched medical record with narrative descriptions.');

const EnrichMedicalRecordOutputSchema = z.object({
  enrichedRecord: EnrichedRecordSchema,
});
export type EnrichMedicalRecordOutput = z.infer<typeof EnrichMedicalRecordOutputSchema>;

export async function enrichMedicalRecord(input: EnrichMedicalRecordInput): Promise<EnrichMedicalRecordOutput> {
  return enrichMedicalRecordFlow(input);
}

const prompt = ai.definePrompt({
  name: 'enrichMedicalRecordPrompt',
  input: {schema: EnrichMedicalRecordInputSchema},
  output: {schema: EnrichMedicalRecordOutputSchema},
  prompt: `You are an expert medical writer. Given the following synthetic medical record for a patient with {{{diseaseType}}}, create a realistic narrative description of the patient's condition, including doctor's notes, therapy recommendations, and other relevant information.
  
The output should be a JSON object containing the enriched record under the key "enrichedRecord". The enriched record should include all fields from the original record, plus new fields for the narrative description.

Medical Record:
{{{record}}}`,
});

const enrichMedicalRecordFlow = ai.defineFlow(
  {
    name: 'enrichMedicalRecordFlow',
    inputSchema: EnrichMedicalRecordInputSchema,
    outputSchema: EnrichMedicalRecordOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    if (!output) {
      throw new Error('No output from enrichMedicalRecordPrompt');
    }
    return output;
  }
);
