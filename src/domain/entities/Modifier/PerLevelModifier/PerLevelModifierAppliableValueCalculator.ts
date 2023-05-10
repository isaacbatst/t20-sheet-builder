import type {Attribute, Attributes} from '../../Sheet/Attributes';
import type {Level} from '../../Sheet/Level';
import type {ModifierAppliableValueCalculatorInterface} from '../ModifierInterface';
import {ModifierAppliableValueCalculator} from '../ModifierValueGetter';
import {type PerLevelModifierInterface} from './PerLevelModifierInterface';

export class PerLevelModifierAppliableValueCalculator
	extends ModifierAppliableValueCalculator
	implements ModifierAppliableValueCalculatorInterface {
	constructor(
		attributes: Attributes,
		readonly level: Level,
		readonly modifier: PerLevelModifierInterface,
	) {
		super(attributes);
	}

	calculate(value: number, attributes: Attribute[]): number {
		const attributeBonuses = this.getAttributesBonusesTotal(attributes);
		const perLevelValue = value + attributeBonuses;

		if (!this.modifier.includeFirstLevel) {
			return Math.floor((this.level - 1) / this.modifier.frequency) * perLevelValue;
		}

		return Math.floor(this.level / this.modifier.frequency) * perLevelValue;
	}
}
