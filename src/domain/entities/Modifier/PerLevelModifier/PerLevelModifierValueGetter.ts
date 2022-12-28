import type {Attribute, Attributes} from '../../Attributes';
import type {Level} from '../../Levels';
import type {ModifierValueGetterInterface} from '../ModifierInterface';
import {ModifierValueGetter} from '../ModifierValueGetter';

export class PerLevelModifierValueGetter extends ModifierValueGetter implements ModifierValueGetterInterface {
	constructor(
		attributes: Attributes,
		readonly includeFirstLevel: boolean,
		readonly level: Level,
		readonly frequency: number,
	) {
		super(attributes);
	}

	get(value: number, attributes: Attribute[]): number {
		const attributeBonuses = this.getAttributesBonusesTotal(attributes);
		const perLevelValue = value + attributeBonuses;

		if (!this.includeFirstLevel) {
			return Math.floor((this.level - 1) / this.frequency) * perLevelValue;
		}

		return Math.floor(this.level / this.frequency) * perLevelValue;
	}
}
