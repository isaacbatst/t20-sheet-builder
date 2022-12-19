import type {OtherModifier} from './OtherModifier';

export class Defense {
	static get base() {
		return 10;
	}

	readonly otherModifiers: OtherModifier[] = [];

	addOtherModifier(newModifier: OtherModifier) {
		const isRepeated = this.otherModifiers.some(otherModifier => otherModifier.sourceName === newModifier.sourceName);

		if (isRepeated) {
			throw new Error('REPEATED_OTHER_DEFENSE_MODIFIER');
		}

		this.otherModifiers.push(newModifier);
	}

	getTotal(dexterity: number, armorBonus: number, shieldBonus: number) {
		const otherModifiersSum = this.otherModifiers
			.reduce<number>((acc, modifier) => modifier.value + acc, 0);
		return Defense.base + dexterity + armorBonus + shieldBonus + otherModifiersSum;
	}
}
