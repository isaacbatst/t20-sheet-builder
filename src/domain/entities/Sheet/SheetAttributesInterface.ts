import {type Attribute, type Attributes} from './Attributes';

export type SheetAttributesInterface = {
	setInitialAttributes(attributes: Attributes): void;
	applyRaceModifiers(modifiers: Partial<Attributes>): void;
	changeTormentaPowersAttribute(attribute: keyof Attributes): void;
	decreaseAttribute(attribute: keyof Attributes, quantity: number): void;
	getTormentaPowersAttribute(): Attribute;
	getValues(): Attributes;
};
