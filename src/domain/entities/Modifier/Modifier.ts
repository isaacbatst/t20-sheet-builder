import type {Attribute, Attributes} from '../Sheet/Attributes';
import type {TranslatableName} from '../Translator';
import type {ModifierInterface, ModifierType, ModifierValueGetterInterface} from './ModifierInterface';

export abstract class Modifier implements ModifierInterface {
	readonly attributeBonuses: Attribute[];

	constructor(
		readonly source: TranslatableName,
		readonly value: number,
		readonly type: ModifierType,
		attributeBonuses = new Set<Attribute>(),
	) {
		this.attributeBonuses = [...attributeBonuses];
	}

	getValue(valueGetter: ModifierValueGetterInterface): number {
		return valueGetter.get(this.value, this.attributeBonuses);
	}

	getTotalAttributeBonuses(attributes: Attributes): number {
		return this.attributeBonuses.reduce((acc, attribute) => attributes[attribute] + acc, 0);
	}
}
