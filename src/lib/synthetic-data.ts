const getRandomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;
const getRandomFloat = (min: number, max: number, decimals: number) => {
    const str = (Math.random() * (max - min) + min).toFixed(decimals);
    return parseFloat(str);
};
const getRandomBool = (trueProbability = 0.5) => Math.random() < trueProbability;

export const createSyntheticRecord = (diseaseType: string, id: number) => {
    const baseRecord: Record<string, any> = {
        patientId: `NG-SYNTH-${id.toString().padStart(6, '0')}`,
        age: getRandomInt(20, 85),
        gender: ['Male', 'Female', 'Other'][getRandomInt(0, 2)],
        diagnosis: diseaseType,
    };

    switch (diseaseType) {
        case 'Alzheimer’s':
            baseRecord.symptoms = {
                memoryLoss: getRandomBool(0.9),
                difficultyCommunicating: getRandomBool(0.7),
                moodChanges: getRandomBool(0.8),
            };
            baseRecord.testResults = {
                miniMentalStateExam: getRandomInt(10, 26), // Score out of 30
            };
            break;
        case 'Parkinson’s':
            baseRecord.symptoms = {
                tremorAtRest: getRandomBool(0.85),
                bradykinesia: getRandomBool(0.9),
                posturalInstability: getRandomBool(0.7),
            };
            baseRecord.testResults = {
                UPDRS_score: getRandomInt(20, 80), // Unified Parkinson's Disease Rating Scale
            };
            break;
        case 'Epilepsy':
            baseRecord.symptoms = {
                seizureFrequencyPerMonth: getRandomInt(1, 10),
                auraPresence: getRandomBool(0.6),
            };
            baseRecord.testResults = {
                eegFindings: ['Normal', 'Abnormal-Spikes', 'Abnormal-Slowing'][getRandomInt(0, 2)],
            };
            break;
        case 'Stroke':
            baseRecord.symptoms = {
                facialDrooping: getRandomBool(),
                armWeakness: getRandomBool(),
                speechDifficulty: getRandomBool(),
            };
            baseRecord.testResults = {
                nihssScore: getRandomInt(1, 25), // NIH Stroke Scale
            };
            break;
        case 'Brain Tumor':
            baseRecord.symptoms = {
                headaches: getRandomBool(0.9),
                nausea: getRandomBool(0.7),
                visionProblems: getRandomBool(0.6),
            };
            baseRecord.testResults = {
                tumorSizeMm: getRandomInt(5, 50),
            };
            break;
        case 'Multiple Sclerosis':
            baseRecord.symptoms = {
                fatigue: getRandomBool(0.95),
                numbnessOrTingling: getRandomBool(0.8),
                muscleSpasms: getRandomBool(0.7),
            };
            baseRecord.testResults = {
                lesionCountMRI: getRandomInt(2, 20),
            };
            break;
        case 'Depression':
            baseRecord.symptoms = {
                lowMood: getRandomBool(0.98),
                anhedonia: getRandomBool(0.9),
                sleepDisturbance: getRandomBool(0.8),
            };
            baseRecord.testResults = {
                phq9Score: getRandomInt(5, 27), // Patient Health Questionnaire-9
            };
            break;
        case 'Anxiety':
            baseRecord.symptoms = {
                excessiveWorry: getRandomBool(0.98),
                restlessness: getRandomBool(0.9),
                panicAttacks: getRandomBool(0.4),
            };
            baseRecord.testResults = {
                gad7Score: getRandomInt(5, 21), // General Anxiety Disorder-7
            };
            break;
        case 'PTSD':
            baseRecord.symptoms = {
                flashbacks: getRandomBool(0.8),
                hypervigilance: getRandomBool(0.9),
                avoidance: getRandomBool(0.95),
            };
            baseRecord.testResults = {
                pcl5Score: getRandomInt(20, 80), // PTSD Checklist for DSM-5
            };
            break;
        case 'Cognitive Decline':
            baseRecord.symptoms = {
                forgetfulness: getRandomBool(0.9),
                impairedJudgment: getRandomBool(0.7),
                difficultyWithProblemSolving: getRandomBool(0.75),
            };
            baseRecord.testResults = {
                mocaScore: getRandomFloat(15, 28, 1), // Montreal Cognitive Assessment
            };
            break;
        default:
            baseRecord.symptoms = {
                genericSymptom: true,
            };
            baseRecord.testResults = {
                genericTest: 'N/A'
            };
    }
    return baseRecord;
};
