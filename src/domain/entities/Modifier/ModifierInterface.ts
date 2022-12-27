import type {Attribute} from '../Attributes';
import type {Translatable} from '../Translator';

export type ModifierType = 'fixed' | 'perLevel' | 'contextual' | 'temporary';

export type ModifierValueGetterInterface = {
	get(value: number, attributeBonuses: Attribute[]): number;
};

export type ModifierInterface = {
	source: Translatable;
	type: ModifierType;
	value: number;
	getValue(valueGetter: ModifierValueGetterInterface): number;
};
