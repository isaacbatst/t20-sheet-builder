import type {Cost, CostType} from './Sheet/SheetInterface';

export class ManaCost implements Cost {
	type: CostType = 'mana';

	constructor(readonly value: number) {}
}
