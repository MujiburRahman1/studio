import { config } from 'dotenv';
config();

// Ensure Genkit is configured
import '@/ai/genkit';

import '@/ai/flows/enrich-medical-records.ts';
