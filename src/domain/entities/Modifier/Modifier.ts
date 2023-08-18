import type {Attribute, Attributes} from '../Sheet/Attributes';
import type {TranslatableName} from '../Translator';
import type {ModifierInterface, ModifierType, ModifierAppliableValueCalculatorInterface, SerializedModifier} from './ModifierInterface';

export type ModifierParams = {
	source: TranslatableName;
	value: number;
	type: ModifierType;
	attributeBonuses?: Set<Attribute>;
};

export abstract class Modifier implements ModifierInterface {
	readonly attributeBonuses: Attribute[];
	readonly source: TranslatableName;
	readonly baseValue: number;
	readonly type: ModifierType;

	constructor(params: ModifierParams) {
		this.source = params.source;
		this.baseValue = params.value;
		this.type = params.type;
		this.attributeBonuses = params.attributeBonuses ? [...params.attributeBonuses] : [];
	}

	getAppliableValue(calculator: ModifierAppliableValueCalculatorInterface): number {
		return calculator.calculate(this.baseValue, this.attributeBonuses);
	}

	getTotalAttributeBonuses(attributes: Attributes): number {
		return this.attributeBonuses.reduce((acc, attribute) => attributes[attribute] + acc, 0);
	}

	serialize(appliableValueCalculator: ModifierAppliableValueCalculatorInterface, attributes: Attributes): SerializedModifier {
		return {
			source: this.source,
			type: this.type,
			attributeBonuses: this.attributeBonuses,
			baseValue: this.baseValue,
			appliableValue: this.getAppliableValue(appliableValueCalculator),
			totalAttributeBonuses: this.getTotalAttributeBonuses(attributes),
		};
	}
}
