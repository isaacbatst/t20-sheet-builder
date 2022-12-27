import type {Attribute, Attributes} from '../Attributes';

export class DefenseBaseCalculator {
	private static get initialValue() {
		return 10;
	}

	constructor(
		readonly attributes: Attributes,
		readonly armorBonus: number,
		readonly shieldBonus: number,
	) {}

	calculate(attribute: Attribute) {
		return DefenseBaseCalculator.initialValue
			+ this.attributes[attribute] + this.armorBonus + this.shieldBonus;
	}
}
