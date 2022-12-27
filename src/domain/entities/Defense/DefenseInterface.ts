import type {Attribute} from '../Attributes';
import type {FixedModifiersList} from '../Modifier/FixedModifier/FixedModifiersList';
import type {DefenseTotalCalculator} from './DefenseTotalCalculator';

export type DefenseInterface = {
	attribute: Attribute;
	fixedModifiers: FixedModifiersList;
	getTotal(calculator: DefenseTotalCalculator): number;
};
