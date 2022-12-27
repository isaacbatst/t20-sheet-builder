import type {Attribute} from '../Attributes';
import type {Translatable} from '../Translator';
import type {ModifierInterface, ModifierType, ModifierValueGetterInterface} from './ModifierInterface';

export abstract class Modifier implements ModifierInterface {
	readonly attributeBonuses: Attribute[];

	constructor(
		readonly source: Translatable,
		readonly value: number,
		readonly type: ModifierType,
		attributeBonuses: Set<Attribute> = new Set(),
	) {
		this.attributeBonuses = [...attributeBonuses];
	}

	getValue(getter: ModifierValueGetterInterface): number {
		return getter.get(this.value, this.attributeBonuses);
	}
}
