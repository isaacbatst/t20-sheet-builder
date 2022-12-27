import type {Attribute, Attributes} from '../Attributes';
import type {ModifierValueGetterInterface} from './ModifierInterface';

export abstract class ModifierValueGetter implements ModifierValueGetterInterface {
	constructor(
		readonly attributes: Attributes,
	) {}

	abstract get(value: number, attributeBonuses: Attribute[]): number;

	protected getAttributesBonusesTotal(attributeBonuses: Attribute[]) {
		return attributeBonuses.reduce((acc, attribute) => this.attributes[attribute] + acc, 0);
	}
}
