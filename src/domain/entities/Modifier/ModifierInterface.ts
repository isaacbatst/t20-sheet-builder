import type {Attribute, Attributes} from '../Sheet/Attributes';
import type {Translatable} from '../Translator';

export type ModifierType = 'fixed' | 'perLevel' | 'contextual' | 'temporary';

export type ModifierValueGetterInterface = {
	get(value: number, attributeBonuses: Attribute[]): number;
};

export type ModifierInterface = {
	source: Translatable;
	type: ModifierType;
	value: number;
	attributeBonuses: Attribute[];
	getValue(valueGetter: ModifierValueGetterInterface): number;
	getTotalAttributeBonuses(attributes: Attributes): number;
};
