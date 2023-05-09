import {type FixedModifierInterface} from '../Modifier/FixedModifier/FixedModifier';
import type {FixedModifiersList} from '../Modifier/FixedModifier/FixedModifiersList';
import type {Attribute} from '../Sheet/Attributes';
import type {DefenseTotalCalculator} from './DefenseTotalCalculator';

export type DefenseInterface = {
	attribute: Attribute;
	fixedModifiers: FixedModifiersList;
	addFixedModifier(modifier: FixedModifierInterface): void;
	getTotal(calculator: DefenseTotalCalculator): number;
};
