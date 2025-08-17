'use server';
/**
 * @fileOverview An AI flow to enrich a synthetic medical record with narrative text.
 *
 * - enrichRecord - A function that adds realistic doctor's notes to a record.
 * - EnrichInput - The input type for the enrichRecord function.
 * - EnrichOutput - The return type for the enrichRecord function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

// Define the input schema, which is a generic object for the record.
const EnrichInputSchema = z.object({
    patientId: z.string(),
    age: z.number(),
    gender: z.string(),
    diagnosis: z.string(),
    symptoms: z.record(z.any()),
    testResults: z.record(z.any()),
});
export type EnrichInput = z.infer<typeof EnrichInputSchema>;

// Define the output schema, adding doctor's notes to the input.
const EnrichOutputSchema = EnrichInputSchema.extend({
    doctor_notes: z.string().describe("Detailed, narrative doctor's notes for this patient encounter, including a brief history, examination findings, assessment, and plan. Should be 3-4 paragraphs long."),
});
export type EnrichOutput = z.infer<typeof EnrichOutputSchema>;


const enrichmentPrompt = ai.definePrompt({
    name: 'enrichmentPrompt',
    input: { schema: EnrichInputSchema },
    output: { schema: EnrichOutputSchema },
    prompt: `You are a medical scribe specializing in neurology and mental health.
    Given the following structured patient data, write a comprehensive but concise "doctor's notes" section for the patient's file.
    The notes should be realistic and reflect the provided data.
    Return the original data along with the new "doctor_notes" field.

    Patient Data:
    \`\`\`json
    {{{json input}}}
    \`\`\`
    `,
});

const enrichRecordFlow = ai.defineFlow(
    {
        name: 'enrichRecordFlow',
        inputSchema: EnrichInputSchema,
        outputSchema: EnrichOutputSchema,
    },
    async (record) => {
        const { output } = await enrichmentPrompt(record);
        if (!output) {
            throw new Error("The AI model did not return a valid enriched record.");
        }
        return output;
    }
);

// Define an exported wrapper function to be used in server actions.
export async function enrichRecord(record: EnrichInput): Promise<EnrichOutput> {
    return enrichRecordFlow(record);
}
