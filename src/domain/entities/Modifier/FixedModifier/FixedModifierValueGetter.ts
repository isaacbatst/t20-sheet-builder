import type {Attribute} from '../../Attributes';
import type {ModifierValueGetterInterface} from '../ModifierInterface';
import {ModifierValueGetter} from '../ModifierValueGetter';

export class FixedModifierValueGetter extends ModifierValueGetter
	implements ModifierValueGetterInterface {
	get(value: number, attributeBonuses: Attribute[]): number {
		return value + this.getAttributesBonusesTotal(attributeBonuses);
	}
}
