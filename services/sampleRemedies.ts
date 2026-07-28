import { Remedy } from '../types';

// Clearly-labeled example data shown when no API key is configured (or the
// backend is unreachable in local dev). Never presented as live AI output.
export const SAMPLE_REMEDIES: Remedy[] = [
    {
        name: 'Ginger Tea',
        description: 'A warming herbal infusion traditionally used to ease nausea, sore throats and mild digestive upset.',
        instructions: 'Steep 3–4 thin slices of fresh ginger root in a cup of just-boiled water for 8–10 minutes. Strain and add honey or lemon to taste. Sip slowly, 2–3 times per day.',
        timeframe: 'Soothing effect often felt within 20–30 minutes.',
        precautions: 'May interact with blood thinners and blood-pressure medication. Limit to ~4g of ginger per day. Consult a doctor if pregnant.',
        background: 'Gingerols in ginger have anti-inflammatory and anti-nausea properties supported by multiple clinical studies, and the root has centuries of use in Ayurvedic and traditional Chinese medicine.',
        ratings: { accessibility: 5, easeOfUse: 5, effectiveness: 4, speedOfRelief: 4, safetyProfile: 5 },
        pros: ['Ingredients are cheap and widely available', 'Strong evidence for nausea relief', 'Gentle and well-tolerated'],
        cons: ['Can cause mild heartburn in large amounts', 'Taste may be too sharp for some'],
    },
    {
        name: 'Honey & Lemon',
        description: 'A classic soothing drink for coughs and irritated throats.',
        instructions: 'Stir 1–2 teaspoons of raw honey and the juice of half a lemon into a mug of warm (not boiling) water. Drink as needed, up to 3 times daily.',
        timeframe: 'Throat comfort typically within minutes; cough relief over 1–2 days.',
        precautions: 'Never give honey to children under 12 months. Diabetics should account for the sugar content.',
        background: 'A WHO-recognised demulcent; honey has been shown in trials to reduce nighttime cough as effectively as some over-the-counter suppressants.',
        ratings: { accessibility: 5, easeOfUse: 5, effectiveness: 4, speedOfRelief: 5, safetyProfile: 4 },
        pros: ['Immediate soothing effect', 'Pantry staples', 'Kid-friendly (over age 1)'],
        cons: ['High in sugar', 'Effect is symptomatic, not curative'],
    },
    {
        name: 'Peppermint Steam Inhalation',
        description: 'Aromatic steam to help clear nasal congestion and open airways.',
        instructions: 'Add 2–3 drops of peppermint essential oil to a bowl of hot water. Drape a towel over your head, close your eyes, and breathe the steam for 5–10 minutes.',
        timeframe: 'Congestion relief usually within 10–15 minutes.',
        precautions: 'Keep eyes closed and face a safe distance from the water to avoid burns. Not recommended for young children or those with asthma triggered by menthol.',
        background: 'Menthol acts on nasal cold receptors to create a sensation of easier breathing; warm steam helps thin mucus.',
        ratings: { accessibility: 4, easeOfUse: 4, effectiveness: 3, speedOfRelief: 4, safetyProfile: 3 },
        pros: ['Fast congestion relief', 'Drug-free', 'Reusable oil lasts a long time'],
        cons: ['Risk of scalding if careless', 'Not suitable for everyone'],
    },
];
