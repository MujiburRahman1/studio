# NeuroGen: An AI-Powered Synthetic Data Platform for Neuroscience

NeuroGen is a foundational web platform designed to solve a critical bottleneck in neurological AI research: the lack of large-scale, high-quality, and privacy-compliant patient data. Instead of being a single diagnostic tool, NeuroGen is an "enabling technology" that functions as a synthetic data factory.

This application allows researchers, developers, and clinicians to generate realistic, structured medical records for a wide range of neurological and mental health conditions.

## The Problem: Data Scarcity

Progress in AI-powered diagnostics for diseases like Alzheimer's, Parkinson's, and PTSD is often blocked by a major hurdle: the lack of large, high-quality, and privacy-compliant datasets. Real patient data is sensitive, rare, and difficult to access, which slows down research and the development of new technologies.

## Our Solution: A Synthetic Data Factory

NeuroGen tackles this problem head-on by generating realistic, structured, and safe synthetic data. The platform uses a hybrid approach:

1.  **Programmatic Generation:** To create the core structured data (symptoms, test results), ensuring it is statistically plausible and completely anonymous.
2.  **Generative AI (via Genkit and Gemini):** To enrich the records with high-fidelity, narrative doctor's notes, adding a layer of realism that is critical for training advanced models.

By providing an unlimited stream of synthetic data, NeuroGen acts as a catalyst for innovation, allowing for the development of new diagnostic tools without compromising patient privacy.

## Core Features

-   **Synthetic Record Generation:** Create records for various conditions like Alzheimer's, Parkinson's, Epilepsy, Stroke, Depression, and more.
-   **AI-Powered Enrichment:** Use a Genkit flow with the Gemini model to add realistic, narrative doctor's notes to each record.
-   **Interactive Dashboard:** A clean, responsive UI to control data generation and view results.
-   **Data Visualization:** View insights from the generated data through charts for age distribution and disease breakdown.
-   **Data Export:** Download the generated dataset as a CSV file for local use and analysis.

## Tech Stack

-   **Framework:** Next.js (App Router)
-   **Language:** TypeScript
-   **Styling:** Tailwind CSS
-   **UI Components:** shadcn/ui
-   **Generative AI:** Google's Gemini model via Genkit
