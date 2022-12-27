import type {Attribute, Attributes} from '../../Attributes';
import type {Level} from '../../Levels';
import type {ModifierValueGetterInterface} from '../ModifierInterface';
import {ModifierValueGetter} from '../ModifierValueGetter';

export class PerLevelModifierValueGetter extends ModifierValueGetter implements ModifierValueGetterInterface {
	constructor(
		attributes: Attributes,
		readonly includeFirstLevel: boolean,
		readonly level: Level,
	) {
		super(attributes);
	}

	get(value: number, attributes: Attribute[]): number {
		const attributeBonuses = this.getAttributesBonusesTotal(attributes);
		const perLevelValue = value + attributeBonuses;

		if (!this.includeFirstLevel) {
			return (this.level - 1) * perLevelValue;
		}

		return this.level * perLevelValue;
	}
}
