export enum ResistanceName {
	tormenta = 'tormenta',
	lefeu = 'lefeu',
	cold = 'cold',
	electricity = 'electricity',
	fire = 'fire',
	acid = 'acid',
	light = 'light',
	darkness = 'darkness',
}

export type ResistancesNames = keyof ResistanceName;
