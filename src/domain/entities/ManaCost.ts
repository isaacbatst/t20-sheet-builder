import type {Cost, CostType} from './Sheet/CharacterSheet/CharacterSheetInterface';

export class ManaCost implements Cost {
	type: CostType = 'mana';

	constructor(readonly value: number) {}
}
