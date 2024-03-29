import type {Attribute, Attributes} from '../Sheet/Attributes';
import type {TranslatableName} from '../Translator';

export type ModifierType = 'fixed' | 'perLevel' | 'contextual' | 'temporary';

export type ModifierAppliableValueCalculatorInterface = {
	calculate(value: number, attributeBonuses: Attribute[]): number;
};

export type SerializedModifier = {
	source: TranslatableName;
	type: ModifierType;
	baseValue: number;
	attributeBonuses: Attribute[];
	appliableValue: number;
	totalAttributeBonuses: number;
};

export type ModifierInterface = {
	source: TranslatableName;
	type: ModifierType;
	baseValue: number;
	attributeBonuses: Attribute[];
	getAppliableValue(calculator: ModifierAppliableValueCalculatorInterface): number;
	getTotalAttributeBonuses(attributes: Attributes): number;
	serialize(appliableValueCalculator: ModifierAppliableValueCalculatorInterface, attributeBonuses: Attributes): SerializedModifier;
};
