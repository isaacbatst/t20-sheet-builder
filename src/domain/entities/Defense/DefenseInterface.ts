import {type FixedModifierInterface} from '../Modifier/FixedModifier/FixedModifier';
import type {FixedModifiersListInterface} from '../Modifier/FixedModifier/FixedModifiersList';
import type {Attribute} from '../Sheet/Attributes';
import type {DefenseTotalCalculator} from './DefenseTotalCalculator';

export type DefenseInterface = {
	attribute: Attribute;
	fixedModifiers: FixedModifiersListInterface;
	addFixedModifier(modifier: FixedModifierInterface): void;
	getTotal(calculator: DefenseTotalCalculator): number;
};
