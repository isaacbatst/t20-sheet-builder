import type {Cost, CostType} from './Sheet/CharacterSheet/CharacterSheetInterface';

export type SerializedManaCost = {
	type: CostType;
	value: number;
};

export class ManaCost implements Cost {
	type: CostType = 'mana';

	constructor(readonly value: number) {}

	serialize() {
		return {
			type: this.type,
			value: this.value,
		};
	}
}
