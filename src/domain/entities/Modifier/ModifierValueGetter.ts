import type {Attribute, Attributes} from '../Sheet/Attributes';
import type {ModifierAppliableValueCalculatorInterface} from './ModifierInterface';

export abstract class ModifierAppliableValueCalculator implements ModifierAppliableValueCalculatorInterface {
	constructor(
		readonly attributes: Attributes,
	) {}

	abstract calculate(baseValue: number, attributeBonuses: Attribute[]): number;

	protected getAttributesBonusesTotal(attributeBonuses: Attribute[]) {
		return attributeBonuses.reduce((acc, attribute) => this.attributes[attribute] + acc, 0);
	}
}
